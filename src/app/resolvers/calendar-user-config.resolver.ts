import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CalendarService } from '../services/calendar/calendar.service';

@Injectable({ providedIn: 'root' })
export class CalendarUserConfigResolver implements Resolve<any> {
  private readonly calendarService = inject(CalendarService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.calendarService.getCalendarUserConfig();
  }
}
