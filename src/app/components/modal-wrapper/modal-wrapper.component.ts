import { CommonModule, Location, NgClass } from '@angular/common';
import {
  Component,
  ComponentRef,
  inject,
  OnInit,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  imports: [DialogModule, ButtonModule, NgClass, CommonModule],
})
export class ModalWrapperComponent implements OnInit {
  visible = true;
  autoMaximize = signal(false);
  maximize = signal(true);
  modalClosable = signal(true);
  contentStyleClass = signal('');

  componentSpot = viewChild.required('spot', { read: ViewContainerRef });
  componentHelperSpot = viewChild.required('helperSpot', {
    read: ViewContainerRef,
  });
  modalTitle: string = '';
  private componentRef!: CustomComponentIntance;
  protected helperComponentRef!: CustomComponentIntance;
  private readonly translocoService = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  constructor(private activatedRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const modalTitleKey = this.activatedRoute.snapshot.data[
      'modalTitleKey'
    ] as string;

    const maximize = this.activatedRoute.snapshot.data['maximize'] as boolean;

    const autoMaximize = this.activatedRoute.snapshot.data[
      'autoMaximize'
    ] as string;

    const modalClosable = this.activatedRoute.snapshot.data[
      'modalClosable'
    ] as boolean;

    const contentStyleClass = this.activatedRoute.snapshot.data[
      'contentStyleClass'
    ] as string;

    if (autoMaximize !== undefined) {
      this.autoMaximize.update(() => true);
    }

    if (maximize !== undefined) {
      this.maximize.update(() => maximize);
    }

    if (modalClosable !== undefined) {
      this.modalClosable.update(() => modalClosable);
    }

    if (contentStyleClass !== undefined) {
      this.contentStyleClass.update(() => contentStyleClass);
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

    const helperComponentPromise =
      this.activatedRoute.snapshot.data['helperComponentPromise'];
    if (!!helperComponentPromise) {
      const helperComponentPromiseToRender = await helperComponentPromise();
      this.helperComponentRef = this.componentHelperSpot().createComponent(
        helperComponentPromiseToRender,
      );
    }

    this.componentRef = this.componentSpot().createComponent(componentToRender);
    this.componentRef.setInput('modalWrapperRef', this);
  }

  public close() {
    if (this.componentRef.instance?.onCloseBeforeNavigate) {
      this.componentRef.instance?.onCloseBeforeNavigate();
    }

    let routeToClear = this.activatedRoute;
    while (routeToClear.snapshot.outlet === 'primary' && routeToClear.parent) {
      routeToClear = routeToClear.parent;
    }

    const outletName = routeToClear.snapshot.outlet;

    if (outletName !== 'primary') {
      this.router.navigate([{ outlets: { [outletName]: null } }], {
        relativeTo: routeToClear.parent,
        queryParamsHandling: 'preserve',
      });
    } else {
      this.location.back();
    }

    if (this.componentRef.instance?.onCloseAfterNavigate) {
      this.componentRef.instance?.onCloseAfterNavigate();
    }
  }
}
