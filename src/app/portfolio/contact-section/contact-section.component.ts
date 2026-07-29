import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CONTACT_CONTENT } from '../../content/contact.content';
import { ContactPath, buildMailtoHref } from '../../content/contact-path.model';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  protected readonly content = CONTACT_CONTENT;

  protected mailtoHref(path: ContactPath): string {
    return buildMailtoHref(this.content.email, path);
  }
}
