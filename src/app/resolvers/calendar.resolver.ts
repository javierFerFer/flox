import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CalendarService } from '../services/calendar/calendar.service';

@Injectable({ providedIn: 'root' })
export class CalendarResolver implements Resolve<any> {
  private calendarService = inject(CalendarService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const selectedDate =
      route.queryParams['selectedDate'] ||
      new Date(new Date().setHours(0, 0, 0, 0)).toUTCString();
    return this.calendarService.getCalendarInfo(selectedDate);
  }
}
