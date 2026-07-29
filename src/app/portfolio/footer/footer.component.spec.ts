import { TestBed } from '@angular/core/testing';

import { FOOTER_CONTENT } from '../../content/footer.content';
import { FooterComponent } from './footer.component';

function createFixture() {
  TestBed.configureTestingModule({ imports: [FooterComponent] });
  const fixture = TestBed.createComponent(FooterComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('FooterComponent', () => {
  it('renders a semantic footer with the required testid', () => {
    const el = createFixture();

    expect(el.querySelector('footer[data-testid="footer"]')).toBeTruthy();
  });

  it('renders the copyright line', () => {
    const el = createFixture();

    expect(el.textContent).toContain(FOOTER_CONTENT.copyright);
  });

  it('renders the MOD-W attribution with a non-breaking hyphen', () => {
    const el = createFixture();

    expect(el.textContent).toContain(`MOD${'‑'}W`);
  });
});
