import type { Locator } from '@playwright/test';

/**
 * Clicks the Adults "+" control until the value stops increasing; returns the ceiling
 * (Task 2 A-01 / boundary on max adults). Requires a stable `valueLocator` and `increment` button.
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
    await incrementButton.click();
    const after = parseInt(await valueLocator.inputValue(), 10);
    if (after === before) break;
  }
  return last;
}
