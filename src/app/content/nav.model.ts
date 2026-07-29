export const SECTION_IDS = ['top', 'work', 'modw', 'about', 'contact'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export interface NavLink {
  readonly id: SectionId;
  readonly label: string;
  readonly href: string;
}

export const NAV_LINKS = [
  { id: 'top', label: 'Home', href: '#top' },
  { id: 'work', label: 'Case Studies', href: '#work' },
  { id: 'modw', label: 'MOD-W', href: '#modw' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const satisfies readonly NavLink[];
