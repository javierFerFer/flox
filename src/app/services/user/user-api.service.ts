import { inject, Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { UserStore } from '../../stores/user/user.store';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly firestore = inject(Firestore);
  private readonly userStore = inject(UserStore);

  private readonly userDoc = doc(
    this.firestore,
    `users/${this.userStore.user().uid}`,
  );

  constructor() {}

  getUserConfig() {
    return docData(this.userDoc).pipe(
      map((result) => {
        if (!result!['user_config']) {
          return undefined;
        }
        return {
          ...result!['user_config'],
        };
      }),
    );
  }
}
