import { Component, inject, Input } from '@angular/core';
import { take } from 'rxjs';
import { ModalWrapperComponent } from '../../../../../components/modal-wrapper/modal-wrapper.component';
import { CalendarService } from '../../../../../services/calendar/calendar.service';
import { ToastService } from '../../../../../services/toast/toast.service';
import { CalendarUserConfig } from '../../../../../stores/calendar/calendar.model';
import { CalendarStore } from '../../../../../stores/calendar/calendar.store';
import { CloseModal } from '../../../close-modal-interface';
import { UserCalendarInfoEditTableComponent } from '../user-calendar-info-edit-table/user-calendar-info-edit-table.component';

@Component({
  selector: 'app-user-calendar-info-edit',
  templateUrl: 'user-calendar-info-edit.component.html',
  standalone: true,
  imports: [UserCalendarInfoEditTableComponent],
})
export class UserCalendarInfoEditComponent implements CloseModal {
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
              'SHARED_MODALS.USER_CONFIG.CALENDAR_PREFERENCES.EDIT.MESSAGES.CONFIG_SCHEDULE_SUCCESS.SUMMARY',
            detailToTranslate:
              'SHARED_MODALS.USER_CONFIG.CALENDAR_PREFERENCES.EDIT.MESSAGES.CONFIG_SCHEDULE_SUCCESS.DETAIL',
          });
          this.close();
        });
    } catch (error) {
      this.calendarStore.setIsLoading(false);
      this.toastService.showErrorMessage({
        summaryToTranslate:
          'SHARED_MODALS.USER_CONFIG.CALENDAR_PREFERENCES.EDIT.MESSAGES.CONFIG_SCHEDULE_UNSUCCESS.SUMMARY',
        detailToTranslate:
          'SHARED_MODALS.USER_CONFIG.CALENDAR_PREFERENCES.EDIT.MESSAGES.CONFIG_SCHEDULE_UNSUCCESS.DETAIL',
      });
      this.close();
    }
  }

  public close() {
    this.ModalWrapperRef.close();
  }
}
