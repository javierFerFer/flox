import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CalendarStore } from '../stores/calendar/calendar.store';

@Injectable({ providedIn: 'root' })
export class CanDeactivateCalendarUserInfoGuard
  implements CanDeactivate<boolean | Promise<boolean>>
{
  private readonly calendarStore = inject(CalendarStore);

  canDeactivate(): boolean | Promise<boolean> {
    return this.calendarStore.calendarUserConfig() !== undefined;
  }
}
