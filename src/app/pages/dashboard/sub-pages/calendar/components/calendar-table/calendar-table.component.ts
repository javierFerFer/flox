import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { take } from 'rxjs';
import { CalendarService } from '../../../../../../services/calendar/calendar.service';
import { ToastService } from '../../../../../../services/toast/toast.service';
import {
  CalendarInnerConfig,
  CalendarInnerElement,
} from '../../../../../../stores/calendar/calendar.model';
import { CalendarStore } from '../../../../../../stores/calendar/calendar.store';

@Component({
  selector: 'app-calendar-table',
  templateUrl: 'calendar-table.component.html',
  standalone: true,
  imports: [
    TableModule,
    TranslocoDirective,
    ButtonModule,
    RouterOutlet,
    FormsModule,
    ChipModule,
    CommonModule,
  ],
})
export class CalendarTableComponent {
  protected readonly calendarStore = inject(CalendarStore);
  private readonly calendarService = inject(CalendarService);
  private readonly toastService = inject(ToastService);
  selectedDate = input.required<string>();
  readonly calendarInfo = computed(() => {
    const calendarUserInfo = this.calendarStore.calendarUserConfig()!;
    const mapedResult = (
      this.calendarStore.calendarInfo()?.calendarData.tableInfo ||
      calendarUserInfo ||
      []
    ).map(
      (c) =>
        ({
          value: c.value,
          monday: {
            tag:
              typeof c.monday === 'object'
                ? (c.monday as CalendarInnerElement).tag
                : c.monday,
            value:
              typeof c.monday === 'object'
                ? (c.monday as CalendarInnerElement).value
                : '',
          },
          tuesday: {
            tag:
              typeof c.tuesday === 'object'
                ? (c.tuesday as CalendarInnerElement).tag
                : c.tuesday,
            value:
              typeof c.tuesday === 'object'
                ? (c.tuesday as CalendarInnerElement).value
                : '',
          },
          wednesday: {
            tag:
              typeof c.wednesday === 'object'
                ? (c.wednesday as CalendarInnerElement).tag
                : c.wednesday,
            value:
              typeof c.wednesday === 'object'
                ? (c.wednesday as CalendarInnerElement).value
                : '',
          },
          thursday: {
            tag:
              typeof c.thursday === 'object'
                ? (c.thursday as CalendarInnerElement).tag
                : c.thursday,
            value:
              typeof c.thursday === 'object'
                ? (c.thursday as CalendarInnerElement).value
                : '',
          },
          friday: {
            tag:
              typeof c.friday === 'object'
                ? (c.friday as CalendarInnerElement).tag
                : c.friday,
            value:
              typeof c.friday === 'object'
                ? (c.friday as CalendarInnerElement).value
                : '',
          },
        }) as CalendarInnerConfig,
    );
    return mapedResult;
  });

  save() {
    const calendarTableInfo = this.calendarInfo();
    try {
      this.calendarService
        .updateCalendarWeeklyInfo(this.selectedDate(), calendarTableInfo)
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.showSuccessMessage({
            summaryToTranslate:
              'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_SUCCESS.SUMMARY',
            detailToTranslate:
              'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_SUCCESS.DETAIL',
          });
        });
    } catch (error) {
      this.calendarStore.setIsLoading(false);
      this.toastService.showErrorMessage({
        summaryToTranslate:
          'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_UNSUCCESS.SUMMARY',
        detailToTranslate:
          'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_UNSUCCESS.DETAIL',
      });
    }
  }
}
