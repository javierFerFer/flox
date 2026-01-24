import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProjectVersionService } from '../services/project-version/project-version.service';
import { UserStore } from '../stores/user/user.store';
import { PROJECT_VERSION } from '../version.config';

export type UserTheme = 'light' | 'dark';

export interface FirebaseNewUpdates {
  version: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class NewUpdatesResolver implements Resolve<any> {
  private readonly userStore = inject(UserStore);
  private readonly projectVersionService = inject(ProjectVersionService);
  private readonly version = inject(PROJECT_VERSION).version;

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.userStore.user().userConfig?.lastVersionReadIt !== this.version
      ? this.projectVersionService.getAppInfo()
      : of(undefined);
  }
}
