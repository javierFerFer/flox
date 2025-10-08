import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ClassModel } from './class.model';

type ClassState = {
  activeClass: ClassModel | undefined;
  classes: ClassModel[];
  isLoading: boolean;
};

const initialState: ClassState = {
  activeClass: undefined,
  classes: [],
  isLoading: false,
};

export const ClassStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateClasses(classes: ClassModel[]): void {
      patchState(store, (state) => ({
        ...state,
        classes: [...classes],
      }));
    },
    setActiveClass(uuid: string) {
      const selectedClass = this.findClassByUuid(uuid);
      patchState(store, (state) => ({
        ...state,
        activeClass: selectedClass,
      }));
    },
    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
    findClassByUuid(uuid: string) {
      return store.classes().find((c) => c.uuid === uuid);
    },
  })),
);
