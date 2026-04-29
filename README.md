# 🌎🚂🛩✈️ win_win_testing_task 🐈🐕🏨🛎

**Welcome to the QA afterparty** 🎉 — where [WinWin.travel](https://winwin.travel/) meets sharp test brains, steady Playwright runs, and docs that don’t ghost you. Stack + folders: [ARCHITECTURE.md](ARCHITECTURE.md).

*Green suite = silent fireworks. You earned the confetti.* 🎆

---

## 🔥 What’s in the repo

### 🦾 Task 1 — Header (manual cases)

First fireworks: a **full set of written cases** for the public landing **header** on **desktop and mobile** — visibility, the important controls (logo, “Get Discount”, register/sign-in, mobile menu), and the thinking behind them (equivalence, boundaries, state transitions, decision table, plus exploratory where it matters).

**Pop the cork here** 🍾 → [Header test cases (Task 1 — wiki)](wiki/header-test-cases.md)

That doc ties back to the assignment, requirements, and the **base URL that actually works** (the assignee path can 404 — spilled in [Requirements](wiki/requirements.md)).

**More fuel for the fire:** [Assignment (verbatim)](wiki/assignment.md) · [Requirements](wiki/requirements.md)

---

## 🚀 Run the automated tests (ignite Playwright)

You need [Node.js](https://nodejs.org/) (LTS is fine). From the repo root:

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Install browsers** (first run, or after upgrading `@playwright/test`)

   ```bash
   npx playwright install
   ```

3. **Run the suite** *(this is the main fuse)* 🔥

   ```bash
   npx playwright test
   ```

### 🧐 Nice to have — quick toolkit

- UI mode: `npx playwright test --ui`
- Chromium only: `npx playwright test --project=chromium`
- Last HTML report: `npx playwright show-report`

Specs live in `tests/`; shared config is `playwright.config.ts`. To pin every test to one host, set `use.baseURL` there and match the working EN home URL in [requirements](wiki/requirements.md).

---

*Safe travels. May your flakiness be zero and your reports be gorgeous.* ✨🎊
