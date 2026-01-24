import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import {
  DEFAULT_THEME,
  themesEnum,
  UserStore,
} from '../../stores/user/user.store';
import { UserTheme } from '../../resolvers/user-config-modal.resolver';

@Component({
  selector: 'app-toggle-theme',
  imports: [ToggleSwitchModule, CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleThemeComponent),
      multi: true,
    },
  ],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.scss',
})
export class ToggleThemeComponent implements ControlValueAccessor {
  readonly userStore = inject(UserStore);
  disabled = false;

  changeTheme(e: any) {
    const theme = e.checked ? themesEnum.LIGHT : themesEnum.DARK;
    this.onChange(theme);
    this.onTouched();

    this.userStore.updateTheme(theme);
  }

  onChange = (theme: UserTheme) => {
    const actualTheme = this.userStore.user().userConfig?.toggleTheme;
    this.userStore.updateTheme(theme);
  };
  onTouched = () => {};
  writeValue(e: any): void {
    const theme = e === DEFAULT_THEME ? themesEnum.LIGHT : themesEnum.DARK;
    this.userStore.updateTheme(theme);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
