import { ContactPath, buildMailtoHref } from './contact-path.model';

const FULL_TIME_PATH: ContactPath = {
  id: 'full-time',
  eyebrow: 'Full-time',
  title: 'Hire me on your team',
  description: 'Description.',
  ctaLabel: 'Email about a role',
  mailtoSubject: 'Full-time role inquiry',
  mailtoBody: 'Hi Frank,\n\nRole title and company:\n',
};

const FREELANCE_PATH: ContactPath = {
  id: 'freelance',
  eyebrow: 'Freelance',
  title: 'Start a project',
  description: 'Description.',
  ctaLabel: 'Discuss a contract',
  mailtoSubject: 'Freelance project inquiry',
  mailtoBody: 'Hi Frank,\n\nScope, timeline, stack, and engagement model:\n',
};

describe('buildMailtoHref', () => {
  it('builds a mailto href with the email address', () => {
    const href = buildMailtoHref('fpmcguire@gmail.com', FULL_TIME_PATH);

    expect(href.startsWith('mailto:fpmcguire@gmail.com?')).toBe(true);
  });

  it('percent-encodes the subject and body', () => {
    const href = buildMailtoHref('fpmcguire@gmail.com', FULL_TIME_PATH);

    expect(href).toContain(`subject=${encodeURIComponent(FULL_TIME_PATH.mailtoSubject)}`);
    expect(href).toContain(`body=${encodeURIComponent(FULL_TIME_PATH.mailtoBody)}`);
    expect(href).not.toContain(' ');
    expect(href).not.toContain('\n');
  });

  it('produces a different href for different contact paths', () => {
    const fullTimeHref = buildMailtoHref('fpmcguire@gmail.com', FULL_TIME_PATH);
    const freelanceHref = buildMailtoHref('fpmcguire@gmail.com', FREELANCE_PATH);

    expect(fullTimeHref).not.toBe(freelanceHref);
  });
});
