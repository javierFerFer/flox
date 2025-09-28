import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const auth = inject(Auth);
  const router = inject(Router);
  return new Observable<boolean>((subscriber) => {
    // Escucha cambios en el estado de auth
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.navigate(['login']);
      }
      subscriber.next(true);
      subscriber.complete();
    });
  });
};
