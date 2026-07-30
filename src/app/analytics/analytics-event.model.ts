export const ANALYTICS_EVENT_NAMES = [
  'section_navigation',
  'contact_cta_click',
  'outbound_profile_click',
  'case_study_link_click',
  'modw_repository_click',
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

export type AnalyticsEventParams = Readonly<Record<string, string | number | boolean>>;
