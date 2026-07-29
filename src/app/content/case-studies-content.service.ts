import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

import { CaseStudy, isCaseStudyArray } from './case-study.model';
import { ContentLoadState } from './content-load-state.model';

const CASE_STUDIES_URL = '/content/case-studies.json';

@Injectable({ providedIn: 'root' })
export class CaseStudiesContentService {
  private readonly http = inject(HttpClient);

  readonly state = signal<ContentLoadState<CaseStudy[]>>({
    status: 'loading',
    data: null,
    error: null,
  });

  constructor() {
    this.http
      .get<unknown>(CASE_STUDIES_URL)
      .pipe(
        catchError(() => {
          this.state.set({
            status: 'error',
            data: null,
            error: 'Case studies could not be loaded right now.',
          });
          return of(null);
        }),
      )
      .subscribe((response) => {
        if (response === null) {
          return;
        }

        if (!isCaseStudyArray(response)) {
          this.state.set({
            status: 'error',
            data: null,
            error: 'Case studies could not be loaded right now.',
          });
          return;
        }

        this.state.set(
          response.length === 0
            ? { status: 'empty', data: response, error: null }
            : { status: 'ready', data: response, error: null },
        );
      });
  }
}
