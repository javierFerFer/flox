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
  ],
})
export class UnitsDetailComponent {
  @Input('modalWrapperRef')
  public ModalWrapperRef!: ModalWrapperComponent;

  private readonly route = inject(ActivatedRoute);
  private readonly uuid = toSignal(this.route.params);
  private readonly unityStore = inject(UnityStore);
  private readonly fb = inject(FormBuilder);

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

  public saveChanges() {}

  public close() {
    this.ModalWrapperRef.close();
  }
}
