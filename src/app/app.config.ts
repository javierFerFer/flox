import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';

import { MyPreset }  from '../../app.theme';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco'
import { VERSION } from '@angular/common';
import { PROJECT_VERSION } from './version.config';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimationsAsync(),
     providePrimeNG({
          ripple: true,
          theme: {
                preset: MyPreset,
                options: {
                  darkModeSelector: '.my-app-dark',
                }
            }
      }),
      provideHttpClient(),
      provideTransloco({
        config: { 
          availableLangs: ['en', 'es'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
      {
        provide: PROJECT_VERSION,
        useValue: { version: '0.0.1' }
      }
  ]
};
