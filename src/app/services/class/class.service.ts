import { inject, Injectable } from '@angular/core';
import { ClassStore } from '../../stores/class/class.store';
import { ClassApiService } from './class-api.service';
import { tap, finalize } from 'rxjs';
import { ClassModel } from '../../stores/class/class.model';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private readonly classApiService = inject(ClassApiService);
  private readonly classesStore = inject(ClassStore);

  getUserClasses() {
    this.classesStore.setIsLoading(true);
    return this.classApiService.getUserClasses().pipe(
      tap((result) => {
        if (result) {
          this.classesStore.updateClasses(result);
        }
      }),
      finalize(() => {
        this.classesStore.setIsLoading(false);
      }),
    );
  }

  createNewClass(newClassEntity: ClassModel) {
    this.classesStore.setIsLoading(true);
    const currentClasses = this.classesStore.classes().concat(newClassEntity);
    return this.classApiService.createNewClass(currentClasses).pipe(
      tap(() => {
        console.log('currentClasses', currentClasses);
        this.classesStore.updateClasses(currentClasses);
      }),
      finalize(() => {
        this.classesStore.setIsLoading(false);
      }),
    );
  }
}
