import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { finalize, tap } from 'rxjs';
import { UserStore } from '../../stores/user/user.store';
import { FIREBASE_USER_CONFIG } from '../../resolvers/user-config-modal.resolver';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly userApiService = inject(UserApiService);
  private readonly userStore = inject(UserStore);

  getUserConfig() {
    this.userStore.setIsLoading(true);
    return this.userApiService.getUserConfig().pipe(
      tap((result) => {
        if (result) {
          this.userStore.updateUserConfig(result);
        }
      }),
      finalize(() => {
        this.userStore.setIsLoading(false);
      }),
    );
  }

  updateUserConfig(userConfig: FIREBASE_USER_CONFIG) {
    this.userStore.setIsLoading(true);
    return this.userApiService.updateUserConfig(userConfig).pipe(
      tap((result) => {
        this.userStore.updateUserConfig(userConfig);
      }),
      finalize(() => {
        this.userStore.setIsLoading(false);
      }),
    );
  }
}
