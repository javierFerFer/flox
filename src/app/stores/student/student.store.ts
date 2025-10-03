import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { StudentModel } from './student.model';

type StudentState = {
  students: StudentModel[];
  isLoading: boolean;
};

const initialState: StudentState = {
  students: [],
  isLoading: false,
};

export const StudentStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    // updateClasses(classes: ClassModel[]): void {
    //   patchState(store, (state) => ({
    //     ...state,
    //     classes: [...classes],
    //   }));
    // },
    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },

    // findClassByUuid(uuid: string) {
    //   return store.classes().find((c) => c.uuid === uuid);
    // },
  })),
);
