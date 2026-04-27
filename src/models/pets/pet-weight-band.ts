/**
 * Dog weight bands from Task 2 written outline (`wiki/task-2-scenario-outline.md` / A-02).
 * Live advanced filters may present these with small copy differences — confirm in DOM before
 * locking getByText locators. Some bands may be nested under a "Pets" / "See more" region.
 */
export const PET_WEIGHT_BANDS = [
  'lt1kg',
  '1-5kg',
  '5-10kg',
  '15-20kg',
  'gt20kg',
  'other',
] as const;

export type PetWeightBand = (typeof PET_WEIGHT_BANDS)[number];

/**
 * Optional human labels for data-driven tests and reports (not guaranteed to match DOM 1:1).
 */
export const PET_WEIGHT_LABEL_EN: Readonly<Record<PetWeightBand, string>> = {
  lt1kg: '<1 kg',
  '1-5kg': '1–5 kg',
  '5-10kg': '5–10 kg',
  '15-20kg': '15–20 kg',
  gt20kg: '>20 kg',
  other: 'Other',
} as const;
