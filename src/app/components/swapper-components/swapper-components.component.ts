import { CommonModule } from '@angular/common';
import { Component, contentChild, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-swapper-components',
  templateUrl: 'swapper-components.component.html',
  host: {
    class: 'w-full h-full',
  },
  imports: [CommonModule],
})
export class SwapperComponentsComponent {
  protected isVisible = signal(true);
  contentFirstElement: Signal<any> = contentChild('firstElement');
  contentSecondElement: Signal<any> = contentChild('secondElement');

  setVisibility(isVisible: boolean) {
    this.isVisible.set(isVisible);
  }
}
