import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CalendarService } from '../services/calendar/calendar.service';

@Injectable({ providedIn: 'root' })
export class CalendarGlobalConfigResolver implements Resolve<any> {
  private calendarService = inject(CalendarService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.calendarService.getCalendarGlobalConfig();
  }
}
