import { test, expect } from '@playwright/test';

test('renders the portfolio starter page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Frank McGuire Portfolio/);
  await expect(page.getByRole('heading', { name: 'Hello, frank-mcguire-portfolio' })).toBeVisible();
  await expect(page.getByText('Congratulations! Your app is running.')).toBeVisible();
});
