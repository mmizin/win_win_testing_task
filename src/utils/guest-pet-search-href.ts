/**
 * Read encoded pet guest params from the hero Search link (`href` may be relative `/app?…`).
 */
export function parseGuestPetFromSearchHref(
  href: string | null,
  baseURL: string
): { type: string; weight: string } {
  if (href === null || href === '') {
    throw new Error('Search link href is missing');
  }
  const u = new URL(href, baseURL);
  const type = u.searchParams.get('search.guestQuantity.pets[0].type');
  const weight = u.searchParams.get('search.guestQuantity.pets[0].weight');
  if (type === null || weight === null) {
    throw new Error(
      `Search href did not contain pet guest params; keys present: ${[...u.searchParams.keys()].join(', ')}`
    );
  }
  return { type, weight };
}
