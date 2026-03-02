import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslocoModule } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { RoutingService } from '../../../../services/routing/routing.service';
import { CommonModule } from '@angular/common';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClassStore } from '../../../../stores/class/class.store';

interface CustomMenuItem extends MenuItem {
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
