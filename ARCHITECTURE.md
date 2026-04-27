# Architecture

This document describes how this repository is structured, which technologies it uses, and where to extend it. Update it as the project grows.

## Purpose

Repository for **WinWin.travel QA work**: manual test cases, automation scenarios, and supporting AI-QA tooling (wiki, Cursor skills/agents). Primary automation target is the public site per `wiki/assignment.md` and the rest of `wiki/`.

## Technology stack

| Area | Choice | Notes |
|------|--------|--------|
| Test runner | [Playwright Test](https://playwright.dev/) | `@playwright/test` |
| Language | TypeScript | Tests and config use `.ts` |
| Runtime | Node.js | `package.json` uses CommonJS (`"type": "commonjs"`) |

## Repository layout

| Path | Role |
|------|------|
| `tests/` | Playwright spec files (entry: `playwright.config.ts` → `testDir: './tests'`) |
| `playwright.config.ts` | Browser projects, retries, reporters, shared `use` options |
| `wiki/assignment.md` | Verbatim assigner text (Task 1 + 2 and technical requirements) |
| `wiki/` | Requirements, test-case docs, task context, references |
| `.cursor/skills/` | Test design and automation code-quality guidance |
| `.cursor/agents/`, `.cursor/rules/` | Agent prompts and repository scope rules |

## Test automation architecture

**Current state:** Example specs live under `tests/`; configuration targets Chromium, Firefox, and WebKit.

**Intended patterns** (when implementing WinWin scenarios — align with `.cursor/skills/test-automation-code-quality/SKILL.md`):

- **Page objects** (or composable page fragments) for stable selectors and reuse
- **Fixtures** for shared setup (e.g. base URL, logged-in state if needed later)
- **UI assertions** plus **network or API checks** where requirements call for URL/request validation
- **Small, focused specs** mapped to named scenarios from the wiki/task docs

Add subfolders under `tests/` only when it improves clarity (e.g. `tests/header/`, `tests/search/`) and document the convention here.

## Configuration and environment

- **Base URL:** Set in `playwright.config.ts` under `use.baseURL` when the suite should use relative navigation (`page.goto('/')`). Uncomment and set when the target environment is fixed. **Which host/path to use** (assigner URL vs working landing, 404 caveat) is documented in `wiki/task-context-for-automation.md`.
- **Secrets / env files:** Optional `.env` loading is stubbed in `playwright.config.ts` (commented `dotenv` imports). Document variable names in the section below when introduced.
- **Local server:** `webServer` block is commented; enable if tests should start an app automatically.

### Environment variables (fill in as needed)

| Variable | Used by | Description |
|----------|---------|-------------|
| *(none yet)* | — | — |

## How this relates to other docs

- **Requirements and visuals:** `wiki/assignment.md`, `wiki/requirements.md`, `wiki/task-context-for-automation.md`, `wiki/task_*.png`
- **Scenario outlines:** e.g. `wiki/task-2-scenario-outline.md`, `wiki/header-test-cases.md`
- **AI workflow:** `wiki/agent-workflow.md`, `wiki/ai-in-qa-workflow.md`

## Design decisions (log)

Record meaningful choices so future changes stay consistent.

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04 | Live EN landing base URL and 404 on `/app/landings/en` are documented in `wiki/task-context-for-automation.md` (and `task_1.png` shows current header/hero). | Avoids ad-hoc URLs in tests and matches production routing. |

## CI and release (fill in when applicable)

- **CI provider:** *(e.g. GitHub Actions)*
- **Commands:** *(e.g. `npx playwright test`)*
- **Artifacts:** *(traces, HTML report)*

## Extension checklist

Use this list when onboarding or expanding the suite:

- [ ] Confirm target base URL(s) and environments (staging/production policy)
- [ ] Document branching and PR expectations (if not only in team process docs)
- [ ] List stable selectors or data-testid conventions if the app team provides them
- [ ] Add MCP vs committed-test policy if relevant (see `.cursor/skills/test-automation-code-quality/references/mcp-vs-committed-tests.md`)
