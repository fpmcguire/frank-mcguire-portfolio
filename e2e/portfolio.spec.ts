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

test('case-study product and repository links open in a new browser tab', async ({ page }) => {
  await page.goto('/');

  const bioAlignCard = page.getByTestId('work-card-bio-align');

  const productLink = bioAlignCard.getByTestId('work-card-bio-align-product-link');
  await expect(productLink).toHaveAttribute('href', 'https://frank-mcguire.com/bio-align/');
  await expect(productLink).toHaveAttribute('target', '_blank');
  await expect(productLink).toHaveAttribute('rel', 'noopener');

  const repositoryLink = bioAlignCard.getByTestId('work-card-bio-align-repository-link');
  await expect(repositoryLink).toHaveAttribute('href', 'https://github.com/fpmcguire/bio-align');
  await expect(repositoryLink).toHaveAttribute('target', '_blank');
  await expect(repositoryLink).toHaveAttribute('rel', 'noopener');
});

test('loads MOD-W content from runtime JSON, including roles and project evidence', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByTestId('modw-section')).toContainText(NON_BREAKING_MODW);
  await expect(page.getByTestId('modw-principle-role-separation')).toBeVisible();
  await expect(page.getByTestId('modw-role-moderator')).toBeVisible();
  await expect(page.getByTestId('modw-role-designer-prototyper')).toBeVisible();
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

test('anchor nav reaches Case Studies, MOD-W, About, and Contact sections', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('nav-link-work').click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByTestId('nav-link-modw').click();
  await expect(page).toHaveURL(/#modw$/);
  await page.getByTestId('nav-link-about').click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.getByTestId('about-section')).toBeVisible();
  await page.getByTestId('nav-link-contact').click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByTestId('contact-section')).toBeVisible();
});

test('Contact section exposes both contact paths, email, LinkedIn, and GitHub', async ({
  page,
}) => {
  await page.goto('/');

  const contact = page.getByTestId('contact-section');
  await expect(contact.getByTestId('contact-path-full-time')).toBeVisible();
  await expect(contact.getByTestId('contact-path-freelance')).toBeVisible();

  const emailLink = contact.getByTestId('contact-email-link');
  await expect(emailLink).toHaveAttribute('href', 'mailto:fpmcguire@gmail.com');

  const linkedinLink = contact.getByTestId('contact-linkedin-link');
  await expect(linkedinLink).toHaveAttribute('target', '_blank');
  await expect(linkedinLink).toHaveAttribute('rel', 'noopener');

  const githubLink = contact.getByTestId('contact-github-link');
  await expect(githubLink).toHaveAttribute('target', '_blank');
  await expect(githubLink).toHaveAttribute('rel', 'noopener');
});

test('Footer renders with the MOD-W attribution', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('footer')).toContainText(NON_BREAKING_MODW);
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

test('reduced motion keeps hero, case-study, MOD-W, and contact content visible', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.getByTestId('hero-section')).toBeVisible();
  await expect(page.getByTestId('hero-section').getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByTestId('work-card-mqtt-align')).toBeVisible();
  await expect(page.getByTestId('modw-section')).toBeVisible();
  await expect(page.getByTestId('contact-section')).toBeVisible();
});

test('keyboard navigation reaches the nav, hero CTA, and a contact CTA', async ({
  page,
  browserName,
}) => {
  // WebKit's default Tab order only visits form controls, not links, matching
  // real Safari with "Full Keyboard Access" off — not an app accessibility defect.
  test.skip(browserName === 'webkit', 'WebKit does not include links in the default Tab order');

  await page.goto('/');

  // Focus the skip link directly first: WebKit does not reliably move focus
  // on the very first Tab press from a freshly-loaded page.
  await page.getByTestId('skip-link').focus();
  const seenTestIds: string[] = ['skip-link'];
  for (let i = 0; i < 60; i += 1) {
    await page.keyboard.press('Tab');
    const testId = await page.evaluate(
      () => document.activeElement?.getAttribute('data-testid') ?? null,
    );
    if (testId) {
      seenTestIds.push(testId);
    }
    if (seenTestIds.includes('contact-full-time-cta')) {
      break;
    }
  }

  expect(seenTestIds).toContain('skip-link');
  expect(seenTestIds).toContain('nav-link-work');
  expect(seenTestIds).toContain('hero-work-cta');
  expect(seenTestIds).toContain('contact-full-time-cta');
});
