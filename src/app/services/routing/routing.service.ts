import { inject, Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { ProjectVersionStore } from '../../stores/project-version/project-version.store';
import { MenuItem } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  private readonly auth = inject(Auth);
  private readonly projectVersionStore = inject(ProjectVersionStore);

  public getRoutingConfig(): MenuItem[] {
    return [
      {
        label: 'NAVIGATION.CLASSES.LABEL',
        icon: 'pi pi-users',
        routerLink: '/dashboard/records',
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
