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
    updateStudents(students: StudentModel[]): void {
      patchState(store, (state) => ({
        ...state,
        students: [...students],
      }));
    },

    clearStudents(): void {
      patchState(store, (state) => ({
        ...state,
        students: [],
      }));
    },

    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
  })),
);
