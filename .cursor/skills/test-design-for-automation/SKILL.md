---
name: test-design-for-automation
description: Generate traceable UI automation test cases using test design techniques and AI-assisted analysis. Use when converting requirements into high-value Playwright scenarios with clear coverage and risk mapping.
---

# Test Design For Automation

## Purpose

Convert product requirements into a compact, high-value test set that is easy to automate and maintain.

## Inputs

- `wiki/requirements.md`
- `wiki/requirements.md` and live page for scope and URLs
- Live behavior from target page

## Process

1. Extract entities, controls, and business rules from requirements.
2. Build candidate cases using:
   - Equivalence partitioning
   - Boundary value analysis
   - Decision-table combinations (if multiple filters interact)
   - State transitions (open/close modal, selected/unselected filters)
3. Remove duplicates and keep only highest-value checks.
4. Add risk tags per case (`high`, `medium`, `low`).
5. Emit automation-ready cases with:
   - `id`
   - preconditions
   - steps
   - test data
   - expected result
   - technique used
   - risk
6. **Desktop and mobile:** When the product places controls differently by viewport (e.g. full header on wide screens vs **hamburger / overflow menu** on narrow), **split cases by platform** instead of one case with `if` branches.

## Desktop and mobile

- **Discover** on the real UI (or `task_*.png` + live): at which break-points the layout changes, what moves into menus or drawers, and which actions stay on the top bar.
- **Write separate cases** (separate `id` rows) for:
  - **Desktop** (or “wide”): fixed viewport at or above the product’s desktop break-point; preconditions state that key controls (e.g. **Sign In**, **Register**) are **in the main header / shell** — the case **fails** if they are missing at that width.
  - **Mobile** (or “narrow”): fixed viewport at or below the mobile break-point; preconditions that use **open menu** / **drawer** steps where the app requires them — do not merge these into a desktop case as an optional path.
- **Name the platform** in the **scenario** column (e.g. “Sign In (desktop, header)”, “Sign In (mobile, overflow menu)”) or in **preconditions** so automation can map to different Playwright **projects** (`viewport`, `isMobile`, device profiles).
- **Layout-only BVA** can repeat: one boundary case for “large width” and one for “small width” to catch clipping, horizontal scroll, or missing overflow entry points.
- **Prune** duplicate coverage: the same *business* rule (e.g. “auth opens from primary entry”) is still one *logical* check, but it may be **two** automation-ready cases when the entry UI differs by platform.

## Output Format

Use a markdown table:

| id | scenario | preconditions | steps | data | expected | technique | risk |
|----|----------|---------------|-------|------|----------|-----------|------|

Platform-specific runs may use a **scenario** prefix or suffix (`[Desktop]`, `[Mobile]`) or a dedicated **preconditions** line (`Viewport: 1440×900`, `Viewport: 390×844`) for traceability in Playwright projects.

## Prompt patterns

See `references/prompt-patterns.md` for copy-paste templates that force technique + risk columns and pruning steps.

## AI Guardrails

- Always name which technique produced each case.
- Prefer a small complete set over a large noisy set.
- For numeric controls (adults count), include min/normal/max/beyond-max boundaries.
- For filters, validate both visual selected state and request-level impact when required.
- **Desktop vs mobile:** do not encode “if visible in header, else use menu” in a single case; use **separate** cases with explicit viewports and steps (see *Desktop and mobile* above).
