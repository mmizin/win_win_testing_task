/**
 * Default automation entry per `wiki/task-context-for-automation.md` (EN landing, working route).
 * Override with `PLAYWRIGHT_BASE_URL` or `BASE_URL` in `playwright.config.ts`.
 */
export const DEFAULT_LANDING_EN_PATH = '/landings/en/';

export function defaultLandingEnUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}${DEFAULT_LANDING_EN_PATH}`;
}
