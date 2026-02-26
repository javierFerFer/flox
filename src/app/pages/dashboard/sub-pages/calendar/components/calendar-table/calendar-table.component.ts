import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TextEditorComponent } from '../../../../../../components/text-editor/text-editor.component';
import { CalendarStore } from '../../../../../../stores/calendar/calendar.store';

@Component({
  selector: 'app-calendar-table',
  templateUrl: 'calendar-table.component.html',
  standalone: true,
  imports: [
    TableModule,
    TextEditorComponent,
    TranslocoDirective,
    ButtonModule,
    RouterOutlet,
  ],
})
export class CalendarTableComponent {
  private readonly calendarStore = inject(CalendarStore);
  readonly calendarInfo = computed(() => {
    return this.calendarStore.calendarInfo()?.calendarData.tableInfo || [];
  });
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
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
                // unitDetails: ['unit-details', 'show', this.selectedUuid],
              },
            },
          ],
          // { relativeTo: this.route },
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
                // unitDetails: ['unit-details', 'edit', this.selectedUuid],
              },
            },
          ],
          // { relativeTo: this.route },
        );
      },
    },
    {
      label:
        'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONTEXT_MENU_ACTIONS.DELETE',
      icon: 'pi pi-trash',
      command: (event: any) => {
        // this.confirmationService.confirm({
        //   key: 'deleteUnitConfirmDialog',
        //   target: event.target as EventTarget,
        //   message:
        //     'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.MESSAGE',
        //   header:
        //     'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.HEADER',
        //   icon: 'pi pi-info-circle',
        //   acceptLabel:
        //     'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.ACTIONS.DELETE',
        //   rejectLabel:
        //     'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.ACTIONS.CANCEL',
        //   accept: () => {
        //     try {
        //       this.unitsService
        //         .deleteUnit(this.selectedUuid!)
        //         .pipe(take(1))
        //         .subscribe(() => {
        //           this.selectedUuid = undefined;
        //           this.toastService.showSuccessMessage({
        //             summaryToTranslate:
        //               'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.RESULT.SUCCESS.SUMMARY',
        //             detailToTranslate:
        //               'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.RESULT.SUCCESS.DETAIL',
        //           });
        //         });
        //     } catch (error) {
        //       this.unitStore.setIsLoading(false);
        //       this.selectedUuid = undefined;
        //       this.toastService.showErrorMessage({
        //         summaryToTranslate:
        //           'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.RESULT.ERROR.SUMMARY',
        //         detailToTranslate:
        //           'DASHBOARD.RECORDS.COMPONENTS.CLASS.UNITS_TABLE.CONFIRM_DELETE_UNIT_DIALOG.RESULT.ERROR.DETAIL',
        //       });
        //     }
        //   },
        // });
      },
    },
  ];

  navigateToModalToAddDailyInfo() {
    this.router.navigate(
      [{ outlets: { calendarAddInfo: ['add-calendar-info'] } }],
      { relativeTo: this.route, queryParamsHandling: 'preserve' },
    );
  }
}
