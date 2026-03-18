import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-calendar-preferences',
  imports: [
    TranslocoDirective,
  ],
  standalone: true,
  templateUrl: 'calendar-preferences.component.html',
})
export class CalendarPreferencesComponent {
}
