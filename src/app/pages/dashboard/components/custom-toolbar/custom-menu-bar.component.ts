import { Component, DestroyRef, effect, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MenubarModule } from 'primeng/menubar';
import { switchMap, take } from 'rxjs';
import { DEFAULT_COLOR } from '../../../../../../app.theme';
import { ToggleThemeComponent } from '../../../../components/toggle-theme/toggle-theme.component';
import { ConfigUserService } from '../../../../services/config-user/config-user.service';
import { RoutingService } from '../../../../services/routing/routing.service';
import { DEFAULT_THEME, UserStore } from '../../../../stores/user/user.store';

@Component({
  selector: 'app-custom-menu-bar',
  imports: [
    MenubarModule,
    AvatarGroupModule,
    AvatarModule,
    CommonModule,
    TranslocoDirective,
    RouterModule,
    ToggleThemeComponent,
    ReactiveFormsModule,
    FormsModule,
    ColorPickerModule,
  ],
  standalone: true,
  templateUrl: 'custom-menu-bar.component.html',
  styleUrl: 'custom-menu-bar.component.scss',
})
export class CustomMenuBarComponent implements OnInit {
  userStore = inject(UserStore);
  private readonly routingService = inject(RoutingService);
  model: MenuItem[] = this.routingService.getRoutingConfig();
  private readonly fb = inject(FormBuilder);
  private readonly configUserService = inject(ConfigUserService);
  private readonly destroyRef = inject(DestroyRef);

  toggleForm = this.fb.group({
    theme: [this.userStore.user().userConfig?.toggleTheme],
    userColorScheme: [
      this.userStore.user().userConfig?.userColorScheme ?? DEFAULT_COLOR,
    ],
  });

  constructor(private router: Router) {
    effect(() => {
      const colorScheme = this.userStore.userColorScheme();
      this.toggleForm.patchValue(
        {
          ...this.toggleForm.getRawValue(),
          userColorScheme: colorScheme,
        },
        { emitEvent: false, onlySelf: true },
      );
    });
  }

  ngOnInit(): void {
    this.toggleForm.controls.theme.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((theme) => {
          return this.configUserService
            .updateUserConfig({
              ...this.userStore.user().userConfig,
              toggleTheme: theme ?? DEFAULT_THEME,
            })
            .pipe(take(1));
        }),
      )
      .subscribe();
  }

  updateUserColorInterface() {
    this.configUserService
      .updateUserConfig({
        ...this.userStore.user().userConfig,
        userColorScheme: this.toggleForm.controls.userColorScheme.value!,
      })
      .pipe(take(1))
      .subscribe();
  }

  openUserSettings() {
    this.router.navigate(
      ['dashboard', { outlets: { modal: ['user-config'] } }],
      {
        queryParamsHandling: 'preserve',
      },
    );
  }
}
