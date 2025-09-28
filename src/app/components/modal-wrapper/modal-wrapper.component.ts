import { Component, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-wrapper',
  imports: [DialogModule, ButtonModule],
  standalone: true,
  templateUrl: 'modal-wrapper.component.html',
})
export class ModalWrapperComponent {
  visible = true;
  private readonly location = inject(Location);

  navigateBack() {
    this.location.back();
  }
}
