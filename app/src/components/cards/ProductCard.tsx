import { Product } from "@/types/Api";
import Image from "next/image";

type TProductCardProps = {
  product: Product;
  handleProductClick: (product: Product) => void;
};

export const ProductCard = ({
  product,
  handleProductClick,
}: TProductCardProps) => {
  return (
    <button
      className="h-80 w-60 cursor-pointer overflow-hidden rounded-lg bg-black/50 transition duration-200 ease-out hover:scale-105 hover:font-semibold hover:shadow-2xl hover:shadow-orange-500/20
      hover:ease-in"
      key={product.id}
      onClick={() => handleProductClick(product)}
    >
      <div className="h-full w-full">
        <div className="h-44 w-full overflow-hidden">
          <Image
            className="h-full w-full object-cover transition duration-300 ease-out hover:scale-125 hover:ease-in"
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={300}
          />
        </div>
        <div className="flex h-1/2 w-full flex-col items-center justify-between p-4">
          <div className="flex flex-col">
            <span className="text-xl text-orange-400">{product.name}</span>
            <span className="text-md text-white">{product.description}</span>
          </div>
          <span className="mb-4 text-right text-2xl font-semibold text-orange-400">
            R$ {product.price}
          </span>
        </div>
      </div>
    </button>
  );
};
