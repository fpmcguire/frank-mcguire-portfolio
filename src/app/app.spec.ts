import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('renders the production portfolio shell instead of the Angular starter content', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('[data-testid="portfolio-page"]')).toBeTruthy();
    expect(compiled.textContent).not.toContain('Congratulations! Your app is running.');
  });

  it('renders the decorative background layers hidden from assistive technology', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const background = compiled.querySelector('[data-testid="page-background"]');
    expect(background?.getAttribute('aria-hidden')).toBe('true');
    expect(compiled.querySelector('[data-testid="page-background-glow"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="page-background-grid"]')).toBeTruthy();
  });
});
