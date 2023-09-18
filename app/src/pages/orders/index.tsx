import { Product } from "@/models";
import { useState, useEffect } from "react";
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";

type OrderStatus = {
  name: string;
  description: string;
};

type OrderItem = {
  product: Product;
  orderStatus: OrderStatus;
};

const Orders: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>();

  useEffect(() => {
    const fetchOrder = async () => {
      const orderId = 1;
      const orderFetched = await fetch(
        `http://localhost:3000/order-item?orderId=${orderId}`
      );
      const data = await orderFetched.json();
      setOrderItems(data);
    };

    fetchOrder();
  }, []);

  const getTotalValue = () => {
    if (!orderItems || orderItems.length === 0) {
      return 0;
    }

    return orderItems.reduce((acc, orderItem) => {
      return acc + parseFloat(orderItem.product.price);
    }, 0);
  };

  const isOrderPaid = () => {
    if (!orderItems || orderItems.length === 0) {
      return false;
    }

    return orderItems.every((orderItem) => orderItem.orderStatus.name === "PAGO");
  };

  const getOrderSummary = () => {
    if (!orderItems || orderItems.length === 0) {
      return [];
    }

    const groupedItems: Record<string, { item: OrderItem; count: number }> = {};

    orderItems.forEach((orderItem) => {
      const productName = orderItem.product.name;
      if (!groupedItems[productName]) {
        groupedItems[productName] = { item: orderItem, count: 1 };
      } else {
        groupedItems[productName].count += 1;
      }
    });

    return Object.values(groupedItems);
  };

  return (
    <div className="p-10 text-xl flex flex-col gap-10">
      <h1 className="text-4xl text-gray-300">Itens em seu pedido</h1>

      <div className="flex flex-wrap -mx-4">
        {getOrderSummary().map(({ item, count }) => (
          <div key={item.product.name} className="w-1/4 px-4 mb-2">
            <div className="flex gap-2 bg-orange-500 rounded-xl">
              <div className="rounded-full h-4 w-4 m-4 bg-zinc-900" />
              <p className="text-md text-zinc-800 font-bold text-center mt-2">
                {item.orderStatus.name}
              </p>
            </div>
            <div className="mx-2">
              <p>{count}x {item.product.name}</p>
              <p className="mb-2">
                <span className="font-bold text-gray-400">R$</span>{" "}
                {(
                  parseFloat(item.product.price) * count
                ).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        {orderItems && orderItems.length === 0 && (
          <div className="text-gray-400 ml-4">
            <p>Nenhum item no seu pedido</p>
          </div>
        )}
      </div>

      <div>
        <p>VALOR TOTAL</p>
        <p className="text-3xl text-gray-300">R$ {getTotalValue().toFixed(2)}</p>
      </div>

      <div>
        {orderItems && orderItems.length > 0 && (
          <div className="flex flex-col gap-10">
            <div>
              <p>STATUS</p>
              {isOrderPaid() ? (
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
        )}
      </div>
    </div>
  );
};

export default Orders;
