"use client";

import AppStore from "./stores/app";
import MainContext from "./appContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const store = new AppStore();

  return (
    <MainContext.Provider value={{ store }}>
      {children}
    </MainContext.Provider>
  );
}
