"use client";

import AppApi from "./appApi";
import AppStore from "./stores/app";
import MainContext from "./appContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const store = new AppStore();
  const api = new AppApi(store);

  return (
    <MainContext.Provider value={{ store, api }}>
      {children}
    </MainContext.Provider>
  );
}
