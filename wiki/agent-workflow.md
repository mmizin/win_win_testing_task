# Agent Workflow

## Roles

- **Orchestrator:** runs **Planner → Developer → Reviewer** per chunk; on failure, loops **Developer → Reviewer** until the chunk passes, or sends work back to **Planner** when the plan or scope is wrong. Stops and escalates after repeated no-progress cycles. See [.cursor/agents/orchestrator.md](../.cursor/agents/orchestrator.md).
- Planner: transforms requirements into chunked implementation plan.
- Developer: delivers wiki/skills updates and — when explicitly in scope — automation using project skills and branch policy.
- Reviewer: validates documentation traceability and, when test code exists, runs tests and reports issues/fixes.

## Modes

- **Documentation-first (default for this repo):** extend `wiki/`, `.cursor/skills/`, `.cursor/rules/`, `.cursor/agents/` only. Reviewer checks tables, links, and alignment with `wiki/assignment.md` / screenshots — no Playwright run required.
- **Automation pass:** same sequence, but Developer also changes `tests/` and Playwright config; Reviewer runs `npx playwright test` and inspects traces on failure.

## Sequence

1. Planner reads `wiki/requirements.md` and outputs chunked steps with acceptance criteria.
2. Developer executes approved chunks on `feature/<short-description>` branch.
3. Reviewer checks artifact quality (written cases, skills, rules) and, if applicable, locators, assertions, readability, and flake risks.
4. When automation is in scope, Reviewer runs tests and confirms green status (or returns actionable defects).

## Definition Of Done

- Task 1 header test cases documented (see [header-test-cases.md](header-test-cases.md)).
- When automation is in scope: Task 2 scenarios automated and passing; request-level validation included for filter scenario; test code follows skill guidance for structure, reuse, and readability.
