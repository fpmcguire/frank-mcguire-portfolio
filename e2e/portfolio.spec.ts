import { test, expect } from '@playwright/test';

const NON_BREAKING_MODW = 'MOD\u2011W';

test('renders the production portfolio shell instead of the Angular starter page', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByTestId('portfolio-page')).toBeVisible();
  await expect(page.getByText('Congratulations! Your app is running.')).toHaveCount(0);
});

test('loads Case Studies content from runtime JSON with all mandatory launch titles visible', async ({
  page,
}) => {
  await page.goto('/');

  const grid = page.getByTestId('work-card-grid');
  await expect(grid).toBeVisible();

  const mandatoryLaunchIds = [
    'mqtt-align',
    'agv-fleet-simulator',
    'bio-align',
    'angular-design-patterns',
    'paki',
    'travel-it',
    'kaufland',
  ];
  for (const id of mandatoryLaunchIds) {
    await expect(page.getByTestId(`work-card-${id}`)).toBeVisible();
  }
});

test('each case-study card shows classification, status, evidence, and technologies', async ({
  page,
}) => {
  await page.goto('/');

  const card = page.getByTestId('work-card-mqtt-align');
  await expect(card.getByTestId('work-card-mqtt-align-classification')).toContainText(
    'Independent Product',
  );
  await expect(card.getByTestId('work-card-mqtt-align-status')).toContainText(
    'Private / Proprietary',
  );
  await expect(card.getByTestId('work-card-mqtt-align-evidence')).toBeVisible();
  await expect(card.getByTestId('work-card-mqtt-align-technologies')).toBeVisible();
  await expect(card.getByTestId('work-card-mqtt-align-modw-relevance')).toBeVisible();
});

test('loads MOD-W content from runtime JSON, including roles and project evidence', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByTestId('modw-section')).toContainText(NON_BREAKING_MODW);
  await expect(page.getByTestId('modw-principle-role-separation')).toBeVisible();
  await expect(page.getByTestId('modw-role-moderator')).toBeVisible();
  await expect(page.getByTestId('modw-project-evidence-mqtt-align')).toBeVisible();
});

test('MOD-W repository and consulting CTAs are visible with correct hrefs', async ({ page }) => {
  await page.goto('/');

  const repositoryCta = page.getByTestId('modw-repository-cta');
  await expect(repositoryCta).toBeVisible();
  await expect(repositoryCta).toHaveAttribute(
    'href',
    'https://github.com/fpmcguire/moderated-ai-development-workflow',
  );
  await expect(repositoryCta).toHaveAttribute('target', '_blank');

  const consultingCta = page.getByTestId('modw-consulting-cta');
  await expect(consultingCta).toBeVisible();
  await expect(consultingCta).toHaveAttribute('href', '#contact');
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
