import { Dispatch, SetStateAction, createContext } from "react";

type TContextData = {
  currentPanel: string;
  setCurrentPanel: Dispatch<SetStateAction<string>>;
} | null;

export const AppContext = createContext<TContextData>(null);
