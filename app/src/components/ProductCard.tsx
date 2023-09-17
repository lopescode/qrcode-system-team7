import React from 'react';

interface ProductCardProps {
  id: number
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  handleProductClick: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, imageUrl, price, name, description, handleProductClick }: ProductCardProps) => {
  return (
    <button
      className="cursor-pointer bg-black w-60 rounded-lg hover:scale-105 overflow-hidden transition duration-200 ease-out hover:ease-in hover:shadow-2xl hover:shadow-orange-500/20 hover:font-semibold"
      onClick={() => handleProductClick(id)}
      key={id}
    >
      <div className="w-60 h-60 overflow-hidden">
        <img
          className="w-full h-full object-cover transition duration-300 ease-out hover:ease-in hover:scale-125"
          src={imageUrl}
          alt={name}
        />
      </div>
      <div className="p-3">
        <h1 className="text-orange-400 text-xl">{name}</h1>
        <p className="text-white text-md">{description}</p>
        <p className="text-orange-400 font-semibold text-2xl mt-2 text-right pr-2">R$ {price}</p>
      </div>
    </button>
  );
};
