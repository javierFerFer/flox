import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';

import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { MyPreset } from '../../app.theme';
import { TranslocoHttpLoader } from './transloco-loader';
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
                  darkModeSelector: '.dark-mode',
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
        useValue: { version: '0.2.0' }
      }
  ]
};
