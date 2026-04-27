/**
 * Pets row in the hero Guests menu (species + weight comboboxes).
 * Labels match production EN (`https://winwin.travel/landings/en/`) as of 2026-04.
 *
 * Dog weight bands covered by automation; live UI also exposes `10-15 kg`.
 */
export const PET_SPECIES_UI = {
  dog: 'Dog',
  cat: 'Cat',
  other: 'Other',
} as const;

/**
 * Subset of the live dog weight dropdown used in tests.
 */
export const DOG_WEIGHT_UI_OPTIONS = [
  '<1 kg',
  '1-5 kg',
  '5-10 kg',
  '15-20 kg',
  '>20 kg',
] as const;

export type DogWeightUiOption = (typeof DOG_WEIGHT_UI_OPTIONS)[number];

/** API query values observed on `Search` href (`search.guestQuantity.pets[0].weight`). */
export function apiWeightFromUiLabel(uiLabel: string): string {
  return uiLabel.replace(/\s+/g, '');
}

export function apiPetTypeFromSpeciesUi(species: typeof PET_SPECIES_UI.dog | typeof PET_SPECIES_UI.other): 'DOG' | 'OTHER' {
  return species === PET_SPECIES_UI.dog ? 'DOG' : 'OTHER';
}
