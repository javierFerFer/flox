import { inject, Injectable } from '@angular/core';
import {
  arrayUnion,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { UserStore } from '../../stores/user/user.store';
import { from, map } from 'rxjs';
import { UnityModel } from '../../stores/unity/unity.model';

@Injectable({ providedIn: 'root' })
export class UnitsApiService {
  private readonly firestore = inject(Firestore);
  private readonly userStore = inject(UserStore);

  getUnitsByClassUuid(classUuid: string) {
    const unitsDoc = doc(
      this.firestore,
      `units/${this.userStore.user().uid}/${classUuid}/units_members`,
    );
    return docData(unitsDoc).pipe(
      map((result) => {
        if (!result || !result!['units']) {
          return undefined;
        }
        return [...result!['units']];
      }),
    );
  }
  createNewUnit(classUuid: string, newUnit: UnityModel) {
    const unitsDoc = doc(
      this.firestore,
      `units/${this.userStore.user().uid}/${classUuid}/units_members`,
    );
    return from(
      setDoc(unitsDoc, { units: arrayUnion(newUnit) }, { merge: true }),
    ).pipe(map((_) => true));
  }

  deleteUnits(classUuid: string) {
    const unitsDoc = doc(
      this.firestore,
      `units/${this.userStore.user().uid}/${classUuid}/units_members`,
    );
    return from(deleteDoc(unitsDoc)).pipe(map((_) => true));
  }
}
