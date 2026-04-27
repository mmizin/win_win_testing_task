/**
 * Checkboxes seen in the advanced filter panel on production EN landing (Apr 2026 snapshot).
 * Use with `getByRole('checkbox', { name: '…' })` when labels stay stable; adjust if product renames.
 */
export const advancedFilterCheckboxes = {
  meals: { breakfast: 'Breakfast' } as const,
  pets: {
    parent: 'Pets',
    noPetDeposit: 'No pet deposit',
    allPetsAllowed: 'All pets allowed',
    petFeeUnder20: 'Pet fee less than €20 per night',
    allowsThreePlus: 'Allows 3+ pets',
    muzzleNotRequired: 'Muzzle not required',
  } as const,
  otherCategory: { other: 'Other' } as const,
} as const;

/**
 * "Other" in the long amenities list (distinct from per-species weight "Other" in the Task 2 outline).
 */
export type AdvancedPetRelatedLabel =
  (typeof advancedFilterCheckboxes)['pets'][keyof (typeof advancedFilterCheckboxes)['pets']];
