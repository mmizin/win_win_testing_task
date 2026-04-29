import { test as base } from '@playwright/test';
import { pagesFixture } from './pages.fixture';
import type { PagesFixtures } from './pages.fixture';

export const test = base.extend<PagesFixtures>(pagesFixture);

export const expect = test.expect;

export type { AppPages, PagesFixtures } from './pages.fixture';
