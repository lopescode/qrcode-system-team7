import { ProductCategory } from "@/types/Api";
import Image from "next/image";

type TCategoryCardProps = {
  category: ProductCategory;
  handleCategoryClick: () => void;
};

export const CategoryCard = ({
  handleCategoryClick,
  category,
}: TCategoryCardProps) => {
  return (
    <button
      className="h-80 w-60 cursor-pointer overflow-hidden rounded-lg bg-black/50 transition duration-200 ease-out hover:scale-105 hover:font-semibold hover:shadow-2xl hover:shadow-orange-500/20
      hover:ease-in"
      key={category.id}
      onClick={handleCategoryClick}
    >
      <div className="flex h-full w-full flex-col gap-2">
        <div className="h-52 w-full overflow-hidden">
          <Image
            className="h-full w-full object-cover transition duration-300 ease-out hover:scale-125 hover:ease-in"
            src={category.imageUrl}
            alt={category.name}
            width={300}
            height={300}
          />
        </div>
        <div className="mt-2 flex flex-col">
          <span className="text-xl text-orange-400">{category.name}</span>
          <span className="text-md text-white">{category.description}</span>
        </div>
      </div>
    </button>
  );
};
