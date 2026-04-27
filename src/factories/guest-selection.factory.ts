import { GuestSelectionBuilder } from '../builders/guest-selection.builder';
import type { GuestSelection } from '../models/guests/guest-selection.types';

/**
 * Produces `GuestSelection` for specs without new-ing builders in every file.
 */
export class GuestSelectionFactory {
  static default(): GuestSelection {
    return new GuestSelectionBuilder().build();
  }

  static singleAdult(): GuestSelection {
    return new GuestSelectionBuilder().singleAdult().build();
  }

  static custom(configure: (b: GuestSelectionBuilder) => GuestSelectionBuilder): GuestSelection {
    return configure(new GuestSelectionBuilder()).build();
  }
}
