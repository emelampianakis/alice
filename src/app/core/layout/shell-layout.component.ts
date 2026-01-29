import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main class="page">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [
    `
      .page {
        min-height: calc(100vh - 140px);
        padding: 24px 16px;
        max-width: 1100px;
        margin: 0 auto;
      }
    `,
  ],
})
export class ShellLayoutComponent {}
