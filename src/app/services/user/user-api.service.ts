import { inject, Injectable } from '@angular/core';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { UserStore } from '../../stores/user/user.store';
import { from, map } from 'rxjs';
import { FIREBASE_USER_CONFIG } from '../../resolvers/user-config-modal.resolver';

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
    console.log(this.userStore.user().uid);
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

  updateUserConfig(newConfig: FIREBASE_USER_CONFIG) {
    return from(updateDoc(this.userDoc, { user_config: newConfig })).pipe(
      map((_) => true),
    );
  }
}
