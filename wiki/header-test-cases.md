# Task 1 — Header test cases (written)

**Source:** [assignment.md](assignment.md), [requirements.md](requirements.md) (target URLs and scope).
**Target (assignee / wiki):** `https://winwin.travel/app/landings/en` (404 today — use the working base URL in [requirements.md](requirements.md) for runs).
**Test design follow-up:** [test-design-for-automation](../.cursor/skills/test-design-for-automation/SKILL.md). Each case lists the **technique(s)** used; names below match common ISTQB-style terminology.

**Core techniques (short reference):**

- **Equivalence partitioning (EP)** — Inputs grouped into partitions (valid vs invalid regions); assume similar behavior inside a partition so one representative case per partition suffices.
- **Boundary value analysis (BVA)** — Probe min, max, and values just inside/outside boundaries; defects cluster at edges.
- **Decision table testing** — Tabulate combinations of inputs (conditions) and expected outputs (actions); good for branching rules across surfaces (e.g. header vs menu vs footer).
- **State transition testing** — Exercises lawful moves between UI states (e.g. closed menu → open panel → focused control → modal).
- **Error guessing** — Experience-based guesses at weak spots (a11y, focus traps, edge interactions); not deterministic like EP/BVA.
- **Pairwise testing** — Covers pairs of independent parameters instead of exhaustive combinations; reduces runs when dimensions multiply (e.g. viewport × placement × campaign).
- **Use case testing** — Derives cases from realistic user goals (e.g. “get discount”, “sign in from header vs from mobile menu”).

**Mapping (this doc):**

| Technique | Case IDs (primary / secondary) |
|-----------|--------------------------------|
| EP | H-01–H-03, H-13 |
| BVA | H-06, H-11 |
| Decision table | H-13 |
| State transition testing | **H-04–H-05**, **H-08–H-09** (auth); **H-10** (menu open/close); **H-12** (Esc, focus in panel) |
| Error guessing | H-07, H-12 |
| Pairwise (optional reduction) | **Notes** (automation sizing; complements **H-13**) |
| Use case | H-02, H-04–H-05, H-08–H-10, H-13 |

**Platforms:** **Desktop** cases use a wide viewport (header controls on the top bar, per live EN landing). **Mobile** cases use a narrow viewport and the **Open mobile menu** path — they are separate cases, not branches inside a desktop test.

## URL and baselines (verified prod, 2026-04)

- **Canonical URLs:** see **Target URLs** in [requirements.md](requirements.md).
- **Assigner path** `https://winwin.travel/app/landings/en` — in production this route **often returns 404** (not-found UX); do not use it as the default automation entry unless you are testing that route.
- **Working EN landing** — `https://winwin.travel/landings/en/` (entry `https://winwin.travel/` typically redirects into this flow).
- **Baseline for execution:** use the working landing unless the case explicitly targets the assigner URL / 404 behavior.

**Header (desktop, live EN landing):** logo; primary orange CTA (**Get Discount** on current prod — campaign label may differ; oracle in each case); utility icons; **Register** and **Sign In** on the header row. **Mobile:** use **Open mobile menu** for auth and other overflow items in the slide-out **Menu** panel.

---

## Test cases: desktop (wide viewport)

Use a fixed width at or above the product desktop breakpoint (e.g. **≥ 1280px**) so **Sign In** and **Register** must appear in the **header** — the case **fails** if they are missing (layout defect, wrong URL, or wrong environment).

### H-01 — Logo: visibility and home/locale entry

- **Preconditions:** EN landing open (`/landings/en/` or equivalent); desktop width; logged-in state optional.
- **Steps:** In the top bar, find the **winwin.travel** brand (icon + text); optional: click the logo.
- **Data:** *None.*  
- **Expected:** Branding is visible; logo is focusable/clickable; destination matches agreed baseline (same locale, home, or app root — record URL).
- **Technique:** Equivalence partitioning (EP)  
- **Risk:** medium

### H-02 — Primary header CTA (**Get Discount**)

