export interface AvailabilitySignal {
  readonly label: string;
  readonly value: string;
  readonly isOpen: boolean;
}

export interface HeroCta {
  readonly label: string;
  readonly href: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  readonly name: string;
  readonly lead: string;
  readonly primaryCta: HeroCta;
  readonly secondaryCta: HeroCta;
  readonly availability: readonly AvailabilitySignal[];
}

export const HERO_CONTENT = {
  eyebrow: 'Available for relevant full-time and freelance conversations',
  name: 'Frank McGuire',
  lead: 'Senior Frontend Engineer and Frontend Consultant building complex Angular and TypeScript applications, with supporting Vue and React experience — and author of MOD-W.',
  primaryCta: { label: 'View Case Studies', href: '#work' },
  secondaryCta: { label: 'The MOD-W Method', href: '#modw' },
  availability: [
    { label: 'Full-time', value: 'Open', isOpen: true },
    { label: 'Freelance', value: 'Open', isOpen: true },
    { label: 'Location', value: 'Germany · Remote / EU', isOpen: false },
    { label: 'Stack', value: 'Angular · TypeScript · Vue · React', isOpen: false },
    { label: 'MOD-W', value: 'Author', isOpen: false },
  ],
} as const satisfies HeroContent;
