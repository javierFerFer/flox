import { CommonModule } from '@angular/common';
import { Component, computed, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CalendarService } from '../../../../../services/calendar/calendar.service';
import { CalendarUserConfig } from '../../../../../stores/calendar/calendar.model';
import { CalendarStore } from '../../../../../stores/calendar/calendar.store';

@Component({
  selector: 'app-user-calendar-info-edit-table',
  templateUrl: 'user-calendar-info-edit-table.component.html',
  standalone: true,
  imports: [
    TableModule,
    TranslocoDirective,
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
  ],
})
export class UserCalendarInfoEditTableComponent {
  protected readonly calendarStore = inject(CalendarStore);
  protected readonly calendarService = inject(CalendarService);

  protected mappedCalendarHeadersInfo = computed(() => {
    const mappedCalendarHeadersInfo =
      this.calendarStore.mappedCalendarHeadersInfo();
    return mappedCalendarHeadersInfo;
  });

  public tableInfoEmitter = output<CalendarUserConfig[]>();

  saveUserCalendarInfo() {
    this.tableInfoEmitter.emit(this.mappedCalendarHeadersInfo());
  }
}
