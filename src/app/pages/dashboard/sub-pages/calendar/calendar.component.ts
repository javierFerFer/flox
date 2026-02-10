import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';

@Component({
  selector: 'app-calender',
  templateUrl: 'calendar.component.html',
  imports: [
    CardModule,
    TranslocoDirective,
    ReactiveFormsModule,
    DatePickerModule,
    FloatLabel,
    DividerModule,
    CalendarTableComponent,
  ],
})
export class CalendarComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  protected datePickerForm = this.fb.group({
    selectedDate: [
      new Date(new Date().setHours(0, 0, 0, 0)),
      Validators.required,
    ],
  });

  ngOnInit(): void {
    this.datePickerForm.controls.selectedDate.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['dashboard', 'calendar'], {
          queryParams: {
            selectedDate:
              this.datePickerForm.controls.selectedDate.value?.toUTCString(),
          },
        });
      });
  }

  // para la busqueda por fecha, recuerda usar toUTCString para evitar problemas segun entorno
}
