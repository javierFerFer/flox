import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { map, take } from 'rxjs';
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
  // TODO:@Javi, continue doing the click me button to navigate to a modal to populate the initial info of the day
  // think about the struct of the data to save it into firebase
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected datePickerForm = this.fb.group({
    selectedDate: [
      new Date(new Date().setHours(0, 0, 0, 0)),
      Validators.required,
    ],
  });

  ngOnInit(): void {
    const selectedDate = this.route.queryParams
      .pipe(
        map((params) => params['selectedDate']),
        take(1),
      )
      .subscribe((selectedDate) => {
        if (selectedDate) {
          this.datePickerForm.controls.selectedDate.patchValue(
            new Date(selectedDate),
            {
              onlySelf: true,
              emitEvent: false,
            },
          );
        }
      });

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
