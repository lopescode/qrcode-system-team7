import CustomerContext from "@/contexts/CustomerContext";
import OrderContext from "@/contexts/OrderContext";
import { Customer, Order } from "@/models";
import { Metadata } from "next";
import { type AppProps } from "next/app";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import "./globals.css";
import RootLayout from "./layout";

export const metadata: Metadata = {
  title: "Menu Digital",
  description: "Menú digital para restaurantes",
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [order, setOrder] = useState<Order>({} as Order);
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      <OrderContext.Provider value={{ order, setOrder }}>
        <RootLayout>
          <Component {...pageProps} />
          <ToastContainer />
        </RootLayout>
      </OrderContext.Provider>
    </CustomerContext.Provider>
  );
};

export default App;
