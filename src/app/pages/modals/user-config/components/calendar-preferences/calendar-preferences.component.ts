import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-calendar-preferences',
  imports: [TranslocoDirective, CardModule, ButtonModule, RouterOutlet],
  standalone: true,
  templateUrl: 'calendar-preferences.component.html',
})
export class CalendarPreferencesComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  public navigateToCalendarConfig(): void {
    this.router.navigate(
      [
        {
          outlets: { 'calendar-preferences-outlet': ['calendar-user-config'] },
        },
      ],
      { relativeTo: this.activatedRoute, queryParamsHandling: 'preserve' },
    );
  }
}
