/**
 * Lightweight logging for tests (Playwright workers log to stdout; HTML report sees failures).
 * Use for boundary values and flow checkpoints — not for secrets.
 */
export function logTestInfo(message: string, details?: Record<string, unknown>): void {
  if (details === undefined) {
    // eslint-disable-next-line no-console
    console.log(`[playwright] ${message}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`[playwright] ${message}`, details);
  }
}
