import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CalendarService } from '../services/calendar/calendar.service';

@Injectable({ providedIn: 'root' })
export class CalendarUserConfigResolver implements Resolve<any> {
  private readonly calendarService = inject(CalendarService);

  resolve(): Observable<any> | Promise<any> | any {
    return this.calendarService.getCalendarUserConfig();
  }
}
