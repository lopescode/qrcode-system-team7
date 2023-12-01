import {
  IconChevronRight,
  IconDoorExit,
  IconLock,
  IconLockOpen,
  IconMenu,
  IconMenuOrder,
  IconSettings,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type Dispatch, type SetStateAction } from "react";

export type TSidebarConfigParams = {
  open: boolean;
  keepOpen: boolean;
  expandPanel: string;
};
export type TSideMenuOption = {
  name: string;
  panelName: string;
  children: TSideMenuOption[];
  icon: JSX.Element;
  fatherIcon?: JSX.Element;
  requiredPermission?: string;
};

export type TSideBarItemParams = {
  sidebarConfig: TSidebarConfigParams;
  setSidebarConfig: Dispatch<SetStateAction<TSidebarConfigParams>>;
  currentPanel: string;
  handlePanelChange: (name: string) => unknown;
  option: TSideMenuOption;
};

export const SideBarItem = ({
  sidebarConfig,
  setSidebarConfig,
  currentPanel,
  option,
  handlePanelChange,
}: TSideBarItemParams) => {
  const handleItemOnClick = () => {
    if (option.children.length === 0) {
      handlePanelChange(option.panelName);
    }

    setSidebarConfig({
      ...sidebarConfig,
      expandPanel:
        sidebarConfig.expandPanel === option.panelName ? " " : option.panelName,
    });
  };

  return (
    <li className="my-2">
      <button
        className={`flex h-14 w-full flex-row items-center ${
          sidebarConfig.open ? "justify-start" : "justify-center"
        } gap-4 rounded-md p-2 transition 
                  ${
                    currentPanel?.includes(option.panelName)
                      ? "bg-primary hover:bg-primary/70"
                      : "hover:bg-white/20"
                  }`}
        onClick={handleItemOnClick}
      >
        <i>{option.icon}</i>
        {sidebarConfig.open && <span className="font-bold">{option.name}</span>}
        {sidebarConfig.open && option.children.length > 0 && (
          <i
            className="ml-auto rounded-md p-1 transition hover:bg-white/10"
            onClick={handleItemOnClick}
          >
            <IconChevronRight
              className={`transition-all  ${
                sidebarConfig.expandPanel === option.panelName
                  ? "rotate-90"
                  : "rotate-0"
              } `}
            />
          </i>
        )}
      </button>
      <ul
        className={`w-full ${sidebarConfig.open ? "block" : "hidden"} ${
          sidebarConfig.expandPanel === option.panelName ? "h-auto" : "h-0"
        } overflow-hidden rounded-md  transition-all`}
      >
        {option.children.map((childOption, index) => (
          <li key={`option-${option.name}-child-${index}`}>
            <button
              className={`flex w-full flex-row items-center ${
                sidebarConfig.open ? "justify-start pl-5" : "justify-center"
              } gap-6 rounded-md py-2  transition hover:scale-[1.03] ${
                currentPanel === childOption.panelName
                  ? "bg-primary"
                  : " hover:bg-white/20"
              }`}
              onClick={() => handlePanelChange(childOption.panelName)}
            >
              <div className="relative mr-[-25px] flex flex-row">
                <i className="z-[5] translate-x-[-10px] rounded-full p-1">
                  {childOption.icon}
                </i>
              </div>
              {sidebarConfig.open && (
                <span className="font-bold">{childOption.name}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
};

export const Sidebar = () => {
  const router = useRouter();
  const currentPanel = router.query.panel as string;

  const [sidebarConfig, setSidebarConfig] = useState<TSidebarConfigParams>({
    open: true,
    keepOpen: true,
    expandPanel: "users",
  });

  const sideMenuOptions: TSideMenuOption[] = [
    {
      name: "Cardápio",
      panelName: "menu",
      icon: <IconMenu />,
      children: [],
    },
    {
      name: "Pedidos",
      panelName: "order",
      icon: <IconMenuOrder />,
      children: [],
    },
  ];

  const handlePanelChange = async (panelName: string) => {
    await router.push({
      pathname: router.pathname, // mantém o mesmo caminho
      query: { panel: panelName },
    });
  };

  return (
    <div
      className={`sticky top-0 hidden transition-all md:block ${
        sidebarConfig.keepOpen ? "w-[280px]" : "w-[80px]"
      } z-[20] h-full overflow-visible`}
    >
      <div
        className={`flex h-full shadow-xl ${
          sidebarConfig.open ? "w-[280px]" : "w-[80px]"
        } flex-col items-center overflow-hidden bg-charcoal-gray p-2 transition-all duration-[300ms]`}
        onMouseEnter={() => {
          setSidebarConfig({ ...sidebarConfig, open: true });
        }}
        onMouseLeave={() => {
          if (!sidebarConfig.keepOpen) {
            setSidebarConfig({ ...sidebarConfig, open: false });
          }
        }}
      >
        <div
          className={
            "mb-5 flex w-full flex-row items-center justify-between gap-6"
          }
        >
          <Link href={"/dashboard"}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="min-h-[50px] min-w-[50px]"
            ></Image>
          </Link>

          {sidebarConfig.open && (
            <button
              className="text-wwhite transition hover:rotate-12"
              onClick={() => {
                setSidebarConfig({
                  ...sidebarConfig,
                  keepOpen: !sidebarConfig.keepOpen,
                });
              }}
            >
              <i>{sidebarConfig.keepOpen ? <IconLock /> : <IconLockOpen />}</i>
            </button>
          )}
        </div>

        <ul className={`w-full gap-6 text-white`}>
          {sideMenuOptions.map((option, index) => (
            <SideBarItem
              currentPanel={currentPanel}
              handlePanelChange={handlePanelChange}
              option={option}
              setSidebarConfig={setSidebarConfig}
              sidebarConfig={sidebarConfig}
              key={"side-bar-option-" + index.toString()}
            />
          ))}
        </ul>

        <div className="bottom-0 mt-auto w-full">
          <button
            className={` flex w-full flex-row items-center ${
              sidebarConfig.open ? "justify-start" : "justify-center"
            } gap-6 rounded-md px-4 py-2 transition ${
              currentPanel === "settings" ? "bg-primary" : " hover:bg-white/20"
            }`}
            onClick={() => void handlePanelChange("settings")}
          >
            <i>
              <IconSettings color="white" />
            </i>

            {sidebarConfig.open && (
              <span className="font-bold text-white">Configurações</span>
            )}
          </button>
          <button
            className={` flex w-full flex-row items-center ${
              sidebarConfig.open ? "justify-start" : "justify-center"
            } gap-6 rounded-md px-4 py-2 transition hover:bg-white/20`}
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          >
            <i>
              <IconDoorExit />
            </i>
            {sidebarConfig.open && (
              <span className="font-bold text-white">Sair</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
