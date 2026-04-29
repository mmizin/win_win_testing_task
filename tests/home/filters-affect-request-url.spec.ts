import type { Request } from '@playwright/test';
import { test, expect } from '../../src/fixtures';
import { statisticsOffersCountBreakfastQuery } from '../../src/models/filters/statistics-filter-query-breakfast';
import { logTestInfo } from '../../src/utils/test-log';
import { withNoServerErrorsOnApiStyleTraffic } from '../../src/utils/network-assertions';

/** Read adults count from the hero Search link (`href` may be relative `/app?…`). */
function parseAdultsQuantityFromSearchHref(href: string | null, baseURL: string): number {
  if (href === null || href === '') {
    throw new Error('Search link href is missing');
  }
  const u = new URL(href, baseURL);
  const raw = u.searchParams.get('search.guestQuantity.adultsQuantity');
  if (raw === null) {
    throw new Error(
      `Search href did not contain search.guestQuantity.adultsQuantity; keys present: ${[...u.searchParams.keys()].join(', ')}`
    );
  }
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) {
    throw new Error(`Invalid adultsQuantity: ${raw}`);
  }
  return n;
}

/** Statistics endpoint observed when filters panel applies selection (encoded query contains `filters`). */
const STATISTICS_OFFERS_COUNT_PATH = '/api/v1/statistics/offers/count';

/**
 * Task 2 — filters change outgoing URLs: hero Search `href` (navigation) and/or API-style GET params.
 * Technique: equivalence + decision-table-style paths (guests vs advanced filters); API interception via `waitForRequest`.
 */
test.describe('Home — filters affect request URL', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });
  test.slow();

  test.beforeEach(async ({ page, pages }) => {
    const response = await pages.home.gotoHomePage();
    expect(response, 'Navigation should return a response object').toBeTruthy();
    expect(
      response!.ok(),
      'EN home page document request should return a successful HTTP status'
    ).toBe(true);
    logTestInfo('Document navigation', { status: response!.status(), url: page.url() });
  });

  test('guest adults increment updates Search link query string', async ({ page, pages }) => {
    const home = pages.home;
    await home.waitForHeroSearchStripReady();

    const hrefBefore = await home.mainSearchCta().getAttribute('href');
    const adultsBefore = parseAdultsQuantityFromSearchHref(hrefBefore, page.url());
    logTestInfo('Search href baseline', { adultsQuantity: adultsBefore });

    await withNoServerErrorsOnApiStyleTraffic(page, async () => {
      await home.openGuestsModal();
      await home.adultsIncrement().click();
      await home.dismissGuestsMenu();
    });

    const hrefAfter = await home.mainSearchCta().getAttribute('href');
    const adultsAfter = parseAdultsQuantityFromSearchHref(hrefAfter, page.url());
    logTestInfo('Search href after adults step', { adultsQuantity: adultsAfter });

    expect(adultsAfter, 'Applying "+" once should increase encoded adults by 1').toBe(adultsBefore + 1);
    expect(hrefAfter, 'Navigation URL should change when guest quantity changes').not.toBe(hrefBefore);
  });

  test('advanced filter Apply sends statistics request URL encoding Breakfast filter', async ({
    page,
    pages,
  }) => {
    const home = pages.home;
    await home.waitForHeroSearchStripReady();

    let lastOfferCountStatsUrl = '';
    const trackOfferCountStatsUrl = (req: Request): void => {
      if (req.method() === 'GET' && req.url().includes(STATISTICS_OFFERS_COUNT_PATH)) {
        lastOfferCountStatsUrl = req.url();
      }
    };
    page.on('request', trackOfferCountStatsUrl);

    try {
      await home.openAdvancedFiltersButton().click();

      await expect(home.advancedCheckbox('Breakfast')).toBeVisible();
      await page.waitForLoadState('networkidle').catch(() => undefined);
      const statsUrlBeforeBreakfastApply = lastOfferCountStatsUrl;

      const statsRequestPromise = page.waitForRequest(
        (req) =>
          req.method() === 'GET' &&
          req.url().includes(STATISTICS_OFFERS_COUNT_PATH) &&
          req.url().includes('filters'),
        { timeout: 30_000 }
      );

      await withNoServerErrorsOnApiStyleTraffic(page, async () => {
        await home.advancedCheckbox('Breakfast').click();
        await home.applyFiltersButton().click();
      });

      const statsRequest = await statsRequestPromise;

      const statsUrl = new URL(statsRequest.url());

      expect(
        statsRequest.url(),
        'Applying Breakfast should change the offer-count statistics request URL'
      ).not.toBe(statsUrlBeforeBreakfastApply);

      logTestInfo('Intercepted statistics/offers/count URL', {
        path: statsUrl.pathname,
        hasGuestQuantity: statsUrl.searchParams.has('guestQuantity.adultsQuantity'),
        filterKeys: [...statsUrl.searchParams.keys()].filter((k) => k.startsWith('filters')),
      });

      expect(statsUrl.pathname, 'Offer-count statistics API path').toContain(STATISTICS_OFFERS_COUNT_PATH);
      expect(statsUrl.searchParams.get('guestQuantity.adultsQuantity')).toBeTruthy();

      for (const [key, value] of Object.entries(statisticsOffersCountBreakfastQuery)) {
        expect(
          statsUrl.searchParams.get(key),
          `Statistics request should encode applied Breakfast filter (${key})`
        ).toBe(value);
      }

      await home.closeFiltersPanelButton().click().catch(() => undefined);
    } finally {
      page.off('request', trackOfferCountStatsUrl);
    }
  });
});
