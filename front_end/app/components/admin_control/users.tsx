"use client";
import React, { FormEvent, useState } from "react";
import { Users_table } from "./users_table";
import { useAuth } from "@/app/contexts/AuthContext";
import { handleSignup } from "./api";
import { SquarePlus } from "lucide-react";

export const Users_control = () => {
  const [form, setForm] = useState<boolean>(false);
  const { loading, token } = useAuth();
  const [signupError, setSignupError] = useState<string | null>(null);
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
      setSignupError(null); // limpa erro antigo
      await handleSignup(
        token,
        formData.name,
        formData.last_name,
        formData.email,
        formData.password,
        "staff"
      );
      setForm(false);
      window.location.reload();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido.";
      setSignupError(message);
    }
  };

  return (
    <>
      <h2 className="text-clamp-xlarge text-[--dark_grey] font-semibold mb-4">
        Controle de Usuários
      </h2>
      <div className="flex flex-col gap-4 mb-8 w-fit border-[#d5e7eb]">
        <button
          onClick={() => setForm(!form)}
          className="border px-4 py-2 rounded active:bg-[--e_white] duration-75 hover:bg-[--f6_white] w-fit text-clamp-medium"
        >
          Cadastrar novo funcionário{" "}
          <SquarePlus
            className="inline ml-1 -translate-y-px"
            stroke="#505050"
          />
        </button>
        {form && (
          <div className="bg-black/30 w-[100vw] h-[100lvh] fixed top-0 left-0 z-50 backdrop-blur-sm flex justify-center items-center">
            <div className="px-16 py-20 w-[calc(12vw+20rem)] flex flex-col gap-y-4 bg-[#f6f6f6] rounded-lg text-clamp-medium">
              {signupError && (
                <div className="text-red-500 text-sm py-2 px-3 bg-red-100 rounded-md text-clamp-small">
                  {signupError}
                </div>
              )}
              <p className="text-clamp-large text-[--dark_grey] font-semibold mb-4">
                Cadastro de novo funcionário
              </p>
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-semibold text-[--medium_grey] text-clamp-small">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="w-full mb-6 p-2 border border-[--lightest_grey] rounded bg-[--f6_white] focus:outline-none text-clamp-small"
                />

                <label className="block mb-2 font-semibold text-[--medium_grey] text-clamp-small">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="w-full mb-6 p-2 border border-[--lightest_grey] rounded bg-[--f6_white] focus:outline-none text-clamp-small"
                />

                <label className="block mb-2 font-semibold text-[--medium_grey] text-clamp-small">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mb-6 p-2 border border-[--lightest_grey] rounded bg-[--f6_white] focus:outline-none text-clamp-small"
                />

                <label className="block mb-2 font-semibold text-[--medium_grey] text-clamp-small">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full mb-6 p-2 border border-[--lightest_grey] rounded bg-[--f6_white] focus:outline-none text-clamp-small"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 font-bold rounded bg-[--newxL] text-[--f6_white] text-clamp-small tracking-wider hover:bg-[--newL] mb-4 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Criando conta..." : "Cadastrar"}
                </button>
                <button
                  onClick={() => setForm(false)}
                  className="w-full border px-4 py-2 rounded duration-75 bg-[--e_white] hover:bg-[--c_white] text-clamp-small"
                >
                  Cancelar Cadastro
                </button>
              </form>
            </div>
          </div>
        )}
        <Users_table />
      </div>
    </>
  );
};
