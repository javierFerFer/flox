import { Component, inject } from '@angular/core';

import { UserStore } from '../../../../stores/user/user.store';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CommonModule } from '@angular/common';
import { NAVIGATION_ELEMENTS } from '../../../../app.routes';
import { TranslocoDirective } from '@jsverse/transloco';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-custom-menu-bar',
  imports: [
    MenubarModule,
    AvatarGroupModule,
    AvatarModule,
    CommonModule,
    TranslocoDirective,
    RouterModule,
  ],
  standalone: true,
  templateUrl: 'custom-menu-bar.component.html',
  styleUrl: 'custom-menu-bar.component.scss',
})
export class CustomMenuBarComponent {
  userStore = inject(UserStore);
  model: MenuItem[] = NAVIGATION_ELEMENTS;

  constructor(private router: Router) {}

  openUserSettings() {
    this.router.navigate([
      'dashboard',
      { outlets: { modal: ['user-config'] } },
    ]);
  }
}
