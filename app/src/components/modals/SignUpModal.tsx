import { SignUpForm } from "@/components/forms/SignUpForm";
import Modal from "react-modal";

type TSignUpModalProps = {
  modalIsOpen: boolean;
  onRequestClose: () => void;
  openSignInModal: () => void;
};

export const SignUpModal = ({
  modalIsOpen,
  onRequestClose,
  openSignInModal,
}: TSignUpModalProps) => {
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
          maxWidth: "100%",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "1px 2px #888888",
          background: "#414244",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        },
      }}
      contentLabel="Service Modal"
      portalClassName="modal"
    >
      <SignUpForm
        openSignInModal={openSignInModal}
        closeSignUpModal={onRequestClose}
      />
    </Modal>
  );
};
