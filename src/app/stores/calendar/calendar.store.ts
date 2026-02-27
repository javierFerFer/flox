import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  CalendarGlobalInfo,
  CalendarInnerConfig,
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
    updateCalendarWeeklyInfo(
      date: string,
      calendarInfo: CalendarInnerConfig[],
    ): void {
      patchState(store, (state) => ({
        ...state,
        calendarInfo: {
          date: date,
          calendarData: {
            ...state.calendarInfo?.calendarData!,
            tableInfo: [
              // ...(state.calendarInfo?.calendarData.tableInfo || []),
              ...calendarInfo,
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
