/**
 * Default automation entry: EN landing working route (`/landings/en/`); see `wiki/requirements.md`.
 * Override with `PLAYWRIGHT_BASE_URL` or `BASE_URL` in `playwright.config.ts`.
 */
export const DEFAULT_LANDING_EN_PATH = '/landings/en/';

export function defaultLandingEnUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}${DEFAULT_LANDING_EN_PATH}`;
}
