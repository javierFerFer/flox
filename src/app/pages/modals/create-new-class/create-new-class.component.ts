import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { UserStore } from '../../../stores/user/user.store';

@Component({
  selector: 'app-create-new-class',
  imports: [
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    TranslocoDirective,
    SelectModule,
    CardModule,
  ],
  standalone: true,
  templateUrl: 'create-new-class.component.html',
})
export class CreateNewClassModalComponent {
  private readonly fb = inject(FormBuilder);
  userStore = inject(UserStore);
  userConfigForm = this.fb.group({
    photo: [this.userStore.user().userConfig?.photo],
    appLanguage: [
      this.userStore.user().userConfig?.appLanguage,
      Validators.required,
    ],
  });
}
