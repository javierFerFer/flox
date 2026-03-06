import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  CalendarGlobalInfo,
  CalendarInnerConfig,
  CalendarInnerElement,
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
  withComputed(({ calendarInfo, calendarUserConfig }) => ({
    mappedCalendarInfo: computed(() => {
      const userInfo = calendarUserConfig()!;
      return (calendarInfo()?.calendarData.tableInfo || userInfo || []).map(
        (c) =>
          ({
            value: c.value,
            monday: {
              tag:
                typeof c.monday === 'object'
                  ? (c.monday as CalendarInnerElement).tag
                  : c.monday,
              value:
                typeof c.monday === 'object'
                  ? (c.monday as CalendarInnerElement).value
                  : '',
            },
            tuesday: {
              tag:
                typeof c.tuesday === 'object'
                  ? (c.tuesday as CalendarInnerElement).tag
                  : c.tuesday,
              value:
                typeof c.tuesday === 'object'
                  ? (c.tuesday as CalendarInnerElement).value
                  : '',
            },
            wednesday: {
              tag:
                typeof c.wednesday === 'object'
                  ? (c.wednesday as CalendarInnerElement).tag
                  : c.wednesday,
              value:
                typeof c.wednesday === 'object'
                  ? (c.wednesday as CalendarInnerElement).value
                  : '',
            },
            thursday: {
              tag:
                typeof c.thursday === 'object'
                  ? (c.thursday as CalendarInnerElement).tag
                  : c.thursday,
              value:
                typeof c.thursday === 'object'
                  ? (c.thursday as CalendarInnerElement).value
                  : '',
            },
            friday: {
              tag:
                typeof c.friday === 'object'
                  ? (c.friday as CalendarInnerElement).tag
                  : c.friday,
              value:
                typeof c.friday === 'object'
                  ? (c.friday as CalendarInnerElement).value
                  : '',
            },
          }) as CalendarInnerConfig,
      );
    }),
  })),
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
