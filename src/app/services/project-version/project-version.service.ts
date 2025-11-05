import { inject, Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { ProjectVersionApiService } from './project-version-api.service';
import { ProjectVersionStore } from '../../stores/project-version/project-version.store';

@Injectable({ providedIn: 'root' })
export class ProjectVersionService {
  private readonly projectVersionApiService = inject(ProjectVersionApiService);
  private readonly projectVersionStore = inject(ProjectVersionStore);
  getAppInfo() {
    this.projectVersionStore.setIsLoading(true);
    return this.projectVersionApiService.getAppInfo().pipe(
      tap((result) => {
        if (result) {
          this.projectVersionStore.updateState(result);
        }
      }),
      finalize(() => {
        this.projectVersionStore.setIsLoading(false);
      }),
    );
  }
}
