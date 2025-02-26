"use client"; // Para permitir o uso de useState

import { createContext, useContext, useState } from "react";

interface HeaderContextType {
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <HeaderContext.Provider value={{ headerHeight, setHeaderHeight }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context)
    throw new Error("useHeader must be used within a HeaderProvider");
  return context;
}
