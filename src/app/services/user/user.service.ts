import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { tap } from 'rxjs';
import { UserStore } from '../../stores/user/user.store';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly userApiService = inject(UserApiService);
  private readonly userStore = inject(UserStore);

  getUserConfig() {
    return this.userApiService.getUserConfig().pipe(
      tap((result) => {
        if (result) {
          this.userStore.updateUserConfig(result);
        }
      }),
    );
  }
}
