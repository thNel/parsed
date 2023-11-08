import { ReactElement } from 'react';
import { ModalOptions } from '@/components/ModalProvider';
import { voidFn } from '@/constants/other';

class ModalUtils {
  openModal: (component: ReactElement, options?: ModalOptions) => void = voidFn;
  closeModal: typeof voidFn = voidFn;

  setup(
    openModal: (component: ReactElement, options?: ModalOptions) => void,
    closeModal: typeof voidFn,
  ) {
    this.openModal = openModal;
    this.closeModal = closeModal;
  }
}

export default new ModalUtils();
