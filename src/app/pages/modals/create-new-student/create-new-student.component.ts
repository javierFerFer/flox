import { Component, inject, Input, OnInit } from '@angular/core';
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
import { take } from 'rxjs';
import { ToastService } from '../../../services/toast/toast.service';
import { StudentStore } from '../../../stores/student/student.store';
import { StudentsService } from '../../../services/students/students.service';
import { ActivatedRoute } from '@angular/router';

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
  ],
  standalone: true,
  templateUrl: 'create-new-student.component.html',
})
export class CreateNewStudentModalComponent implements OnInit, CloseModal {
  @Input('modalWrapperRef')
  public ModalWrapperRef!: ModalWrapperComponent;

  readonly studentStore = inject(StudentStore);
  private readonly studentsService = inject(StudentsService);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(FormBuilder);
  newStudentForm = this.fb.group({
    studentName: ['', Validators.required],
  });
  private classUuid!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent!.params.pipe(take(1)).subscribe((params) => {
      this.classUuid = params['id'];
    });
  }

  createNewClass() {
    const { studentName } = this.newStudentForm.getRawValue();

    try {
      this.studentsService
        .createNewStudent(this.classUuid, {
          uuid: crypto.randomUUID(),
          name: studentName!,
        })
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.showSuccessMessage({
            summaryToTranslate:
              'DASHBOARD.RECORDS.MODALS.CREATE_NEW_STUDENT.FORM.MESSAGES.STUDENT_CREATE_SUCCESS.SUMMARY',
            detailToTranslate:
              'DASHBOARD.RECORDS.MODALS.CREATE_NEW_STUDENT.FORM.MESSAGES.STUDENT_CREATE_SUCCESS.DETAIL',
          });
          this.newStudentForm.reset();
        });
    } catch (error) {
      this.studentStore.setIsLoading(false);
      this.toastService.showErrorMessage({
        summaryToTranslate:
          'DASHBOARD.RECORDS.MODALS.CREATE_NEW_STUDENT.FORM.MESSAGES.STUDENT_CREATE_UNSUCCESS.SUMMARY',
        detailToTranslate:
          'DASHBOARD.RECORDS.MODALS.CREATE_NEW_STUDENT.FORM.MESSAGES.STUDENT_CREATE_UNSUCCESS.DETAIL',
      });
    }
  }

  public close() {
    this.ModalWrapperRef.close();
  }
}
