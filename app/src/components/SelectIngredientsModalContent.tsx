import React from 'react';

interface SelectIngredientsModalContentProps {
  onClose: () => void;
}

const SelectIngredientsModalContent: React.FC<SelectIngredientsModalContentProps> = ({ onClose }) => {
  const ingredients = ['Ingrediente 1', 'Ingrediente 2', 'Ingrediente 3', 'Ingrediente 4', 'Ingrediente 5'];

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-600 font-bold mr-10">Selecione os ingredientes desejados</h2>
        <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
          Fechar
        </button>
      </div>
      <ul className="list-disc ml-4">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-700 mb-2">{ingredient}</li>
        ))}
      </ul>
      <div className="flex justify-end mt-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={onClose}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default SelectIngredientsModalContent;
