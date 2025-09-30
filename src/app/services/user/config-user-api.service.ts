import { inject, Injectable } from '@angular/core';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { UserStore } from '../../stores/user/user.store';
import { from, map } from 'rxjs';
import { FirebaseUserConfig } from '../../resolvers/user-config-modal.resolver';

@Injectable({ providedIn: 'root' })
export class ConfigUserApiService {
  private readonly firestore = inject(Firestore);
  private readonly userStore = inject(UserStore);

  private readonly configDoc = doc(
    this.firestore,
    `configs/${this.userStore.user().uid}`,
  );

  getUserConfig() {
    return docData(this.configDoc).pipe(
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

  updateUserConfig(newConfig: FirebaseUserConfig) {
    return from(updateDoc(this.configDoc, { user_config: newConfig })).pipe(
      map((_) => true),
    );
  }
}
