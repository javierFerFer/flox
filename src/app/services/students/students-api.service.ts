import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { UserStore } from '../../stores/user/user.store';

@Injectable({ providedIn: 'root' })
export class StudentsApiService {
  private readonly firestore = inject(Firestore);
  // private readonly classStore = inject(ClassStore);
  private readonly userStore = inject(UserStore);
  // private readonly classesDoc = doc(
  //   this.firestore,
  //   `classes/${this.userStore.user().uid}`,
  // );
  // getUserClasses() {
  //   return docData(this.classesDoc).pipe(
  //     map((result) => {
  //       if (!result!['user_classes']) {
  //         return undefined;
  //       }
  //       return [...result!['user_classes']];
  //     }),
  //   );
  // }
  // createNewStudentsCollection(uuid: string) {
  //     const newStudentsDoc = doc(
  //   this.firestore,
  //   `students/${this.userStore.user().uid}/${uuid}/`,
  // );
  //   return from(
  //     updateDoc(this.newStudentsDoc, { user_classes: newClassEntities }),
  //   ).pipe(map((_) => true));
  // }
}
