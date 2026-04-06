import { ModalWrapperComponent } from '../../components/modal-wrapper/modal-wrapper.component';

export interface CloseModal {
  ModalWrapperRef: ModalWrapperComponent;
  close: () => void;
  onCloseBeforeNavigate?: () => void;
  onCloseAfterNavigate?: () => void;
}
