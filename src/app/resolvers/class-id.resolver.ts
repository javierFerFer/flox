import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassStore } from '../stores/class/class.store';
import { UnitsService } from '../services/unity/unity.service';

@Injectable({ providedIn: 'root' })
export class ClassIdResolver implements Resolve<any> {
  private readonly classStore;
  private readonly unitsService;

  constructor() {
    this.classStore = inject(ClassStore);
    this.unitsService = inject(UnitsService);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const classUuid = route.params['id'];
    this.classStore.setActiveClass(classUuid);
    return this.unitsService.getUnitsByClassUuid();
  }
}
