"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Link as LinkScroll } from "react-scroll";
import { useHeader } from "../../contexts/HeaderContext";
import { IBM_Plex_Sans } from "next/font/google";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const { headerHeight } = useHeader();
  // const [admin, setAdmin] = useState(true);
  const [removePopup, setRemovePopup] = useState<boolean>(false);
  const params = useParams();
  const slug = params?.slug as string;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function deleteArticle(articleTitle: string) {
    setIsLoading(true);

    // Definir a URL da API dependendo do ambiente
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PROD
        : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;
    try {
      const response = await fetch(`${apiUrl}/artigos/${articleTitle}`, {
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

  console.log(article);

  return (
    <>
      <aside
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
          top: `${headerHeight}px`,
        }}
        className={`${ibmPlexSans.className} fixed bg-[var(--background)] w-[20vw] pl-20 pr-12 pt-6 flex flex-col gap-y-5`}
      >
        {/* {admin && ( */}
        <div id="create_article">
          <h2 className="text-[var(--font-title)] font-semibold text-2xl tracking-wide">
            Articles
          </h2>
          <Link
            href="/artigos"
            className="text-[var(--line)] text-sm font-semibold tracking-wide hover:decoration-[var(--line)] underline underline-offset-[6px] decoration-transparent cursor-pointer"
          >
            See All Articles
          </Link>
          <ul className="grid grid-rows-3 grid-cols-1 items-start justify-center py-4 text-base">
            <li className="cursor-pointer border-y border-[var(--line)] py-2 px-2 w-full flex items-center justify-between hover:bg-[#6d823730]">
              <Link
                href="admin-artigos/criar"
                className="flex justify-between w-full"
              >
                Create a New Article
                <Image
                  width={100}
                  height={100}
                  src="/svg/create.svg"
                  alt="create icon"
                  className="w-7 h-7"
                />
              </Link>
            </li>
            <li className="cursor-pointer border-b border-[var(--line)] w-full py-2 px-2 flex items-center justify-between hover:bg-[#6d823730]">
              <Link
                href={`admin-artigos/editar/${slug}`}
                className="flex justify-between items-center w-full"
              >
                Edit This Article
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
              className="cursor-pointer border-b border-[var(--line)] w-full py-2 px-2 flex items-center justify-between hover:bg-[#6d823730]"
              onClick={() => setRemovePopup(true)}
            >
              Remove
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
        {/* )} */}
        <div id="navigation">
          <h2 className="text-[var(--font-title)] font-semibold text-2xl tracking-wide pb-4">
            Navigation
          </h2>
          <div className="relative">
            <span className="w-[2px] bg-[var(--line)] h-4/5 top-1/2 -translate-y-1/2 absolute left-0" />
            <ul className="flex flex-col gap-y-8 text-xl">
              <li className="flex items-center gap-x-2 cursor-pointer hover:decoration-[var(--font-title)] decoration-transparent underline underline-offset-[6px]">
                <div className="-translate-x-[45%] bg-[var(--font-title)] w-3 h-3 rounded-full" />
                <LinkScroll
                  smooth
                  spy
                  to="title"
                  className="font-semibold text-[var(--font-title)]"
                >
                  {article.title}
                </LinkScroll>
              </li>

              {article.topics?.map((topic, index) => (
                <li
                  key={topic.id || `topic-${index}`}
                  className="flex items-center gap-x-2 cursor-pointer hover:decoration-[var(--font-title)] decoration-transparent underline underline-offset-[6px] text-[var(--font-title)]"
                >
                  <div className="-translate-x-[45%] bg-[var(--font-title)] w-3 h-3 rounded-full" />
                  <LinkScroll
                    smooth
                    spy
                    to={String(topic.id || index)}
                    className="truncate"
                  >
                    {topic.title}
                  </LinkScroll>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      {removePopup && (
        <div className="bg-black/30 w-[100vw] h-[100lvh] absolute top-0 left-0 z-50 backdrop-blur-sm">
          <dialog
            open
            className="p-12 w-[35rem] h-48 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 z-50 shadow-[3px_4px_10px_#00000040] flex flex-col justify-between items-center"
          >
            <p className="text-xl text-[var(--font-title)]">
              Deseja apagar esse artigo?
            </p>
            <div className="grid grid-cols-2 items-center gap-x-12">
              <button
                onClick={() => deleteArticle(article.title)}
                className="bg-[var(--main)] text-[var(--white)] uppercase tracking-wider py-2 px-8"
              >
                Sim
              </button>
              <button
                onClick={() => setRemovePopup(false)}
                className="bg-[#d35040] text-[var(--white)] uppercase tracking-wider py-2 px-8"
              >
                Cancelar
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};
