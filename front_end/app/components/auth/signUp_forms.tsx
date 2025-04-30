"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

export const SignUp_forms = () => {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);

      await register(
        formData.name,
        formData.last_name,
        formData.email,
        formData.password
      );
      setSuccess(true);
    } catch {
      // error shown via context
    }
  };

  if (success) {
    return (
      <div className="flex justify-center items-center h-screen">
        <main className="w-full max-w-md p-8 bg-gray-50 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Registrado com sucesso!</h2>
          <p className="mb-6 text-sm">
            Você pode agora{" "}
            <Link href="/login" className="text-blue-600 underline">
              logar
            </Link>
            .
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <main className="px-12 py-12 w-[calc(10vw+20rem)] flex flex-col gap-y-4 bg-[#f6f6f6] rounded-lg">
        <h2 className="text-clamp-xlarge font-bold text-[var(--font-title)]">
          Cadastro
        </h2>
        <p className="text-[var(--font-subtle)] text-clamp-small">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-semibold text-[var(--main)] ml-1 underline decoration-[var(--main)] underline-offset-2 hover:text-[var(--mainHover)]"
          >
            Login
          </Link>
        </p>
        {error && (
          <div className="text-red-500 text-sm py-2 px-3 bg-red-100 rounded-md text-clamp-small">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-[var(--font-title)] text-clamp-small">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={3}
            className="w-full mb-6 p-2 border rounded bg-[var(--white)] shadow-[3px_4px_5px_#00000020] focus:outline-none text-clamp-small"
          />

          <label className="block mb-2 font-semibold text-[var(--font-title)] text-clamp-small">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            minLength={3}
            className="w-full mb-6 p-2 border rounded bg-[var(--white)] shadow-[3px_4px_5px_#00000020] focus:outline-none text-clamp-small"
          />

          <label className="block mb-2 font-semibold text-[var(--font-title)] text-clamp-small">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mb-6 p-2 border rounded bg-[var(--white)] shadow-[3px_4px_5px_#00000020] focus:outline-none text-clamp-small"
          />

          <label className="block mb-2 font-semibold text-[var(--font-title)] text-clamp-small">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full mb-6 p-2 border rounded bg-[var(--white)] shadow-[3px_4px_5px_#00000020] focus:outline-none text-clamp-small"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold rounded bg-[var(--secondary)] text-[var(--white)] text-clamp-small tracking-wider hover:bg-[var(--secondaryHover)] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Criando conta..." : "Cadastrar"}
          </button>
        </form>
      </main>
    </div>
  );
};
