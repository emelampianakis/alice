import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
      this.activePath = url.split('/').slice(2).join('/') || 'home';
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
