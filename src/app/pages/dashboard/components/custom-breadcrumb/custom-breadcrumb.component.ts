import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslocoModule } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { RoutingService } from '../../../../services/routing/routing.service';

@Component({
  selector: 'app-custom-breadcrumb',
  templateUrl: 'custom-breadcrumb.component.html',
  imports: [BreadcrumbModule, TranslocoModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomBreadCrumbComponent {
  home: MenuItem | undefined = { icon: 'pi pi-home', routerLink: '/dashboard' };
  private readonly routingService = inject(RoutingService);
  navigationElements = this.routingService.getRoutingConfig().slice(0, 1);
}
