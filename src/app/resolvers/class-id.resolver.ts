import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassService } from '../services/class/class.service';

@Injectable({ providedIn: 'root' })
export class ClassIdResolver implements Resolve<any> {
  private readonly classService = inject(ClassService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.classService.getUserClasses();
  }
}
