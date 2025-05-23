"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

export const SignUp_forms = () => {
  const { register, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

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
    } catch {
      // error shown via context
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-96px)]">
      <main className="px-12 pt-[5vh] pb-[8vh] w-[calc(100%-40px)] md:w-auto md:min-w-[calc(12vw+15rem)] flex flex-col gap-y-4 bg-[#f6f6f6] rounded-lg shadow-[0px_0px_30px_rgba(0,0,0,.25)]">
        <h2 className="text-clamp-xlarge font-bold text-mediumGrey">
          Cadastro
        </h2>
        <p className="text-mediumGrey text-clamp-small">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-semibold text-newL ml-1 underline decoration-newL underline-offset-2 hover:text-new"
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
          <label className="block mb-2 font-semibold text-mediumGrey text-clamp-small">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={3}
            className="w-full mb-6 p-2 border border-cWhite rounded bg-f6White focus:outline-none text-clamp-small"
          />

          <label className="block mb-2 font-semibold text-mediumGrey text-clamp-small">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            minLength={3}
            className="w-full mb-6 p-2 border border-cWhite rounded bg-f6White focus:outline-none text-clamp-small"
          />

          <label className="block mb-2 font-semibold text-mediumGrey text-clamp-small">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mb-6 p-2 border border-cWhite rounded bg-f6White focus:outline-none text-clamp-small"
          />

          <label className="block mb-2 font-semibold text-mediumGrey text-clamp-small">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full mb-2 p-2 border border-cWhite rounded bg-f6White focus:outline-none text-clamp-small"
          />
          <div className="mb-6 flex items-center gap-2 text-clamp-small text-mediumGrey">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="show-password" className="cursor-pointer">
              Mostrar senha
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold rounded bg-newxL text-f6White text-clamp-small tracking-wider hover:bg-newL ${
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
