import { Component, inject, OnInit } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ClassStore } from '../../../../stores/class/class.store';
import { ClassService } from '../../../../services/class/class.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { take } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { StudentStore } from '../../../../stores/student/student.store';

@Component({
  selector: 'app-class-id',
  templateUrl: 'class-id.component.html',
  imports: [
    TableModule,
    ButtonModule,
    RippleModule,
    TranslocoDirective,
    ConfirmDialogModule,
    RouterOutlet,
  ],
  providers: [ConfirmationService],
})
export class ClassIdComponent implements OnInit {
  readonly classStore = inject(ClassStore);
  readonly classService = inject(ClassService);
  private readonly studentStore = inject(StudentStore);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly toastService = inject(ToastService);
  readonly studentsList = this.studentStore.students;
  private classUuid!: string;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.classUuid = params['id'];
    });
  }

  navigateToCreateNewStudent() {
    this.router.navigate(
      [
        {
          outlets: {
            createStudent: ['create-new-student'],
          },
        },
      ],
      { relativeTo: this.route },
    );
  }

  deleteClass(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:
        'DASHBOARD.RECORDS.COMPONENTS.CLASS.CONFIRM_DELETE_CLASS_DIALOG.MESSAGE',
      header:
        'DASHBOARD.RECORDS.COMPONENTS.CLASS.CONFIRM_DELETE_CLASS_DIALOG.HEADER',
      icon: 'pi pi-info-circle',
      acceptLabel:
        'DASHBOARD.RECORDS.COMPONENTS.CLASS.CONFIRM_DELETE_CLASS_DIALOG.ACTIONS.DELETE',
      rejectLabel:
        'DASHBOARD.RECORDS.COMPONENTS.CLASS.CONFIRM_DELETE_CLASS_DIALOG.ACTIONS.CANCEL',
      accept: () => {
        try {
          const selectedClass = this.classStore.findClassByUuid(
            this.classUuid,
          )!;
          this.classService
            .deleteClass({ ...selectedClass })
            .pipe(take(1))
            .subscribe(() => {
              this.router.navigate(['../']).then(() => {
                this.toastService.showSuccessMessage({
                  summaryToTranslate:
                    'DASHBOARD.RECORDS.COMPONENTS.CLASS.CONFIRM_DELETE_CLASS_DIALOG.RESULT.SUCCESS.SUMMARY',
                  detailToTranslate:
                    'DASHBOARD.RECORDS.COMPONENTS.CLASS.CONFIRM_DELETE_CLASS_DIALOG.RESULT.SUCCESS.DETAIL',
                });
              });
            });
        } catch (error) {
          this.classStore.setIsLoading(false);
          this.toastService.showErrorMessage({
            summaryToTranslate:
              'DASHBOARD.RECORDS.COMPONENTS.CLASS.CONFIRM_DELETE_CLASS_DIALOG.RESULT.ERROR.SUMMARY',
            detailToTranslate:
              'DASHBOARD.RECORDS.COMPONENTS.CLASS.CONFIRM_DELETE_CLASS_DIALOG.RESULT.ERROR.DETAIL',
          });
        }
      },
    });
  }
}
