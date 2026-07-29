import { ContactPath } from './contact-path.model';

export const CONTACT_PROFILE_LINK_IDS = ['email', 'linkedin', 'github'] as const;

export type ContactProfileLinkId = (typeof CONTACT_PROFILE_LINK_IDS)[number];

export interface ContactProfileLink {
  readonly id: ContactProfileLinkId;
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
}

export interface ContactContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly email: string;
  readonly paths: readonly ContactPath[];
  readonly profileLinks: readonly ContactProfileLink[];
  readonly guidance: string;
}

const EMAIL = 'fpmcguire@gmail.com';

export const CONTACT_CONTENT = {
  eyebrow: '05 — Contact',
  title: "Let's build something.",
  summary: 'Available for relevant full-time and freelance conversations.',
  email: EMAIL,
  paths: [
    {
      id: 'full-time',
      eyebrow: 'Full-time',
      title: 'Hire me on your team',
      description: 'Senior Frontend Engineer roles, remote or hybrid, Germany / EU.',
      ctaLabel: 'Email about a role',
      mailtoSubject: 'Full-time role inquiry',
      mailtoBody: 'Hi Frank,\n\nRole title and company:\n',
    },
    {
      id: 'freelance',
      eyebrow: 'Freelance',
      title: 'Start a project',
      description: 'B2B freelance contracts, delivered independently or embedded with your team.',
      ctaLabel: 'Discuss a contract',
      mailtoSubject: 'Freelance project inquiry',
      mailtoBody: 'Hi Frank,\n\nScope, timeline, stack, and engagement model:\n',
    },
  ],
  profileLinks: [
    { id: 'email', label: EMAIL, href: `mailto:${EMAIL}`, external: false },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/frank-mcguire-06b6ba1',
      external: true,
    },
    { id: 'github', label: 'GitHub', href: 'https://github.com/fpmcguire', external: true },
  ],
  guidance:
    'For full-time roles, include role title and company. For freelance inquiries, include scope, timeline, stack, and engagement model.',
} as const satisfies ContactContent;
