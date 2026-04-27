# Task 2 — Automation scenario outline (written)

**Purpose:** Traceable targets for future Playwright work. Not executable tests.

**References:** [assignment.md](assignment.md), [task_2.png](task_2.png), [task_3.png](task_3.png), [requirements.md](requirements.md).

| id | scenario | preconditions | steps (high level) | data | expected | technique | risk |
|----|----------|---------------|-------------------|------|----------|-----------|------|
| A-01 | Max adults at ceiling | Landing EN; Guests control reachable | Open Guests; increase Adults until + disabled or value stops | discover max from UI | UI shows max; + inoperative at max; Confirm persists selection as product defines | BVA | high |
| A-02 | Pets weight bands and Other | Filters/advanced UI exposes pet options | For each Dog band and Other: select; observe selected state; deselect or reset between if needed | `<1kg`, `1–5 kg`, `5–10 kg`, `15–20 kg`, `>20kg`, Other | Each option can be selected; selected state visible per option | EP | high |
| A-03 | Filters change request | Landing EN; network observable | Apply at least one filter that should affect search; capture URL and/or request | representative filter set | Query params or outgoing request reflect filter state vs baseline | ST | high |

**Implementation notes (when coding)**

- Discover pet options location (quick chips vs advanced) on live DOM before locking locators.
- Prefer `page.route` / `waitForRequest` or URL assertion per [Playwright network docs](https://playwright.dev/docs/network).
