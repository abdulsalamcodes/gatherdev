import React, { useContext } from "react";
import AppStore from "./stores/app";
import AppApi from "./appApi";

interface AppContextType {
  store: AppStore;
  api: AppApi;
}

const AppContext = React.createContext<null | AppContextType>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};

export default AppContext;