import { Order } from "@/models";
import { getOrder } from "@/shared/api";
import { useEffect, useState } from "react";
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";

const Orders: React.FC = () => {
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    async function fetch() {
      const orderId = 2;
      const order = await getOrder(orderId);

      setOrder(order);
    }

    fetch();
  }, []);

  return (
    <>
      {order && (
        <div className="p-10 text-xl flex flex-col gap-10">
          <h1 className="text-4xl text-gray-300">Itens em seu pedido</h1>

          {order.products &&
            order.products.length &&
            order.products.length > 0 && (
              <div className="flex flex-wrap -mx-4">
                {order.products.map((productOnOrder) => (
                  <div
                    key={productOnOrder.productId}
                    className="w-1/4 px-4 mb-2"
                  >
                    <div className="flex gap-2 bg-orange-500 rounded-xl">
                      <div className="rounded-full h-4 w-4 m-4 bg-zinc-900" />
                      <p className="text-md text-zinc-800 font-bold text-center mt-2">
                        {productOnOrder.product.name}
                      </p>
                    </div>
                    <div className="mx-2">
                      <p>
                        {productOnOrder.quantity}x{" "}
                        {productOnOrder.product.price}
                      </p>
                      <p className="mb-2">
                        <span className="font-bold text-gray-400">R$</span>{" "}
                        {(
                          productOnOrder.quantity *
                          parseFloat(productOnOrder.product.price)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {!order.products ||
            (order.products.length === 0 && (
              <div className="text-gray-400 ml-4">
                <p>Nenhum item no seu pedido</p>
              </div>
            ))}

          <div>
            <p>VALOR TOTAL</p>
            <p className="text-3xl text-gray-300">
              R$ {parseFloat(order.price).toFixed(2)}
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-10">
              <div>
                <p>STATUS</p>
                {order.paymentStatus === "PAID" ? (
                  <span className="text-green-500">PAGO</span>
                ) : (
                  <span className="text-orange-500 text-xl font-semibold">
                    AGUARDANDO PAGAMENTO
                  </span>
                )}
              </div>
              <div>
                <p>FORMA DE PAGAMENTO</p>
                <p className="text-gray-400 mb-2">
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

export default Orders;
