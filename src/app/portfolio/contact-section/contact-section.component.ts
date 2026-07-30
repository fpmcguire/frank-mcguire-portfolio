import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GoogleAnalyticsService } from '../../analytics/google-analytics.service';
import { CONTACT_CONTENT, ContactProfileLink } from '../../content/contact.content';
import { ContactPath, buildMailtoHref } from '../../content/contact-path.model';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-contact-section',
  imports: [SectionHeaderComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  private readonly googleAnalytics = inject(GoogleAnalyticsService);

  protected readonly content = CONTACT_CONTENT;

  protected mailtoHref(path: ContactPath): string {
    return buildMailtoHref(this.content.email, path);
  }

  protected trackContactCta(path: ContactPath): void {
    this.googleAnalytics.trackEvent('contact_cta_click', {
      source: `contact-${path.id}-cta`,
      path: path.id,
    });
  }

  protected trackProfileLink(link: ContactProfileLink): void {
    if (!link.external) {
      return;
    }

    this.googleAnalytics.trackEvent('outbound_profile_click', { destination: link.id });
  }
}
