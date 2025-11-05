import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { UserConfigModalResolver } from './user-config-modal.resolver';
import { NewUpdatesResolver } from './new-updates.resolver';

export type UserTheme = 'light' | 'dark';

export interface FirebaseNewUpdates {
  version: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class DashBoardResolver implements Resolve<any> {
  private readonly userConfigModalResolver = inject(UserConfigModalResolver);
  private readonly newUpdatesResolver = inject(NewUpdatesResolver);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return (
      this.userConfigModalResolver.resolve(route) as Observable<any>
    ).pipe(
      switchMap(() => {
        return this.newUpdatesResolver.resolve(route) as Observable<any>;
      }),
    );
  }
}
