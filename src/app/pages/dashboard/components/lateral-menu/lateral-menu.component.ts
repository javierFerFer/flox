import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { MenuModule } from 'primeng/menu';
import { NAVIGATION_ELEMENTS } from '../../../../app.routes';

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
  model: MenuItem[] = NAVIGATION_ELEMENTS.map((nE) => {
    return {
      ...nE,
      label: undefined,
    };
  });
}
