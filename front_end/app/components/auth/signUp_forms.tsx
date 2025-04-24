"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

export const SignUp_forms = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      setSuccess(true);
      // Optional: Auto-login after registration
      // await handleLoginAfterRegister();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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

  if (success) {
    return (
      <div className="flex justify-center items-center flex-col h-[100vh]">
        <main className="px-12 py-12 w-[20vw] flex flex-col gap-y-4 bg-[#f6f6f6] rounded-lg text-center">
          <h2 className="text-2xl font-bold text-[var(--font-title)]">
            Registrado com sucesso!
          </h2>
          <p className="text-[var(--font-subtle)]">
            Você pode se{" "}
            <Link
              href="/login"
              className="font-semibold text-[var(--main)] underline hover:text-[var(--mainHover)]"
            >
              logar
            </Link>{" "}
            agora com seu novo cadastro.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col h-[100vh]">
      <main className="px-12 py-12 w-[calc(10vw+20rem)] flex flex-col gap-y-4 bg-[#f6f6f6] rounded-lg">
        <h2 className="text-2xl font-bold text-[var(--font-title)]">
          Cadastro
        </h2>
        <p className="text-[var(--font-subtle)]">
          Já tem uma conta?
          <Link
            href="/login"
            className="font-semibold text-[var(--main)] ml-1 underline decoration-[var(--main)] underline-offset-2 hover:text-[var(--mainHover)] hover:decoration-[var(--mainHover)]"
          >
            Login
          </Link>
        </p>

        {error && (
          <div className="text-red-500 text-sm py-2 px-3 bg-red-100 rounded-md shadow-[0px_7px_10px_-4px] shadow-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-y-1 mb-5">
            <label className="text-[var(--font-title)] font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
              className="px-3 py-2 rounded-md bg-[var(--white)] shadow-[3px_4px_10px_#00000040] focus:outline-none"
            />
          </div>
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
              Password
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
            {loading ? "Criando sua conta..." : "Cadastrar"}
          </button>
        </form>
      </main>
    </div>
  );
};
