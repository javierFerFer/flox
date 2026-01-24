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
import { catchError, EMPTY, take } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast/toast.service';
import { Auth } from '@angular/fire/auth';

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
    RouterModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly auth = inject(Auth);
  userStore = inject(UserStore);

  public version = inject(PROJECT_VERSION).version;

  userForm = this.fb.group({
    username: [this.userStore.user().email, Validators.required],
    password: [undefined, Validators.required],
  });

  constructor(private router: Router) {}

  logIn() {
    const { username, password } = this.userForm.getRawValue();
    this.authService
      .login(username || '', password || '')
      .pipe(
        take(1),
        catchError(() => {
          this.toastService.showErrorMessage({
            summaryToTranslate: 'LOGIN_PAGE.ERRORS.CREDENTIALS_ERROR.TITLE',
            detailToTranslate: 'LOGIN_PAGE.ERRORS.CREDENTIALS_ERROR.MESSAGE',
          });
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.router.navigate(['dashboard']);
      });
  }
}
