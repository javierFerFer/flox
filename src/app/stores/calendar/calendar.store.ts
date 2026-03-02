import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  CalendarGlobalInfo,
  CalendarModel,
  CalendarUserConfig,
} from './calendar.model';

type CalendarState = {
  calendarInfo: CalendarModel | undefined;
  calendarGlobalInfo: CalendarGlobalInfo | undefined;
  calendarUserConfig: CalendarUserConfig[] | undefined;
  isLoading: boolean;
};

const initialState: CalendarState = {
  calendarInfo: undefined,
  calendarGlobalInfo: undefined,
  calendarUserConfig: undefined,
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
    updateCalendarGlobalInfo(calendarGlobalInfo: { [key: string]: string }) {
      patchState(store, (state) => ({
        ...state,
        calendarGlobalInfo: {
          calendarInfo: { ...calendarGlobalInfo },
        },
      }));
    },
    updateCalendarUserConfig(calendarUserConfig: CalendarUserConfig[]) {
      patchState(store, (state) => ({
        ...state,
        calendarUserConfig,
      }));
    },
    updateCalendarWeeklyInfo(calendarModel: CalendarModel): void {
      patchState(store, (state) => ({
        ...state,
        calendarInfo: calendarModel,
      }));
    },
    setIsLoading(isLoading: boolean): void {
      patchState(store, (state) => ({ ...state, isLoading }));
    },
  })),
);
