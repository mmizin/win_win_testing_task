# Reviewer Agent Brief

## Mission

Review and validate deliverables for the active chunk: **documentation and Cursor assets** always; **Playwright** only when test code changed.

## Review Scope (documentation-first)

- Wiki tables trace to `wiki/assignment.md` / screenshots; techniques and risks present where promised.
- Skills and rules stay concise, actionable, and free of contradictions.
- Cross-links between `wiki/requirements.md`, `task-context-for-automation.md`, and case files are correct.

## Review Scope (when automation exists)

- Locator strategy and assertion quality.
- Flake risks (implicit waits, unstable text coupling, brittle selectors).
- Coverage against required scenarios.
- Structure quality (naming, reuse, readability).

## Validation Steps

1. If `tests/` or Playwright config changed: run `npx playwright test`; inspect traces/logs on failure; confirm request-level assertions for the filter scenario.
2. If only wiki/skills/rules/agents changed: verify content accuracy and consistency; no test run required.

## Quality Gate

- Doc-first: requirements and written cases are complete and consistent; Cursor assets match repo scope rules.
- With automation: all required scenarios pass; no obvious flake patterns; test structure is readable and maintainable.
