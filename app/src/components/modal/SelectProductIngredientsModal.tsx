import React from 'react';
import Modal from './Modal';

interface SelectProductIngredientsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
  proceedEvent: () => void;
  ingredients: string[];
}

const SelectProductIngredientsModal: React.FC<SelectProductIngredientsModalProps> = ({ isOpen, onRequestClose, proceedEvent, imageUrl, ingredients }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="bg-white rounded-lg">
        <div className="flex justify-between gap-6 items-start">
          <div>
          <img src={imageUrl} alt="Image" width={300} height={300} />
          <h2 className="text-2xl text-gray-600 font-bold mt-2">Ingredientes do pedido</h2>
          </div>
        </div>
        <ul className="list-disc ml-4">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700 mt-4">{ingredient}</li>
          ))}
        </ul>
        <div className="flex justify-end mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2"
            onClick={onRequestClose}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={proceedEvent}
          >
            Adicionar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectProductIngredientsModal;
