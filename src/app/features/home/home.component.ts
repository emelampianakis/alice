import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { SeoService } from '../../core/seo/seo.service';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private seo = inject(SeoService);
  private translate = inject(TranslateService);
  private langSvc = inject(LanguageService);

  lang = computed(() => this.langSvc.lang());

  constructor() {
    this.translate.get(['seo.home.title', 'seo.home.description']).subscribe((t) => {
      this.seo.setTitle(t['seo.home.title']);
      this.seo.setDescription(t['seo.home.description']);
    });
  }
}
