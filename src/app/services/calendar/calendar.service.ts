import { inject, Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs';
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
        }
      }),
      finalize(() => {
        this.calendarStore.setIsLoading(false);
      }),
    );
  }
}
