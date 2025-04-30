import Link from "next/link";
import React from "react";

export default function Unauthorized() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-[var(--font-black)] text-white gap-y-4">
        <p className="text-clamp-large ">
          Você não tem o acesso necessário para acessar o conteúdo dessa página.
        </p>
        <Link
          href="/"
          className="font-bold border py-3 px-6 rounded-lg text-white transition-colors duration-100 hover:bg-[#404040]"
        >
          Retornar para a página principal
        </Link>
      </main>
    </>
  );
}
