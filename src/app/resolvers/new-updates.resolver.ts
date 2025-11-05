import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectVersionService } from '../services/project-version/project-version.service';

export type UserTheme = 'light' | 'dark';

export interface FirebaseNewUpdates {
  version: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class NewUpdatesResolver implements Resolve<any> {
  private readonly projectVersionService = inject(ProjectVersionService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.projectVersionService.getAppInfo();
  }
}
