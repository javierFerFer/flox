import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CalendarService } from '../services/calendar/calendar.service';

@Injectable({ providedIn: 'root' })
export class CalendarResolver implements Resolve<any> {
  private calendarService = inject(CalendarService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const start = this.selectFirstDay(new Date());

    const selectedDate =
      route.queryParams['selectedDate'] || start.toUTCString();

    return this.calendarService.getCalendarInfo(selectedDate);
  }

  selectFirstDay(evt: Date) {
    let start = new Date(evt);
    start.setDate(start.getDate() - start.getDay());
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());
    return start;
  }
}
