import { ProductOnOrder } from "@/types/Api";
import Image from "next/image";

type TProductOnOrderCardProps = {
  productOnOrder: ProductOnOrder;
  handleRemoveProductFromOrder: (id: number) => void;
};

export const ProductOnOrderCardProps = ({
  handleRemoveProductFromOrder,
  productOnOrder,
}: TProductOnOrderCardProps) => {
  return (
    <div
      className="h-80 w-60 rounded-lg bg-black/30"
      key={productOnOrder.product.id}
    >
      <div className="flex h-full w-full flex-col items-center gap-2">
        <div className="h-20 w-full overflow-hidden">
          <Image
            className="h-full w-full rounded-t-lg object-cover transition duration-300 ease-out hover:scale-125 hover:ease-in"
            src={productOnOrder.product.imageUrl}
            alt={productOnOrder.product.name}
            width={300}
            height={300}
          />
        </div>
        <div className="mt-2 flex flex-col">
          <span className="text-xl text-orange-400">
            {productOnOrder.product.name}
          </span>
        </div>
        <ul>
          <li>Quantidade: {productOnOrder.quantity}</li>
          <li>Valor unitário: {productOnOrder.product.price}</li>
          <li>
            Valor total: R${" "}
            {(
              productOnOrder.quantity * Number(productOnOrder.product.price)
            ).toFixed(2)}
          </li>
        </ul>
        <div className="w-full p-4">
          <button
            onClick={() =>
              handleRemoveProductFromOrder(productOnOrder.productId)
            }
            className="w-full rounded-md bg-red-500 py-2 font-semibold hover:bg-red-700"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};
