import { expect } from '@playwright/test';
import type { Page, Response } from '@playwright/test';

const WINWIN = /winwin\.travel/i;

/**
 * While `action` runs, assert no **5xx** on same-origin `fetch` / `xhr` responses
 * (typical API-style traffic from the app shell). Returns the result of `action`.
 */
export async function withNoServerErrorsOnApiStyleTraffic<T>(
  page: Page,
  action: () => Promise<T>
): Promise<T> {
  const failures: { url: string; status: number; resourceType: string }[] = [];
  const onResponse = (res: Response) => {
    if (res.status() < 500) {
      return;
    }
    const url = res.url();
    if (!WINWIN.test(url)) {
      return;
    }
    const resourceType = res.request().resourceType();
    if (resourceType !== 'fetch' && resourceType !== 'xhr') {
      return;
    }
    failures.push({ url, status: res.status(), resourceType });
  };
  page.on('response', onResponse);
  try {
    return await action();
  } finally {
    page.off('response', onResponse);
    expect(
      failures,
      'No 5xx responses on WinWin fetch/xhr during this action'
    ).toEqual([]);
  }
}
