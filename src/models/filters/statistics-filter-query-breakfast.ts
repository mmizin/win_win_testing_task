/**
 * Observed GET query values for `/api/v1/statistics/offers/count` after applying the advanced-filter
 * checkbox labeled like `advancedFilterCheckboxes.meals.breakfast` (EN production home page).
 * Update if the filter taxonomy changes.
 */
export const statisticsOffersCountBreakfastQuery = {
  'filters[0].id': '10',
  'filters[0].type': 'AND',
  'filters[0].optionIDs[0]': '2',
} as const;
