import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { UserStore } from '../../stores/user/user.store';

@Component({
  selector: 'app-login',
  imports: [
    ToggleSwitchModule,
    CommonModule,
    CardModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly userStore = inject(UserStore);


  changeTheme(e: any) {
    const theme = e.checked ? 'light' : 'dark';
    this.userStore.updateTheme(theme);
  }
}
