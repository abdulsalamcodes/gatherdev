"use client";

import { createContext, useContext } from "react";
import AppStore from "../app/stores/app";

interface AppContextType {
  store: AppStore;
}

const MainContext = createContext<null | AppContextType>(null);

export const useMainContext = () => {
  const context = useContext(MainContext);
  return context as AppContextType;
};

export default MainContext;
