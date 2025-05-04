"use client";

import { User, CircleX, AlignRight } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Aboreto, IBM_Plex_Sans } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

// Fontes
const aboreto = Aboreto({ weight: "400", subsets: ["latin"] });
const ibmPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

// Tipagem das páginas
interface Page {
  name: string;
  url: string;
}

// Hook para media query
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export const Header = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const pagesList: Page[] = [
    { name: "Introdução", url: "/" },
    { name: "Mapa", url: "/mapa" },
    { name: "Artigos", url: "/artigos" },
    { name: "Sobre", url: "/sobre" },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    logout();
    setMenuOpen(false);
    router.refresh();
  };

  useEffect(() => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const shouldBlockScroll = isMobile && (menuOpen || mobileMenuOpen);

    if (shouldBlockScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, mobileMenuOpen, isMobile]);

  return (
    <header
      className={`${ibmPlexSans.className} h-[calc(8vh+1rem)] w-full box-border fixed top-0 bg-[var(--background)] grid grid-cols-2 md:grid-cols-3 text-[var(--primary)] pt-4 md:pt-6 pb-4 md:pb-6 z-50 border-b-2 border-b-[var(--border)]`}
    >
      {/* Logo */}
      <Link
        href="/"
        className={`${aboreto.className} text-clamp-heading text-start h-fit self-center ml-5 lg:ml-20`}
        aria-label="Home"
      >
        AMBICIENTE
      </Link>

      {/* Mobile menu button */}
      {isMobile && (
        <div className="flex justify-end items-center md:gap-x-4 mr-1 md:mr-20">
          <button
            onClick={toggleMenu}
            className="justify-self-end self-center p-4"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <User className="md:w-6 md:h-6 stroke-[var(--primary)]" />
          </button>
          <button
            onClick={toggleMobileMenu}
            className="justify-self-end self-center p-4"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <AlignRight className="w-6 h-6 stroke-[var(--primary)]" />
          </button>
        </div>
      )}

      {/* Desktop navigation */}
      {!isMobile && (
        <nav
          aria-label="Main navigation"
          className="flex justify-center items-center"
        >
          <ul className="flex justify-center items-center gap-x-4 lg:gap-x-8 text-[var(--primary)] font-medium text-clamp-medium w-fit place-self-center">
            {pagesList.map((page) => (
              <li key={page.url}>
                <Link
                  href={page.url}
                  className={`${
                    page.url === pathname
                      ? `decoration-[var(--primary)]`
                      : `decoration-transparent hover:decoration-[var(--primary)]`
                  } underline decoration-2 underline-offset-[6px] transition-colors duration-150`}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Right side controls (desktop only) */}
      {!isMobile && (
        <div className="flex items-center justify-end gap-x-2 md:gap-x-4 text-[var(--primary)] font-medium text-clamp-medium pr-5 md:pr-0 md:mr-5 lg:mr-20">
          {user && user.role === "user" && (
            <Link
              href="/denuncia"
              className="font-bold text-white bg-[var(--secondary)] px-3 py-1 md:px-4 md:py-2 rounded-[4px] hover:bg-[var(--secondaryHover)] transition-colors duration-200 text-clamp-small"
              aria-label="Faça sua denúncia"
            >
              FAÇA SUA DENÚNCIA
            </Link>
          )}

          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="p-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondaryHover)] transition-colors duration-200"
          >
            <User
              fill="transparent"
              stroke="#f6f6f6"
              className="w-[calc(1vw+10px)] h-[calc(1vw+10px)]"
            />
          </button>
        </div>
      )}

      {/* User dropdown menu */}
      {menuOpen && (
        <div className="w-screen h-screen fixed inset-0 bg-[var(--background)] flex flex-col items-start justify-start md:rounded-bl-lg md:border-b-2 md:border-l-2 border-[var(--border)] md:inset-auto md:absolute md:right-0 md:mt-[calc(8vh+1rem)] md:h-fit md:w-auto">
          {isMobile && (
            <button
              onClick={toggleMenu}
              aria-label="Fechar menu"
              className="absolute top-3 right-2 p-2"
            >
              <CircleX size={40} stroke="#99b259" strokeWidth={2} />
            </button>
          )}
          <nav aria-label="User menu" className="min-w-[150px] ">
            <ul className="grid grid-rows-2 text-[var(--primaryHover)] font-medium text-clamp-xxxlarge md:text-clamp-medium m-12 md:m-4 gap-2">
              {user ? (
                <>
                  {user.role === "admin" && (
                    <li>
                      <Link
                        href="/users-control"
                        className="hover:decoration-[var(--primary)] decoration-transparent underline underline-offset-[6px]"
                      >
                        Controle de Usuários
                      </Link>
                    </li>
                  )}
                  {user.role === "user" && (
                    <li>
                      <Link
                        href="/perfil"
                        className="hover:decoration-[var(--primary)] decoration-transparent underline underline-offset-[6px]"
                      >
                        Meu Perfil
                      </Link>
                    </li>
                  )}
                  {user.role === "staff" || user.role === "staff" ? (
                    <li>
                      <Link
                        href="/denuncia/visualizar-denuncias"
                        className="hover:decoration-[var(--primary)] decoration-transparent underline underline-offset-[6px]"
                      >
                        Visualizar Denúncias
                      </Link>
                    </li>
                  ) : null}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:decoration-[var(--primary)] decoration-transparent underline underline-offset-[6px]"
                    >
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="hover:decoration-[var(--primary)] decoration-transparent underline underline-offset-[6px]"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:decoration-[var(--primary)] decoration-transparent underline underline-offset-[6px]"
                      href="/cadastro"
                    >
                      Cadastro
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="w-screen h-screen fixed inset-0 bg-[var(--background)] flex flex-col items-start justify-start z-40 text-clamp-xxxlarge p-12">
          <button
            onClick={toggleMobileMenu}
            aria-label="Fechar menu"
            className="absolute top-3 right-2 p-2"
          >
            <CircleX size={40} stroke="#99b259" strokeWidth={2} />
          </button>

          <nav aria-label="Mobile navigation" className="w-full box-border">
            <ul className="grid grid-rows-2 text-[var(--primaryHover)] font-medium text-clamp-xxxlarge gap-2">
              {pagesList.map((page) => (
                <li key={page.url}>
                  <Link
                    href={page.url}
                    className="hover:decoration-[var(--primary)] decoration-transparent underline underline-offset-[6px]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
            {user && user.role === "user" && (
              <Link
                href="/denuncia"
                className="block border-2 border-[var(--primaryHover)] px-3 py-1 mt-10 text-[var(--primaryHover)] font-medium text-clamp-xxxlarge"
              >
                Faça sua denúncia
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
