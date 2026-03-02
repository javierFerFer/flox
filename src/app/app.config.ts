import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideTransloco } from '@jsverse/transloco';
import { ToastModule } from 'primeng/toast';
import { MyPreset } from '../../app.theme';
import { ToastMessagingModule } from './services/toast/toast-messaging.module';
import { TranslocoHttpLoader } from './transloco-loader';
import { PROJECT_VERSION } from './version.config';

const firebaseConfig = {
  apiKey: 'AIzaSyA53tCg81VnygQLo6exgQsldVO_SfIe4b4',
  authDomain: 'flox-8290b.firebaseapp.com',
  projectId: 'flox-8290b',
  storageBucket: 'flox-8290b.firebasestorage.app',
  messagingSenderId: '866079552751',
  appId: '1:866079552751:web:29de8621b438e37ce3d71a',
  measurementId: 'G-FNFLETJVZH',
};

export enum LanguagesEnum {
  en = 'en',
  es = 'es',
}

export const AVAILABLE_LANGUAGES: Map<string, string> = new Map([
  [LanguagesEnum.en, 'LANGUAGES.EN'],
  [LanguagesEnum.es, 'LANGUAGES.ES'],
]);

export const DEFAULT_LANGUAGE = LanguagesEnum.en;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    importProvidersFrom(ToastModule, ToastMessagingModule),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: Array.from(AVAILABLE_LANGUAGES.keys()),
        defaultLang: DEFAULT_LANGUAGE,
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: PROJECT_VERSION,
      useValue: { version: '1.2.1' },
    },
  ],
};
