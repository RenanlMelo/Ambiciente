"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// Define the shape of a user object
type User = {
  id: number;
  name: string;
  last_name: string;
  email: string;
  role: string;
};

// Define the context interface
type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    last_name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: "",
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  const isTokenExpired = (token: string) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    (async () => {
      const savedToken = localStorage.getItem("access_token");
      if (!savedToken || isTokenExpired(savedToken)) {
        setLoading(false);
        return;
      }
      setToken(savedToken);
      try {
        const res = await fetch(`${apiUrl}/api/users/me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser({
            id: data.id,
            name: data.name,
            last_name: data.last_name,
            email: data.email,
            role: data.role,
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [apiUrl]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiUrl}/api/users/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password }),
      });
      if (!res.ok) throw new Error("Login failed");

      const { access_token } = await res.json();
      localStorage.setItem("access_token", access_token);
      setToken(access_token);

      // Fetch user profile using the new token directly
      const userRes = await fetch(`${apiUrl}/api/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (!userRes.ok) throw new Error("Failed to fetch user");
      const profile = await userRes.json();
      setUser({
        id: profile.id,
        name: profile.name,
        last_name: profile.last_name,
        email: profile.email,
        role: profile.role,
      });

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    last_name: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiUrl}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, last_name, email, password }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Registration failed");
      }
      router.push("/login");
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
