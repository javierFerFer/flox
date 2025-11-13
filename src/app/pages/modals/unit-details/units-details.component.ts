import {
  Component,
  computed,
  effect,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { ModalWrapperComponent } from '../../../components/modal-wrapper/modal-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClassStore } from '../../../stores/class/class.store';
import { UnityStore } from '../../../stores/unity/unity.store';
import { TranslocoDirective } from '@jsverse/transloco';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { UnitsService } from '../../../services/unity/unity.service';
import { take } from 'rxjs';
import { ToastService } from '../../../services/toast/toast.service';
import { UnitDetailsTableComponent } from './components/unit-details-table/unit-details-table.component';
import { NoSuggestDirective } from '../../../directives/no-suggest.directive';

@Component({
  selector: 'app-units-details',
  templateUrl: 'unit-details.component.html',
  standalone: true,
  imports: [
    TranslocoDirective,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    FloatLabelModule,
    ButtonModule,
    UnitDetailsTableComponent,
    NoSuggestDirective,
  ],
})
export class UnitsDetailComponent {
  @Input('modalWrapperRef')
  public ModalWrapperRef!: ModalWrapperComponent;

  private readonly route = inject(ActivatedRoute);
  private readonly uuid = toSignal(this.route.params);
  private readonly fb = inject(FormBuilder);
  private readonly unitService = inject(UnitsService);
  private readonly toastService = inject(ToastService);

  protected unityStore = inject(UnityStore);

  protected selectedUnit = computed(() => {
    return this.unityStore.findUnit(this.uuid()?.['id'])!;
  });

  unitForm = this.fb.group({
    unitTitle: ['', Validators.required],
    summary: [''],
  });

  constructor() {
    effect(() => {
      const selectedUnit = this.selectedUnit();
      this.unitForm.patchValue(
        {
          unitTitle: selectedUnit.name,
          summary: selectedUnit.summary,
        },
        {
          emitEvent: false,
          onlySelf: true,
        },
      );
    });
  }

  public saveChanges() {
    try {
      const selectedUnit = this.selectedUnit();
      const { summary, unitTitle } = this.unitForm.getRawValue();
      this.unitService
        .updateUnit({
          name: unitTitle!,
          summary: summary || '',
          uuid: this.uuid()?.['id'],
          sessions: selectedUnit.sessions,
        })
        .pipe(take(1))
        .subscribe(() => {
          this.toastService.showSuccessMessage({
            summaryToTranslate:
              'DASHBOARD.RECORDS.MODALS.UNIT_DETAILS.FORM.MESSAGES.UNIT_DETAILS_EDIT_SUCCESS.SUMMARY',
            detailToTranslate:
              'DASHBOARD.RECORDS.MODALS.UNIT_DETAILS.FORM.MESSAGES.UNIT_DETAILS_EDIT_SUCCESS.DETAIL',
          });
        });
    } catch (error) {
      this.unityStore.setIsLoading(false);
      this.toastService.showErrorMessage({
        summaryToTranslate:
          'DASHBOARD.RECORDS.MODALS.UNIT_DETAILS.FORM.MESSAGES.UNIT_DETAILS_EDIT_UNSUCCESS.SUMMARY',
        detailToTranslate:
          'DASHBOARD.RECORDS.MODALS.UNIT_DETAILS.FORM.MESSAGES.UNIT_DETAILS_EDIT_UNSUCCESS.DETAIL',
      });
    }
  }

  public close() {
    this.ModalWrapperRef.close();
  }
}
