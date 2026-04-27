---
name: test-design-for-automation
description: Generate traceable UI automation test cases using test design techniques and AI-assisted analysis. Use when converting requirements into high-value Playwright scenarios with clear coverage and risk mapping.
---

# Test Design For Automation

## Purpose

Convert product requirements into a compact, high-value test set that is easy to automate and maintain.

## Inputs

- `wiki/requirements.md`
- Visual references (`wiki/task_1.png`, `wiki/task_2.png`, `wiki/task_3.png`)
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

## Output Format

Use a markdown table:

| id | scenario | preconditions | steps | data | expected | technique | risk |
|----|----------|---------------|-------|------|----------|-----------|------|

## Prompt patterns

See `references/prompt-patterns.md` for copy-paste templates that force technique + risk columns and pruning steps.

## AI Guardrails

- Always name which technique produced each case.
- Prefer a small complete set over a large noisy set.
- For numeric controls (adults count), include min/normal/max/beyond-max boundaries.
- For filters, validate both visual selected state and request-level impact when required.
