import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CalendarStore } from '../stores/calendar/calendar.store';

@Injectable({ providedIn: 'root' })
export class CanActivateCalendarUserInfoEditGuard implements CanActivate {
  private readonly calendarStore = inject(CalendarStore);
  private readonly router = inject(Router);

  canActivate(): boolean | Promise<boolean> {
    if (!this.calendarStore.mappedCalendarHeadersInfo().length) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
