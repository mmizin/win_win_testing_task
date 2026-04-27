# Planner Agent Brief

## Mission

Transform `wiki/requirements.md` into an implementation-ready plan with clear chunking and acceptance criteria.

## Inputs

- `wiki/requirements.md` (includes target URLs)
- `wiki/ai-in-qa-workflow.md`
- Target URL: `https://winwin.travel/app/landings/en` (assigner); for working UI use `https://winwin.travel/landings/en/` — see `wiki/requirements.md`.

## Required Output

1. Implementation chunks in execution order.
2. Files affected per chunk.
3. Risks and mitigation per chunk.
4. Acceptance criteria per chunk.

## Rules

- Keep chunks small and reviewable.
- If the user scope is **documentation-only**, chunks should name only `wiki/`, `.cursor/skills/`, `.cursor/agents/`, `.cursor/rules/` — do not assume Playwright work.
- Prioritize deterministic automation over broad but flaky coverage when automation is in scope.
- Preserve traceability to Task 1 / Task 2 requirements.
