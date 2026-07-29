import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PortfolioPageComponent } from './portfolio/portfolio-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PortfolioPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
