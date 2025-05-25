import { Component, inject, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { UserStore } from './stores/user/user.store';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule
  ],
  providers: [UserStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private userStore;
  private theme$;
  constructor() {
    this.userStore = inject(UserStore);
    this.theme$ = toObservable(this.userStore.themeAsBoolean)
    .pipe(
      tap((isLightTheme: boolean) => {
        const element = document.querySelector('html');
        if (isLightTheme) {
          element!.classList.remove('dark-mode');
        } else {
          element!.classList.add('dark-mode');
        }
      }
    )
  )
  }

  ngOnInit(): void {
    this.theme$.subscribe();
  }

}
