import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslocoModule } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { NAVIGATION_ELEMENTS } from '../../../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-custom-breadcrumb',
  templateUrl: 'custom-breadcrumb.component.html',
  imports: [BreadcrumbModule, TranslocoModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomBreadCrumbComponent {
  home: MenuItem | undefined = { icon: 'pi pi-home', routerLink: '/dashboard' };
  navigationElements = NAVIGATION_ELEMENTS;
}
