import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { map, take, tap } from 'rxjs';
import { CalendarInnerConfig } from '../../../../stores/calendar/calendar.model';
import { CalendarStore } from '../../../../stores/calendar/calendar.store';
import { CalendarInfoFormComponent } from './components/calendar-info-form/calendar-info-form.component';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrl: 'calendar.component.scss',
  imports: [
    CardModule,
    TranslocoDirective,
    ReactiveFormsModule,
    DatePickerModule,
    FloatLabelModule,
    DividerModule,
    CalendarTableComponent,
    CalendarInfoFormComponent,
    RouterOutlet,
  ],
})
export class CalendarComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly calendarStore = inject(CalendarStore);
  protected tableInfo: WritableSignal<CalendarInnerConfig[]> = signal([]);
  protected saveInfo = signal(false);

  private selectedDate = signal(this.selectFirstDay(new Date()));

  protected selectedDateValue = computed(() => {
    return this.selectedDate().toUTCString();
  });

  protected datePickerForm = this.fb.group({
    selectedDate: [
      this.selectRange(new Date(new Date().setHours(0, 0, 0, 0))),
      Validators.required,
    ],
    project: [''],
    proposals: [''],
    materials: [''],
    weeklyTutorials: [''],
    doNotForget: [''],
  });

  constructor() {
    effect(() => {
      const calendarInfo = this.calendarStore.calendarInfo()?.calendarData;
      this.datePickerForm.patchValue(
        {
          selectedDate: this.datePickerForm.controls.selectedDate.value,
          doNotForget: calendarInfo?.doNotForget,
          materials: calendarInfo?.materials,
          weeklyTutorials: calendarInfo?.weeklyTutorials,
          project: calendarInfo?.project,
          proposals: calendarInfo?.proposals,
        },
        { emitEvent: false, onlySelf: true },
      );
    });
  }

  ngOnInit(): void {
    this.checkInitialUserCalendarConfig();

    this.route.queryParams
      .pipe(
        map((params) => params['selectedDate']),
        take(1),
      )
      .subscribe((selectedDate) => {
        if (selectedDate) {
          this.datePickerForm.controls.selectedDate.patchValue(
            this.selectRange(new Date(selectedDate)),
            {
              onlySelf: true,
              emitEvent: false,
            },
          );
        }
      });

    this.datePickerForm.controls.selectedDate.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((value) => {
          let start = new Date(value![0].setHours(0, 0, 0, 0));
          start.setDate(start.getDate() - start.getDay());
          this.selectedDate.update(() => start);
          let end = new Date(start.setHours(0, 0, 0, 0));
          end.setDate(start.getDate() + 6);
          this.datePickerForm.controls.selectedDate.patchValue([start, end], {
            emitEvent: false,
            onlySelf: true,
          });
        }),
      )
      .subscribe(() => {
        this.router.navigate(['dashboard', 'calendar'], {
          queryParams: {
            selectedDate:
              this.datePickerForm.controls.selectedDate.value![0].toUTCString(),
          },
        });
      });
  }

  tableHasChanged(tableInfo: CalendarInnerConfig[]) {
    this.tableInfo.update(() => tableInfo);
    this.saveInfo.update(() => true);
  }

  private checkInitialUserCalendarConfig() {
    const calendarUserInfo = this.calendarStore.calendarUserConfig();
    if (!calendarUserInfo) {
      this.router.navigate(
        [{ outlets: { calendarUserConfig: ['calendar-user-config'] } }],
        { relativeTo: this.route, queryParamsHandling: 'preserve' },
      );
    }
  }

  selectRange(evt: Date) {
    let start = new Date(evt);
    start.setDate(start.getDate() - start.getDay());
    let end = new Date(start);
    end.setDate(start.getDate() + 6);
    return [start, end];
  }

  selectFirstDay(evt: Date) {
    let start = new Date(evt);
    start.setDate(start.getDate() - start.getDay());
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());
    return start;
  }
}
