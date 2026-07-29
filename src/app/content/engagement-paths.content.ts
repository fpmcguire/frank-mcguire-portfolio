import { EngagementPath } from './engagement-path.model';

export const ENGAGEMENT_PATHS = [
  {
    id: 'full-time',
    eyebrow: 'Full-time',
    title: 'Senior Frontend Engineer',
    description:
      'Available for full-time remote or hybrid roles in Germany and the EU, owning frontend architecture and delivery.',
  },
  {
    id: 'freelance',
    eyebrow: 'Freelance',
    title: 'Frontend Consultant',
    description:
      'Available for B2B freelance contracts, delivering independently or embedded with an existing team.',
  },
  {
    id: 'advisory',
    eyebrow: 'Advisory',
    title: 'MOD-W Training & Consulting',
    description: 'Setup, training, and consulting support for teams adopting the MOD-W workflow.',
  },
] as const satisfies readonly EngagementPath[];
