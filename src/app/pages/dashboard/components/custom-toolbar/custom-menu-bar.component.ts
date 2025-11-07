import { Component, DestroyRef, inject, OnInit } from '@angular/core';

import { DEFAULT_THEME, UserStore } from '../../../../stores/user/user.store';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { Router, RouterModule } from '@angular/router';
import { ToggleThemeComponent } from '../../../../components/toggle-theme/toggle-theme.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigUserService } from '../../../../services/config-user/config-user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoutingService } from '../../../../services/routing/routing.service';

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
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.toggleForm.controls.theme.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((themeValue) => {
        this.configUserService.updateUserConfig({
          ...this.userStore.user().userConfig,
          toggleTheme: themeValue ?? DEFAULT_THEME,
        });
      });
  }

  openUserSettings() {
    this.router.navigate([
      'dashboard',
      { outlets: { modal: ['user-config'] } },
    ]);
  }
}
