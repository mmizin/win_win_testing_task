/**
 * Read adults count from the hero Search link (`href` may be relative `/app?…`).
 */
export function parseAdultsQuantityFromSearchHref(href: string | null, baseURL: string): number {
  if (href === null || href === '') {
    throw new Error('Search link href is missing');
  }
  const u = new URL(href, baseURL);
  const raw = u.searchParams.get('search.guestQuantity.adultsQuantity');
  if (raw === null) {
    throw new Error(
      `Search href did not contain search.guestQuantity.adultsQuantity; keys present: ${[...u.searchParams.keys()].join(', ')}`
    );
  }
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) {
    throw new Error(`Invalid adultsQuantity: ${raw}`);
  }
  return n;
}
