import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  contentChild,
  Input,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-swapper',
  templateUrl: 'swapper.component.html',
  host: {
    class: 'w-full h-full',
  },
  imports: [CommonModule],
})
export class SwapperComponent {
  @Input({ transform: booleanAttribute })
  isVisible = true;

  headerContent: Signal<any> = contentChild('headerContent');
  contentFirstComponent: Signal<any> = contentChild('firstComponent');
  contentSecondComponent: Signal<any> = contentChild('secondComponent');

  setVisibility(isVisible: boolean) {
    this.isVisible = isVisible;
  }
}
