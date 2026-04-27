# AI In QA Workflow

## Goal

Use AI to accelerate test design and debugging while keeping deterministic automation in source-controlled Playwright tests **when an automation pass is in scope**. This repository may ship **wiki + Cursor skills/rules/agents only**; treat that as a valid phase — see [agent-workflow.md](agent-workflow.md) modes.

## Workflow

1. Start from `wiki/requirements.md` and break scenarios into testable conditions.
2. Use AI prompts with explicit techniques (EP, BVA, decision-table, state transitions) to generate candidate cases.
3. Keep only high-value, non-duplicate cases and convert them into stable automation.
4. Use MCP browser tools for fast UI exploration, locator discovery, and runtime evidence capture.
5. Implement and maintain canonical regression checks in `@playwright/test`.
6. Validate both UI behavior and network behavior when business logic depends on query params or API calls.
7. Use traces, console logs, and screenshots to shorten failure triage cycles.

## Guardrails

- AI suggests; tests and assertions stay human-reviewed.
- Prefer semantic locators (`getByRole`, `getByLabel`) before CSS/XPath fallbacks.
- Avoid one-off scripts as deliverables; commit repeatable tests.
- Keep suites small and focused for external sites with potentially unstable data.
