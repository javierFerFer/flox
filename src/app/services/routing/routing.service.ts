import { inject, Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { CustomMenuItem } from '../../pages/dashboard/components/custom-breadcrumb/custom-breadcrumb.component';
import { ProjectVersionStore } from '../../stores/project-version/project-version.store';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  private readonly auth = inject(Auth);
  private readonly projectVersionStore = inject(ProjectVersionStore);

  public getRoutingConfig(): CustomMenuItem[] {
    return [
      {
        label: 'NAVIGATION.CLASSES.LABEL',
        icon: 'pi pi-users',
        routerLink: '/dashboard/records',
      },
      {
        label: 'NAVIGATION.CALENDAR.LABEL',
        icon: 'pi pi-calendar-clock',
        routerLink: '/dashboard/calendar',
      },
      {
        label: 'NAVIGATION.SIGN-OUT.LABEL',
        icon: 'pi pi-sign-out',
        command: () => {
          signOut(this.auth).then(() => {
            this.projectVersionStore.resetState();
          });
        },
      },
    ];
  }
}
