import React from "react";
import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

ReactModal.setAppElement("#__next"); // Define o elemento raiz do seu aplicativo

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      className="modal-content bg-white p-4 rounded-lg shadow-lg"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
