import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LanguageService } from './language.service';

export const langGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const langSvc = inject(LanguageService);

  const langParam = (route.paramMap.get('lang') || '').toLowerCase();

  if (!langSvc.isSupported(langParam)) {
    return router.parseUrl('/en');
  }

  langSvc.setLang(langParam);
  return true;
};
