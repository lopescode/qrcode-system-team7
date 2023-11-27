import { Product } from "@/types/Api";
import Image from "next/image";
import { useForm } from "react-hook-form";

type TProductIngredientsFormProps = {
  product: Product;
  onRequestClose: () => void;
};

export const ProductIngredientsForm = ({
  onRequestClose,
  product,
}: TProductIngredientsFormProps) => {
  const handleProductIngredientsSubmit = () => {
    console.log("Adicionar");
  };

  const { handleSubmit } = useForm({
    mode: "onSubmit",
  });

  return (
    <form
      className="flex flex-col gap-6 rounded-lg bg-white"
      onSubmit={void handleSubmit(handleProductIngredientsSubmit)}
    >
      <Image
        src={product.imageUrl}
        alt="Product image"
        width={300}
        height={300}
      />

      <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">
          Ingredientes do pedido
        </h2>

        <ul className="ml-4 list-disc">
          {product.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient.ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="mr-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={() => onRequestClose()}
        >
          Cancelar
        </button>
        <button className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
          Adicionar
        </button>
      </div>
    </form>
  );
};