- **Preconditions:** Not logged in; campaign available; desktop width.
- **Steps:** Find the main **orange** CTA in the header; assert visible/accessible name is **Get Discount** (per [requirements.md](requirements.md) / live site); click; record final URL or view.
- **Data:** *None.*  
- **Expected:** Label is **Get Discount**; control enabled; no unhandled client error; navigation or flow starts (modal/route); store URL/view as regression baseline if copy changes in a later release.
- **Technique:** Equivalence partitioning (EP); use case testing  
- **Risk:** high

### H-03 — Utility icons (link, notifications, social/like, account shell)

- **Preconditions:** EN landing; desktop width; same view as H-01–H-02.
- **Steps:** Locate the icon row in the header (link, bell, “thumb”/feedback, user/profile). Hover or focus if tooltips/labels are used; click each *only* if the product may navigate (or stub no-op) — at minimum verify presence and any name where required.
- **Data:** *None.*  
- **Expected:** All expected utility affordances are visible; each has a consistent role/label; no crash on interaction per product design (notifications may be empty/disabled in some sessions).
- **Technique:** Equivalence partitioning (EP)  
- **Risk:** medium

### H-04 — **Sign In** (desktop: header)

- **Preconditions:** Logged out; **desktop** viewport (e.g. ≥ 1280px); page must show **Sign In** on the **header** row.
- **Steps:** Click **Sign In** in the header.
- **Data:** *None.*  
- **Expected:** Sign-in experience starts (modal, overlay, or route); URL or auth UI state is assertable; no silent failure.
- **Technique:** State transition testing; equivalence partitioning (EP); use case testing  
- **Risk:** high

### H-05 — **Register** (desktop: header)

- **Preconditions:** Logged out; **desktop** viewport; page must show **Register** on the **header** row.
- **Steps:** Click **Register** in the header.
- **Data:** *None.*  
- **Expected:** Registration experience starts; behavior matches spec (inline vs new route); no silent failure.
- **Technique:** State transition testing; equivalence partitioning (EP); use case testing  
- **Risk:** high

### H-06 — Viewport: large desktop (layout: boundary value analysis)

- **Preconditions:** Window e.g. **≥ 1280px** wide; same EN URL as other desktop cases.
- **Steps:** Load landing; in one pass, check header and first hero row: logo, CTA, icons, **Register** / **Sign In** on the **header** (no hamburger required for primary auth on this width).
- **Data:** width at or above the chosen desktop break-point.  
- **Expected:** **Sign In** and **Register** are **visible in the header**; no overlapping controls; no horizontal scroll of the top bar; primary CTA usable.
- **Technique:** Boundary value analysis (BVA)  
- **Risk:** low

### H-07 — Keyboard and focus (desktop header)

- **Preconditions:** Keyboard only (no pointer); **desktop** viewport.
- **Steps:** Tab / Shift+Tab through the **header**; activate **Sign In** / **Register** / CTA with **Enter** or **Space** as applicable.
- **Data:** *None.*  
- **Expected:** Focus order is logical; focus is visible; header controls are activatable.
- **Technique:** Error guessing (experience-based)  
- **Risk:** medium

---

## Test cases: mobile (narrow viewport)

Use a fixed **narrow** width (e.g. **≤ 390px** or the product’s documented mobile break-point). Open **Open mobile menu** before **Sign In** / **Register** if those controls are not on the top bar. These are **separate** cases from the desktop header tests (H-04, H-05); run them in a **narrow** project, not as branches of H-04/H-05.

### H-08 — **Sign In** (mobile: via **Open mobile menu**)

- **Preconditions:** Logged out; **mobile** width (e.g. ≤ 390px); **Open mobile menu** is used for auth on this width.
- **Steps:** Open **Open mobile menu**; in the panel, click **Sign In**.
- **Data:** *None.*  
- **Expected:** Sign-in experience starts; URL or auth UI state is assertable; no silent failure.
- **Technique:** State transition testing; equivalence partitioning (EP); use case testing  
- **Risk:** high

