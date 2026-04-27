/**
 * In-memory state for the Guests popover: Adults / Children / Pets steppers.
 * Aligns with live UI: list items "Adults", "Children", "Pets" and their spinbutton values.
 */
export type GuestSelection = {
  adults: number;
  children: number;
  pets: number;
};
