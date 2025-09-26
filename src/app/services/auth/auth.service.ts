import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { UserStore } from '../../stores/user/user.store';
import { switchMap, from, take, map, tap, finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authApiService = inject(AuthApiService);
  private readonly userStore = inject(UserStore);

  login(email: string, password: string) {
    this.userStore.setIsLoading(true);
    return this.authApiService.login(email, password).pipe(
      switchMap(({ user }) => {
        return from(user.getIdToken()).pipe(
          take(1),
          map((token) => {
            return {
              user,
              token,
            };
          }),
        );
      }),
      tap(({ user, token }) => {
        this.userStore.updateUser({
          displayName: user.displayName || undefined,
          email: user.email || undefined,
          uid: user.uid,
        });
      }),
      finalize(() => {
        this.userStore.setIsLoading(false);
      }),
    );
  }
}
