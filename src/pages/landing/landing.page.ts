import type { Locator, Page } from '@playwright/test';
import { DEFAULT_LANDING_EN_PATH } from '../../config/urls';
import { readAdultsMaxByIncrement } from '../../utils/guests-dynamics';

/**
 * EN landing hero + search strip + quick links. Locators favor roles/labels from the live site
 * (`https://winwin.travel/landings/en/`).
 */
export class LandingPage {
  constructor(readonly page: Page) {}

  /** Uses `playwright.config` `baseURL` + default EN path. */
  async gotoEnLanding(options?: Parameters<Page['goto']>[1]) {
    await this.page.goto(DEFAULT_LANDING_EN_PATH, { waitUntil: 'domcontentloaded', ...options });
  }

  /** Primary CTA in the header (copy may vary with campaigns). */
  headerDiscountCta(): Locator {
    return this.page.getByRole('link', { name: /Get €2000 off|Get Discount/i });
  }

  /** Opens the location field (collapsed control in the search strip). */
  cityOrAddressControl(): Locator {
    return this.page.getByRole('button', { name: 'City or Address' });
  }

  /** Search strip row containing City / dates / guest count / guest icon — 4th button opens Guests. */
  searchStripButtonByIndex(index: number): Locator {
    return this.page.getByRole('button', { name: 'City or Address' }).locator('xpath=..').getByRole('button').nth(index);
  }

  async openGuestsModal(): Promise<void> {
    await this.searchStripButtonByIndex(3).click();
    await this.guestsHeading().waitFor({ state: 'visible' });
  }

  guestsHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Guests', level: 2 });
  }

  /** Guest rows use listitem "Adults …", "Children …", "Pets". */
  guestRow(kind: 'Adults' | 'Children' | 'Pets'): Locator {
    return this.page.getByRole('listitem', { name: new RegExp(kind) });
  }

  async confirmGuests(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }

  /**
   * Task 2 A-01: discovers max adults on the current UI; opens Guests if needed.
   */
  async readMaxAdultsCeiling(): Promise<number> {
    if (!(await this.guestsHeading().isVisible())) {
      await this.openGuestsModal();
    }
    const row = this.guestRow('Adults');
    return readAdultsMaxByIncrement(
      row.getByRole('spinbutton'),
      row.getByRole('button').nth(1)
    );
  }

  openAdvancedFiltersButton(): Locator {
    return this.page.getByRole('button', { name: 'filter button' });
  }

  applyFiltersButton(offerCountLabel?: string | RegExp): Locator {
    if (offerCountLabel !== undefined) {
      return this.page.getByRole('button', { name: offerCountLabel });
    }
    return this.page.getByRole('button', { name: /Apply/ });
  }

  clearAllFiltersButton(): Locator {
    return this.page.getByRole('button', { name: 'Clear all parameters' });
  }

  closeFiltersPanelButton(): Locator {
    return this.page.getByRole('button', { name: 'Close' }).first();
  }

  advancedCheckbox(name: string | RegExp): Locator {
    return this.page.getByRole('checkbox', { name });
  }

  /** Quick scroller chips under the search bar, e.g. "With pets". */
  quickFilterLink(name: string | RegExp): Locator {
    return this.page.getByRole('link', { name });
  }

  mainSearchCta(): Locator {
    return this.page.getByRole('link', { name: 'Search' });
  }
}
