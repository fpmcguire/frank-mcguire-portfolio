import { InjectionToken } from '@angular/core';

export interface AnalyticsConfig {
  readonly measurementId: string;
  readonly consentStorageKey: string;
  readonly consentVersion: 1;
}

export const DEFAULT_ANALYTICS_CONFIG: AnalyticsConfig = {
  measurementId: 'G-MD06T4XGJJ',
  consentStorageKey: 'frank-mcguire-portfolio.analytics-consent.v1',
  consentVersion: 1,
};

export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>('ANALYTICS_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_ANALYTICS_CONFIG,
});
