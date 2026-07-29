import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

import { ContentLoadState } from './content-load-state.model';
import { ModwContent, isModwContent } from './modw-content.model';

const MODW_CONTENT_URL = '/content/modw.json';

@Injectable({ providedIn: 'root' })
export class ModwContentService {
  private readonly http = inject(HttpClient);

  readonly state = signal<ContentLoadState<ModwContent>>({
    status: 'loading',
    data: null,
    error: null,
  });

  constructor() {
    this.http
      .get<unknown>(MODW_CONTENT_URL)
      .pipe(
        catchError(() => {
          this.state.set({
            status: 'error',
            data: null,
            error: 'MOD-W content could not be loaded right now.',
          });
          return of(null);
        }),
      )
      .subscribe((response) => {
        if (response === null) {
          return;
        }

        if (!isModwContent(response)) {
          this.state.set({
            status: 'error',
            data: null,
            error: 'MOD-W content could not be loaded right now.',
          });
          return;
        }

        this.state.set(
          response.principles.length === 0
            ? { status: 'empty', data: response, error: null }
            : { status: 'ready', data: response, error: null },
        );
      });
  }
}
