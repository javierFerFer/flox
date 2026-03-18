import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MenuModule } from 'primeng/menu';
import { CalendarStore } from '../../../../../stores/calendar/calendar.store';
import { CustomMenuItem } from '../../../../dashboard/components/custom-breadcrumb/custom-breadcrumb.component';

@Component({
  selector: 'app-user-config-navbar',
  standalone: true,
  imports: [MenuModule, TranslocoModule, RouterLink],
  templateUrl: './user-config-navbar.component.html',
  styleUrl: './user-config-navbar.component.scss',
})
export class UserConfigNavbarComponent {
  private readonly calendarStore = inject(CalendarStore);
  public model: CustomMenuItem[] = [
    {
      label: 'SHARED_MODALS.USER_CONFIG.SUB_HEADER',
      icon: 'pi pi-user-edit',
      routerLink: [{ outlets: { 'user-config-outlet': ['preferences'] } }],
      queryParamsHandling: 'preserve',
    },
    this.calendarStore.mappedCalendarHeadersInfo().length
      ? {
          label: 'NAVIGATION.CALENDAR.LABEL',
          icon: 'pi pi-calendar-clock',
          routerLink: [
            { outlets: { 'user-config-outlet': ['calendar-preferences'] } },
          ],
          queryParamsHandling: 'preserve',
        }
      : {},
  ];
}
