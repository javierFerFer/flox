import { Location } from '@angular/common';
import {
  Component,
  ComponentRef,
  DestroyRef,
  inject,
  OnInit,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CloseModal } from '../../pages/modals/close-modal-interface';

type CustomComponentIntance = {
  instance: ComponentRef<unknown>['instance'] & CloseModal;
} & ComponentRef<unknown>;

@Component({
  selector: 'app-modal-wrapper',
  imports: [DialogModule, ButtonModule],
  standalone: true,
  templateUrl: 'modal-wrapper.component.html',
})
export class ModalWrapperComponent implements OnInit {
  visible = true;
  autoMaximize = false;
  modalClosable = true;

  componentSpot = viewChild.required('spot', { read: ViewContainerRef });
  modalTitle: string = '';
  private componentRef!: CustomComponentIntance;
  private readonly translocoService = inject(TranslocoService);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);

  constructor(private activatedRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    await this.renderComponent();
    const modalTitleKey = this.activatedRoute.snapshot.data[
      'modalTitleKey'
    ] as string;

    const autoMaximize = this.activatedRoute.snapshot.data[
      'autoMaximize'
    ] as string;

    const modalClosable = this.activatedRoute.snapshot.data[
      'modalClosable'
    ] as boolean;

    if (autoMaximize !== undefined) {
      this.autoMaximize = true;
    }

    if (modalClosable !== undefined) {
      this.modalClosable = modalClosable;
    }

    this.translocoService
      .selectTranslate(modalTitleKey)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.modalTitle = value;
      });
  }

  private async renderComponent() {
    const modalComponentPromise =
      this.activatedRoute.snapshot.data['modalComponentPromise'];
    const componentToRender = await modalComponentPromise();
    this.componentRef = this.componentSpot().createComponent(componentToRender);
    this.componentRef.setInput('modalWrapperRef', this);
  }

  public close() {
    if (this.componentRef.instance?.onClose) {
      this.componentRef.instance?.onClose();
    }
    this.location.back();
  }
}
