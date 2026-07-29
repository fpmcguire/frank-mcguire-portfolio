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
