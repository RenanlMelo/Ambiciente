"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

export const SignIn_forms = () => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(formData.email, formData.password);
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-96px)]">
      <main className="px-12 pt-[5vh] pb-[8vh] w-[calc(100%-40px)] md:w-auto md:min-w-[calc(12vw+15rem)] flex flex-col gap-y-4 bg-[#f6f6f6] rounded-lg shadow-[0px_0px_30px_rgba(0,0,0,.25)]">
        <h2 className="text-clamp-xlarge font-bold text-[--medium_grey]">
          Login
        </h2>
        <p className="text-[var(--font-subtle)] text-clamp-small">
          Não tem uma conta?{" "}
          <Link
            href="/cadastro"
            className="font-semibold text-[--new] ml-1 underline decoration-[--new] underline-offset-2 hover:text-[--newL]"
          >
            Cadastre-se
          </Link>
        </p>
        {error && (
          <div className="text-red-500 text-sm py-2 px-3 bg-red-100 rounded-md text-clamp-small">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-[--medium_grey] text-clamp-small">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border rounded bg-[--f6_white] shadow-[3px_4px_5px_#00000020] focus:outline-none text-clamp-small"
          />

          <label className="block mb-2 font-semibold text-[--medium_grey] text-clamp-small">
            Senha
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full mb-6 p-2 border rounded bg-[--f6_white] shadow-[3px_4px_5px_#00000020] focus:outline-none text-clamp-small"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold rounded bg-[--newxL] text-[--f6_white] text-clamp-small tracking-wider hover:bg-[--newL] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Carregando..." : "Logar"}
          </button>
        </form>
      </main>
    </div>
  );
};
