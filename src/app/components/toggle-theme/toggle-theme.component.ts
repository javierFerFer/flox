import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { UserStore } from '../../stores/user/user.store';

@Component({
  selector: 'app-toggle-theme',
  imports: [
        ToggleSwitchModule,
        CommonModule,
        FormsModule
  ],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.scss'
})
export class ToggleThemeComponent {
  readonly userStore = inject(UserStore);

  changeTheme(e: any) {
    const theme = e.checked ? 'light' : 'dark';
    this.userStore.updateTheme(theme);
  }
}
