import OrderContext from "@/contexts/OrderContext";
import { Order } from "@/models";
import { Api } from "@/shared/api";
import { useContext } from "react";
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";

const Orders: React.FC = () => {
  const { order, setOrder } = useContext(OrderContext);

  const handleRemoveProductFromOrder = (productId: number) => {
    Api.post<Order>(`order/${order.id}/remove-product`, { productId }).then(
      (orderNew) => {
        if (orderNew) {
          setOrder(orderNew);
        }
      }
    );
  };

  return (
    <>
      {order && order.products ? (
        <div className="p-10 text-xl flex flex-col gap-10">
          <h1 className="text-4xl text-gray-300">Itens em seu pedido</h1>

          <div className="grid grid-cols-4 gap-12">
            {order.products.map((productOnOrder) => (
              <div
                key={productOnOrder.productId}
                className="flex flex-col rounded-2xl gap-2 pt-20 pb-4 bg-[#030303] text-white"
              >
                <p className="text-md font-semibold text-center uppercase text-3xl">
                  {productOnOrder.product.name}
                </p>
                <div className="flex justify-evenly py-20">
                  <div className="uppercase flex flex-col items-end">
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
                <div className="grid grid-cols-2 justify-end items-end gap-4 mx-4">
                  <button
                    onClick={() =>
                      handleRemoveProductFromOrder(productOnOrder.productId)
                    }
                    className="bg-red-500 py-2 font-semibold rounded-full"
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
      ) : (
        <div className="flex items-center justify-center text-gray-400 h-full w-full">
          <p>Nenhum item no seu pedido</p>
        </div>
      )}
    </>
  );
};

export default Orders;
