import { inject, Injectable } from '@angular/core';
import {
  arrayUnion,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { UserStore } from '../../stores/user/user.store';
import { from, map } from 'rxjs';
import { UnityModel } from '../../stores/unity/unity.model';
import { ClassStore } from '../../stores/class/class.store';

@Injectable({ providedIn: 'root' })
export class UnitsApiService {
  private readonly firestore = inject(Firestore);
  private readonly userStore = inject(UserStore);
  private readonly classStore = inject(ClassStore);

  getUnitsByClassUuid() {
    const unitsDoc = doc(
      this.firestore,
      `units/${this.userStore.user().uid}/${this.classStore.activeClass()?.uuid}/units_members`,
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
  createNewUnit(newUnit: UnityModel) {
    const unitsDoc = doc(
      this.firestore,
      `units/${this.userStore.user().uid}/${this.classStore.activeClass()?.uuid}/units_members`,
    );
    return from(
      setDoc(unitsDoc, { units: arrayUnion(newUnit) }, { merge: true }),
    ).pipe(map((_) => true));
  }

  updateUnit(updatedUnitList: UnityModel[]) {
    const unitsDoc = doc(
      this.firestore,
      `units/${this.userStore.user().uid}/${this.classStore.activeClass()?.uuid}/units_members`,
    );
    return from(
      setDoc(unitsDoc, { units: [...updatedUnitList] }, { merge: true }),
    ).pipe(map((_) => true));
  }

  deleteUnits() {
    const unitsDoc = doc(
      this.firestore,
      `units/${this.userStore.user().uid}/${this.classStore.activeClass()?.uuid}/units_members`,
    );
    return from(deleteDoc(unitsDoc)).pipe(map((_) => true));
  }

  deleteUnit(filteredUnits: UnityModel[]) {
    const unitsDoc = doc(
      this.firestore,
      `units/${this.userStore.user().uid}/${this.classStore.activeClass()?.uuid}/units_members`,
    );
    return from(updateDoc(unitsDoc, { units: [...filteredUnits] })).pipe(
      map((_) => true),
    );
  }
}
