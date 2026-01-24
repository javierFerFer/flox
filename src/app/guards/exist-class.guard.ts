import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ClassStore } from '../stores/class/class.store';
import { ClassService } from '../services/class/class.service';
import { map } from 'rxjs';

export const ExistClassGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const classService = inject(ClassService);
  const classStore = inject(ClassStore);
  const router = inject(Router);
  const classUuid = route.params['id'];
  return classService.getUserClasses().pipe(
    map(() => {
      const existingClass = classStore.findClassByUuid(classUuid);
      return existingClass
        ? true
        : router.createUrlTree(['/', 'dashboard', 'records']);
    }),
  );
};
