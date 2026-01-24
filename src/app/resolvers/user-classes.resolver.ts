import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassService } from '../services/class/class.service';

export type UserTheme = 'light' | 'dark';

export interface FirebaseUserConfig {
  photo?: string;
  appLanguage?: string;
  toggleTheme?: UserTheme;
}

@Injectable({ providedIn: 'root' })
export class UserClassesResolver implements Resolve<any> {
  private readonly classService = inject(ClassService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.classService.getUserClasses();
  }
}
