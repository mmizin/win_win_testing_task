import { test, expect } from '../../src/fixtures';
import {
  DOG_WEIGHT_UI_OPTIONS,
  PET_SPECIES_UI,
  apiPetTypeFromSpeciesUi,
  apiWeightFromUiLabel,
} from '../../src/models/guests/pet-filter-options';
import { parseGuestPetFromSearchHref } from '../../src/utils/guest-pet-search-href';
import { withNoServerErrorsOnApiStyleTraffic } from '../../src/utils/network-assertions';
import { logTestInfo } from '../../src/utils/test-log';

/**
 * Pets row in hero Guests: species + weight bands (Task 2).
 * UI: Radix select triggers must mirror the chosen option.
 * API: main Search link carries `search.guestQuantity.pets[0].type|weight` query params.
 */
test.describe('Landing — guests — pets filter options', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });
  test.slow();

  test.beforeEach(async ({ page, landing }) => {
    const response = await landing.gotoEnLanding();
    expect(response, 'Navigation should return a response object').toBeTruthy();
    expect(
      response!.ok(),
      'EN landing document request should return a successful HTTP status'
    ).toBe(true);
    logTestInfo('Document navigation', { status: response!.status(), url: page.url() });
  });

  for (const weightLabel of DOG_WEIGHT_UI_OPTIONS) {
    test(`[Dog] weight ${weightLabel} — UI selected state + Search href`, async ({ page, landing }) => {
      await withNoServerErrorsOnApiStyleTraffic(page, async () => {
        await landing.openGuestsModal();
        await landing.ensurePetsCountAtLeast(1);
        await landing.selectPetSpecies(PET_SPECIES_UI.dog);
        await landing.selectPetWeight(weightLabel);
      });

      await expect(landing.petSpeciesCombobox()).toHaveText(PET_SPECIES_UI.dog);
      await expect(landing.petWeightCombobox()).toHaveText(weightLabel);
      logTestInfo('Pet UI selection', { species: PET_SPECIES_UI.dog, weightLabel });

      await landing.dismissGuestsMenu();
      const href = await landing.mainSearchCta().getAttribute('href');
      const pet = parseGuestPetFromSearchHref(href, page.url());
      expect(pet.type).toBe(apiPetTypeFromSpeciesUi(PET_SPECIES_UI.dog));
      expect(pet.weight).toBe(apiWeightFromUiLabel(weightLabel));
      logTestInfo('Pet Search href params', pet);
    });
  }

  test(`[Other] species — UI selected state + Search href`, async ({ page, landing }) => {
    const weightLabel = '1-5 kg';

    await withNoServerErrorsOnApiStyleTraffic(page, async () => {
      await landing.openGuestsModal();
      await landing.ensurePetsCountAtLeast(1);
      await landing.selectPetSpecies(PET_SPECIES_UI.other);
      await landing.selectPetWeight(weightLabel);
    });

    await expect(landing.petSpeciesCombobox()).toHaveText(PET_SPECIES_UI.other);
    await expect(landing.petWeightCombobox()).toHaveText(weightLabel);

    await landing.dismissGuestsMenu();
    const href = await landing.mainSearchCta().getAttribute('href');
    const pet = parseGuestPetFromSearchHref(href, page.url());
    expect(pet.type).toBe(apiPetTypeFromSpeciesUi(PET_SPECIES_UI.other));
    expect(pet.weight).toBe(apiWeightFromUiLabel(weightLabel));
    logTestInfo('Pet Search href params (Other)', pet);
  });
});
