import { inject, Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectVersionApiService {
  private readonly firestore = inject(Firestore);

  private readonly projectVersionDoc = doc(
    this.firestore,
    `app_info/release_info`,
  );

  getAppInfo() {
    return docData(this.projectVersionDoc).pipe(
      map((result) => {
        if (!result!['info']) {
          return undefined;
        }
        return {
          ...result!['info'],
        };
      }),
    );
  }
}
