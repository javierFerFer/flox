import { inject, Injectable } from '@angular/core';
import { ClassStore } from '../../stores/class/class.store';
import { ClassApiService } from './class-api.service';
import { tap, finalize } from 'rxjs';
import { ClassModel } from '../../stores/class/class.model';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private readonly classApiService = inject(ClassApiService);
  private readonly classStore = inject(ClassStore);

  getUserClasses() {
    this.classStore.setIsLoading(true);
    return this.classApiService.getUserClasses().pipe(
      tap((result) => {
        if (result) {
          this.classStore.updateClasses(result);
        }
      }),
      finalize(() => {
        this.classStore.setIsLoading(false);
      }),
    );
  }

  createNewClass(newClassEntity: ClassModel) {
    this.classStore.setIsLoading(true);
    const currentClasses = this.classStore.classes().concat(newClassEntity);
    return this.classApiService.createNewClass(currentClasses).pipe(
      tap(() => {
        this.classStore.updateClasses(currentClasses);
      }),
      finalize(() => {
        this.classStore.setIsLoading(false);
      }),
    );
  }

  deleteClass(classToDelete: ClassModel) {
    this.classStore.setIsLoading(true);
    return this.classApiService.deleteClass(classToDelete).pipe(
      tap(() => {
        const classesFiltered = this.classStore
          .classes()
          .filter((c) => c.uuid !== classToDelete.uuid);
        this.classStore.updateClasses(classesFiltered);
      }),
      finalize(() => {
        this.classStore.setIsLoading(false);
      }),
    );
  }
}
