import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ClassService } from '../services/class/class.service';
import { ClassStore } from '../stores/class/class.store';

@Injectable({ providedIn: 'root' })
export class ClassIdResolver implements Resolve<any> {
  private readonly classService = inject(ClassService);
  private readonly classStore;

  constructor() {
    this.classStore = inject(ClassStore);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.classService.getUserClasses().pipe(
      tap(() => {
        const classUuid = route.params['id'];
        const activeClass = this.classStore.findClassByUuid(classUuid);
        this.classStore.setActiveClass(activeClass);
      }),
    );
  }
}
