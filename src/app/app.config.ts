import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),

    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),

    // 👇 REQUIRED for ngx-translate v8+
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: '/i18n/',
        suffix: '.json',
      },
    },

    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'en', // 👈 replaces defaultLanguage
        loader: {
          provide: TranslateLoader,
          useClass: TranslateHttpLoader,
        },
      }),
    ),
  ],
};
