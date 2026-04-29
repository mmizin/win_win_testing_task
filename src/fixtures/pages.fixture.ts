import type { Page } from '@playwright/test';
import { HomePage } from '../pages/home/home.page';

/**
 * All page objects for the app, bound to the same Playwright `page` per test.
 * Add new entries here when you add `*.page.ts` classes.
 */
export type AppPages = {
  /** Public EN home page (Task 2). */
  home: HomePage;
};

export type PagesFixtures = {
  pages: AppPages;
};

export const pagesFixture = {
  pages: async (
    { page }: { page: Page },
    use: (value: AppPages) => Promise<void>,
  ) => {
    await use({
      home: new HomePage(page),
    });
  },
};
