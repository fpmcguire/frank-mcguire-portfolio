import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CaseStudy } from './case-study.model';
import { CaseStudiesContentService } from './case-studies-content.service';

const VALID_CASE_STUDY: CaseStudy = {
  id: 'mqtt-align',
  title: 'Cavalieri Align / MQTT-Align',
  projectType: 'SaaS platform',
  classification: 'independent-product',
  status: 'private-proprietary',
  role: 'Founder / Frontend Engineer',
  summary: 'Summary text.',
  evidence: ['Evidence point.'],
  technologies: ['Angular'],
};

describe('CaseStudiesContentService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('exposes a ready state with the parsed case studies on successful load', () => {
    const service = TestBed.inject(CaseStudiesContentService);

    httpMock.expectOne('/content/case-studies.json').flush([VALID_CASE_STUDY]);

    expect(service.state()).toEqual({
      status: 'ready',
      data: [VALID_CASE_STUDY],
      error: null,
    });
  });

  it('exposes an empty state when the response is an empty array', () => {
    const service = TestBed.inject(CaseStudiesContentService);

    httpMock.expectOne('/content/case-studies.json').flush([]);

    expect(service.state()).toEqual({ status: 'empty', data: [], error: null });
  });

  it('exposes a source-safe error state when the response is malformed', () => {
    const service = TestBed.inject(CaseStudiesContentService);

    httpMock.expectOne('/content/case-studies.json').flush([{ id: 'broken' }]);

    const state = service.state();
    expect(state.status).toBe('error');
    expect(state.error).toBe('Case studies could not be loaded right now.');
  });

  it('exposes a source-safe error state when the request fails', () => {
    const service = TestBed.inject(CaseStudiesContentService);

    httpMock
      .expectOne('/content/case-studies.json')
      .flush('failure', { status: 500, statusText: 'Server Error' });

    const state = service.state();
    expect(state.status).toBe('error');
    expect(state.error).toBe('Case studies could not be loaded right now.');
  });
});
