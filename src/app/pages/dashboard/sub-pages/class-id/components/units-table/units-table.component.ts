import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { take } from 'rxjs';
import { TextEditorComponent } from '../../../../../../components/text-editor/text-editor.component';
import { ToastService } from '../../../../../../services/toast/toast.service';
import { UnitsService } from '../../../../../../services/unity/unity.service';
import { ClassStore } from '../../../../../../stores/class/class.store';
import { UnityStore } from '../../../../../../stores/unity/unity.store';

@Component({
  selector: 'app-units-table',
  templateUrl: 'units-table.component.html',
  imports: [
    TranslocoDirective,
    TableModule,
    ConfirmDialogModule,
    ButtonModule,
    RippleModule,
    RouterOutlet,
    TextEditorComponent,
  ],
})
export class UnitsTableComponent {
  selectedUuid!: string | undefined;
  private readonly confirmationService = inject(ConfirmationService);
  readonly unitStore = inject(UnityStore);
  readonly classStore = inject(ClassStore);
  private readonly unitsService = inject(UnitsService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly unityStore = inject(UnityStore);
  readonly unitsList = this.unityStore.units;

  items: MenuItem[] | undefined = [
    {
      label:
        'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONTEXT_MENU_ACTIONS.SHOW',
      icon: 'pi pi-eye',
      command: () => {
        this.router.navigate(
          [
            {
              outlets: {
                unitDetails: ['unit-details', 'show', this.selectedUuid],
              },
            },
          ],
          { relativeTo: this.route },
        );
      },
    },
    {
      label:
        'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONTEXT_MENU_ACTIONS.EDIT',
      icon: 'pi pi-file-edit',
      command: () => {
        this.router.navigate(
          [
            {
              outlets: {
                unitDetails: ['unit-details', 'edit', this.selectedUuid],
              },
            },
          ],
          { relativeTo: this.route },
        );
      },
    },
    {
      label:
        'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONTEXT_MENU_ACTIONS.DELETE',
      icon: 'pi pi-trash',
      command: (event: any) => {
        this.confirmationService.confirm({
          key: 'deleteUnitConfirmDialog',
          target: event.target as EventTarget,
          message:
            'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.MESSAGE',
          header:
            'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.HEADER',
          icon: 'pi pi-info-circle',
          acceptLabel:
            'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.ACTIONS.DELETE',
          rejectLabel:
            'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.ACTIONS.CANCEL',
          accept: () => {
            try {
              this.unitsService
                .deleteUnit(this.selectedUuid!)
                .pipe(take(1))
                .subscribe(() => {
                  this.selectedUuid = undefined;
                  this.toastService.showSuccessMessage({
                    summaryToTranslate:
                      'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.RESULT.SUCCESS.SUMMARY',
                    detailToTranslate:
                      'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.RESULT.SUCCESS.DETAIL',
                  });
                });
            } catch (error) {
              this.unitStore.setIsLoading(false);
              this.selectedUuid = undefined;
              this.toastService.showErrorMessage({
                summaryToTranslate:
                  'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.RESULT.ERROR.SUMMARY',
                detailToTranslate:
                  'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.RESULT.ERROR.DETAIL',
              });
            }
          },
        });
      },
    },
  ];
}
