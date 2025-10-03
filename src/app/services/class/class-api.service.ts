import { inject, Injectable } from '@angular/core';
import {
  arrayRemove,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { from, map } from 'rxjs';
import { UserStore } from '../../stores/user/user.store';
import { ClassStore } from '../../stores/class/class.store';
import { ClassModel } from '../../stores/class/class.model';

@Injectable({ providedIn: 'root' })
export class ClassApiService {
  private readonly firestore = inject(Firestore);
  private readonly classStore = inject(ClassStore);
  private readonly userStore = inject(UserStore);
  private readonly classesDoc = doc(
    this.firestore,
    `classes/${this.userStore.user().uid}`,
  );
  getUserClasses() {
    return docData(this.classesDoc).pipe(
      map((result) => {
        if (!result!['user_classes']) {
          return undefined;
        }
        return [...result!['user_classes']];
      }),
    );
  }
  createNewClass(newClassEntities: ClassModel[]) {
    return from(
      updateDoc(this.classesDoc, { user_classes: newClassEntities }),
    ).pipe(map((_) => true));
  }

  deleteClass(classToDelete: ClassModel) {
    return from(
      updateDoc(this.classesDoc, { user_classes: arrayRemove(classToDelete) }),
    ).pipe(map((_) => true));
  }
}
