import { inject, Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs';
import {
  CalendarInnerConfig,
  CalendarUserConfig,
} from '../../stores/calendar/calendar.model';
import { CalendarStore } from '../../stores/calendar/calendar.store';
import { CalendarApiService } from './calendar-api.service';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  private readonly calendarApiService = inject(CalendarApiService);
  private calendarStore = inject(CalendarStore);

  public getCalendarGlobalConfig() {
    this.calendarStore.setIsLoading(true);
    return this.calendarApiService.getCalendarGlobalConfig().pipe(
      tap((result) => {
        if (result) {
          this.calendarStore.updateCalendarGlobalInfo(result);
        }
      }),
      finalize(() => {
        this.calendarStore.setIsLoading(false);
      }),
    );
  }

  public getCalendarUserConfig() {
    this.calendarStore.setIsLoading(true);
    return this.calendarApiService.getCalendarUserConfig().pipe(
      tap((result) => {
        if (result) {
          const convertedToArray: CalendarUserConfig[] = Object.values(result);
          this.calendarStore.updateCalendarUserConfig(convertedToArray);
        }
      }),
      finalize(() => {
        this.calendarStore.setIsLoading(false);
      }),
    );
  }

  public getCalendarInfo(date: string) {
    this.calendarStore.setIsLoading(true);
    return this.calendarApiService.getCalendarInfo(date).pipe(
      tap((result) => {
        if (result) {
          this.calendarStore.updateCalendar(result);
        } else {
          this.calendarStore.clearCalendarInfo();
        }
      }),
      finalize(() => {
        this.calendarStore.setIsLoading(false);
      }),
    );
  }

  public updateCalendarWeeklyInfo(
    date: string,
    weeklyInfo: CalendarInnerConfig[],
  ) {
    this.calendarStore.setIsLoading(true);

    let selectedCalendarInfo = this.calendarStore.calendarInfo();
    selectedCalendarInfo = {
      ...selectedCalendarInfo,
      date,
      calendarData: {
        ...(selectedCalendarInfo?.calendarData || {}),
        tableInfo: [
          // ...(selectedCalendarInfo?.calendarData?.tableInfo || []),
          ...weeklyInfo,
        ],
      },
    };

    return this.calendarApiService
      .updateCalendarWeeklyInfo(date, selectedCalendarInfo)
      .pipe(
        tap(() => {
          this.calendarStore.updateCalendarWeeklyInfo(date, weeklyInfo);
        }),
        finalize(() => {
          this.calendarStore.setIsLoading(false);
        }),
      );
  }

  public updateUserCalendarConfig(data: CalendarUserConfig[]) {
    this.calendarStore.setIsLoading(true);

    return this.calendarApiService.updateUserCalendarConfig(data).pipe(
      tap(() => {
        this.calendarStore.updateCalendarUserConfig(data);
      }),
      finalize(() => {
        this.calendarStore.setIsLoading(false);
      }),
    );
  }

  public convertToObject(arr: string[]): CalendarUserConfig[] {
    return arr.map((value) => ({
      value,
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
    }));
  }
}
