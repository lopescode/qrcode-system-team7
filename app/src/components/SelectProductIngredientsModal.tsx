import { Product, ingredientsOnProduct } from "@/models";
import React from "react";
import Modal from "./Modal";

interface SelectProductIngredientsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedProduct: Product;
  handleSelectProductClick: (productId: number) => void;
  ingredients: ingredientsOnProduct[];
}

const SelectProductIngredientsModal: React.FC<
  SelectProductIngredientsModalProps
> = ({
  isOpen,
  onRequestClose,
  handleSelectProductClick,
  selectedProduct,
  ingredients,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="bg-white rounded-lg flex flex-col gap-6">
        <img
          src={selectedProduct.imageUrl}
          alt="Image"
          width={300}
          height={300}
        />

        <h1 className="text-2xl text-gray-800 font-bold">
          {selectedProduct.name}
        </h1>

        {ingredients && ingredients.length && ingredients.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl text-gray-800 font-semibold">
              Ingredientes do pedido
            </h2>

            {ingredients.map((ingredient, index) => (
              <ul className="list-disc ml-4">
                <li key={index} className="text-gray-700">
                  {ingredient.ingredient.name}
                </li>
              </ul>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2"
            onClick={onRequestClose}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => handleSelectProductClick(selectedProduct.id)}
          >
            Adicionar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectProductIngredientsModal;
