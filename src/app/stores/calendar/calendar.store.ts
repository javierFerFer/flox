import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CalendarModel, TableInfo } from './calendar.model';

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
    clearCalendarInfo(): void {
      patchState(store, (state) => ({
        ...state,
        calendarInfo: undefined,
      }));
    },
    updateCalendarWeeklyInfo(date: string, calendarInfo: TableInfo): void {
      patchState(store, (state) => ({
        ...state,
        calendarInfo: {
          date: date,
          calendarData: {
            ...state.calendarInfo?.calendarData!,
            tableInfo: [
              ...(state.calendarInfo?.calendarData.tableInfo || []),
              calendarInfo,
            ],
          },
        },
      }));
    },
    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
  })),
);
