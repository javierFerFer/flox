import { Component, computed, effect, inject, Input } from '@angular/core';
import { ModalWrapperComponent } from '../../../../../components/modal-wrapper/modal-wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { UnityStore } from '../../../../../stores/unity/unity.store';
import { TranslocoDirective } from '@jsverse/transloco';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { UnitsService } from '../../../../../services/unity/unity.service';
import { ToastService } from '../../../../../services/toast/toast.service';
import { UnitDetailsTableComponent } from '../unit-details-table/unit-details-table.component';
import { NoSuggestDirective } from '../../../../../directives/no-suggest.directive';
import { SwapperComponent } from '../../../../../components/swapper-components/swapper.component';
import { CheckComplexHTMLPipe } from '../../../../../pipes/check-complex-html.pipe';
import { SanitizeHTMLPipe } from '../../../../../pipes/sanitize-html.pipe';
import { TextEditorComponent } from '../../../../../components/text-editor/text-editor.component';

@Component({
  selector: 'app-units-show',
  templateUrl: 'unit-show.component.html',
  styleUrl: 'unit-show.component.scss',
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
    CheckComplexHTMLPipe,
    SwapperComponent,
    SanitizeHTMLPipe,
    TextEditorComponent,
  ],
})
export class UnitsShowComponent {
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
    unitTitle: [{ value: '', disabled: true }],
    summary: [{ value: '', disabled: true }],
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

  public close() {
    this.ModalWrapperRef.close();
  }
}
