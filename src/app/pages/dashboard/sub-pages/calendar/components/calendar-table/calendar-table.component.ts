import { Component, computed, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { TableModule } from 'primeng/table';
import { TextEditorComponent } from '../../../../../../components/text-editor/text-editor.component';
import { CalendarStore } from '../../../../../../stores/calendar/calendar.store';

@Component({
  selector: 'app-calendar-table',
  templateUrl: 'calendar-table.component.html',
  standalone: true,
  imports: [TableModule, TextEditorComponent, TranslocoDirective],
})
export class CalendarTableComponent {
  private readonly calendarStore = inject(CalendarStore);
  readonly calendarInfo = computed(() => {
    return this.calendarStore.calendarInfo()?.calendarData.tableInfo || [];
  });
}
