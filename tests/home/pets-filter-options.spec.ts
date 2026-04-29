import { test, expect } from '../../src/fixtures';
import {
  DOG_WEIGHT_UI_OPTIONS,
  PET_SPECIES_UI,
  apiPetTypeFromSpeciesUi,
  apiWeightFromUiLabel,
} from '../../src/models/guests/pet-filter-options';
import { logTestInfo } from '../../src/utils/test-log';
import { withNoServerErrorsOnApiStyleTraffic } from '../../src/utils/network-assertions';

/** Read encoded pet guest params from the hero Search link (`href` may be relative `/app?…`). */
function parseGuestPetFromSearchHref(
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

/**
 * Pets row in hero Guests: species + weight bands (Task 2).
 * UI: Radix select triggers must mirror the chosen option.
 * API: main Search link carries `search.guestQuantity.pets[0].type|weight` query params.
 */
test.describe('Home — guests — pets filter options', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });
  test.slow();

  test.beforeEach(async ({ page, pages }) => {
    const response = await pages.home.gotoHomePage();
    expect(response, 'Navigation should return a response object').toBeTruthy();
    expect(
      response!.ok(),
      'EN home page document request should return a successful HTTP status'
    ).toBe(true);
    logTestInfo('Document navigation', { status: response!.status(), url: page.url() });
  });

  for (const weightLabel of DOG_WEIGHT_UI_OPTIONS) {
    test(`[Dog] weight ${weightLabel} — UI selected state + Search href`, async ({ page, pages }) => {
      const home = pages.home;
      await withNoServerErrorsOnApiStyleTraffic(page, async () => {
        await home.openGuestsModal();
        await home.ensurePetsCountAtLeast(1);
        await home.selectPetSpecies(PET_SPECIES_UI.dog);
        await home.selectPetWeight(weightLabel);
      });

      await expect(home.petSpeciesCombobox()).toHaveText(PET_SPECIES_UI.dog);
      await expect(home.petWeightCombobox()).toHaveText(weightLabel);
      logTestInfo('Pet UI selection', { species: PET_SPECIES_UI.dog, weightLabel });

      await home.dismissGuestsMenu();
      const href = await home.mainSearchCta().getAttribute('href');
      const pet = parseGuestPetFromSearchHref(href, page.url());
      expect(pet.type).toBe(apiPetTypeFromSpeciesUi(PET_SPECIES_UI.dog));
      expect(pet.weight).toBe(apiWeightFromUiLabel(weightLabel));
      logTestInfo('Pet Search href params', pet);
    });
  }

  test(`[Other] species — UI selected state + Search href`, async ({ page, pages }) => {
    const weightLabel = '1-5 kg';
    const home = pages.home;

    await withNoServerErrorsOnApiStyleTraffic(page, async () => {
      await home.openGuestsModal();
      await home.ensurePetsCountAtLeast(1);
      await home.selectPetSpecies(PET_SPECIES_UI.other);
      await home.selectPetWeight(weightLabel);
    });

    await expect(home.petSpeciesCombobox()).toHaveText(PET_SPECIES_UI.other);
    await expect(home.petWeightCombobox()).toHaveText(weightLabel);

    await home.dismissGuestsMenu();
    const href = await home.mainSearchCta().getAttribute('href');
    const pet = parseGuestPetFromSearchHref(href, page.url());
    expect(pet.type).toBe(apiPetTypeFromSpeciesUi(PET_SPECIES_UI.other));
    expect(pet.weight).toBe(apiWeightFromUiLabel(weightLabel));
    logTestInfo('Pet Search href params (Other)', pet);
  });
});
