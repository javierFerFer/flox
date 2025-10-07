import { inject, Injectable } from '@angular/core';
import {
  arrayUnion,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { UserStore } from '../../stores/user/user.store';
import { from, map } from 'rxjs';
import { StudentModel } from '../../stores/student/student.model';

@Injectable({ providedIn: 'root' })
export class StudentsApiService {
  private readonly firestore = inject(Firestore);
  private readonly userStore = inject(UserStore);

  getStudentsByClassUuid(classUuid: string) {
    const studentsDoc = doc(
      this.firestore,
      `students/${this.userStore.user().uid}/${classUuid}/students_members`,
    );
    return docData(studentsDoc).pipe(
      map((result) => {
        if (!result || !result!['students']) {
          return undefined;
        }
        return [...result!['students']];
      }),
    );
  }
  createNewStudent(classUuid: string, newStudent: StudentModel) {
    const studentsDoc = doc(
      this.firestore,
      `students/${this.userStore.user().uid}/${classUuid}/students_members`,
    );
    return from(
      setDoc(
        studentsDoc,
        { students: arrayUnion(newStudent) },
        { merge: true },
      ),
    ).pipe(map((_) => true));
  }
}
