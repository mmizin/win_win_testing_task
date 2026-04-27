# Task 1 — Header test cases (written)

**Source:** [assignment.md](assignment.md), [requirements.md](requirements.md), [task-context-for-automation.md](task-context-for-automation.md), visual [task_1.png](task_1.png).  
**Target (assignee / wiki):** `https://winwin.travel/app/landings/en`  
**Test design follow-up:** [test-design-for-automation](../.cursor/skills/test-design-for-automation/SKILL.md) (EP, BVA, ST, DT, DG as noted per row).

**Technique key:** **EP** — equivalence partitioning; **BVA** — boundary value analysis; **ST** — state transition; **DT** — decision table (combine conditions); **DG** — error guessing / exploratory.

## URL and baselines (live check, 2026-04)

| Item | Value |
|------|--------|
| Assignee path `/app/landings/en` | Returns **404** (page title “404 - Page Not Found”, i18n keys in body) |
| Working EN landing (redirect from `/`) | `https://winwin.travel/landings/en/` — loads hero and footer as expected |
| **Automation / manual baseline** | Use the working path above for stable UI until `/app/landings/en` is fixed, unless testing specifically tracks the 404 state |

**Observed header-related controls (EN landing, desktop width):** logo link; **Transition to the comparison page** (button + link); **Open mobile menu**; **chat button**; search row (City/Address, dates, guests, etc.). The slide-out **Menu** (after **Open mobile menu**) exposes **Sign In**, **Register**, **Get Discount** (link), **Account**, **Share**, and **Notifications** (disabled in observed session). The copy **Get €2000 off** appears as a company/footer link on the long landing page; align visual placement with [task_1.png](task_1.png) for “header CTA” vs footer.

| id | scenario | preconditions | steps | data | expected | technique | risk |
|----|----------|---------------|-------|------|----------|-----------|------|
| H-01 | Logo visible; primary navigation affordance | EN landing open (stable URL) | Open baseline URL; in first viewport, locate brand mark + wordmark; optional: activate logo link | — | **winwin.travel** (or product-defined) branding visible; logo control focusable/clickable; navigation target matches documented baseline (home, same locale, or product spec) | EP | medium |
| H-02 | **Get €2000 off** CTA: label and activation | Not logged in; campaign live | Find control whose visible/accessible name is **Get €2000 off**; activate; capture destination | — | Label matches (including **€**); control enabled; new route/modal/flow loads without unhandled client errors; URL **or** in-app state recorded as regression baseline | EP | high |
| H-03 | Header: comparison + chat + mobile entry | EN landing; desktop width | In header/shell, locate **Transition to the comparison page** and **chat button**; locate **Open mobile menu** | — | All three are visible; accessible names/roles match; comparison control navigates or opens product comparison per baseline | EP | medium |
| H-04 | **Open mobile menu** state (ST) | Same page | With menu closed, note header state; click **Open mobile menu**; observe panel; use **Close** (or toggle) | — | State **open**: panel/heading (e.g. “Menu”) present; **Sign In** and **Register** available; return to **closed** restores prior layout without stuck overlay | ST | high |
| H-05 | **Sign In** from menu | Logged out; menu open | Click **Sign In** | — | Sign-in experience starts (modal, route, or widget); no silent failure; URL or auth UI state can be asserted in automation | ST | high |
| H-06 | **Register** from menu | Logged out; menu open | Click **Register** | — | Registration experience starts; consistent with product (modal vs page); no silent failure | ST | high |
| H-07 | **Get Discount** (menu) vs **Get €2000 off** (content) | Menu open; page scrolled if needed | Compare **Get Discount** link in menu to **Get €2000 off** elsewhere; follow each if in scope | — | If both exist: each has clear label; behavior documented (same campaign vs different); no broken link | EP + DT | medium |
| H-08 | **Account** and utility actions in menu | Logged out; menu open | Activate **Account**; exercise **Share**; observe **Notifications** | — | **Account** leads to account/auth entry; **Share** does not break page; **Notifications** state (e.g. disabled) matches spec / has consistent messaging | EP | low |
| H-09 | Viewport: desktop (layout BVA) | Window wide (e.g. ≥ 1280px) | Resize to large desktop; observe header and search strip | width at/above break-point | No overlapping critical controls; horizontal scroll not required for header row; CTA/inputs usable | BVA | low |
| H-10 | Viewport: narrow (layout BVA) | Window narrow (e.g. ≤ 390px) | Resize; confirm **Open mobile menu**; open menu; reach **Sign In** and **Register** | narrow width | Auth remains reachable; no silent removal of required actions; no horizontal clip of menu panel | BVA | high |
| H-11 | Keyboard / focus (DG) | Keyboard only | Tab/shift+Tab through header and menu; activate with Enter/Space | — | Focus order logical; focus visible; controls activatable; ESC closes menu if product supports it | DG | medium |

**Notes (automation oracles)**

- **Stable selectors:** prefer roles and accessible names (`getByRole`, `getByText` for fixed copy). Record `href` or route patterns for logo, **Get €2000 off**, **Get Discount**, and comparison as **versioned baselines** (they may change by campaign or locale).
- **404 path:** if tests must use `.../app/landings/en`, add a **separate** case for “known 404” or assert redirect policy once product fixes routing.
- **Locale:** this table targets **EN**; other locales need mirrored IDs with locale-specific strings.
