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
| `src/` | Shared test support: models (app-shaped test types), `src/constants` (assignment outline ids, not product domain), builders, factories, page objects, utilities, and Playwright `test` / `expect` re-exports via `src/fixtures` (path alias `@/*` in `tsconfig.json`) |
| `tests/` | Playwright spec files (entry: `playwright.config.ts` → `testDir: './tests'`) |
| `playwright.config.ts` | Browser projects, retries, reporters, shared `use` options |
| `wiki/assignment.md` | Verbatim assigner text (Task 1 + 2 and technical requirements) |
| `wiki/` | Requirements, test-case docs, references |
| `.cursor/skills/` | Test design and automation code-quality guidance |
| `.cursor/agents/`, `.cursor/rules/` | Agent prompts and repository scope rules |

## Test automation architecture

**Current state:** Example specs live under `tests/`; configuration targets Chromium, Firefox, and WebKit.

**Intended patterns** (when implementing WinWin scenarios — align with `.cursor/skills/test-automation-code-quality/SKILL.md`):

- **`src/models` / builders / factories** — test data shaped like the app (e.g. guest counts, filter presets, pet weight band ids, URL diff helpers)
- **`src/constants`** — non-domain automation metadata (e.g. `task2-scenarios.ts` → `wiki/requirements.md` Task 2 ids)
- **Page objects** (or composable page fragments) for stable selectors and reuse; entry point `LandingPage` in `src/pages/landing/landing.page.ts`
- **Fixtures** — `import { test, expect } from '../src/fixtures'` (or `from '@/fixtures'` if your runner resolves `tsconfig` paths) for `landing` and future fixtures
- **Base URL** — `playwright.config.ts` sets `use.baseURL` to `https://winwin.travel` by default; use `page.goto('/landings/en/')` in specs (overridable with `PLAYWRIGHT_BASE_URL` / `BASE_URL`)
- **UI assertions** plus **network or API checks** where requirements call for URL/request validation
- **Small, focused specs** mapped to named scenarios from the wiki (e.g. Task 2 ids in `requirements.md`)

Add subfolders under `tests/` only when it improves clarity (e.g. `tests/header/`, `tests/search/`) and document the convention here.

## Configuration and environment

- **Base URL:** Set in `playwright.config.ts` under `use.baseURL` when the suite should use relative navigation (`page.goto('/')`). Uncomment and set when the target environment is fixed. **Which host/path to use** (assigner URL vs working landing, 404 caveat) is documented in `wiki/requirements.md`.
- **Secrets / env files:** Optional `.env` loading is stubbed in `playwright.config.ts` (commented `dotenv` imports). Document variable names in the section below when introduced.
- **Local server:** `webServer` block is commented; enable if tests should start an app automatically.

### Environment variables (fill in as needed)

| Variable | Used by | Description |
|----------|---------|-------------|
| *(none yet)* | — | — |

## How this relates to other docs

- **Requirements and cases:** `wiki/assignment.md`, `wiki/requirements.md`, `wiki/header-test-cases.md`
- **AI workflow:** `wiki/agent-workflow.md`, `wiki/ai-in-qa-workflow.md`

## Design decisions (log)

Record meaningful choices so future changes stay consistent.

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04 | Live EN landing base URL and 404 on `/app/landings/en` are documented in `wiki/requirements.md`. | Avoids ad-hoc URLs in tests and matches production routing. |

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
