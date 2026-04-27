# MCP exploration vs committed Playwright tests

| Layer | Use for |
|-------|--------|
| **MCP browser** (or IDE browser tools) | One-off exploration, locator candidates, screenshots, reproducing a bug, confirming DOM after deploy. |
| **`@playwright/test` in repo** | Regression automation, CI, trace artifacts on failure, repeatable assertions. |

**Rule of thumb:** if it must run the same tomorrow in CI, it belongs in committed tests — when the team has scoped implementation work. Documentation-only phases still use MCP to **inform** written cases and wiki updates.
