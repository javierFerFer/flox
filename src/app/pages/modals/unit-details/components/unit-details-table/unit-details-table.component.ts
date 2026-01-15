import {
  booleanAttribute,
  Component,
  computed,
  inject,
  Input,
} from '@angular/core';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { UnityStore } from '../../../../../stores/unity/unity.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UnityModel } from '../../../../../stores/unity/unity.model';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { UnitsService } from '../../../../../services/unity/unity.service';
import { take } from 'rxjs';
import { ToastService } from '../../../../../services/toast/toast.service';
import { TextEditorComponent } from '../../../../../components/text-editor/text-editor.component';

@Component({
  selector: 'app-unit-details-table',
  templateUrl: 'unit-details-table.component.html',
  imports: [
    TableModule,
    ContextMenuModule,
    TranslocoDirective,
    ButtonModule,
    RippleModule,
    RouterModule,
    ConfirmDialogModule,
    TextEditorComponent,
  ],
  standalone: true,
  host: {
    class: 'w-full',
  },
})
export class UnitDetailsTableComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly uuid = toSignal(this.route.params);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly unitsService = inject(UnitsService);
  private readonly toastService = inject(ToastService);

  protected unityStore = inject(UnityStore);
  protected selectedUnit = computed(() => {
    return this.unityStore.findUnit(this.uuid()?.['id'])!;
  });

  selectedUuid!: string | undefined;

  @Input({ transform: booleanAttribute })
  readOnly = false;

  items: MenuItem[] | undefined = [
    {
      label:
        'DASHBOARD.RECORDS.MODALS.CREATE_NEW_SESSION.TABLE.CONTEXT_MENU_ACTIONS.EDIT',
      icon: 'pi pi-file-edit',
      command: () => {
        this.router.navigate(
          [
            {
              outlets: {
                sessionDetails: ['session-details', this.selectedUuid],
              },
            },
          ],
          { relativeTo: this.route },
        );
      },
    },
    {
      label:
        'DASHBOARD.RECORDS.MODALS.CREATE_NEW_SESSION.TABLE.CONTEXT_MENU_ACTIONS.DELETE',
      icon: 'pi pi-trash',
      command: (event: any) => {
        this.confirmationService.confirm({
          key: 'deleteSessionConfirmDialog',
          target: event.target as EventTarget,
          message:
            'DASHBOARD.RECORDS.MODALS.CREATE_NEW_SESSION.TABLE.CONFIRM_DELETE_SESSION_DIALOG.MESSAGE',
          header:
            'DASHBOARD.RECORDS.MODALS.CREATE_NEW_SESSION.TABLE.CONFIRM_DELETE_SESSION_DIALOG.HEADER',
          icon: 'pi pi-info-circle',
          acceptLabel:
            'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.ACTIONS.DELETE',
          rejectLabel:
            'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.ACTIONS.CANCEL',
          accept: () => {
            try {
              this.unityStore.setIsLoading(true);
              const selectedUnit = {
                ...this.selectedUnit(),
                sessions: [...(this.selectedUnit()?.sessions || [])].filter(
                  (session) => {
                    return session.uuid !== this.selectedUuid;
                  },
                ),
              } as UnityModel;
              this.unitsService
                .deleteUnitSession(selectedUnit)
                .pipe(take(1))
                .subscribe(() => {
                  this.selectedUuid = undefined;
                  this.toastService.showSuccessMessage({
                    summaryToTranslate:
                      'DASHBOARD.RECORDS.MODALS.CREATE_NEW_SESSION.TABLE.CONFIRM_DELETE_SESSION_DIALOG.RESULT.SUCCESS.SUMMARY',
                    detailToTranslate:
                      'DASHBOARD.RECORDS.MODALS.CREATE_NEW_SESSION.TABLE.CONFIRM_DELETE_SESSION_DIALOG.RESULT.SUCCESS.DETAIL',
                  });
                });
            } catch (error) {
              this.unityStore.setIsLoading(false);
              this.selectedUuid = undefined;
              this.toastService.showErrorMessage({
                summaryToTranslate:
                  'DASHBOARD.RECORDS.MODALS.CREATE_NEW_SESSION.TABLE.CONFIRM_DELETE_SESSION_DIALOG.RESULT.ERROR.SUMMARY',
                detailToTranslate:
                  'DASHBOARD.RECORDS.MODALS.CREATE_NEW_SESSION.TABLE.CONFIRM_DELETE_SESSION_DIALOG.RESULT.ERROR.DETAIL',
              });
            }
          },
        });
      },
    },
  ];

  addNewSession() {
    this.router.navigate(
      [
        {
          outlets: {
            createUnitSession: ['create-unit-session'],
          },
        },
      ],
      { relativeTo: this.route },
    );
  }
}
