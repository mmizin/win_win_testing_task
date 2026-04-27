import { test, expect } from '../src/fixtures';

/**
 * Smoke: extended fixtures + `baseURL` resolve; page object is constructible.
 * Task 2 scenarios will build on this harness.
 */
test('EN landing opens with expected title (smoke)', async ({ page, landing }) => {
  await landing.gotoEnLanding();
  await expect(landing.guestsHeading()).not.toBeVisible();
  await expect(page).toHaveTitle(/WinWin|Hotel/i);
});
