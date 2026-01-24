import { provideHttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { AppComponent } from './app.component';
import { TranslocoHttpLoader } from './transloco-loader';
import { PROJECT_VERSION } from './version.config';

describe('[AppComponent]', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
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
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('it should have version', () => {
    const { version } = TestBed.inject(PROJECT_VERSION);
    expect(version).toBeDefined();
    expect(version).toEqual('0.0.1');
  });

  it('it should have default language to "EN"', () => {
    const inject = TestBed.inject(TranslocoService);
    const defaultLanguage = inject.getDefaultLang();
    expect(defaultLanguage).toBeDefined();
    expect(defaultLanguage).toEqual('en');
  });
});
