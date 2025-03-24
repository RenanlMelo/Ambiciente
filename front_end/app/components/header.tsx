"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Aboreto, IBM_Plex_Sans } from "next/font/google";
import { useHeader } from "../contexts/HeaderContext";

const aboreto = Aboreto({ weight: "400", subsets: ["latin"] });
const ibmPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

export const Header = () => {
  const { setHeaderHeight } = useHeader();
  const headerRef = useRef<HTMLElement>(null);

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
      <a href="/" className={`${aboreto.className} text-3xl`}>
        AMBICIENTE
      </a>
      <ul className="flex justify-evenly items-center gap-x-8 text-[var(--main)] font-medium text-xl w-fit place-self-center">
        <li>
          <Link
            href="/mapa"
            className="hover:decoration-[var(--main)] decoration-transparent underline underline-offset-[6px]"
          >
            Mapa
          </Link>
        </li>
        <li>
          <Link
            href="/artigos"
            className="hover:decoration-[var(--main)] decoration-transparent underline underline-offset-[6px]"
          >
            Artigos
          </Link>
        </li>
        <li>
          <Link
            href="/sobre"
            className="hover:decoration-[var(--main)] decoration-transparent underline underline-offset-[6px]"
          >
            Sobre
          </Link>
        </li>
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
