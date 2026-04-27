/**
 * Traceability to `wiki/requirements.md` § Task 2 (A-01…A-03), not app domain data.
 */
export const TASK2_SCENARIOS = {
  a01: {
    id: 'A-01',
    name: 'Max adults at ceiling',
    focus: 'guests' as const,
  },
  a02: {
    id: 'A-02',
    name: 'Pets weight bands and Other',
    focus: 'petFilters' as const,
  },
  a03: {
    id: 'A-03',
    name: 'Filters change request / URL',
    focus: 'networkOrUrl' as const,
  },
} as const;

export type Task2ScenarioKey = keyof typeof TASK2_SCENARIOS;
