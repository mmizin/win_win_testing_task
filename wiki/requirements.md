# WinWin QA Automation Engineer Requirements

## Source Of Truth

- Verbatim assigner text: [assignment.md](assignment.md)
- Task 1 written cases: [header-test-cases.md](header-test-cases.md)
- Layout and labels: validate on the live EN landing (see **Target URLs** below).

## Target URLs (Playwright and manual QA)

- **Assigner path:** `https://winwin.travel/app/landings/en` — often returns **404** in production; do not rely on it as the default automation entry unless you are testing that route.
- **Working EN landing:** `https://winwin.travel/landings/en/` (also reachable from `https://winwin.travel/` via redirect). Use this path with `baseURL` `https://winwin.travel` and `page.goto('/landings/en/')`, or the full URL.

## Task 1: Header Test Cases

- Create written test cases for the landing page header.
- Cover visibility, labels, and interaction for:
  - Logo
  - Primary orange header CTA (**Get Discount** on current production; campaign copy may differ — oracle and steps in [header-test-cases.md](header-test-cases.md))
  - Utility icons
  - `Register` and `Sign In`

## Task 2: UI Automation Scenarios

1. Max adults selection in Guests selector (behavior at ceiling). See `tests/landing/guests-max-adults.spec.ts`.
2. Pets filter options selection and selected-state validation (weight bands + Other).
3. Verify filters change request URL and/or outgoing request payload/params.

## Technical Constraints

- **Adopted stack (this repository):** Playwright + **TypeScript** (`.ts` for tests and `playwright.config.ts`). The assigner text names JavaScript; TypeScript is the same Playwright + Node toolchain with types and matches [ARCHITECTURE.md](../ARCHITECTURE.md).
- Nice to have:
  - Page Object Model
  - Clear test structure
  - UI and API assertions
  - Logging

## Notes For Automation

- Pets weight bands may be exposed via advanced filters, not only quick filters.
- Adults max value must be discovered from UI behavior and asserted as boundary.
