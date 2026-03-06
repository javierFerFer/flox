import { CommonModule } from '@angular/common';
import { Component, computed, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { NoSuggestDirective } from '../../../../../../directives/no-suggest.directive';
import { CalendarInnerConfig } from '../../../../../../stores/calendar/calendar.model';
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
    TextareaModule,
    NoSuggestDirective,
  ],
})
export class CalendarTableComponent {
  protected readonly calendarStore = inject(CalendarStore);
  public tableInfoEmitter = output<CalendarInnerConfig[]>();

  readonly calendarInfo = computed(() => {
    const mappedResult = this.calendarStore.mappedCalendarInfo();
    this.tableInfoEmitter.emit(mappedResult);
    return mappedResult;
  });

  emitNewChanges() {
    this.tableInfoEmitter.emit(this.calendarInfo());
  }
}
