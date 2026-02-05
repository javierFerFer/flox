import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
type RequestsState = {
  isLoading: boolean;
};

const initialState: RequestsState = {
  isLoading: false,
};

export const RequestsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
  })),
);
