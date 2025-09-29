import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

export interface FIREBASE_USER_CONFIG {
  photo?: string;
  appLanguage?: string;
  username?: string;
}

@Injectable({ providedIn: 'root' })
export class UserConfigModalResolver implements Resolve<any> {
  private readonly userService = inject(UserService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.userService.getUserConfig();
  }
}
