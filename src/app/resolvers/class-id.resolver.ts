import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassStore } from '../stores/class/class.store';
import { StudentsService } from '../services/students/students.service';

@Injectable({ providedIn: 'root' })
export class ClassIdResolver implements Resolve<any> {
  private readonly classStore;
  private readonly studentService;

  constructor() {
    this.classStore = inject(ClassStore);
    this.studentService = inject(StudentsService);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const classUuid = route.params['id'];
    return this.studentService.getStudentsByClassUuid(classUuid);
  }
}
