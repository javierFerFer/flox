import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ProjectVersionModel } from './project-version.model';
import { withReset } from '@angular-architects/ngrx-toolkit';

type ProjectVersionState = {
  info: ProjectVersionModel | undefined;
  isLoading: boolean;
};

const initialState: ProjectVersionState = {
  isLoading: false,
  info: undefined,
};

export const ProjectVersionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withReset(),
  withMethods((store) => ({
    updateState(info: ProjectVersionModel): void {
      patchState(store, (state) => ({
        ...state,
        info,
      }));
    },

    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
  })),
);
