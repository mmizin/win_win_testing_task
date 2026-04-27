import type { Locator, Page, Response } from '@playwright/test';
import { DEFAULT_LANDING_EN_PATH } from '../../config/urls';
import { readAdultsMaxByIncrement } from '../../utils/guests-dynamics';

/**
 * EN landing hero + search strip + quick links. Locators favor roles/labels from the live site
 * (`https://winwin.travel/landings/en/`).
 */
export class LandingPage {
  constructor(readonly page: Page) {}

  /** Uses `playwright.config` `baseURL` + default EN path. */
  async gotoEnLanding(options?: Parameters<Page['goto']>[1]): Promise<Response | null> {
    return this.page.goto(DEFAULT_LANDING_EN_PATH, { waitUntil: 'domcontentloaded', ...options });
  }

  /** Primary CTA in the header (copy may vary with campaigns). */
  headerDiscountCta(): Locator {
    return this.page.getByRole('link', { name: /Get €2000 off|Get Discount/i });
  }

  /** Opens the location field (collapsed control in the search strip). */
  cityOrAddressControl(): Locator {
    return this.page.getByRole('button', { name: 'City or Address' });
  }

  /**
   * Hero search row (City / dates / guests). On production the guests control uses
   * `data-wwt-id="guests-select__open--button"` (not a 4th sibling `button` index).
   */
  heroSearchStrip(): Locator {
    return this.page.locator('div.flex.h-auto.w-full.max-w-360').first();
  }

  async waitForHeroSearchStripReady(): Promise<void> {
    const skeleton = this.heroSearchStrip().locator('[data-slot="skeleton"]');
    if (await skeleton.count()) {
      await skeleton.first().waitFor({ state: 'hidden', timeout: 30_000 });
    }
  }

  async openGuestsModal(): Promise<void> {
    await this.waitForHeroSearchStripReady();
    await this.heroSearchStrip().locator('[data-wwt-id="guests-select__open--button"]').click();
    await this.adultsCounterRoot().waitFor({ state: 'visible' });
  }

  /** Legacy: production uses a Radix menu, not an h2 "Guests". Prefer `adultsCounterRoot()`. */
  guestsHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Guests', level: 2 });
  }

  /** Adults stepper in the open guests menu (`aria-valuemax` is the configured ceiling). */
  adultsCounterRoot(): Locator {
    // Scope to the *open* Radix menu: duplicate `data-wwt-id` nodes exist; unscoped `.first()` can
    // match a hidden copy with the + control already at `disabled`.
    return this.page
      .locator('[data-radix-menu-content][data-state="open"]')
      .locator('[data-wwt-id="guests-select__adults-number--input"]');
  }

  adultsSpinbutton(): Locator {
    return this.adultsCounterRoot().getByRole('spinbutton');
  }

  adultsIncrement(): Locator {
    return this.adultsCounterRoot().locator('[data-wwt-id="number-counter__plus--button"]');
  }

  /** Guest rows: Adults uses the number counter; Children / Pets may still be listitem on the menu. */
  guestRow(kind: 'Adults' | 'Children' | 'Pets'): Locator {
    if (kind === 'Adults') {
      return this.adultsCounterRoot();
    }
    return this.page.getByRole('listitem', { name: new RegExp(kind) });
  }

  async confirmGuests(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }

  /**
   * Discovers the adults cap by stepping "+" until the value stops increasing (opens Guests if needed).
   */
  async readMaxAdultsCeiling(): Promise<number> {
    if (!(await this.adultsCounterRoot().isVisible())) {
      await this.openGuestsModal();
    }
    return readAdultsMaxByIncrement(this.adultsSpinbutton(), this.adultsIncrement());
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
