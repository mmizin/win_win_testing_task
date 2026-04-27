# Task 1 — Header test cases (written)

**Source:** [assignment.md](assignment.md), visual reference [task_1.png](task_1.png), target [WinWin landing EN](https://winwin.travel/app/landings/en).

**Technique key:** EP — equivalence partitioning; BVA — boundary value analysis; ST — state transition; DG — error guessing / exploratory.

| id | scenario | preconditions | steps | data | expected | technique | risk |
|----|----------|---------------|-------|------|----------|-----------|------|
| H-01 | Logo visible and navigates home (or defined target) | On landing EN | Open landing; observe header left; activate logo/link | — | Logo (icon + wordmark) visible; follow link lands on expected route (product-defined home or same locale root) | EP | medium |
| H-02 | “Get €2000 off” CTA visible and actionable | On landing EN | Locate orange CTA in header; check focus/hover if applicable; activate control | — | CTA label matches requirement copy; control is enabled; activation opens target offer flow or URL without console errors | EP | medium |
| H-03 | Utility icons row present | On landing EN | Identify outline icons (e.g. link, bell, thumb-up, profile per reference) | — | Expected icons visible in header; each has accessible name or tooltip consistent with purpose | EP | low |
| H-04 | Register opens sign-up | Logged out | Click **Register** | — | Sign-up flow or modal appears; URL or UI state reflects registration entry | ST | medium |
| H-05 | Sign In opens auth | Logged out | Click **Sign In** | — | Sign-in flow or modal appears; URL or UI state reflects authentication entry | ST | medium |
| H-06 | Header layout at desktop viewport | Viewport ≥ reference width | Resize to large desktop; observe header | width at or above design breakpoint | Primary header actions remain visible without overlap; no horizontal scroll for header row | BVA | low |
| H-07 | Header on narrow viewport | Small mobile width | Resize to minimum supported width | narrow width | Critical actions remain reachable (menu overflow or icon menu if product uses it); no silent loss of Register/Sign In | BVA | high |
| H-08 | Keyboard reach order | Keyboard only | Tab through header controls | — | Focus order logical; visible focus; activatable with Enter/Space per control type | DG | medium |

**Notes**

- Exact post-click URLs for logo and **Get €2000 off** should be recorded from live behavior and treated as **baseline oracles** (they may change by campaign).
- If icons are purely decorative, expect **screen reader** behavior per implementation (hidden vs labeled) — confirm against accessibility intent.
