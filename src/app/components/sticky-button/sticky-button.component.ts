import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  output,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

export type StickyPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left'
  | 'bottom-center'
  | 'top-center';

@Component({
  selector: 'app-sticky-button',
  templateUrl: './sticky-button.component.html',
  styleUrl: './sticky-button.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, TranslocoDirective, ButtonModule],
})
export class StickyButtonComponent {
  position = input<StickyPosition>('bottom-right');
  disabled = input<boolean>(false);
  onClick = output<void>();
  customContent = contentChild('stickyContent');

  hasCustomContent = computed(() => !!this.customContent());

  positionClass = computed(() => {
    const pos = this.position();
    return {
      'sticky-bottom-right': pos === 'bottom-right',
      'sticky-bottom-left': pos === 'bottom-left',
      'sticky-top-right': pos === 'top-right',
      'sticky-top-left': pos === 'top-left',
      'sticky-bottom-center': pos === 'bottom-center',
      'sticky-top-center': pos === 'top-center',
    };
  });
}
