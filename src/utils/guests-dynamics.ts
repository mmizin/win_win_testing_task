import type { Locator } from '@playwright/test';

/**
 * Clicks the Adults "+" control until the value stops increasing; returns the ceiling
 * Requires a stable `valueLocator` and `increment` button.
 */
export async function readAdultsMaxByIncrement(
  valueLocator: Locator,
  incrementButton: Locator,
  options?: { maxClicks?: number }
): Promise<number> {
  const cap = options?.maxClicks ?? 100;
  let last = 0;
  for (let i = 0; i < cap; i++) {
    const raw = await valueLocator.inputValue();
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n)) last = n;
    const before = n;
    if (await incrementButton.isDisabled().catch(() => true)) {
      break;
    }
    await incrementButton.click();
    const after = parseInt(await valueLocator.inputValue(), 10);
    if (after === before) break;
  }
  return last;
}
