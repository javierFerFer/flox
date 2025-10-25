import { inject, Injectable } from '@angular/core';
import { UnitsApiService } from './unity-api.service';
import { tap, finalize } from 'rxjs';
import { UnityStore } from '../../stores/unity/unity.store';
import { UnityModel } from '../../stores/unity/unity.model';

@Injectable({ providedIn: 'root' })
export class UnitsService {
  private readonly unitsApiService = inject(UnitsApiService);
  private readonly unityStore = inject(UnityStore);

  getUnitsByClassUuid() {
    this.unityStore.setIsLoading(true);
    return this.unitsApiService.getUnitsByClassUuid().pipe(
      tap((result) => {
        this.unityStore.updateUnits(result || []);
      }),
      finalize(() => {
        this.unityStore.setIsLoading(false);
      }),
    );
  }

  createNewUnit(newUnit: UnityModel) {
    this.unityStore.setIsLoading(true);
    return this.unitsApiService.createNewUnit(newUnit).pipe(
      tap(() => {
        const currentUnits = this.unityStore.units().concat(newUnit);
        this.unityStore.updateUnits(currentUnits);
      }),
      finalize(() => {
        this.unityStore.setIsLoading(false);
      }),
    );
  }

  updateUnit(updatedUnit: UnityModel) {
    this.unityStore.setIsLoading(true);
    const filteredUnits = this.unityStore
      .units()
      .filter((u) => u.uuid !== updatedUnit.uuid)
      .concat(updatedUnit);
    return this.unitsApiService.updateUnit(filteredUnits).pipe(
      tap(() => {
        this.unityStore.updateUnit(updatedUnit);
      }),
      finalize(() => {
        this.unityStore.setIsLoading(false);
      }),
    );
  }

  deleteUnitSession(updatedUnit: UnityModel) {
    this.unityStore.setIsLoading(true);
    const filteredUnits = this.unityStore
      .units()
      .filter((u) => u.uuid !== updatedUnit.uuid)
      .concat(updatedUnit);
    return this.unitsApiService.updateUnit(filteredUnits).pipe(
      tap(() => {
        this.unityStore.updateUnit(updatedUnit);
      }),
      finalize(() => {
        this.unityStore.setIsLoading(false);
      }),
    );
  }

  deleteUnits() {
    this.unityStore.setIsLoading(true);
    return this.unitsApiService.deleteUnits().pipe(
      tap(() => {
        this.unityStore.clearUnits();
      }),
      finalize(() => {
        this.unityStore.setIsLoading(false);
      }),
    );
  }

  deleteUnit(unitUuidToDelete: string) {
    this.unityStore.setIsLoading(true);
    const filteredUnits = this.unityStore
      .units()
      .filter((u) => u.uuid !== unitUuidToDelete);
    return this.unitsApiService.deleteUnit(filteredUnits).pipe(
      tap(() => {
        this.unityStore.updateUnits(filteredUnits);
      }),
      finalize(() => {
        this.unityStore.setIsLoading(false);
      }),
    );
  }
}
