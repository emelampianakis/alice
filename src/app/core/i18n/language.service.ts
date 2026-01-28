import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type AppLang = 'en' | 'fr';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _lang = signal<AppLang>('en');
  lang = this._lang.asReadonly();

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
  }

  setLang(lang: AppLang) {
    this._lang.set(lang);
    this.translate.use(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  isSupported(value: string | null | undefined): value is AppLang {
    return value === 'en' || value === 'fr';
  }
}
