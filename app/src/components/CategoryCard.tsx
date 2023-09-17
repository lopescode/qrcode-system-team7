import React from 'react'

interface CategoryCardProps {
  handleCategoryClick: (categoryId: number) => void
  id: number;
  imageUrl: string;
  name: string;
  description: string
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, handleCategoryClick, imageUrl, name, description }: CategoryCardProps) => {
  return (
    <button
      className="cursor-pointer bg-black w-60 rounded-lg hover:scale-105 overflow-hidden transition duration-200 ease-out hover:ease-in hover:shadow-2xl hover:shadow-orange-500/20
      hover:font-semibold"
      key={id}
      onClick={() => handleCategoryClick(id)}
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
      </div>
    </button>
  );
};