### H-09 — **Register** (mobile: via **Open mobile menu**)

- **Preconditions:** Logged out; **mobile** width; **Open mobile menu** is used for auth on this width.
- **Steps:** Open **Open mobile menu**; in the panel, click **Register**.
- **Data:** *None.*  
- **Expected:** Registration experience starts; no silent failure.
- **Technique:** State transition testing; equivalence partitioning (EP); use case testing  
- **Risk:** high

### H-10 — **Open mobile menu**: panel open / close; overflow items

- **Preconditions:** **Mobile** width (or any width where **Open mobile menu** is shown).
- **Steps:** With menu **closed**, open **Open mobile menu**; confirm panel (e.g. **Menu**). Briefly check **Account**, **Share**, **Notifications** (state may be disabled). Close via **Close** or the same control.
- **Data:** *None.*  
- **Expected:** **Open** → panel visible, no double-scroll trap; **Closed** → overlay gone, page usable; actions do not throw unhandled errors.
- **Technique:** State transition testing; use case testing  
- **Risk:** high

### H-11 — Viewport: small mobile (layout: boundary value analysis)

- **Preconditions:** Window e.g. **≤ 390px** (or minimum supported width).
- **Steps:** Load or resize; confirm **Open mobile menu** is available; open and close the menu without a full auth flow.
- **Data:** narrow width.  
- **Expected:** **Open mobile menu** is reachable; menu panel is not clipped horizontally; no broken layout in the first screen.
- **Technique:** Boundary value analysis (BVA)  
- **Risk:** high

### H-12 — Keyboard and focus (mobile: **Open mobile menu**)

- **Preconditions:** Keyboard only; **mobile** width.
- **Steps:** Tab to **Open mobile menu**; open the panel; tab inside; activate **Sign In** / **Register** with **Enter** or **Space**; try **Esc** to close the menu.
- **Data:** *None.*  
- **Expected:** Focus order is logical; focus is visible; **Esc** closes the menu if the product supports it.
- **Technique:** Error guessing (experience-based); state transition testing (Esc / focus in panel)  
- **Risk:** medium

---

## Test cases: cross-surface (any viewport)

### H-13 — Promo / discount links (header, menu, footer) — decision coverage

- **Preconditions:** Same page; not logged in; use desktop or mobile as needed to reach each surface.
- **Steps:** List each distinct promo/discount control (header CTA, items only in the mobile menu, footer/company links). Visit each path once if in scope.
- **Data:** *None.*  
- **Expected:** Oracles are documented (same offer vs different pages); no 404/500 on allowed targets.
- **Technique:** Decision table testing; equivalence partitioning (EP); use case testing (promo journeys per surface).
- **Risk:** medium

#### H-13 — Supplement: decision sketch (readable rules)

Conditions (subset): promo lives in header row | promo only after **Open mobile menu** | promo in footer. **Expected (document per build):** each allowed path resolves without error; oracle (same modal vs landing) is stable for automation.

---

## Notes (automation and extras)

- **Locators:** Prefer `getByRole` / accessible names. Externalize the CTA string in config if copy changes.
- **Desktop vs mobile:** on a **wide** project run **H-01–H-07**; on a **narrow** project run **H-08–H-12**; run **H-13** on either or both as needed. Use two Playwright **projects** (different `viewport` / `isMobile`) if you automate.
- **Not only in the header row:** e.g. **Transition to the comparison page**, **chat**, **Ask AI** may sit on other rows; cover when the task scope includes the whole top shell, not the narrow “header bar only” slice.
- **404 assignee URL:** do not use as default `baseURL` until the route is fixed; see [requirements.md](requirements.md).
- **Locale:** IDs assume **EN**; mirror for other languages with translated copy.
- **Pairwise (parameter combinations):** for automation, if dimensions multiply (for example placement × viewport × campaign), pairwise suites can complement **H-13** after EP splits surfaces; they do not replace discrete EP/BVA layout cases (**H-06**, **H-11**) or menu state coverage (**H-10**).
