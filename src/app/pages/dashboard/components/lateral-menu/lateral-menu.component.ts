import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { MenuModule } from 'primeng/menu';
import { Auth } from '@angular/fire/auth';
import { ProjectVersionStore } from '../../../../stores/project-version/project-version.store';
import { RoutingService } from '../../../../services/routing/routing.service';

@Component({
  selector: 'app-lateral-menu',
  imports: [MenuModule],
  templateUrl: 'lateral-menu.component.html',
  styleUrl: 'lateral-menu.component.scss',
  standalone: true,
  host: {
    class: 'hidden lg:block',
  },
})
export class LateralMenuComponent {
  private readonly auth = inject(Auth);
  private readonly projectVersionStore = inject(ProjectVersionStore);
  private readonly routingService = inject(RoutingService);

  model: MenuItem[] = this.routingService.getRoutingConfig().map((nE) => {
    return {
      ...nE,
      label: undefined,
    };
  });
}
