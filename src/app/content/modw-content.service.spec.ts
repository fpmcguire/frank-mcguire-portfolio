import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ModwContent } from './modw-content.model';
import { ModwContentService } from './modw-content.service';

const VALID_MODW_CONTENT: ModwContent = {
  eyebrow: '03 — Methodology',
  title: 'Moderated AI Development Workflow (MOD-W)',
  summary: 'Source-safe summary text.',
  repositoryHref: 'https://github.com/fpmcguire/moderated-ai-development-workflow',
  consultingHref: '#contact',
  principles: [{ id: 'role-separation', title: 'Role separation', summary: 'Summary.' }],
};

describe('ModwContentService', () => {
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

  it('exposes a ready state with the parsed MOD-W content on successful load', () => {
    const service = TestBed.inject(ModwContentService);

    httpMock.expectOne('/content/modw.json').flush(VALID_MODW_CONTENT);

    expect(service.state()).toEqual({
      status: 'ready',
      data: VALID_MODW_CONTENT,
      error: null,
    });
  });

  it('exposes an empty state when there are no principles', () => {
    const service = TestBed.inject(ModwContentService);
    const emptyContent: ModwContent = { ...VALID_MODW_CONTENT, principles: [] };

    httpMock.expectOne('/content/modw.json').flush(emptyContent);

    expect(service.state()).toEqual({ status: 'empty', data: emptyContent, error: null });
  });

  it('exposes a source-safe error state when the response is malformed', () => {
    const service = TestBed.inject(ModwContentService);

    httpMock.expectOne('/content/modw.json').flush({ title: 'Incomplete' });

    const state = service.state();
    expect(state.status).toBe('error');
    expect(state.error).toBe('MOD-W content could not be loaded right now.');
  });

  it('exposes a source-safe error state when the request fails', () => {
    const service = TestBed.inject(ModwContentService);

    httpMock.expectOne('/content/modw.json').flush('failure', {
      status: 500,
      statusText: 'Server Error',
    });

    const state = service.state();
    expect(state.status).toBe('error');
    expect(state.error).toBe('MOD-W content could not be loaded right now.');
  });
});
