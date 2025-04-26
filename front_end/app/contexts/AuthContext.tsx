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
  username: string;
  email: string;
};

// Define the context interface
type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: "",
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return setLoading(false);
      try {
        const res = await fetch(`${apiUrl}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser({ username: data.username, email: data.email });
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

      const me = await fetch(`${apiUrl}/api/users/me`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      if (!me.ok) throw new Error("Unable to fetch user info");

      const userData = await me.json();
      setUser({ username: userData.username, email: userData.email });
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiUrl}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Registration failed");
      }
      // Optionally auto-login or redirect to login
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
