"use client"; // Para permitir o uso de useState

import { createContext, useContext, useState } from "react";

interface AdminContextType {
  admin: boolean;
  setAdmin: (admin: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within a AdminProvider");
  return context;
}
