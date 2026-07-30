import { Injectable, inject, signal } from '@angular/core';

import { ANALYTICS_CONFIG } from './analytics.config';
import {
  AnalyticsConsentRecord,
  AnalyticsConsentState,
  isAnalyticsConsentRecord,
} from './analytics-consent.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsConsentService {
  private readonly config = inject(ANALYTICS_CONFIG);

  readonly state = signal<AnalyticsConsentState>(this.readStoredState());
  readonly isSettingsOpen = signal(false);

  accept(): void {
    this.persist('accepted');
  }

  reject(): void {
    this.persist('rejected');
  }

  openSettings(): void {
    this.isSettingsOpen.set(true);
  }

  closeSettings(): void {
    this.isSettingsOpen.set(false);
  }

  private persist(state: Exclude<AnalyticsConsentState, 'unknown'>): void {
    const record: AnalyticsConsentRecord = {
      version: this.config.consentVersion,
      state,
      decidedAt: new Date().toISOString(),
    };

    try {
      const storage = this.getStorage();
      storage.setItem(this.config.consentStorageKey, JSON.stringify(record));
    } catch {
      // Best-effort persistence only — the signal below still reflects the
      // choice for the remainder of this visit even if storage is blocked.
    }

    this.state.set(state);
    this.isSettingsOpen.set(false);
  }

  private readStoredState(): AnalyticsConsentState {
    try {
      const storage = this.getStorage();
      const raw = storage.getItem(this.config.consentStorageKey);
      if (raw === null) {
        return 'unknown';
      }

      const parsed: unknown = JSON.parse(raw);
      return isAnalyticsConsentRecord(parsed) ? parsed.state : 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private getStorage(): Storage {
    if (typeof window === 'undefined') {
      return this.createMemoryStorage();
    }

    try {
      const storage = window.localStorage;
      if (storage) {
        return storage;
      }
    } catch {
      // Fall back to memory storage in privacy-restricted or non-browser contexts.
    }

    return this.createMemoryStorage();
  }

  private createMemoryStorage(): Storage {
    const values = new Map<string, string>();

    return {
      get length() {
        return values.size;
      },
      clear(): void {
        values.clear();
      },
      getItem(key: string): string | null {
        return values.has(key) ? (values.get(key) ?? null) : null;
      },
      key(index: number): string | null {
        return Array.from(values.keys())[index] ?? null;
      },
      removeItem(key: string): void {
        values.delete(key);
      },
      setItem(key: string, value: string): void {
        values.set(key, value);
      },
    };
  }
}
