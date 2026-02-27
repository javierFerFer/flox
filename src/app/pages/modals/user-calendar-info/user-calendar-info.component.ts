import { Component, inject, Input } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { take } from 'rxjs';
import { ModalWrapperComponent } from '../../../components/modal-wrapper/modal-wrapper.component';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { CalendarUserConfig } from '../../../stores/calendar/calendar.model';
import { CloseModal } from '../close-modal-interface';
import { UserCalendarInfoTableComponent } from './components/user-calendar-info-table/user-calendar-info-table.component';

@Component({
  selector: 'app-user-calendar-info',
  imports: [TranslocoDirective, UserCalendarInfoTableComponent],
  standalone: true,
  templateUrl: 'user-calendar-info.component.html',
})
export class UserCalendarInfoModalComponent implements CloseModal {
  @Input('modalWrapperRef')
  public ModalWrapperRef!: ModalWrapperComponent;

  private readonly calendarService = inject(CalendarService);

  saveUserCalendarInfo(tableInfo: CalendarUserConfig[]) {
    this.calendarService
      .updateUserCalendarConfig(tableInfo)
      .pipe(take(1))
      .subscribe(() => {
        this.close();
      });
  }

  public close() {
    this.ModalWrapperRef.close();
  }
}
