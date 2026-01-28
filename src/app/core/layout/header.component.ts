import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { LanguageService } from '../i18n/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  template: `
    <header class="hdr" role="banner">
      <div class="inner">
        <!-- Logo -->
        <a class="logo" [routerLink]="['/', lang(), '']"> Alice </a>

        <!-- Desktop navigation -->
        <nav class="nav">
          <a [routerLink]="['/', lang(), '']" [class.active]="activePath === 'home'">
            {{ 'nav.home' | translate }}
          </a>

          <a [routerLink]="['/', lang(), 'programs']" [class.active]="activePath === 'programs'">
            {{ 'nav.programs' | translate }}
          </a>

          <a [routerLink]="['/', lang(), 'about']" [class.active]="activePath === 'about'">
            {{ 'nav.about' | translate }}
          </a>

          <a [routerLink]="['/', lang(), 'contact']" [class.active]="activePath === 'contact'">
            {{ 'nav.contact' | translate }}
          </a>
        </nav>

        <!-- Right actions -->
        <div class="right">
          <button class="lang" (click)="switchLang()" aria-label="Switch language">
            {{ otherLangLabel() }}
          </button>

          <a class="cta" [routerLink]="['/', lang(), 'contact']">
            {{ 'nav.book' | translate }}
          </a>
        </div>

        <!-- Mobile burger -->
        <button class="burger" aria-label="Open menu" (click)="toggleMenu()">☰</button>

        <!-- Mobile menu -->
        @if (menuOpen()) {
          <div class="mobile-menu">
            <a
              [routerLink]="['/', lang(), '']"
              [class.active]="activePath === 'home'"
              (click)="closeMenu()"
            >
              {{ 'nav.home' | translate }}
            </a>

            <a
              [routerLink]="['/', lang(), 'programs']"
              [class.active]="activePath === 'programs'"
              (click)="closeMenu()"
            >
              {{ 'nav.programs' | translate }}
            </a>

            <a
              [routerLink]="['/', lang(), 'about']"
              [class.active]="activePath === 'about'"
              (click)="closeMenu()"
            >
              {{ 'nav.about' | translate }}
            </a>

            <a
              [routerLink]="['/', lang(), 'contact']"
              [class.active]="activePath === 'contact'"
              (click)="closeMenu()"
            >
              {{ 'nav.contact' | translate }}
            </a>
          </div>
        }
      </div>
    </header>
  `,
  styles: [
    `
      .hdr {
        position: sticky;
        top: 0;
        z-index: 10;
        background: #fff;
        border-bottom: 1px solid #eee;
      }

      .inner {
        max-width: 1100px;
        margin: 0 auto;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        gap: 18px;
      }

      .logo {
        font-weight: 800;
        text-decoration: none;
        color: #111;
      }

      /* Desktop nav */
      .nav {
        display: flex;
        gap: 14px;
        flex: 1;
      }

      .nav a {
        text-decoration: none;
        color: #222;
        opacity: 0.85;
      }

      .nav a:hover {
        opacity: 1;
      }

      .nav a.active {
        font-weight: 600;
        opacity: 1;
      }

      /* Right actions */
      .right {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .lang {
        border: 1px solid #ddd;
        background: #fff;
        padding: 8px 10px;
        border-radius: 10px;
        cursor: pointer;
      }

      .cta {
        text-decoration: none;
        padding: 9px 12px;
        border-radius: 12px;
        background: #111;
        color: #fff;
        font-weight: 600;
      }

      /* Burger */
      .burger {
        display: none;
        font-size: 22px;
        background: none;
        border: none;
        cursor: pointer;
      }

      /* Mobile */
      @media (max-width: 720px) {
        .nav {
          display: none;
        }

        .burger {
          display: block;
        }

        .mobile-menu {
          position: absolute;
          top: 64px;
          left: 0;
          right: 0;
          background: #fff;
          border-top: 1px solid #eee;
          display: flex;
          flex-direction: column;
        }

        .mobile-menu a {
          padding: 14px 18px;
          text-decoration: none;
          color: #111;
          border-bottom: 1px solid #eee;
        }

        .mobile-menu a.active {
          font-weight: 600;
          background: #f5f5f5;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  private router = inject(Router);
  private langSvc = inject(LanguageService);

  lang = computed(() => this.langSvc.lang());
  otherLangLabel = computed(() => (this.lang() === 'en' ? 'FR' : 'EN'));

  activePath = 'home';
  menuOpen = signal(false);

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      const url = (e as NavigationEnd).urlAfterRedirects;

      // /en/programs → programs
      this.activePath = url.split('/').slice(2).join('/') || 'home';

      // Close mobile menu on navigation
      this.menuOpen.set(false);
    });
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  switchLang() {
    const next = this.lang() === 'en' ? 'fr' : 'en';
    const replaced = this.router.url.replace(/^\/(en|fr)(?=\/|$)/, `/${next}`);
    this.router.navigateByUrl(replaced);
  }
}
