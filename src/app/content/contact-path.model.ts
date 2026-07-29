export const CONTACT_PATH_IDS = ['full-time', 'freelance'] as const;

export type ContactPathId = (typeof CONTACT_PATH_IDS)[number];

export interface ContactPath {
  readonly id: ContactPathId;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
  readonly mailtoSubject: string;
  readonly mailtoBody: string;
}

export function buildMailtoHref(
  email: string,
  path: Pick<ContactPath, 'mailtoSubject' | 'mailtoBody'>,
): string {
  const subject = encodeURIComponent(path.mailtoSubject);
  const body = encodeURIComponent(path.mailtoBody);
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
