import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal-wrapper',
  imports: [DialogModule, ButtonModule],
  standalone: true,
  templateUrl: 'modal-wrapper.component.html',
})
export class ModalWrapperComponent implements OnInit {
  visible = true;
  componentSpot = viewChild.required('spot', { read: ViewContainerRef });
  modalTitle: string = '';
  private readonly translocoService = inject(TranslocoService);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);

  constructor(private activatedRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    await this.renderComponent();
    const modalTitleKey = this.activatedRoute.snapshot.data[
      'modalTitleKey'
    ] as string;
    this.translocoService
      .selectTranslate(modalTitleKey)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.modalTitle = value;
      });
  }

  private async renderComponent() {
    const modalComponentPromise = this.activatedRoute.snapshot.data[
      'modalComponentPromise'
    ] as Promise<any>;
    const componentToRender = await modalComponentPromise;

    this.componentSpot().createComponent(componentToRender);
  }

  navigateBack() {
    this.location.back();
  }
}
