import { Injectable, effect, inject } from '@angular/core';

import { ANALYTICS_CONFIG } from './analytics.config';
import { AnalyticsConsentService } from './analytics-consent.service';
import { AnalyticsEventName, AnalyticsEventParams } from './analytics-event.model';

type GtagFn = (...args: unknown[]) => void;

interface GtagWindow extends Window {
  dataLayer?: unknown[];
  gtag?: GtagFn;
}

const GA_SCRIPT_MARKER = 'data-ga-script';

/**
 * The only place allowed to touch `gtag`/GA script loading. Reacts to
 * AnalyticsConsentService's state so both a fresh accept and a returning
 * visitor with an already-accepted record load GA the same way.
 */
@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  private readonly config = inject(ANALYTICS_CONFIG);
  private readonly consent = inject(AnalyticsConsentService);

  private scriptInjected = false;

  constructor() {
    effect(() => {
      const state = this.consent.state();
      if (state === 'accepted') {
        this.initialize();
      } else if (state === 'rejected') {
        this.cleanupGaCookies();
      }
    });
  }

  trackPageView(path: string, title: string): void {
    if (!this.canTrack()) {
      return;
    }

    this.gtag('event', 'page_view', { page_path: path, page_title: title });
  }

  trackEvent(eventName: AnalyticsEventName, params?: AnalyticsEventParams): void {
    if (!this.canTrack()) {
      return;
    }

    this.gtag('event', eventName, params ?? {});
  }

  private canTrack(): boolean {
    return (
      this.consent.state() === 'accepted' &&
      this.config.measurementId.length > 0 &&
      typeof window !== 'undefined'
    );
  }

  private initialize(): void {
    if (
      this.config.measurementId.length === 0 ||
      typeof document === 'undefined' ||
      typeof window === 'undefined'
    ) {
      return;
    }

    if (this.scriptInjected || document.head.querySelector(`script[${GA_SCRIPT_MARKER}]`)) {
      return;
    }

    this.scriptInjected = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.measurementId}`;
    script.setAttribute(GA_SCRIPT_MARKER, 'true');
    document.head.appendChild(script);

    const win = window as GtagWindow;
    win.dataLayer = win.dataLayer ?? [];
    // Push the real `arguments` object, matching Google's own gtag.js snippet
    // (`function(){dataLayer.push(arguments)}`) exactly, rather than a plain
    // array — observed in practice to matter for how reliably gtag.js
    // actually dispatches, not just how the call looks.
    win.gtag = function (this: void): void {
      const layer = win.dataLayer as { push: (entry: unknown) => number } | undefined;
      // eslint-disable-next-line prefer-rest-params
      layer?.push(arguments);
    };

    win.gtag('js', new Date());
    win.gtag('config', this.config.measurementId, { send_page_view: false });

    const path = typeof location !== 'undefined' ? location.pathname : '/';
    const title = typeof document !== 'undefined' ? document.title : '';
    this.trackPageView(path, title);
  }

  private gtag(...args: unknown[]): void {
    const win = window as GtagWindow;
    win.gtag?.(...args);
  }

  private cleanupGaCookies(): void {
    if (typeof document === 'undefined' || !document.cookie) {
      return;
    }

    const host = typeof location !== 'undefined' ? location.hostname : '';
    const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';

    for (const entry of document.cookie.split('; ')) {
      const name = entry.split('=')[0]?.trim();
      if (!name || (name !== '_ga' && !name.startsWith('_ga_'))) {
        continue;
      }

      document.cookie = `${name}=; expires=${expires}; path=/;`;
      if (host) {
        document.cookie = `${name}=; expires=${expires}; path=/; domain=${host};`;
        document.cookie = `${name}=; expires=${expires}; path=/; domain=.${host};`;
      }
    }
  }
}
