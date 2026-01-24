import { inject, Injectable } from '@angular/core';
import { ConfigUserApiService } from './config-user-api.service';
import { finalize, tap } from 'rxjs';
import { UserStore } from '../../stores/user/user.store';
import { FirebaseUserConfig } from '../../resolvers/user-config-modal.resolver';
import { PROJECT_VERSION } from '../../version.config';

@Injectable({ providedIn: 'root' })
export class ConfigUserService {
  private readonly configUserApiService = inject(ConfigUserApiService);
  private readonly userStore = inject(UserStore);
  private readonly version = inject(PROJECT_VERSION).version;

  getUserConfig() {
    this.userStore.setIsLoading(true);
    return this.configUserApiService.getUserConfig().pipe(
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

  updateUserConfig(userConfig: FirebaseUserConfig) {
    this.userStore.setIsLoading(true);
    const internalConfigToUpdate: FirebaseUserConfig = {
      ...userConfig,
      photo: '', // don't send photo to firebase due to free tier
      lastVersionReadIt: this.version,
    };
    return this.configUserApiService
      .updateUserConfig(internalConfigToUpdate)
      .pipe(
        tap((result) => {
          this.userStore.updateUserConfig(userConfig);
        }),
        finalize(() => {
          this.userStore.setIsLoading(false);
        }),
      );
  }

  updateVersionReadIt() {
    this.userStore.setIsLoading(true);
    const internalConfigToUpdate: FirebaseUserConfig = {
      ...this.userStore.user().userConfig,
      photo: '', // don't send photo to firebase due to free tier
      lastVersionReadIt: this.version,
    };
    return this.configUserApiService
      .updateUserConfig(internalConfigToUpdate)
      .pipe(
        tap((result) => {
          this.userStore.updateUserConfig(internalConfigToUpdate);
        }),
        finalize(() => {
          this.userStore.setIsLoading(false);
        }),
      );
  }
}
