import { Order } from "@/models";
import { createContext } from "react";

type OrderContext = {
  order: Order;
  setOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContext>({
  order: {} as Order,
  setOrder: (order: Order) => {},
});

export default OrderContext;
