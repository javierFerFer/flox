import { inject, Injectable } from '@angular/core';
import { StudentsApiService } from './students-api.service';
import { StudentStore } from '../../stores/student/student.store';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private readonly studentsApiService = inject(StudentsApiService);
  private readonly studentStore = inject(StudentStore);
  // getUserClasses() {
  //   this.classesStore.setIsLoading(true);
  //   return this.classApiService.getUserClasses().pipe(
  //     tap((result) => {
  //       if (result) {
  //         this.classesStore.updateClasses(result);
  //       }
  //     }),
  //     finalize(() => {
  //       this.classesStore.setIsLoading(false);
  //     }),
  //   );
  // }
  // createNewStudentsCollection(uuid: string) {
  //   this.studentStore.setIsLoading(true);
  //   return this.studentsApiService.createNewClass(currentClasses).pipe(
  //     tap(() => {
  //       console.log('currentClasses', currentClasses);
  //       this.classesStore.updateClasses(currentClasses);
  //     }),
  //     finalize(() => {
  //       this.classesStore.setIsLoading(false);
  //     }),
  //   );
  // }
}
