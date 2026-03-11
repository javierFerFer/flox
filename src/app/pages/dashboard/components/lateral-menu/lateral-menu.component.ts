import { Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MenuModule } from 'primeng/menu';
import { take } from 'rxjs';
import { ConfigUserService } from '../../../../services/config-user/config-user.service';
import { RoutingService } from '../../../../services/routing/routing.service';
import { UserStore } from '../../../../stores/user/user.store';

@Component({
  selector: 'app-lateral-menu',
  imports: [MenuModule, TranslocoModule, RouterLink],
  templateUrl: 'lateral-menu.component.html',
  styleUrl: 'lateral-menu.component.scss',
  standalone: true,
  host: {
    class: 'hidden lg:block',
  },
})
export class LateralMenuComponent {
  private readonly routingService = inject(RoutingService);
  private readonly userStore = inject(UserStore);
  private readonly configUserService = inject(ConfigUserService);
  protected readonly showStatus = signal<boolean>(
    this.userStore.user().userConfig?.lateralMenuStatus !== undefined
      ? this.userStore.user().userConfig?.lateralMenuStatus!
      : true,
  );

  private readonly allElementsExceptLast = this.routingService
    .getRoutingConfig()
    .slice(0, this.routingService.getRoutingConfig().length - 1);

  private readonly lastElement =
    this.routingService.getRoutingConfig()[
      this.routingService.getRoutingConfig().length - 1
    ];

  model: MenuItem[] = [
    ...this.allElementsExceptLast,
    {
      icon: 'pi pi-arrow-circle-right',
      iconBack: 'pi pi-arrow-circle-left',
      configureAsStatusButton: true,
      command: () => {
        this.showStatus.update((status) => !status);
        const userConfig = this.userStore.user().userConfig;

        this.configUserService
          .updateUserConfig({
            ...userConfig,
            lateralMenuStatus: this.showStatus(),
          })
          .pipe(take(1))
          .subscribe();
      },
    },
    this.lastElement,
  ];
}
