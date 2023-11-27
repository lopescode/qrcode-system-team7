import { AppContext } from "@/contexts/AppContext";
import "@/styles/globals.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [currentPanel, setCurrentPanel] = useState<string>("menu");
  return (
    <AppContext.Provider
      value={{
        currentPanel,
        setCurrentPanel,
      }}
    >
      <SessionProvider session={session}>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Component {...pageProps} />
      </SessionProvider>
    </AppContext.Provider>
  );
};

export default App;
