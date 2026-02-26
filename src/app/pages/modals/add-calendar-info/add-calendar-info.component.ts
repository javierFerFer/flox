import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { map, take } from 'rxjs';
import { ModalWrapperComponent } from '../../../components/modal-wrapper/modal-wrapper.component';
import { SwapperComponent } from '../../../components/swapper-components/swapper.component';
import { NoSuggestDirective } from '../../../directives/no-suggest.directive';
import { SanitizeHTMLPipe } from '../../../pipes/sanitize-html.pipe';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { ToastService } from '../../../services/toast/toast.service';
import { ClassStore } from '../../../stores/class/class.store';
import { CloseModal } from '../close-modal-interface';

@Component({
  selector: 'app-add-calendar-info',
  imports: [
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    TranslocoDirective,
    SelectModule,
    CardModule,
    FloatLabelModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    NoSuggestDirective,
    SwapperComponent,
    SanitizeHTMLPipe,
    TextareaModule,
  ],
  standalone: true,
  templateUrl: 'add-calendar-info.component.html',
})
export class AddCalendarInfoModalComponent implements OnInit, CloseModal {
  @Input('modalWrapperRef')
  public ModalWrapperRef!: ModalWrapperComponent;

  readonly classStore = inject(ClassStore);
  private readonly calendarService = inject(CalendarService);
  private readonly toastService = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private selectedDate = new Date(
    new Date().setHours(0, 0, 0, 0),
  ).toUTCString();

  weeklyForm = this.fb.group({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => params['selectedDate']),
        take(1),
      )
      .subscribe((selectedDate) => {
        if (selectedDate) {
          this.selectedDate = new Date(selectedDate).toUTCString();
        }
      });
  }

  public createNewWeeklyRecord() {
    const weeklyInfo = this.weeklyForm.getRawValue();
    try {
      this.calendarService
        .updateCalendarWeeklyInfo(this.selectedDate, {
          ...weeklyInfo,
        })
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.showSuccessMessage({
            summaryToTranslate:
              'DASHBOARD.RECORDS.MODALS.CREATE_NEW_CLASS.FORM.MESSAGES.CLASS_CREATE_SUCCESS.SUMMARY',
            detailToTranslate:
              'DASHBOARD.RECORDS.MODALS.CREATE_NEW_CLASS.FORM.MESSAGES.CLASS_CREATE_SUCCESS.DETAIL',
          });
          this.weeklyForm.reset();
        });
    } catch (error) {
      this.classStore.setIsLoading(false);
      this.toastService.showErrorMessage({
        summaryToTranslate:
          'DASHBOARD.RECORDS.MODALS.CREATE_NEW_CLASS.FORM.MESSAGES.CLASS_CREATE_UNSUCCESS.SUMMARY',
        detailToTranslate:
          'DASHBOARD.RECORDS.MODALS.CREATE_NEW_CLASS.FORM.MESSAGES.CLASS_CREATE_UNSUCCESS.DETAIL',
      });
    }
  }

  public close() {
    this.ModalWrapperRef.close();
  }
}
