import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-lateral-menu',
  imports: [MenuModule, RouterModule],
  templateUrl: 'lateral-menu.component.html',
  styleUrl: 'lateral-menu.component.scss',
  standalone: true,
})
export class LateralMenuComponent {
  constructor(private router: Router) {}

  // continuar aca
  model: MenuItem[] = [
    {
      icon: 'pi pi-home',
      // route: '/dashboard/records',
      routerLink: '/dashboard/records',
      // url: '/dashboard/records',
      // opcionalmente:
      // routerLinkActiveOptions: { exact: false },
      // command: () => {
      //   console.log('hola');
      //   this.router.navigate(['installation']);
      // },
    },
    // etc.
  ];
}
