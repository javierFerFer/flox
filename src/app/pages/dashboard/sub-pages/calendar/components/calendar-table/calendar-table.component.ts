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
    TextareaModule,
    NoSuggestDirective,
  ],
})
export class CalendarTableComponent {
  protected readonly calendarStore = inject(CalendarStore);
  public tableInfoEmitter = output<CalendarInnerConfig[]>();

  readonly calendarInfo = computed(() => {
    const calendarUserInfo = this.calendarStore.calendarUserConfig()!;
    const mappedResult = (
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
    this.tableInfoEmitter.emit(mappedResult);
    return mappedResult;
  });

  emitNewChanges() {
    this.tableInfoEmitter.emit(this.calendarInfo());
  }
}
