"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

export const SignIn_forms = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/api/users/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Store the token securely (consider httpOnly cookies in production)
      localStorage.setItem("access_token", data.access_token);

      // Redirect or handle successful login
      window.location.href = "/";
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center flex-col h-[100vh]">
      <main className="px-12 py-12 w-[calc(10vw+20rem)] flex flex-col gap-y-4 bg-[#f6f6f6] rounded-lg">
        <h2 className="text-2xl font-bold text-[var(--font-title)]">Login</h2>
        <p className="text-[var(--font-subtle)]">
          Não tem uma conta?
          <Link
            href="/registro"
            className="font-semibold text-[var(--main)] ml-1 underline decoration-[var(--main)] underline-offset-2 hover:text-[var(--mainHover)]"
          >
            Cadastre-se
          </Link>
        </p>

        {error && (
          <div className="text-red-500 text-sm py-2 px-3 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-y-1 mb-5">
            <label className="text-[var(--font-title)] font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-md bg-[var(--white)] shadow-[3px_4px_10px_#00000040] focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-y-1 mb-5">
            <label className="text-[var(--font-title)] font-semibold">
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="px-3 py-2 rounded-md bg-[var(--white)] shadow-[3px_4px_10px_#00000040] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`my-4 px-2 py-3 w-full bg-[var(--secondary)] text-[var(--white)] font-bold tracking-wider hover:bg-[var(--secondaryHover)] rounded-md ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Carregando..." : "Logar"}
          </button>
        </form>
      </main>
    </div>
  );
};
