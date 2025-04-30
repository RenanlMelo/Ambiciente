"use client";

import { User, CircleX } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Aboreto, IBM_Plex_Sans } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const aboreto = Aboreto({ weight: "400", subsets: ["latin"] });
const ibmPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

interface Page {
  name: string;
  url: string;
}

export const Header = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pagesList: Page[] = [
    { name: "Introdução", url: "/" },
    { name: "Mapa", url: "/mapa" },
    { name: "Artigos", url: "/artigos" },
    { name: "Sobre", url: "/sobre" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    logout();
    setMenuOpen(false);
    router.refresh();
  };

  return (
    <header
      className={`${ibmPlexSans.className} h-[calc(8vh+1rem)] fixed top-0 w-full bg-[var(--background)] grid grid-cols-3 text-[var(--main)] px-5 md:px-20 pt-4 md:pt-6 pb-4 md:pb-6 z-50 border-b-2 border-b-[var(--border)]`}
    >
      {/* Logo */}
      <Link
        href="/"
        className={`${aboreto.className} text-clamp-heading text-start h-fit self-center`}
        aria-label="Home"
      >
        AMBICIENTE
      </Link>

      {/* Desktop Navigation */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex justify-center items-center"
      >
        <ul className="hidden md:flex justify-center items-center gap-x-8 text-[var(--main)] font-medium text-clamp-medium w-fit place-self-center">
          {pagesList.map((page) => (
            <li key={page.url}>
              <Link
                href={page.url}
                className={`${
                  page.url === pathname
                    ? `decoration-[var(--main)]`
                    : `decoration-transparent hover:decoration-[var(--main)]`
                } underline decoration-2 underline-offset-[6px] transition-colors duration-150`}
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Side Controls */}
      <div className="flex items-center justify-end gap-x-2 md:gap-x-4 text-[var(--main)] font-medium text-clamp-medium">
        <Link
          href="/denuncia"
          className="font-bold text-white bg-[var(--secondary)] px-3 py-1 md:px-4 md:py-2 rounded-[4px] hover:bg-[var(--secondaryHover)] transition-colors duration-200 text-clamp-small"
          aria-label="Faça sua denúncia"
        >
          FAÇA SUA DENÚNCIA
        </Link>

        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="p-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondaryHover)] transition-colors duration-200"
        >
          <User size="1.5vw" fill="transparent" stroke="#f6f6f6" />
        </button>
      </div>

      {menuOpen &&
        (user ? (
          <div className="absolute right-0 bg-[var(--background)] rounded-bl-lg z-40 border-b-2 border-l-2 border-[var(--border)] mt-[calc(8vh+1rem)] w-[150px] md:w-[200px]">
            <nav aria-label="User menu">
              <ul className="grid grid-rows-2 text-[var(--mainHover)] font-medium text-clamp-medium">
                <li className="">
                  <Link
                    href="/perfil"
                    className="hover:bg-[var(--secondary)] hover:text-white pr-8 p-4 w-full h-full flex items-center justify-start"
                  >
                    Meu Perfil
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-[var(--secondary)] hover:text-white pr-8 p-4 w-full h-full flex items-center justify-start"
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div className="absolute right-0 bg-[var(--background)] rounded-bl-lg z-40 border-b-2 border-l-2 border-[var(--border)] mt-[calc(8vh+1rem)] w-[150px] md:w-[200px]">
            <nav aria-label="User menu">
              <ul className="grid grid-rows-2 text-[var(--mainHover)] font-medium text-clamp-medium">
                <li>
                  <Link
                    href="/login"
                    className="hover:bg-[var(--secondary)] hover:text-white pr-8 p-4 w-full h-full flex items-center justify-start"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:bg-[var(--secondary)] hover:text-white pr-8 p-4 w-full h-full flex items-center justify-start"
                    href="/cadastro"
                  >
                    Cadastro
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ))}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--background)] flex flex-col items-center justify-center gap-y-8 pt-20 z-40">
          <button
            onClick={toggleMobileMenu}
            aria-label="Fechar menu"
            className="absolute top-8 right-8 p-2"
          >
            <CircleX size={40} stroke="#99b259" strokeWidth={2} />
          </button>

          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col items-center gap-y-8">
              {pagesList.map((page) => (
                <li key={page.url}>
                  <Link
                    href={page.url}
                    className="text-2xl md:text-3xl hover:decoration-[var(--main)] decoration-transparent underline underline-offset-[6px]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
