import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleThemeComponent } from '../../components/toggle-theme/toggle-theme.component';
import { RippleModule } from 'primeng/ripple';
import { UserStore } from '../../stores/user/user.store';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { UserService } from '../../services/user/user.service';
import { take } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { Auth, signOut } from '@angular/fire/auth';
import { UserImageComponent } from './components/user-image/user-image.component';

@Component({
  selector: 'app-user-config',
  imports: [
    ToggleThemeComponent,
    FloatLabelModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoDirective,
    CardModule,
    UserImageComponent,
  ],
  standalone: true,
  templateUrl: 'user-config.component.html',
})
export class UserConfigModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly userService = inject(UserService);
  private readonly toastService = inject(ToastService);

  userStore = inject(UserStore);
  userConfigForm = this.fb.group({
    photo: [this.userStore.user().userConfig?.photo],
    username: [
      this.userStore.user().userConfig?.username,
      [Validators.required, Validators.maxLength(12)],
    ],
    appLanguage: [
      this.userStore.user().userConfig?.appLanguage,
      // Validators.required,
    ],
    toggleTheme: [
      this.userStore.user().userConfig?.toggleTheme,
      Validators.required,
    ],
  });

  updateUserConfig() {
    const { appLanguage, photo, toggleTheme, username } =
      this.userConfigForm.getRawValue();
    try {
      console.log(appLanguage);
      console.log(photo);
      console.log(toggleTheme);
      console.log(username);
      this.userService
        .updateUserConfig({
          appLanguage: appLanguage || '',
          photo: (photo as any) || '',
          username: username || '',
          toggleTheme: toggleTheme || undefined,
        })
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.showSuccessMessage({
            summaryToTranslate:
              'SHARED_MODALS.USER_CONFIG.FORM.MESSAGES.USER_EDIT_SUCCESS.SUMMARY',
            detailToTranslate:
              'SHARED_MODALS.USER_CONFIG.FORM.MESSAGES.USER_EDIT_SUCCESS.DETAIL',
          });
        });
    } catch (error) {
      this.userStore.setIsLoading(false);
      this.toastService.showErrorMessage({
        summaryToTranslate:
          'SHARED_MODALS.USER_CONFIG.FORM.MESSAGES.USER_EDIT_SUCCESS.SUMMARY',
        detailToTranslate:
          'SHARED_MODALS.USER_CONFIG.FORM.MESSAGES.USER_EDIT_SUCCESS.DETAIL',
      });
    }
  }

  closeSession() {
    signOut(this.auth);
  }
}
