import { Component, effect, inject, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { palette, updatePrimaryPalette } from '@primeng/themes';
import { PrimeNG } from 'primeng/config';
import { switchMap, tap } from 'rxjs';
import { DEFAULT_COLOR } from '../../app.theme';
import { UserStore } from './stores/user/user.store';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private userStore = inject(UserStore);
  private translocoService = inject(TranslocoService);
  private primengConfig = inject(PrimeNG);

  private theme$ = toObservable(this.userStore.themeAsBoolean).pipe(
    tap((isLightTheme: boolean) => {
      const element = document.querySelector('html');
      if (isLightTheme === undefined) return;
      if (isLightTheme) {
        element!.classList.remove('dark-mode');
      } else {
        element!.classList.add('dark-mode');
      }
    }),
  );

  constructor() {
    effect(() => {
      const currentUserColorScheme =
        this.userStore.userColorScheme() ?? DEFAULT_COLOR;
      const paletteOfColors = palette(currentUserColorScheme);
      updatePrimaryPalette(paletteOfColors);
    });

    this.syncTranslocoAndPrimeNGLanguages();
  }

  private syncTranslocoAndPrimeNGLanguages() {
    this.translocoService.langChanges$
      .pipe(
        switchMap(() => {
          return this.translocoService.selectTranslateObject(
            'PRIME_NG_TRANSLATIONS',
          );
        }),
      )
      .subscribe((currentTranslations) => {
        if (!!currentTranslations && Object.keys(currentTranslations).length) {
          this.primengConfig.setTranslation(currentTranslations);
        }
      });
  }

  ngOnInit(): void {
    this.theme$.subscribe();
  }
}
