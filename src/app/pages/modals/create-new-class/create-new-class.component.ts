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
import { ClassService } from '../../../services/class/class.service';
import { ClassStore } from '../../../stores/class/class.store';
import { take } from 'rxjs';
import { ToastService } from '../../../services/toast/toast.service';
import { NoSuggestDirective } from '../../../directives/no-suggest.directive';

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
    NoSuggestDirective
  ],
  standalone: true,
  templateUrl: 'create-new-class.component.html',
})
export class CreateNewClassModalComponent implements CloseModal {
  @Input('modalWrapperRef')
  public ModalWrapperRef!: ModalWrapperComponent;

  readonly classStore = inject(ClassStore);
  private readonly classService = inject(ClassService);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(FormBuilder);
  newClassForm = this.fb.group({
    className: ['', Validators.required],
  });

  createNewClass() {
    const { className } = this.newClassForm.getRawValue();

    try {
      this.classService
        .createNewClass({
          uuid: crypto.randomUUID(),
          name: className!,
        })
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.showSuccessMessage({
            summaryToTranslate:
              'DASHBOARD.RECORDS.MODALS.CREATE_NEW_CLASS.FORM.MESSAGES.CLASS_CREATE_SUCCESS.SUMMARY',
            detailToTranslate:
              'DASHBOARD.RECORDS.MODALS.CREATE_NEW_CLASS.FORM.MESSAGES.CLASS_CREATE_SUCCESS.DETAIL',
          });
          this.newClassForm.reset();
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
