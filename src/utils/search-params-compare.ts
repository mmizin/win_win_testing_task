/**
 * Helpers for A-03 (URL / request differs from baseline when filters change).
 */
export function parseSearchToRecord(search: string): Record<string, string> {
  const u = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  return Object.fromEntries(u.entries());
}

/**
 * Returns keys whose values differ between two query strings.
 */
export function diffSearchParams(
  beforeSearch: string,
  afterSearch: string,
  ignoreKeys: ReadonlySet<string> = new Set()
): { addedOrChanged: string[]; onlyBefore: string[] } {
  const a = parseSearchToRecord(beforeSearch);
  const b = parseSearchToRecord(afterSearch);
  const addedOrChanged: string[] = [];
  for (const k of new Set([...Object.keys(b), ...Object.keys(a)])) {
    if (ignoreKeys.has(k)) continue;
    if (a[k] !== b[k] && b[k] !== undefined) {
      if (a[k] !== b[k]) addedOrChanged.push(k);
    }
  }
  const onlyBefore = Object.keys(a).filter((k) => !(k in b) && !ignoreKeys.has(k));
  return { addedOrChanged, onlyBefore };
}
