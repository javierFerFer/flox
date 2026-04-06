import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { take } from 'rxjs';
import { ModalWrapperComponent } from '../../../components/modal-wrapper/modal-wrapper.component';
import { NoSuggestDirective } from '../../../directives/no-suggest.directive';
import { ClassService } from '../../../services/class/class.service';
import { ToastService } from '../../../services/toast/toast.service';
import { ClassStore } from '../../../stores/class/class.store';
import { CloseModal } from '../close-modal-interface';

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
    NoSuggestDirective,
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
  private readonly router = inject(Router);
  newClassForm = this.fb.group({
    className: ['', Validators.required],
  });
  private userCreateClassFlag = false;

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
          this.userCreateClassFlag = true;
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

  public onCloseAfterNavigate() {
    if (this.userCreateClassFlag && this.classStore.classes().at(-1)?.uuid) {
      this.router.navigate([
        '/dashboard/records',
        {
          outlets: {
            classTable: ['class', this.classStore.classes().at(-1)!.uuid],
            recordsModals: null,
          },
        },
      ]);
    }
  }

  public close() {
    this.ModalWrapperRef.close();
  }
}
