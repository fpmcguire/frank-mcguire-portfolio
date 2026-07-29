export const ENGAGEMENT_PATH_IDS = ['full-time', 'freelance', 'advisory'] as const;

export type EngagementPathId = (typeof ENGAGEMENT_PATH_IDS)[number];

export interface EngagementPath {
  readonly id: EngagementPathId;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}
