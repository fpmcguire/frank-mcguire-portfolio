import { isRecord } from '../content/json-validation.util';

export const ANALYTICS_CONSENT_STATES = ['unknown', 'accepted', 'rejected'] as const;

export type AnalyticsConsentState = (typeof ANALYTICS_CONSENT_STATES)[number];

export const ANALYTICS_CONSENT_RECORD_VERSION = 1;

export interface AnalyticsConsentRecord {
  readonly version: 1;
  readonly state: Exclude<AnalyticsConsentState, 'unknown'>;
  readonly decidedAt: string;
}

export function isAnalyticsConsentRecord(value: unknown): value is AnalyticsConsentRecord {
  return (
    isRecord(value) &&
    value['version'] === ANALYTICS_CONSENT_RECORD_VERSION &&
    (value['state'] === 'accepted' || value['state'] === 'rejected') &&
    typeof value['decidedAt'] === 'string'
  );
}
