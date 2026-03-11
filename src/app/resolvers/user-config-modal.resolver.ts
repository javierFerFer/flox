import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LanguagesEnum } from '../app.config';
import { ConfigUserService } from '../services/config-user/config-user.service';

export type UserTheme = 'light' | 'dark';

export interface FirebaseUserConfig {
  photo?: string;
  appLanguage?: LanguagesEnum;
  toggleTheme?: UserTheme;
  lastVersionReadIt?: string;
  suggestInputs?: boolean;
  userColorScheme?: string;
  lateralMenuStatus?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserConfigModalResolver implements Resolve<any> {
  private readonly configUserService = inject(ConfigUserService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.configUserService.getUserConfig();
  }
}
