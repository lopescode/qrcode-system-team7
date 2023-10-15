import { Customer } from "@/models";
import { createContext } from "react";

type CustomerContext = {
  customer: Customer;
  setCustomer: (customer: Customer) => void;
};

const CustomerContext = createContext<CustomerContext>({
  customer: {} as Customer,
  setCustomer: (customer: Customer) => {},
});

export default CustomerContext;
