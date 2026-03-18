import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalWrapperComponent } from '../../../components/modal-wrapper/modal-wrapper.component';
import { CloseModal } from '../close-modal-interface';

@Component({
  selector: 'app-user-config',
  imports: [RouterModule],
  standalone: true,
  templateUrl: 'user-config.component.html',
  host: {
    class: 'w-full block min-h-[596px]',
    style:
      'border-top-left-radius: 30px; box-shadow: inset 0 3px 4px #0000001a; background-color: var(--p-background); padding: 2rem; padding-top: 3rem; padding-bottom: 5rem; height: 100%; border-bottom-right-radius: var(--p-dialog-border-radius);',
  },
})
export class UserConfigModalComponent implements CloseModal {
  @Input('modalWrapperRef')
  ModalWrapperRef!: ModalWrapperComponent;

  public close() {
    this.ModalWrapperRef.close();
  }
}
