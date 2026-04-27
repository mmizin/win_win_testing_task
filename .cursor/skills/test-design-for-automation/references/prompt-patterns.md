# Prompt patterns (human-reviewable output)

Use these as **starters**; always require technique names and risk on each case.

## Structured generation

> Given `[requirement or wiki excerpt]`, produce test cases using equivalence partitioning and boundary value analysis. Output a markdown table with columns: id, scenario, preconditions, steps, data, expected, technique, risk. No duplicates. Cap at N cases unless I ask to expand.

## Locator discovery (paired with MCP)

> After you explore the live DOM for `[URL]`, propose cases for `[feature]` where each expected result names a **semantic locator strategy** (role, label, text) and what must **not** be asserted (brittle copy).

## Filter / network oracles

> For `[filter action]`, list cases that assert both **visible selected state** and **URL query or network request** change. Mark high flake risk if the site is non-deterministic.

## Prune a bloated list

> Here are draft cases: `[paste]`. Merge duplicates, drop low-value overlap, and return the minimal set that still covers stated risks.

## Desktop and mobile

> For `[component]`, after you see where controls live at wide vs narrow viewport, output **separate** case ids for desktop and mobile (no `if/else` in one case): wide viewport with controls in the main shell; narrow viewport with menu/drawer steps. Put viewport in preconditions. Table columns: id, scenario, preconditions, steps, data, expected, technique, risk.
