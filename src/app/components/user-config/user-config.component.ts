import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { UserStore } from '../../stores/user/user.store';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { delay, take } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { Auth, signOut } from '@angular/fire/auth';
import { UserImageComponent } from './components/user-image/user-image.component';
import { ConfigUserService } from '../../services/user/config-user.service';
import { SelectModule } from 'primeng/select';
import { TranslocoHelperService } from '../../services/transoloco-helper/transloco-helper.service';

@Component({
  selector: 'app-user-config',
  imports: [
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    TranslocoDirective,
    SelectModule,
    CardModule,
    UserImageComponent,
  ],
  standalone: true,
  templateUrl: 'user-config.component.html',
})
export class UserConfigModalComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly configUserService = inject(ConfigUserService);
  private readonly toastService = inject(ToastService);
  private readonly translocoHelperService = inject(TranslocoHelperService);
  private readonly translocoService = inject(TranslocoService);
  userStore = inject(UserStore);
  userConfigForm = this.fb.group({
    photo: [this.userStore.user().userConfig?.photo],
    appLanguage: [
      this.userStore.user().userConfig?.appLanguage,
      Validators.required,
    ],
  });

  languages = [] as {}[];

  ngOnInit(): void {
    this.languages = this.translocoHelperService
      .getTranslocoAvailableLangs()
      .map((language) => {
        return {
          name: language.keyToTranslate,
          code: language.key,
        };
      });
  }

  updateUserConfig() {
    const { appLanguage, photo } = this.userConfigForm.getRawValue();
    try {
      this.configUserService
        .updateUserConfig({
          appLanguage: appLanguage || '',
          photo: (photo as any) || '',
          toggleTheme: this.userStore.user().userConfig?.toggleTheme,
        })
        .pipe(take(1), delay(100))
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
