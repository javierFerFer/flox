import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { delay, take } from 'rxjs';
import { DEFAULT_COLOR } from '../../../../../../../app.theme';
import { DEFAULT_LANGUAGE } from '../../../../../app.config';
import { ConfigUserService } from '../../../../../services/config-user/config-user.service';
import { ToastService } from '../../../../../services/toast/toast.service';
import { TranslocoHelperService } from '../../../../../services/transoloco-helper/transloco-helper.service';
import { UserStore } from '../../../../../stores/user/user.store';
import { UserImageComponent } from '../user-image/user-image.component';

@Component({
  selector: 'app-user-preferences',
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
  templateUrl: 'user-preferences.component.html',
})
export class UserPreferencesComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly configUserService = inject(ConfigUserService);
  private readonly toastService = inject(ToastService);
  private readonly translocoHelperService = inject(TranslocoHelperService);

  userStore = inject(UserStore);
  protected readonly userColorScheme = this.userStore.userColorScheme;
  protected readonly DEFAULT_COLOR = DEFAULT_COLOR;

  userConfigForm = this.fb.group({
    photo: [this.userStore.user().userConfig?.photo],
    appLanguage: [
      this.userStore.user().userConfig?.appLanguage,
      Validators.required,
    ],
    autoComplete: [
      this.userStore.user().userConfig?.suggestInputs || false,
      Validators.required,
    ],
  });

  languages = [] as {}[];
  autoCompleteOptions = [
    {
      name: 'SHARED_MODALS.USER_CONFIG.FORM.AUTO_SUGGEST_INPUTS.OPTIONS.ON',
      value: true,
    },
    {
      name: 'SHARED_MODALS.USER_CONFIG.FORM.AUTO_SUGGEST_INPUTS.OPTIONS.OFF',
      value: false,
    },
  ];

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

  resetDefaultColorScheme() {
    this.configUserService
      .updateUserConfig({
        ...this.userStore.user().userConfig,
        userColorScheme: DEFAULT_COLOR,
      })
      .pipe(take(1))
      .subscribe();
  }

  updateUserConfig() {
    const { appLanguage, photo, autoComplete } =
      this.userConfigForm.getRawValue();
    try {
      this.configUserService
        .updateUserConfig({
          appLanguage: appLanguage || DEFAULT_LANGUAGE,
          photo: (photo as any) || '',
          toggleTheme: this.userStore.user().userConfig?.toggleTheme,
          suggestInputs: autoComplete || false,
          userColorScheme: this.userStore.userColorScheme(),
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
}
