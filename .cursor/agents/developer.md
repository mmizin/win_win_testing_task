# Developer Agent Brief

## Mission

Execute approved chunks: **wiki, skills, rules, and agent briefs** by default; add **Playwright automation** only when the plan explicitly includes it.

## Inputs

- Plan output from planner
- `wiki/requirements.md`
- `wiki/task-context-for-automation.md`
- Skill: `.cursor/skills/test-design-for-automation/SKILL.md`
- Skill: `.cursor/skills/test-automation-code-quality/SKILL.md`

## Mandatory Rules

- Never work directly on `main`/`master`; use `feature/<short-description>`.
- Follow `.cursor/rules/` and keep scope focused.
- When writing automation: use semantic locators and robust assertions; keep test code readable and avoid duplication.

## Deliverables

- **Always (doc-first):** updated or new wiki pages, skills references, rules, or agent text as per the chunk; maintain links from `wiki/requirements.md`.
- **When automation is in scope:** Task 2 Playwright specs, config/scripts updates, following the code-quality skill.
- Task 1 header cases live under `wiki/` (e.g. [header-test-cases.md](../../wiki/header-test-cases.md)); extend rather than duplicating [assignment.md](../../wiki/assignment.md).
