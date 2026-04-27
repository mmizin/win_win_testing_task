import { advancedFilterCheckboxes } from '../models/filters/advanced-filter-labels';
import { PET_WEIGHT_BANDS, type PetWeightBand } from '../models/pets/pet-weight-band';

/**
 * Named bundles for Task 2 A-02 / A-03 — plain data, no pattern abstractions.
 */
export type PetWeightScenario = {
  name: string;
  bands: PetWeightBand[];
  extraCheckboxNames?: string[];
};

export const breakfastOnlyPreset = {
  name: 'Breakfast',
  labels: [advancedFilterCheckboxes.meals.breakfast] as const,
} as const;

export const petWeightMatrixScenario: PetWeightScenario = {
  name: 'task2-weight-bands-a02',
  bands: [...PET_WEIGHT_BANDS],
  extraCheckboxNames: [advancedFilterCheckboxes.pets.parent],
};
