import { Component } from '@angular/core';

import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-lateral-menu',
  imports: [MenuModule],
  templateUrl: 'lateral-menu.component.html',
  styleUrl: 'lateral-menu.component.scss',
  standalone: true,
})
export class LateralMenuComponent {
  // continuar aca
  model = [
    {
      icon: 'pi pi-user',
      label: 'test me',
      routerLink: ['/dashboard/records'],
    },
    { icon: 'pi pi-search', routerLink: ['/dashboard/recordsasdasd'] },
  ];
}
