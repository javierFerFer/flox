import { Component, effect, inject, signal, untracked } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CustomMenuBarComponent } from './components/custom-toolbar/custom-menu-bar.component';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';

import { TranslocoDirective } from '@jsverse/transloco';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { take } from 'rxjs';
import { DEFAULT_LANGUAGE } from '../../app.config';
import { ConfigUserService } from '../../services/config-user/config-user.service';
import { ProjectVersionStore } from '../../stores/project-version/project-version.store';
import { UserStore } from '../../stores/user/user.store';
import { PROJECT_VERSION } from '../../version.config';
import { CustomBreadCrumbComponent } from './components/custom-breadcrumb/custom-breadcrumb.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ButtonModule,
    RouterModule,
    LateralMenuComponent,
    CustomMenuBarComponent,
    ToastModule,
    CustomBreadCrumbComponent,
    ConfirmDialogModule,
    TranslocoDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [ConfirmationService],
})
export class DashboardComponent {
  private readonly confirmationService = inject(ConfirmationService);
  private readonly userStore = inject(UserStore);
  private readonly projectVersionStore = inject(ProjectVersionStore);
  private readonly configUserService = inject(ConfigUserService);
  private isClosed = signal(false);
  protected readonly version = inject(PROJECT_VERSION).version;

  private readonly userStateEffect = effect(() => {
    if (this.projectVersionStore.info() && !this.isClosed()) {
      this.openConfirmReadNewChangesDialog(
        untracked(this.projectVersionStore.info)?.content?.[
          this.userStore.user().userConfig?.appLanguage || DEFAULT_LANGUAGE
        ],
      );
    }
  });

  public confirmReadNewChanges() {
    this.isClosed.set(true);
    this.configUserService.updateVersionReadIt().pipe(take(1)).subscribe();
  }

  private openConfirmReadNewChangesDialog(content: string | undefined) {
    this.confirmationService.confirm({
      key: 'confirmReadNewChanges',
      message: content,
      header:
        'DASHBOARD.RECORDS.COMPONENTS.CLASS.CONFIRM_READ_NEW_CHANGES_DIALOG.HEADER',
      icon: 'pi pi-info-circle',
      acceptLabel:
        'DASHBOARD.RECORDS.COMPONENTS.CLASS.CONFIRM_READ_NEW_CHANGES_DIALOG.ACTIONS.CLOSE',
      accept: () => {
        this.confirmReadNewChanges();
      },
    });
  }
}
