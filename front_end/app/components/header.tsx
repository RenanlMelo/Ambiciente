"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Aboreto, IBM_Plex_Sans } from "next/font/google";
import { useHeader } from "../contexts/HeaderContext";

const aboreto = Aboreto({ weight: "400", subsets: ["latin"] });
const ibmPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

interface Page {
  name: string;
  url: string;
}

export const Header = () => {
  const { setHeaderHeight } = useHeader();
  const headerRef = useRef<HTMLElement>(null);
  const pagesList: Page[] = [
    { name: "Introdução", url: "/" },
    { name: "Mapa", url: "/mapa" },
    { name: "Artigos", url: "/artigos" },
    { name: "Sobre", url: "/sobre" },
  ];

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${ibmPlexSans.className} z-50 fixed top-0 w-[100vw] bg-[var(--background)] grid grid-cols-3 text-[var(--main)] px-20 py-6`}
    >
      <Link href="/" className={`${aboreto.className} text-3xl`}>
        AMBICIENTE
      </Link>
      <ul className="flex justify-evenly items-center gap-x-8 text-[var(--main)] font-medium text-xl w-fit place-self-center">
        {pagesList.map((page) => (
          <li key={page.url}>
            <Link
              href={page.url}
              className="hover:decoration-[var(--main)] decoration-transparent underline underline-offset-[6px]"
            >
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/denuncia"
        className="font-bold text-white bg-[var(--secondary)] px-4 py-2 rounded-[4px] hover:bg-[var(--secondaryHover)] w-fit place-self-end"
      >
        FAÇA A SUA DENÚNCIA
      </Link>
    </header>
  );
};
