import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CalendarModel } from './calendar.model';

type CalendarState = {
  calendarInfo: CalendarModel | undefined;
  isLoading: boolean;
};

const initialState: CalendarState = {
  calendarInfo: undefined,
  isLoading: false,
};

export const CalendarStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateCalendar(calendarInfo: CalendarModel): void {
      patchState(store, (state) => ({
        ...state,
        calendarInfo,
      }));
    },
    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
  })),
);
