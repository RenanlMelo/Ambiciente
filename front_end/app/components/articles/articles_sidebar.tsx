"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Link as LinkScroll } from "react-scroll";
import { IBM_Plex_Sans } from "next/font/google";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircleX, CornerDownLeft, Funnel } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";

const ibmPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

interface Topic {
  id: number;
  title: string;
  content: string;
}

interface Props {
  article: {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    topics: Topic[];
  };
}

export const Articles_sidebar: React.FC<Props> = ({ article }) => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [removePopup, setRemovePopup] = useState<boolean>(false);
  const params = useParams();
  const slug = params?.slug as string;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    function handleResize() {
      const vh = window.innerHeight * 0.1;
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      setOffsetTop(-(vh + rem));
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function deleteArticle() {
    setIsLoading(true);
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PROD
        : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;
    try {
      const response = await fetch(`${apiUrl}/api/artigos/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir artigo");
      }

      console.log("Artigo excluído com sucesso!");
      router.push("/artigos");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const SidebarContent = () => (
    <>
      <Link
        href="/artigos"
        className="text-[var(--title)] text-clamp-small font-semibold tracking-wide hover:decoration-[--lighter_grey] underline underline-offset-[6px] decoration-transparent cursor-pointer"
      >
        Ver todos os artigos <CornerDownLeft className="ml-1 w-5 h-5 inline" />
      </Link>

      {user && user.role === "admin" && (
        <div id="create_article">
          <h2 className="text-[--medium_grey] font-semibold text-clamp-large tracking-wide">
            Artigos
          </h2>
          <ul className="grid grid-rows-3 grid-cols-1 items-start justify-center py-4 text-clamp-small">
            <li className="cursor-pointer border-y border-[--lighter_grey] py-2 px-2 w-full flex items-center justify-between hover:bg-[#6d823730]">
              <Link
                href="admin-artigos/criar"
                className="flex justify-between w-full gap-x-8 items-center"
              >
                Criar novo artigo
                <Image
                  width={100}
                  height={100}
                  src="/svg/create.svg"
                  alt="create icon"
                  className="w-7 h-7"
                />
              </Link>
            </li>
            <li className="cursor-pointer border-b border-[--lighter_grey] w-full py-2 px-2 flex items-center justify-between hover:bg-[#6d823730]">
              <Link
                href={`admin-artigos/editar/${slug}`}
                className="flex justify-between items-center w-full"
              >
                Editar artigo atual
                <Image
                  width={100}
                  height={100}
                  src="/svg/edit.svg"
                  alt="edit icon"
                  className="w-6 h-6 mt-[2px] mb-[2px]"
                />
              </Link>
            </li>
            <li
              className="cursor-pointer border-b border-[--lighter_grey] w-full py-2 px-2 flex items-center justify-between hover:bg-[#6d823730]"
              onClick={() => setRemovePopup(true)}
            >
              Deletar artigo atual
              <Image
                width={100}
                height={100}
                src="/svg/remove.svg"
                alt="remove icon"
                className="w-7 h-7"
              />
            </li>
          </ul>
        </div>
      )}

      <div id="navigation">
        <h2 className="text-[--medium_grey] font-semibold text-2xl tracking-wide pb-4">
          Navegação
        </h2>
        <div className="relative">
          <span className="w-[2px] bg-[--lighter_grey] h-[95%] top-1/2 -translate-y-1/2 absolute left-0" />
          <ul className="flex flex-col gap-y-8 text-xl">
            <li className="flex items-center gap-x-2 cursor-pointer hover:decoration-[--medium_grey] decoration-transparent underline underline-offset-[6px]">
              <div className="-translate-x-[45%] bg-[--medium_grey] w-3 h-3 rounded-full" />
              <LinkScroll
                smooth={true}
                offset={offsetTop}
                spy={true}
                duration={500}
                to={"section-title"}
                className="font-semibold text-[--medium_grey]"
                onClick={() => setMenuOpen(false)}
              >
                {article.title}
              </LinkScroll>
            </li>

            {article.topics?.map((topic, index) => (
              <li
                key={topic.id || `topic-${index}`}
                className="grid grid-cols-[12px_1fr] items-center gap-x-2 cursor-pointer hover:decoration-[--medium_grey] decoration-transparent underline underline-offset-[6px] text-[--medium_grey]"
              >
                <div className="-translate-x-[45%] bg-[--medium_grey] w-3 h-3 rounded-full" />
                <LinkScroll
                  to={topic.title}
                  smooth={true}
                  spy={true}
                  offset={offsetTop}
                  duration={400}
                  onClick={() => setMenuOpen(false)}
                  className="truncate cursor-pointer"
                >
                  {topic.title}
                </LinkScroll>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Botão de abrir menu (visível só no mobile) */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-28 right-4 z-30 bg-[#505050aa] text-white p-2 rounded-lg cursor-pointer"
      >
        <Funnel size={32} stroke="var(--f6_white)" strokeWidth={2} />
      </button>

      {/* Menu fixo para desktop */}
      <aside
        className={`hidden md:flex ${ibmPlexSans.className} overflow-y-scroll fixed bg-[var(--background)] w-[20vw] p-[24px_48px_48px_80px] flex-col gap-y-5 top-24 bottom-0 box-border z-40`}
      >
        <SidebarContent />
      </aside>

      {/* Menu toggle mobile */}
      {menuOpen && (
        <aside
          className={`md:hidden ${ibmPlexSans.className} overflow-y-scroll fixed bg-[var(--background)] w-full p-8 flex flex-col gap-y-5 top-20 bottom-0 box-border z-50`}
        >
          <button
            onClick={toggleMenu}
            aria-label="Fechar menu"
            className="absolute top-3 right-2 p-2"
          >
            <CircleX size={40} stroke="var(--newxxL)" strokeWidth={2} />
          </button>
          <SidebarContent />
        </aside>
      )}

      {/* Carregamento */}
      {isLoading && (
        <div className="bg-black/30 w-[100vw] h-[100lvh] fixed top-0 left-0 z-50 backdrop-blur-sm flex justify-center items-center gap-x-5">
          <span className="bg-white w-10 h-10" />
          <span className="bg-white w-10 h-10" />
          <span className="bg-white w-10 h-10" />
        </div>
      )}

      {/* Confirmação de exclusão */}
      {removePopup && (
        <div className="bg-black/30 w-[100vw] h-[100lvh] fixed top-0 left-0 z-50 backdrop-blur-sm flex justify-center items-center">
          <dialog
            open
            className="p-8 rounded-2xl w-full max-w-md border-none z-50 shadow-[3px_4px_10px_#00000040] flex flex-col justify-between"
          >
            <p className="text-clamp-medium text-[--medium_grey]">
              Deseja apagar esse artigo?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setRemovePopup(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring"
              >
                Cancelar
              </button>
              <button
                onClick={() => deleteArticle()}
                className="px-4 py-2 rounded-lg bg-red-600 text-white uppercase tracking-wide hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-red-400"
              >
                Deletar
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};
