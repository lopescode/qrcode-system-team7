import { HttpRequestHelper } from "@/helpers/HTTPRequestHelper";
import { Product } from "@/types/Api";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type TProductIngredientsFormProps = {
  product: Product;
  onRequestClose: () => void;
};

export const ProductIngredientsForm = ({
  onRequestClose,
  product,
}: TProductIngredientsFormProps) => {
  const { data: session } = useSession();

  const accessToken = useMemo(() => {
    return session?.user.access_token;
  }, [session]);

  const handleProductIngredientsSubmit = async () => {
    const response = await HttpRequestHelper.post(
      `/order/${session?.user.order_id}/add-product/${product.id}`,
      {},
      accessToken
    );

    if (!response || !response.result) {
      toast.error(response?.message ?? "Houve um erro inesperado");
      return;
    }

    toast.success("Produto adicionado ao pedido com sucesso.");
    onRequestClose();
  };

  const { handleSubmit } = useForm({
    mode: "onSubmit",
  });

  return (
    <form
      className="flex flex-col gap-6 rounded-lg text-white"
      onSubmit={handleSubmit(handleProductIngredientsSubmit)}
    >
      <Image
        src={product.imageUrl}
        alt="Product image"
        width={300}
        height={300}
      />

      <h1 className="text-2xl font-bold">{product.name}</h1>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold ">Ingredientes do pedido</h2>

        <ul className="ml-4 list-disc">
          {product.ingredientOnProduct.map((ingredient) => {
            return (
              <li key={ingredient.ingredient.id}>
                {ingredient.ingredient.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="mr-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={() => onRequestClose()}
          type="button"
        >
          Cancelar
        </button>
        <button
          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          type="submit"
        >
          Adicionar
        </button>
      </div>
    </form>
  );
};
