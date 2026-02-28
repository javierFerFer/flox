import { Component, computed, inject, input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ɵElement,
} from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { take } from 'rxjs';
import { SwapperComponent } from '../../../../../../components/swapper-components/swapper.component';
import { TextEditorComponent } from '../../../../../../components/text-editor/text-editor.component';
import { SanitizeHTMLPipe } from '../../../../../../pipes/sanitize-html.pipe';
import { CalendarService } from '../../../../../../services/calendar/calendar.service';
import { ToastService } from '../../../../../../services/toast/toast.service';
import {
  CalendarInnerConfig,
  CalendarInnerElement,
  CalendarModel,
} from '../../../../../../stores/calendar/calendar.model';
import { CalendarStore } from '../../../../../../stores/calendar/calendar.store';

// To type the form inside of child component
type ɵNullableFormControls<T> = {
  [K in keyof T]: ɵElement<T[K], null>;
};

@Component({
  selector: 'app-calendar-info-form',
  templateUrl: 'calendar-info-form.component.html',
  standalone: true,
  imports: [
    SwapperComponent,
    SanitizeHTMLPipe,
    TextareaModule,
    TextEditorComponent,
    ButtonModule,
    FloatLabelModule,
    DividerModule,
    TranslocoDirective,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CalendarInfoFormComponent implements OnInit {
  canSave = input.required();
  selectedDate = input.required<string>();
  tableInfo = input.required<CalendarInnerConfig[]>();

  readonly calendarInfoInit = computed(() => {
    const calendarUserInfo = this.calendarStore.calendarUserConfig()!;
    const mapedResult = (
      this.calendarStore.calendarInfo()?.calendarData.tableInfo ||
      calendarUserInfo ||
      []
    ).map(
      (c) =>
        ({
          value: c.value,
          monday: {
            tag:
              typeof c.monday === 'object'
                ? (c.monday as CalendarInnerElement).tag
                : c.monday,
            value:
              typeof c.monday === 'object'
                ? (c.monday as CalendarInnerElement).value
                : '',
          },
          tuesday: {
            tag:
              typeof c.tuesday === 'object'
                ? (c.tuesday as CalendarInnerElement).tag
                : c.tuesday,
            value:
              typeof c.tuesday === 'object'
                ? (c.tuesday as CalendarInnerElement).value
                : '',
          },
          wednesday: {
            tag:
              typeof c.wednesday === 'object'
                ? (c.wednesday as CalendarInnerElement).tag
                : c.wednesday,
            value:
              typeof c.wednesday === 'object'
                ? (c.wednesday as CalendarInnerElement).value
                : '',
          },
          thursday: {
            tag:
              typeof c.thursday === 'object'
                ? (c.thursday as CalendarInnerElement).tag
                : c.thursday,
            value:
              typeof c.thursday === 'object'
                ? (c.thursday as CalendarInnerElement).value
                : '',
          },
          friday: {
            tag:
              typeof c.friday === 'object'
                ? (c.friday as CalendarInnerElement).tag
                : c.friday,
            value:
              typeof c.friday === 'object'
                ? (c.friday as CalendarInnerElement).value
                : '',
          },
        }) as CalendarInnerConfig,
    );
    return mapedResult;
  });

  private readonly formGroupDirective = inject(FormGroupDirective);
  private readonly calendarService = inject(CalendarService);
  private readonly calendarStore = inject(CalendarStore);
  private readonly toastService = inject(ToastService);

  protected datePickerForm!: FormGroup<
    ɵNullableFormControls<{
      selectedDate: (
        | Date
        | ((control: AbstractControl) => ValidationErrors | null)
      )[];
      project: never[];
      proposals: never[];
      materials: never[];
      weeklyTutorials: never[];
      doNotForget: never[];
      tableInfo: never[];
    }>
  >;

  ngOnInit(): void {
    this.datePickerForm = this.formGroupDirective.form;
  }

  saveInfo() {
    const { doNotForget, materials, project, proposals, weeklyTutorials } =
      this.datePickerForm.getRawValue();
    const calendarModel: CalendarModel = {
      date: this.selectedDate(),
      calendarData: {
        doNotForget: doNotForget || '',
        materials: materials || '',
        project: project || '',
        proposals: proposals || '',
        weeklyTutorials: weeklyTutorials || '',
        tableInfo: [
          ...(this.tableInfo().length
            ? this.tableInfo()
            : this.calendarInfoInit()),
        ],
      },
    };
    try {
      this.calendarService
        .updateCalendarWeeklyInfo(calendarModel)
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.showSuccessMessage({
            summaryToTranslate:
              'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_SUCCESS.SUMMARY',
            detailToTranslate:
              'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_SUCCESS.DETAIL',
          });
        });
    } catch (error) {
      this.calendarStore.setIsLoading(false);
      this.toastService.showErrorMessage({
        summaryToTranslate:
          'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_UNSUCCESS.SUMMARY',
        detailToTranslate:
          'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_UNSUCCESS.DETAIL',
      });
    }
  }
}
