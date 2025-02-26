"use client";
import React, { useState } from "react";

export const SignUp_forms = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex justify-center items-center flex-col h-[100vh]">
        <main className="px-12 py-12 w-[20vw] flex flex-col gap-y-4 bg-[#f6f6f6] rounded-lg">
          <h1 className="text-2xl font-bold text-[var(--font-title)]">
            Sing Up
          </h1>
          <p className="text-[var(--font-subtle)]">
            Already have an account?
            <a
              href="/sign-in"
              className="font-semibold text-[var(--main)] ml-1 underline decoration-[var(--main)] underline-offset-2 hover:text-[var(--mainHover)] hover:decoration-[var(--mainHover)]"
            >
              Sign In
            </a>
          </p>
          <form className="flex flex-col">
            <div className="flex flex-col gap-y-1 mb-5">
              <label className="text-[var(--font-title)] font-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2 rounded-md bg-[var(--white)] shadow-[3px_4px_10px_#00000040] focus:outline-none"
              />
            </div>
            <button className="my-4 px-2 py-3 w-full bg-[var(--secondary)] text-[var(--white)] font-bold tracking-wider hover:bg-[var(--secondaryHover)] rounded-md">
              Enviar
            </button>
          </form>
        </main>
      </div>
    </>
  );
};
