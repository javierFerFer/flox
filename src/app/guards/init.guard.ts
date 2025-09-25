import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

export const InitGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  // return userStore.user().accessToken ? router.navigate([redirectTo]) : true;

  const auth = inject(Auth);
  const router = inject(Router);
  return new Observable<boolean>((subscriber) => {
    // Escucha cambios en el estado de auth
    onAuthStateChanged(auth, (user) => {
      if (!user) {
      } else {
        const redirectTo = route.data['redirectTo'] as string;
        router.navigate([redirectTo]);
      }
      subscriber.next(true);
      subscriber.complete();
    });
  });
};
