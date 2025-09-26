import { Component, inject } from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UserStore } from '../../../../stores/user/user.store';

@Component({
  selector: 'app-custom-toolbar',
  imports: [ToolbarModule, AvatarModule, AvatarGroupModule],
  standalone: true,
  templateUrl: 'custom-toolbar.component.html',
})
export class CustomToolbarComponent {
  userStore = inject(UserStore);
}
