import { inject, Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { TableInfo } from '../../stores/calendar/calendar.model';
import { CalendarStore } from '../../stores/calendar/calendar.store';
import { CalendarApiService } from './calendar-api.service';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  private readonly calendarApiService = inject(CalendarApiService);
  private calendarStore = inject(CalendarStore);

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

  public updateCalendarWeeklyInfo(date: string, weeklyInfo: TableInfo) {
    this.calendarStore.setIsLoading(true);

    let selectedCalendarInfo = this.calendarStore.calendarInfo();
    selectedCalendarInfo = {
      ...selectedCalendarInfo,
      date,
      calendarData: {
        ...(selectedCalendarInfo?.calendarData || {}),
        tableInfo: [
          ...(selectedCalendarInfo?.calendarData?.tableInfo || []),
          weeklyInfo,
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
}
