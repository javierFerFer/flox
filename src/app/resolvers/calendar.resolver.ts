import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CalendarStore } from '../stores/calendar/calendar.store';

@Injectable({ providedIn: 'root' })
export class CalendarResolver implements Resolve<any> {
  private readonly calendarStore = inject(CalendarStore);

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const selectedDate =
      route.queryParams['selectedDate'] ||
      new Date(new Date().setHours(0, 0, 0, 0)).toUTCString();
    console.log(selectedDate);
    // get class info here with the selected date using service + api layer
    return of(true);
  }
}
