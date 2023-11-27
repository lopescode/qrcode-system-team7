import { HttpRequestHelper } from "@/helpers/HTTPRequestHelper";
import { Order } from "@/types/Api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";
import { toast } from "react-toastify";

export const OrderPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await HttpRequestHelper.get(
        `order?userId=${session?.user.id}&paymentStatus=PENDING&includeProducts=true`
      );

      if (!response || !response.result) {
        toast.error(response?.message ?? "Houve um erro inesperado");
        return;
      }

      setOrders(response.result);
      setCurrentOrder(response.result[0]);
    };

    fetchOrder();
  }, []);

  const handleRemoveProductFromOrder = (productId: number) => {
    console.log("remove product");
  };

  return (
    <>
      {!currentOrder ? (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          <p>Nenhum item no seu pedido</p>
        </div>
      ) : (
        <div className="flex flex-col gap-10 p-10 text-xl">
          <h1 className="text-4xl text-gray-300">Itens em seu pedido</h1>

          <div className="grid grid-cols-4 gap-12">
            {currentOrder.products.map((productOnOrder) => (
              <div
                key={productOnOrder.productId}
                className="flex flex-col gap-2 rounded-2xl bg-[#030303] pb-4 pt-20 text-white"
              >
                <p className="text-md text-center text-3xl font-semibold uppercase">
                  {productOnOrder.product.name}
                </p>
                <div className="flex justify-evenly py-20">
                  <div className="flex flex-col items-end uppercase">
                    <p>Quantidade:</p>
                    <p>Valor unitário:</p>
                    <p>Valor total:</p>
                  </div>
                  <div>
                    <p>{productOnOrder.quantity}</p>
                    <p>R$ {productOnOrder.product.price}</p>
                    <p>
                      R${" "}
                      {(
                        productOnOrder.quantity *
                        parseFloat(productOnOrder.product.price)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mx-4 grid grid-cols-2 items-end justify-end gap-4">
                  <button
                    onClick={() =>
                      handleRemoveProductFromOrder(productOnOrder.productId)
                    }
                    className="rounded-full bg-red-500 py-2 font-semibold"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p>VALOR TOTAL</p>
            <p className="text-3xl text-gray-300">
              R$ {parseFloat(currentOrder.price).toFixed(2)}
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-10">
              <div>
                <p>STATUS</p>
                {currentOrder.paymentStatus === "PAID" ? (
                  <span className="text-green-500">PAGO</span>
                ) : (
                  <span className="text-xl font-semibold text-orange-500">
                    AGUARDANDO PAGAMENTO
                  </span>
                )}
              </div>
              <div>
                <p>FORMA DE PAGAMENTO</p>
                <p className="mb-2 text-gray-400">
                  Selecione uma forma de pagamento
                </p>

                <div className="flex gap-4">
                  <button>
                    <FaCreditCard className="text-3xl text-gray-600 hover:text-gray-400" />
                  </button>
                  <button>
                    <FaMoneyBill className="text-4xl text-green-600 hover:text-green-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
