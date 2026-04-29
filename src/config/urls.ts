/**
 * Default automation entry: EN home page working route (`/landings/en/`); see `wiki/requirements.md`.
 * Override with `PLAYWRIGHT_BASE_URL` or `BASE_URL` in `playwright.config.ts`.
 */
export const DEFAULT_PLAYWRIGHT_BASE_URL = 'https://winwin.travel/landings/en/';

export const DEFAULT_HOME_EN_PATH = '/landings/en/';

export function defaultHomeEnUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}${DEFAULT_HOME_EN_PATH}`;
}
