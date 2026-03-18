import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-calendar-preferences',
  imports: [TranslocoDirective, CardModule],
  standalone: true,
  templateUrl: 'calendar-preferences.component.html',
})
export class CalendarPreferencesComponent {}
