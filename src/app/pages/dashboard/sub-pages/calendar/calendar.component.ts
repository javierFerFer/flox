import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { map, take } from 'rxjs';
import { SwapperComponent } from '../../../../components/swapper-components/swapper.component';
import { TextEditorComponent } from '../../../../components/text-editor/text-editor.component';
import { SanitizeHTMLPipe } from '../../../../pipes/sanitize-html.pipe';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';

@Component({
  selector: 'app-calender',
  templateUrl: 'calendar.component.html',
  styleUrl: 'calendar.component.scss',
  imports: [
    CardModule,
    TranslocoDirective,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    FloatLabelModule,
    DividerModule,
    CalendarTableComponent,
    SwapperComponent,
    SanitizeHTMLPipe,
    TextareaModule,
    TextEditorComponent,
    ButtonModule,
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
    project: [],
    proposals: [],
    materials: [],
    weeklyTutorials: [],
    doNotForget: [],
    tableInfo: [],
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
}
