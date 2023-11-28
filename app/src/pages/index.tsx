import { Sidebar } from "@/components/Sidebar";
import { MenuPanel } from "@/components/panels/MenuPanel";
import { OrderPanel } from "@/components/panels/OrderPanel";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

const panelMap = new Map<string, JSX.Element>([
  ["menu", <MenuPanel key={Math.random()} />],
  ["order", <OrderPanel key={Math.random()} />],
]);

const Index: NextPage = () => {
  const router = useRouter();
  const { panel } = router.query;

  const panelJSXElement = useMemo(() => {
    return panelMap.get(panel as string);
  }, [panel]);

  return (
    <>
      <Head>
        <title>Cardápio Online</title>
        <meta name="description" content="Cardápio online app" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <main className="h-min-screen max-w-screen flex w-full flex-row overflow-x-hidden bg-heavy-metal">
        <div className="h-screen">
          <Sidebar />
        </div>
        <div className="h-screen w-full overflow-auto">{panelJSXElement}</div>
      </main>
    </>
  );
};

export default Index;
