// context/auth-context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type AuthContextType = {
  user: { id: string; role: string; email?: string } | null;
  isAdmin: boolean;
  status: "loading" | "authenticated" | "unauthenticated";
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  status: "loading",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const value = {
    user: session?.user || null,
    isAdmin: session?.user?.role === "ADMIN",
    status:
      status === "loading"
        ? "loading"
        : session
        ? "authenticated"
        : "unauthenticated",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
