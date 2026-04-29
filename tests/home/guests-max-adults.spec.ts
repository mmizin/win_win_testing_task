import { test, expect } from '../../src/fixtures';
import { withNoServerErrorsOnApiStyleTraffic } from '../../src/utils/network-assertions';
import { logTestInfo } from '../../src/utils/test-log';

/**
 * End-to-end: hero Guests selector, adults stepper, behaviour at the configured maximum.
 * Wide viewport: the `lg+` search strip is required in the current layout.
 */
test.describe('Home — guests — adults at maximum', () => {
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

  test('UI allows selecting the maximum adults value via the stepper', async ({ page, pages }) => {
    const home = pages.home;
    const ceiling = await test.step('Step up until the counter stops (discover cap)', () =>
      withNoServerErrorsOnApiStyleTraffic(page, () => home.readMaxAdultsCeiling())
    );
    expect(ceiling, 'Product should define a positive adults ceiling').toBeGreaterThanOrEqual(1);
    logTestInfo('Adults ceiling', { value: ceiling });

    await test.step('Assert spinbutton matches the discovered ceiling', async () => {
      await expect(home.adultsSpinbutton()).toHaveValue(String(ceiling));
    });
  });

  test('increasing count past the cap has no effect on the value', async ({ page, pages }) => {
    const home = pages.home;
    await withNoServerErrorsOnApiStyleTraffic(page, () => home.readMaxAdultsCeiling());

    const input = home.adultsSpinbutton();
    const atMax = await input.inputValue();
    const plus = home.adultsIncrement();

    await test.step('Extra "+" clicks must not move the value above the cap', async () => {
      if (await plus.isEnabled()) {
        await plus.click();
      }
      await expect(input).toHaveValue(atMax);
    });

    if (!(await plus.isEnabled())) {
      await expect(plus).toBeDisabled();
    }
    logTestInfo('At ceiling', { adults: atMax, plusDisabled: await plus.isDisabled() });
  });

  test('a11y attributes expose the current value and the maximum', async ({ page, pages }) => {
    const home = pages.home;
    await withNoServerErrorsOnApiStyleTraffic(page, () => home.readMaxAdultsCeiling());
    const input = home.adultsSpinbutton();
    const maxAttr = await input.getAttribute('aria-valuemax');
    const nowAttr = await input.getAttribute('aria-valuenow');
    expect(maxAttr, 'Spinbutton should expose aria-valuemax').toBeTruthy();
    expect(nowAttr, 'At ceiling, aria-valuenow should match aria-valuemax').toBe(maxAttr);
    logTestInfo('Aria at ceiling', { 'aria-valuemax': maxAttr, 'aria-valuenow': nowAttr });
  });
});
