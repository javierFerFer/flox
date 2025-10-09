import { inject, Injectable } from '@angular/core';
import { UnitsApiService } from './unity-api.service';
import { tap, finalize } from 'rxjs';
import { UnityStore } from '../../stores/unity/unity.store';
import { UnityModel } from '../../stores/unity/unity.model';

@Injectable({ providedIn: 'root' })
export class UnitsService {
  private readonly unitsApiService = inject(UnitsApiService);
  private readonly unityStore = inject(UnityStore);

  getUnitsByClassUuid(classUuid: string) {
    this.unityStore.setIsLoading(true);
    return this.unitsApiService.getUnitsByClassUuid(classUuid).pipe(
      tap((result) => {
        this.unityStore.updateUnits(result || []);
      }),
      finalize(() => {
        this.unityStore.setIsLoading(false);
      }),
    );
  }

  createNewUnit(classUuid: string, newUnit: UnityModel) {
    this.unityStore.setIsLoading(true);
    return this.unitsApiService.createNewUnit(classUuid, newUnit).pipe(
      tap(() => {
        const currentUnits = this.unityStore.units().concat(newUnit);
        this.unityStore.updateUnits(currentUnits);
      }),
      finalize(() => {
        this.unityStore.setIsLoading(false);
      }),
    );
  }

  deleteUnits(classUuid: string) {
    this.unityStore.setIsLoading(true);
    return this.unitsApiService.deleteUnits(classUuid).pipe(
      tap(() => {
        this.unityStore.clearUnits();
      }),
      finalize(() => {
        this.unityStore.setIsLoading(false);
      }),
    );
  }

  deleteUnit(classUuid: string, unitUuidToDelete: string) {
    this.unityStore.setIsLoading(true);
    const filteredUnits = this.unityStore
      .units()
      .filter((u) => u.uuid !== unitUuidToDelete);
    return this.unitsApiService.deleteUnit(classUuid, filteredUnits).pipe(
      tap(() => {
        this.unityStore.updateUnits(filteredUnits);
      }),
      finalize(() => {
        this.unityStore.setIsLoading(false);
      }),
    );
  }
}
