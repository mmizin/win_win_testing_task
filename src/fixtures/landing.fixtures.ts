import { test as base } from '@playwright/test';
import { LandingPage } from '../pages/landing/landing.page';

export type WinWinFixtures = {
  /** Page object for the public EN landing (Task 2). */
  landing: LandingPage;
};

export const test = base.extend<WinWinFixtures>({
  landing: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
});

export const expect = test.expect;
