import { advancedFilterCheckboxes } from '../models/filters/advanced-filter-labels';
import { PET_WEIGHT_BANDS, type PetWeightBand } from '../models/pets/pet-weight-band';

/**
 * A named bundle of filter labels for Task 2 A-02 / A-03 style tests.
 * Actual UI toggling lives in page objects; this is test data + traceability to the written outline.
 */
export type PetWeightScenario = {
  name: string;
  bands: PetWeightBand[];
  /** Advanced panel checkboxes to combine when exercising "selected state" (live UI). */
  extraCheckboxNames?: string[];
};

export const breakfastOnlyPreset = {
  name: 'Breakfast',
  labels: [advancedFilterCheckboxes.meals.breakfast] as const,
} as const;

/**
 * All Task 2 dog weight band ids plus a representative follow-up (see wiki A-02).
 * Pair with `LandingAdvancedFilters` / UI exploration for exact control mapping.
 */
export const petWeightMatrixScenario: PetWeightScenario = {
  name: 'task2-weight-bands-a02',
  bands: [...PET_WEIGHT_BANDS],
  extraCheckboxNames: [advancedFilterCheckboxes.pets.parent],
};
