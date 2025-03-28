"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useHeader } from "../../contexts/HeaderContext";
import Link from "next/link";
import Image from "next/image";

interface Article {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
}

interface ArticleAllProps {
  articles: Article[];
}

export const Articles_all: React.FC<ArticleAllProps> = ({ articles }) => {
  const { headerHeight } = useHeader();
  const [isLoading, setIsLoading] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const router = useRouter();

  async function deleteArticle() {
    if (!articleToDelete) return;

    setIsLoading(true);

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PROD
        : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

    try {
      const response = await fetch(
        `${apiUrl}/artigos/${articleToDelete.title}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir artigo");
      }

      console.log("Artigo excluído com sucesso!");
      setArticleToDelete(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: `calc(90lvh - ${headerHeight}px)`,
        marginTop: `${headerHeight}px`,
      }}
      className="w-full bg-white px-32 py-10"
    >
      <Link
        href="artigos/admin-artigos/criar"
        className="flex justify-between items-center w-fit text-lg text-[var(--font-body)] font-bold hover:bg-[var(--politicas-bg)] px-2 py-1"
      >
        Create a New Article
        <Image
          width={100}
          height={100}
          src="/svg/create.svg"
          alt="create icon"
          className="pl-2 w-10 h-10"
        />
      </Link>

      <h1 className="text-3xl font-semibold text-[var(--font-title)] py-6">
        Lista de Artigos
      </h1>
      <div className="grid grid-cols-2 gap-x-8 gap-y-12">
        {articles.length === 0 ? (
          <h2 className="text-[var(--font-body)] font-semibold text-2xl underline underline-offset-[6px]">
            Nenhum artigo disponível
          </h2>
        ) : (
          articles.map((article: Article) => (
            <div
              key={article.id}
              className="border-[#ddd] border cursor-pointer opacity-100 hover:opacity-80 shadow-[2px_2px_7px_rgba(0,0,0,.15)] relative"
              onClick={() => router.push(`/artigos/${article.slug}`)}
            >
              <Image
                width={1600}
                height={900}
                src="/article1.png"
                alt="article background"
                className="w-full bg-cover"
              />
              <h2 className="text-xl text-[var(--font-title)] px-8 py-2">
                {article.title}
              </h2>
              <p className="text-[var(--font-body)] px-8 pb-8">
                {article.subtitle}
              </p>
              <div className="absolute bottom-5 right-5 flex gap-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/artigos/admin-artigos/editar/${article.slug}`
                    );
                  }}
                  className="flex justify-between bg-[#ddd] p-2 rounded-full hover:scale-110 duration-75"
                >
                  <Image
                    width={100}
                    height={100}
                    src="/svg/edit.svg"
                    alt="edit icon"
                    className="w-6 h-6 mt-[2px] mb-[2px]"
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setArticleToDelete(article);
                  }}
                  className="flex justify-between bg-[#ddd] p-2 rounded-full hover:scale-110 duration-75"
                >
                  <Image
                    width={100}
                    height={100}
                    src="/svg/remove.svg"
                    alt="remove icon"
                    className="w-7 h-7"
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de exclusão */}
      {articleToDelete && (
        <div className="bg-black/30 w-[100vw] h-[100lvh] absolute top-0 left-0 z-50 backdrop-blur-sm flex justify-center items-center">
          <dialog
            open
            className="fixed p-12 w-[35rem] h-48 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 z-50 shadow-[3px_4px_10px_#00000040] flex flex-col justify-between items-center"
          >
            <p className="text-xl text-[var(--font-title)]">
              Deseja apagar o artigo &quot;{articleToDelete.title}&quot;?
            </p>
            <div className="grid grid-cols-2 items-center gap-x-12">
              <button
                onClick={deleteArticle}
                className="bg-[var(--main)] text-[var(--white)] uppercase tracking-wider py-2 px-8"
              >
                Sim
              </button>
              <button
                onClick={() => setArticleToDelete(null)}
                className="bg-[#d35040] text-[var(--white)] uppercase tracking-wider py-2 px-8"
              >
                Cancelar
              </button>
            </div>
          </dialog>
        </div>
      )}

      {isLoading && (
        <div className="bg-black/30 w-[100vw] h-[100lvh] absolute top-0 left-0 z-50 backdrop-blur-sm flex justify-center items-center gap-x-5">
          <span className="bg-white w-10 h-10" />
          <span className="bg-white w-10 h-10" />
          <span className="bg-white w-10 h-10" />
        </div>
      )}
    </main>
  );
};
