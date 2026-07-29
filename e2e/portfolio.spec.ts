import { test, expect } from '@playwright/test';

test('renders the production portfolio shell instead of the Angular starter page', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByTestId('portfolio-page')).toBeVisible();
  await expect(page.getByText('Congratulations! Your app is running.')).toHaveCount(0);
});

test('loads Case Studies content from runtime JSON', async ({ page }) => {
  await page.goto('/');

  const grid = page.getByTestId('work-card-grid');
  await expect(grid).toBeVisible();
  await expect(page.getByTestId('work-card-mqtt-align')).toBeVisible();
});

test('loads MOD-W content from runtime JSON', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('modw-section')).toContainText('MOD-W');
  await expect(page.getByTestId('modw-principle-role-separation')).toBeVisible();
});

test('communicates first-screen clarity: identity, positioning, stack, and availability', async ({
  page,
}) => {
  await page.goto('/');

  const hero = page.getByTestId('hero-section');
  await expect(hero.getByRole('heading', { level: 1, name: 'Frank McGuire' })).toBeVisible();
  await expect(hero).toContainText('Angular');
  await expect(hero).toContainText('TypeScript');

  const strip = page.getByTestId('hero-availability-strip');
  await expect(strip).toContainText('Full-time');
  await expect(strip).toContainText('Freelance');
  await expect(strip).toContainText('Germany');
});

test('anchor nav reaches Case Studies and MOD-W sections', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('nav-link-work').click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByTestId('nav-link-modw').click();
  await expect(page).toHaveURL(/#modw$/);
});

test('mobile menu opens, exposes nav links, and closes after selecting one', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');

  await page.getByTestId('nav-mobile-toggle').click();
  const mobileMenu = page.getByTestId('nav-mobile-menu');
  await expect(mobileMenu).toBeVisible();

  await mobileMenu.getByRole('link', { name: 'Case Studies' }).click();
  await expect(mobileMenu).toBeHidden();
});
