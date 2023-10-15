import { Metadata } from "next";
import { type AppProps } from "next/app";
import React from "react";
import "tailwindcss/tailwind.css";
import "./globals.css";
import RootLayout from "./layout";

export const metadata: Metadata = {
  title: "Menu Digital",
  description: "Menú digital para restaurantes",
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default App;
