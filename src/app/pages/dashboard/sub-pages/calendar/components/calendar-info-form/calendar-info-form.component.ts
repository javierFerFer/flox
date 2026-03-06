import { Component, inject, OnInit } from '@angular/core';
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
import { SwapperComponent } from '../../../../../../components/swapper-components/swapper.component';
import { TextEditorComponent } from '../../../../../../components/text-editor/text-editor.component';
import { CheckComplexHTMLPipe } from '../../../../../../pipes/check-complex-html.pipe';
import { SanitizeHTMLPipe } from '../../../../../../pipes/sanitize-html.pipe';

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
    CheckComplexHTMLPipe,
  ],
})
export class CalendarInfoFormComponent implements OnInit {
  private readonly formGroupDirective = inject(FormGroupDirective);

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
}
