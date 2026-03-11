import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter, map } from 'rxjs';
import { RoutingService } from '../../../../services/routing/routing.service';
import { ClassStore } from '../../../../stores/class/class.store';

export interface CustomMenuItem extends MenuItem {
  property?: {
    value: string;
  };
}

@Component({
  selector: 'app-custom-breadcrumb',
  templateUrl: 'custom-breadcrumb.component.html',
  imports: [BreadcrumbModule, TranslocoModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomBreadCrumbComponent {
  home: MenuItem | undefined = { icon: 'pi pi-home', routerLink: '/dashboard' };
  private readonly routingService = inject(RoutingService);
  private readonly router = inject(Router);
  private readonly classStore = inject(ClassStore);
  private readonly routerElements = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((e) => {
        return this.detectClass((e as NavigationEnd).url);
      }),
    ),
  );
  protected navigationElements = computed(() => {
    const routerElements = this.routerElements();
    return (
      routerElements ? routerElements : this.detectClass(this.router.url)
    ) as MenuItem[];
  });
  protected navigationElementsInit = this.routingService
    .getRoutingConfig()
    .slice(0, this.routingService.getRoutingConfig().length - 1);

  private detectClass(url: string): CustomMenuItem[] {
    let navElementsToShow = this.navigationElementsInit.flatMap<MenuItem>(
      (navElementInit) => {
        return url.includes(navElementInit.routerLink) ? navElementInit : [];
      },
    );

    if (url.includes('classTable:class')) {
      const className = this.classStore.activeClass()?.name;
      navElementsToShow = navElementsToShow.concat({
        label: 'NAVIGATION.SELECTED_CLASS.LABEL',
        icon: 'pi pi-graduation-cap',
        property: {
          value: className,
        },
      });
    }
    return navElementsToShow;
  }
}
