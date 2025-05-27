import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideTransloco } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { LoginComponent } from './login.component';

describe('[LoginComponent]', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ToggleSwitchModule,
        CommonModule,
        CardModule,
        FormsModule,
      ],
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
          loader: TranslocoHttpLoader,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // render HTML
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
