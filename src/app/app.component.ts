import { Component, effect, inject, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { UserStore } from './stores/user/user.store';
import { DEFAULT_COLOR } from '../../app.theme';
import { palette, updatePrimaryPalette } from '@primeng/themes';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private userStore = inject(UserStore);
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
      const currentUserColorScheme = this.userStore.userColorScheme() ?? DEFAULT_COLOR;
      const paletteOfColors = palette(currentUserColorScheme);
      updatePrimaryPalette(paletteOfColors);
    });
  }

  ngOnInit(): void {
    this.theme$.subscribe();
  }
}
