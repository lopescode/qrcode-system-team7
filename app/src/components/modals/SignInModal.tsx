import { SignInForm } from "@/components/forms/SignInForm";
import Modal from "react-modal";

type TSignInModalProps = {
  modalIsOpen: boolean;
  onRequestClose: () => void;
  openSignUpModal: () => void;
  openProductModal: () => void;
};

export const SignInModal = ({
  modalIsOpen,
  onRequestClose,
  openSignUpModal,
  openProductModal,
}: TSignInModalProps) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          maxWidth: "35%",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "1px 2px #888888",
          background: "#414244",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        },
      }}
      contentLabel="Service Modal"
      portalClassName="modal"
    >
      <SignInForm
        openSignUpModal={openSignUpModal}
        openProductModal={openProductModal}
      />
    </Modal>
  );
};
