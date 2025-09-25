import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleThemeComponent } from '../../components/toggle-theme/toggle-theme.component';
import { UserStore } from '../../stores/user/user.store';
import { PROJECT_VERSION } from '../../version.config';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    TranslocoModule,
    ToggleThemeComponent,
    FloatLabelModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userStore = inject(UserStore);
  private readonly authService = inject(AuthService);
  public version = inject(PROJECT_VERSION).version;

  userForm = this.fb.group({
    username: [this.userStore.user().username, Validators.required],
    password: [this.userStore.user().username, Validators.required],
  });

  logIn() {
    if (this.userForm.controls.username.invalid) {
      return;
    }
    const { username, password } = this.userForm.getRawValue();
    this.authService
      .login(username || '', password || '')
      .subscribe(console.log);
    // this.userStore.updateUser({
    //   username: this.userForm.controls.username.value || '',
    // });
  }
}
