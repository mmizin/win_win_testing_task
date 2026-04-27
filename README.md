# win_win_testing_task

QA work for **[WinWin.travel](https://winwin.travel/)**: hand-written test cases in the wiki, **Playwright** automation in `tests/`, and notes that keep humans and tools aligned (see [ARCHITECTURE.md](ARCHITECTURE.md) for layout and stack).

---

## What’s in the repo (so far)

### Task 1 — Header: manual test cases

The first deliverable is a **full set of written cases** for the public landing **header** on **desktop and mobile**—visibility, key controls (logo, “Get Discount”, register/sign-in, mobile menu), and how they were derived (equivalence, boundaries, state transitions, decision table, and exploratory where noted).

**Read the spec here:** [Header test cases (Task 1 — wiki)](wiki/header-test-cases.md)

That document ties back to the assignment, requirements, and the correct base URL for runs (the assignee path can 404—details are in [Requirements](wiki/requirements.md)).

**Also useful:** [Assignment (verbatim)](wiki/assignment.md) · [Requirements](wiki/requirements.md)

---

## Run the automated tests (Playwright)

You need [Node.js](https://nodejs.org/) (LTS is fine). From the repo root:

1. **Dependencies**

   ```bash
   npm install
   ```

2. **Browsers** (first time, or after upgrading `@playwright/test`)

   ```bash
   npx playwright install
   ```

3. **Execute the suite**

   ```bash
   npx playwright test
   ```

**Handy extras**

- Interactive runner: `npx playwright test --ui`  
- One browser only: `npx playwright test --project=chromium`  
- Open the last HTML report: `npx playwright show-report`  

Specs are under `tests/`; shared settings are in `playwright.config.ts`. When you want every test to use the same host, set `use.baseURL` there and align it with the working landing URL in [requirements](wiki/requirements.md).
