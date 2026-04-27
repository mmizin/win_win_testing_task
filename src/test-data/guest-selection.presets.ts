import type { GuestSelection } from '../models/guests/guest-selection.types';

/**
 * Ready-made `GuestSelection` for specs. Keep in sync with `GuestSelectionBuilder` defaults.
 */
export const guestSelectionDefault: GuestSelection = { adults: 2, children: 0, pets: 0 };

export const guestSelectionSingleAdult: GuestSelection = { adults: 1, children: 0, pets: 0 };
