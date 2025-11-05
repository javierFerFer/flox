import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigUserService } from '../services/config-user/config-user.service';
import { LanguagesEnum } from '../app.config';

export type UserTheme = 'light' | 'dark';

export interface FirebaseUserConfig {
  photo?: string;
  appLanguage?: LanguagesEnum;
  toggleTheme?: UserTheme;
  lastVersionReadIt?: string;
}

@Injectable({ providedIn: 'root' })
export class UserConfigModalResolver implements Resolve<any> {
  private readonly configUserService = inject(ConfigUserService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.configUserService.getUserConfig();
  }
}
