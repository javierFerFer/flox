import { Component, inject, Input } from '@angular/core';
import { take } from 'rxjs';
import { ModalWrapperComponent } from '../../../components/modal-wrapper/modal-wrapper.component';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { ToastService } from '../../../services/toast/toast.service';
import { CalendarUserConfig } from '../../../stores/calendar/calendar.model';
import { CalendarStore } from '../../../stores/calendar/calendar.store';
import { CloseModal } from '../close-modal-interface';
import { UserCalendarInfoTableComponent } from './components/user-calendar-info-table/user-calendar-info-table.component';

@Component({
  selector: 'app-user-calendar-info',
  templateUrl: 'user-calendar-info.component.html',
  standalone: true,
  imports: [UserCalendarInfoTableComponent],
})
export class UserCalendarInfoModalComponent implements CloseModal {
  @Input('modalWrapperRef')
  public ModalWrapperRef!: ModalWrapperComponent;

  private readonly calendarStore = inject(CalendarStore);
  private readonly calendarService = inject(CalendarService);
  private readonly toastService = inject(ToastService);

  saveUserCalendarInfo(tableInfo: CalendarUserConfig[]) {
    try {
      this.calendarService
        .updateUserCalendarConfig(tableInfo)
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.showSuccessMessage({
            summaryToTranslate:
              'DASHBOARD.RECORDS.MODALS.NEW_CALENDAR_SCHEDULE.MESSAGES.CONFIG_SCHEDULE_SUCCESS.SUMMARY',
            detailToTranslate:
              'DASHBOARD.RECORDS.MODALS.NEW_CALENDAR_SCHEDULE.MESSAGES.CONFIG_SCHEDULE_SUCCESS.DETAIL',
          });
          this.close();
        });
    } catch (error) {
      this.calendarStore.setIsLoading(false);
      this.toastService.showErrorMessage({
        summaryToTranslate:
          'DASHBOARD.RECORDS.MODALS.NEW_CALENDAR_SCHEDULE.MESSAGES.CONFIG_SCHEDULE_UNSUCCESS.SUMMARY',
        detailToTranslate:
          'DASHBOARD.RECORDS.MODALS.NEW_CALENDAR_SCHEDULE.MESSAGES.CONFIG_SCHEDULE_UNSUCCESS.DETAIL',
      });
      this.close();
    }
  }

  public close() {
    this.ModalWrapperRef.close();
  }
}
