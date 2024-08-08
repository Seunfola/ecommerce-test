declare module 'react-modal' {
  import * as React from 'react';

  export interface ModalProps {
    isOpen: boolean;
    onRequestClose?: () => void;
    contentLabel?: string;
    className?: string;
    overlayClassName?: string;
    children?: React.ReactNode;
  }

  export default class Modal extends React.Component<ModalProps> {}
}
