import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleThemeComponent } from '../../components/toggle-theme/toggle-theme.component';
import { RippleModule } from 'primeng/ripple';
import { UserStore } from '../../stores/user/user.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-config',
  imports: [
    ToggleThemeComponent,
    FloatLabelModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
  standalone: true,
  templateUrl: 'user-config.component.html',
})
export class UserConfigModalComponent {
  private readonly fb = inject(FormBuilder);
  userStore = inject(UserStore);
  userConfigForm = this.fb.group({
    photo: [undefined],
    username: [undefined, Validators.required],
    appLanguage: [undefined, Validators.required],
    toggleTheme: [undefined, Validators.required],
  });
}
