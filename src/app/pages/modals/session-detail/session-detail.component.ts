import { Component, computed, effect, inject, Input } from '@angular/core';
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
import { UnityStore } from '../../../stores/unity/unity.store';
import { UnitsService } from '../../../services/unity/unity.service';
import { ClassStore } from '../../../stores/class/class.store';
import { TextareaModule } from 'primeng/textarea';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { UnityModel } from '../../../stores/unity/unity.model';
import { NoSuggestDirective } from '../../../directives/no-suggest.directive';
import { CheckComplexHTMLPipe } from '../../../pipes/check-complex-html.pipe';
import { SwapperComponent } from '../../../components/swapper-components/swapper.component';
import { TextEditorComponent } from '../../../components/text-editor/text-editor.component';
import { SanitizeHTMLPipe } from '../../../pipes/sanitize-html.pipe';

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
    CheckComplexHTMLPipe,
    SwapperComponent,
    TextEditorComponent,
    SanitizeHTMLPipe,
  ],
  standalone: true,
  templateUrl: 'session-detail.component.html',
})
export class SessionDetailModalComponent implements CloseModal {
  @Input('modalWrapperRef')
  public ModalWrapperRef!: ModalWrapperComponent;

  readonly unityStore = inject(UnityStore);
  private readonly unitsService = inject(UnitsService);
  private readonly toastService = inject(ToastService);
  private readonly classStore = inject(ClassStore);
  private readonly route = inject(ActivatedRoute);
  private readonly UnitUuid = toSignal(this.route.parent?.params!);
  private readonly sessionUuid = toSignal(this.route.params!);
  private readonly fb = inject(FormBuilder);
  sessionForm = this.fb.group({
    sessionName: ['', Validators.required],
    activities: [''],
    evaluation: [''],
    attentionOfDiversity: [''],
    observations: [''],
  });
  protected selectedUnit = computed(() => {
    return this.unityStore.findUnit(this.UnitUuid()?.['id'])!;
  });

  protected selectedSession = computed(() => {
    return this.selectedUnit().sessions.find(
      (s) => s.uuid === this.sessionUuid()?.['id'],
    );
  });

  constructor() {
    effect(() => {
      this.sessionForm.patchValue({
        sessionName: this.selectedSession()?.name,
        activities: this.selectedSession()?.activities,
        evaluation: this.selectedSession()?.evaluation,
        attentionOfDiversity: this.selectedSession()?.attentionOfDiversity,
        observations: this.selectedSession()?.observations,
      });
    });
  }

  saveChanges() {
    const {
      sessionName,
      activities,
      evaluation,
      attentionOfDiversity,
      observations,
    } = this.sessionForm.getRawValue();

    const unitToUpdate: UnityModel = {
      ...this.selectedUnit(),
      sessions: [
        ...this.selectedUnit().sessions.map((s) => {
          if (s.uuid === this.selectedSession()?.uuid) {
            return {
              uuid: this.selectedSession()?.uuid!,
              name: sessionName!,
              activities: activities || '',
              evaluation: evaluation || '',
              attentionOfDiversity: attentionOfDiversity || '',
              observations: observations || '',
            };
          }
          return s;
        }),
      ],
    };

    try {
      this.unitsService
        .updateUnit(unitToUpdate)
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.showSuccessMessage({
            summaryToTranslate:
              'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_SUCCESS.SUMMARY',
            detailToTranslate:
              'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_SUCCESS.DETAIL',
          });
          this.close();
        });
    } catch (error) {
      this.unityStore.setIsLoading(false);
      this.toastService.showErrorMessage({
        summaryToTranslate:
          'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_UNSUCCESS.SUMMARY',
        detailToTranslate:
          'DASHBOARD.RECORDS.MODALS.EDIT_NEW_SESSION.FORM.MESSAGES.NEW_SESSION_EDIT_UNSUCCESS.DETAIL',
      });
    }
  }

  public close() {
    this.ModalWrapperRef.close();
  }
}
