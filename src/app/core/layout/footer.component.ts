import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageService } from '../i18n/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  template: `
    <footer class="ftr" role="contentinfo">
      <div class="inner">
        <!-- Brand -->
        <div class="brand">
          <strong>Alice</strong><br />
          <span>{{ 'footer.tagline' | translate }}</span>
        </div>

        <!-- Links -->
        <nav class="links">
          <a [routerLink]="['/', lang(), '']">
            {{ 'nav.home' | translate }}
          </a>
          <a [routerLink]="['/', lang(), 'programs']">
            {{ 'nav.programs' | translate }}
          </a>
          <a [routerLink]="['/', lang(), 'about']">
            {{ 'nav.about' | translate }}
          </a>
          <a [routerLink]="['/', lang(), 'contact']">
            {{ 'nav.contact' | translate }}
          </a>
        </nav>

        <!-- Actions -->
        <div class="actions">
          <button class="lang" (click)="switchLang()" aria-label="Switch language">
            {{ otherLangLabel() }}
          </button>
        </div>
      </div>

      <!-- Bottom -->
      <div class="bottom">© {{ year }} Alice — {{ 'footer.rights' | translate }}</div>
    </footer>
  `,
  styles: [
    `
      .ftr {
        margin-top: 64px;
        background: #fff;
        border-top: 1px solid #eee;
      }

      .inner {
        max-width: 1100px;
        margin: 0 auto;
        padding: 32px 16px;
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 24px;
        align-items: center;
      }

      .brand {
        font-size: 14px;
        color: #444;
      }

      .brand strong {
        font-size: 16px;
        color: #111;
      }

      .links {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
      }

      .links a {
        text-decoration: none;
        color: #222;
        opacity: 0.8;
        font-size: 14px;
      }

      .links a:hover {
        opacity: 1;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
      }

      .lang {
        border: 1px solid #ddd;
        background: #fff;
        padding: 8px 10px;
        border-radius: 10px;
        cursor: pointer;
      }

      .bottom {
        text-align: center;
        font-size: 13px;
        opacity: 0.7;
        padding: 12px 16px 20px;
      }

      /* Mobile */
      @media (max-width: 720px) {
        .inner {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .links {
          justify-content: center;
        }

        .actions {
          justify-content: center;
        }
      }
    `,
  ],
})
export class FooterComponent {
  private router = inject(Router);
  private langSvc = inject(LanguageService);

  lang = computed(() => this.langSvc.lang());
  otherLangLabel = computed(() => (this.lang() === 'en' ? 'FR' : 'EN'));
  year = new Date().getFullYear();

  switchLang() {
    const next = this.lang() === 'en' ? 'fr' : 'en';
    const replaced = this.router.url.replace(/^\/(en|fr)(?=\/|$)/, `/${next}`);
    this.router.navigateByUrl(replaced);
  }
}
