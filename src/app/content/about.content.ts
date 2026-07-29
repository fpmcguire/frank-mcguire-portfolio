export interface AboutMetaItem {
  readonly id: string;
  readonly label: string;
  readonly value: string;
}

export interface AboutContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly narrative: readonly string[];
  readonly meta: readonly AboutMetaItem[];
}

export const ABOUT_CONTENT = {
  eyebrow: '04 — About',
  title: 'A senior engineer who ships.',
  narrative: [
    'Frank McGuire is a Senior Frontend Engineer based in Germany, with 12+ years of modern frontend development across logistics, travel, e-commerce, IoT / industrial automation, and real-time SaaS dashboards. Angular and TypeScript are primary strengths, with supporting experience in Vue, Nuxt, and React.',
    'Earlier work spanned digital media, internet curricula, and generative / computational design, alongside mentoring and technical teaching — a long practice of adapting to new tools without losing engineering discipline.',
    'That discipline now extends to AI-assisted development through MOD-W, a human-in-the-loop methodology Frank authored and uses on his own Angular and SaaS projects.',
  ],
  meta: [
    { id: 'experience', label: 'Experience', value: '12+ years frontend' },
    { id: 'frameworks', label: 'Frameworks', value: 'Angular · Vue · Nuxt · React' },
    { id: 'domains', label: 'Domains', value: 'Logistics · Travel · E-commerce · IoT · SaaS' },
    { id: 'based-in', label: 'Based in', value: 'Germany · Remote / EU' },
  ],
} as const satisfies AboutContent;
