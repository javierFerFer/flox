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
  selector: 'app-user-calendar-info-table',
  templateUrl: 'user-calendar-info-table.component.html',
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
export class UserCalendarInfoTableComponent {
  protected readonly calendarStore = inject(CalendarStore);
  protected readonly calendarService = inject(CalendarService);
  private readonly calendarGlobalInfo = this.calendarStore.calendarGlobalInfo;

  protected calendarGlobalInfoParsed = computed(() => {
    const calendarGlobalInfo = this.calendarGlobalInfo()?.calendarInfo!;
    const calendarInfoValues = Object.values(calendarGlobalInfo);
    const groups = this.createGroups(calendarInfoValues);
    return this.calendarService.convertToObject(groups);
  });

  public tableInfoEmitter = output<CalendarUserConfig[]>();

  private createGroups<T>(arr: T[]): string[] {
    const result: string[] = [];

    for (let i = 0; i < arr.length; i += 2) {
      const group = arr.slice(i, i + 2);
      result.push(group.join(' - '));
    }
    return result;
  }

  saveUserCalendarInfo() {
    this.tableInfoEmitter.emit(this.calendarGlobalInfoParsed());
  }
}
