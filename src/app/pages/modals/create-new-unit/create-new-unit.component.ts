import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CloseModal } from '../close-modal-interface';
import { ModalWrapperComponent } from '../../../components/modal-wrapper/modal-wrapper.component';
import { ToastService } from '../../../services/toast/toast.service';
import { UnityStore } from '../../../stores/unity/unity.store';
import { UnitsService } from '../../../services/unity/unity.service';
import { ClassStore } from '../../../stores/class/class.store';
import { TextareaModule } from 'primeng/textarea';
import { NoSuggestDirective } from '../../../directives/no-suggest.directive';
import { TextEditorComponent } from '../../../components/text-editor/text-editor.component';
import { SwapperComponentsComponent } from '../../../components/swapper-components/swapper-components.component';
import { SanitizeHTMLPipe } from '../../../pipes/sanitize-html.pipe';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-new-class',
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
    TextareaModule,
    NoSuggestDirective,
    TextEditorComponent,
    SwapperComponentsComponent,
    SanitizeHTMLPipe,
  ],
  standalone: true,
  templateUrl: 'create-new-unit.component.html',
})
export class CreateNewUnitModalComponent implements CloseModal {
  @Input('modalWrapperRef')
  public ModalWrapperRef!: ModalWrapperComponent;

  readonly unityStore = inject(UnityStore);
  private readonly unitsService = inject(UnitsService);
  private readonly toastService = inject(ToastService);
  private readonly classStore = inject(ClassStore);
  private readonly fb = inject(FormBuilder);
  newUnityForm = this.fb.group({
    unityName: ['', Validators.required],
    summary: [''],
  });

  createNewUnit() {
    const { unityName, summary } = this.newUnityForm.getRawValue();
    try {
      this.unitsService
        .createNewUnit({
          uuid: crypto.randomUUID(),
          name: unityName!,
          summary: summary!,
          sessions: [],
        })
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.showSuccessMessage({
            summaryToTranslate:
              'DASHBOARD.RECORDS.MODALS.CREATE_NEW_UNIT.FORM.MESSAGES.UNIT_CREATE_SUCCESS.SUMMARY',
            detailToTranslate:
              'DASHBOARD.RECORDS.MODALS.CREATE_NEW_UNIT.FORM.MESSAGES.UNIT_CREATE_SUCCESS.DETAIL',
          });
          this.newUnityForm.reset();
        });
    } catch (error) {
      this.unityStore.setIsLoading(false);
      this.toastService.showErrorMessage({
        summaryToTranslate:
          'DASHBOARD.RECORDS.MODALS.CREATE_NEW_UNIT.FORM.MESSAGES.UNIT_CREATE_UNSUCCESS.SUMMARY',
        detailToTranslate:
          'DASHBOARD.RECORDS.MODALS.CREATE_NEW_UNIT.FORM.MESSAGES.UNIT_CREATE_UNSUCCESS.DETAIL',
      });
    }
  }

  public close() {
    this.ModalWrapperRef.close();
  }
}
