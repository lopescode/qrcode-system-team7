import { ProductIngredientsForm } from "@/components/forms/ProductIngredientsForm";
import { Product } from "@/types/Api";
import Modal from "react-modal";

type TProductsIngredientsModalProps = {
  modalIsOpen: boolean;
  onRequestClose: () => void;
  product: Product;
};

export const ProductIngredientsModal = ({
  modalIsOpen,
  onRequestClose,
  product,
}: TProductsIngredientsModalProps) => {
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
          padding: "0px",
        },
      }}
      contentLabel="Service Modal"
      portalClassName="modal"
    >
      <ProductIngredientsForm
        product={product}
        onRequestClose={onRequestClose}
      />
    </Modal>
  );
};
