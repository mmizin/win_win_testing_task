---
name: test-automation-code-quality
description: Write maintainable Playwright test automation using page objects, fixtures, and practical SOLID principles. Use when implementing or reviewing UI tests for readability, reuse, and stability.
---

# Test Automation Code Quality

## MCP vs repo tests

See `references/mcp-vs-committed-tests.md` for when to explore in-browser versus committing `@playwright/test` specs.

## Goals

- Keep tests readable and deterministic.
- Isolate page structure details from assertions.
- Minimize duplication while preserving clarity.

## Implementation Guidelines

1. Prefer semantic locators (`getByRole`, `getByLabel`, `getByText`) before CSS selectors.
2. Use page objects or component objects for reusable flows.
3. Keep each spec focused on one behavior.
4. Centralize shared setup in fixtures or helpers.
5. Use explicit assertions after each meaningful action.

## Practical SOLID In Tests

- Single responsibility: page object methods do one user action.
- Open/closed: extend by adding new test cases, not rewriting base helpers.
- Liskov: shared abstractions must be safely interchangeable.
- Interface segregation: do not force tests to depend on large helper APIs.
- Dependency inversion: inject config/test data instead of hard-coding in test bodies.

## Playwright-Specific Quality Checks

- Avoid arbitrary waits; assert expected state instead.
- Keep retry logic in config, not manual loops in tests.
- Include network assertions when requirements demand request validation.
- Capture trace/video/screenshot only as needed to control noise.

## Review Checklist

- Is the locator strategy resilient?
- Are assertions precise and meaningful?
- Is duplicate flow extractable into a page/helper?
- Is naming business-oriented and clear?
- Will this pass reliably in CI for external environments?
