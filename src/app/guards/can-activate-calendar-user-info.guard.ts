import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CalendarStore } from '../stores/calendar/calendar.store';

@Injectable({ providedIn: 'root' })
export class CanActivateCalendarUserInfoGuard implements CanActivate {
  private readonly calendarStore = inject(CalendarStore);

  canActivate(): boolean | Promise<boolean> {
    return this.calendarStore.calendarUserConfig() == undefined;
  }
}
