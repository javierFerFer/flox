import { inject, Injectable } from '@angular/core';
import { StudentsApiService } from './students-api.service';
import { StudentStore } from '../../stores/student/student.store';
import { StudentModel } from '../../stores/student/student.model';
import { tap, finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private readonly studentsApiService = inject(StudentsApiService);
  private readonly studentStore = inject(StudentStore);
  getStudentsByClassUuid(classUuid: string) {
    this.studentStore.setIsLoading(true);
    return this.studentsApiService.getStudentsByClassUuid(classUuid).pipe(
      tap((result) => {
        this.studentStore.updateStudents(result || []);
      }),
      finalize(() => {
        this.studentStore.setIsLoading(false);
      }),
    );
  }

  createNewStudent(classUuid: string, newStudent: StudentModel) {
    this.studentStore.setIsLoading(true);
    return this.studentsApiService.createNewStudent(classUuid, newStudent).pipe(
      tap(() => {
        const currentStudents = this.studentStore.students().concat(newStudent);
        this.studentStore.updateStudents(currentStudents);
      }),
      finalize(() => {
        this.studentStore.setIsLoading(false);
      }),
    );
  }
}
