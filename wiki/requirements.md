# WinWin QA Automation Engineer Requirements

## Source Of Truth

- Verbatim assigner text: [assignment.md](assignment.md)
- Visual references (in this folder): `task_1.png`, `task_2.png`, `task_3.png`
- Target page: `https://winwin.travel/app/landings/en`
- Consolidated context: [task-context-for-automation.md](task-context-for-automation.md)
- Task 1 written cases: [header-test-cases.md](header-test-cases.md)
- Task 2 written outline (for future automation): [task-2-scenario-outline.md](task-2-scenario-outline.md)

## Task 1: Header Test Cases

- Create written test cases for the landing page header.
- Cover visibility, labels, and interaction for:
  - Logo
  - `Get €2000 off` CTA
  - Utility icons
  - `Register` and `Sign In`

## Task 2: UI Automation Scenarios

1. Max adults selection in Guests selector.
2. Pets filter options selection and selected-state validation.
3. Verify filters change request URL and/or outgoing request payload/params.

## Technical Constraints

- Preferred stack: Playwright + JavaScript
- Nice to have:
  - Page Object Model
  - Clear test structure
  - UI and API assertions
  - Logging

## Notes For Automation

- Pets weight bands may be exposed via advanced filters, not only quick filters.
- Adults max value must be discovered from UI behavior and asserted as boundary.
