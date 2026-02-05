import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';

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
  ],
})
export class CalendarComponent {
  private readonly fb = inject(FormBuilder);
  protected datePickerForm = this.fb.group({
    selectedDate: [undefined, Validators.required],
  });

  // para la busqueda por fecha, recuerda usar toUTCString para evitar problemas segun entorno
}
