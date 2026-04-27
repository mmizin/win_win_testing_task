import type { GuestSelection } from '../models/guests/guest-selection.types';

const DEFAULT: GuestSelection = {
  adults: 2,
  children: 0,
  pets: 0,
};

/**
 * Mutable builder for `GuestSelection` (mirrors the CryptoSandbox `UserBuilder` style).
 */
export class GuestSelectionBuilder {
  private data: GuestSelection;

  constructor() {
    this.data = { ...DEFAULT };
  }

  withAdults(n: number): this {
    this.data.adults = n;
    return this;
  }

  withChildren(n: number): this {
    this.data.children = n;
    return this;
  }

  withPets(n: number): this {
    this.data.pets = n;
    return this;
  }

  /** One adult, no children or pets — common minimum bookable party. */
  singleAdult(): this {
    this.data = { adults: 1, children: 0, pets: 0 };
    return this;
  }

  build(): GuestSelection {
    return { ...this.data };
  }
}
