import { Location } from '@angular/common';
import {
  Component,
  ComponentRef,
  inject,
  OnInit,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { switchMap, take } from 'rxjs';
import { CloseModal } from '../../pages/modals/close-modal-interface';

type CustomComponentIntance = {
  instance: ComponentRef<unknown>['instance'] & CloseModal;
} & ComponentRef<unknown>;

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: 'modal-wrapper.component.html',
  standalone: true,
  imports: [DialogModule, ButtonModule],
})
export class ModalWrapperComponent implements OnInit {
  visible = true;
  autoMaximize = signal(false);
  modalClosable = signal(true);

  componentSpot = viewChild.required('spot', { read: ViewContainerRef });
  modalTitle: string = '';
  private componentRef!: CustomComponentIntance;
  private readonly translocoService = inject(TranslocoService);
  private readonly location = inject(Location);

  constructor(private activatedRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
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
      this.autoMaximize.update(() => true);
    }

    if (modalClosable !== undefined) {
      this.modalClosable.update(() => modalClosable);
    }

    this.translocoService
      .selectTranslate(modalTitleKey)
      .pipe(
        take(1),
        switchMap((value) => {
          this.modalTitle = value;
          return this.renderComponent();
        }),
      )
      .subscribe();
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
