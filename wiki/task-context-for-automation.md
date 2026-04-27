# WinWin QA task — reference for future work

**Purpose:** Single in-repo reference for the WinWin.travel automation assignment: task text, where screenshots live, what each image shows, target URL, and planning notes. Use this when designing or implementing tests.

**Not included here:** Playwright test code (development is tracked separately). This file is documentation only.

**Related files**

| File | Role |
|------|------|
| [assignment.md](assignment.md) | Original task wording from the assigner |
| [wiki/requirements.md](requirements.md) | Condensed requirements aligned with `assignment.md` |
| [wiki/header-test-cases.md](header-test-cases.md) | Task 1 written header cases |
| [wiki/task-2-scenario-outline.md](task-2-scenario-outline.md) | Task 2 automation targets (written only) |
| `task_1.png` | Header + top-of-landing reference (file in `wiki/`; refreshed from live site, see below) |
| `task_2.png` | Hero / search / filters / advanced — reference (file in `wiki/`) |
| `task_3.png` | Guests modal reference (file in `wiki/`) |

**Optional external plan copy:** A Cursor plan named *WinWin UI AI-QA plan* may exist locally under `.cursor/plans/` (e.g. `winwin_ui_ai-qa_plan_313f1f0a.plan.md`) with wiki/skills/agent workflow details; the repo does not depend on that path.

---

## Target

- **Assigner / wiki URL:** `https://winwin.travel/app/landings/en` — currently returns **404** (broken route in this environment).
- **Working EN landing (use for manual QA and Playwright):** `https://winwin.travel/landings/en/` (also reached from `https://winwin.travel/` via redirect).
- Use the working URL for stable UI unless you are explicitly testing the 404 page or until `/app/landings/en` is fixed upstream.

---

## Verbatim task text

The assigner’s full wording is in [assignment.md](assignment.md) (no duplicate here). For a short checklist, use [requirements.md](requirements.md).

**Structured summary (for quick scanning)**

- **Task 1: Header (written cases)** — See `task_1.png` for reference layout.
- **Task 2: Automation** — (1) Max adults in Guests (`task_3.png`); (2) Pets options and selected state, all weight bands + Other (`task_2.png` / advanced filters); (3) Filters change request URL (network or URL assertions; `task_2.png`).

---

## Screenshot inventory (for locators and scope)

Screenshots live in `wiki/`: `task_1.png`, `task_2.png`, `task_3.png`.

### `task_1.png` — Header and hero (desktop capture)

- **Source:** Playwright viewport screenshot (e.g. 1440×900) from the **working** EN landing above; replace by re-capturing when the UI drifts.
- **Header (white bar):** **Left:** Logo (orange icon + **winwin.travel**). **Right:** Orange CTA labeled **Get Discount** on current production (assigner copy in [requirements.md](requirements.md) still says **Get €2000 off** — same CTA *class*, possible label/campaign drift); outline icons (link, bell, thumb-up, profile); **Register** and **Sign In** (outlined).
- **Below header:** Teal hero / **banner** with imagery (e.g. hot air balloons), headline **Personalized stays are waiting** / **Try our platform**, **Ask AI** control, and the white **search** strip (location, dates, guests, quick filter chips, **Search**).

### `task_2.png` — Hero / search / filters (annotated for QA focus)

- Greeting: **Hello, Traveler**; headline **Creating new memories** (on imagery, e.g. hot air balloons).
- **Search bar (white):** location **City or Address** with chevron; dates with nights count; **Guests** showing count (e.g. **2**).
- **Quick filter chips (examples):** Free cancellation, Breakfast, Dogs allowed, Cats allowed, Total price `<€500`.
- **Settings / filter** control (sliders icon) — called out in the reference as a focus area for advanced filters.
- **Search** action: orange control with checkmark; chat affordance may appear in the corner.

### `task_3.png` — Guests modal

- Modal title **Guests**; close control (X) top-right; divider under header.
- Rows with steppers (− / value / +):
  - **Adults** — “Ages 18 or above”; example state **2**.
  - **Children** — “Under 18 years”; example **0** (minus disabled at 0).
  - **Pets** — example **0** (minus disabled at 0).
- Full-width orange **Confirm** at the bottom.
- Layout: Adults and Children side-by-side; Pets on a second row (under Adults).

---

## Planning notes (for automation, not test code)

- **Task 1** may be delivered as written cases (markdown/wiki) while **Task 2** is Playwright; confirm with the assigner if 100% automation is required for Task 1.
- **Max adults:** treat as a boundary test — discover the product maximum from the UI/API, then assert behavior at the ceiling.
- **Pets:** weight bands may appear under advanced filters (settings) rather than only on quick chips; confirm on the live DOM before locking locators.
- **Filters → request:** assert URL query parameters and/or intercepted network requests, not only visible UI.
- **Stability / i18n:** URL uses `/en`; prefer role/semantic locators; avoid brittle copy where labels may change.
- **MCP vs repo tests:** browser MCP is for exploration; committed `tests/` + CI are the regression source of truth.

---

*Last updated: 2026-04 — aligned with [assignment.md](assignment.md), [requirements.md](requirements.md), refreshed `task_1.png`, and live behavior on `winwin.travel/landings/en/`.*
