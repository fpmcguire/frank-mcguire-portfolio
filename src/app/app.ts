import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AnalyticsConsentBannerComponent } from './analytics/analytics-consent-banner/analytics-consent-banner.component';
import { PortfolioPageComponent } from './portfolio/portfolio-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PortfolioPageComponent, AnalyticsConsentBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
