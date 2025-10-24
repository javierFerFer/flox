import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UnityModel } from './unity.model';

type UnityState = {
  units: UnityModel[];
  isLoading: boolean;
};

const initialState: UnityState = {
  units: [],
  isLoading: false,
};

export const UnityStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateUnits(units: UnityModel[]): void {
      patchState(store, (state) => ({
        ...state,
        units: [...units],
      }));
    },

    updateUnit(unit: UnityModel): void {
      const filteredList = store.units().filter((u) => u.uuid !== unit.uuid);
      patchState(store, (state) => ({
        ...state,
        units: [...filteredList].concat(unit),
      }));
    },

    clearUnits(): void {
      patchState(store, (state) => ({
        ...state,
        units: [],
      }));
    },

    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },

    findUnit(unitUuid: string) {
      return store.units().find((u) => u.uuid === unitUuid);
    },
  })),
);
