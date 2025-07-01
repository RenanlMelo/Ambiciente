"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types";
import { useAuth } from "@/app/contexts/AuthContext";

interface ArticlesAllProps {
  articles: Article[];
}

export default function Articles_all({ articles }: ArticlesAllProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const router = useRouter();

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  const handleDelete = async () => {
    if (!articleToDelete) return;

    setIsLoading(true);

    if (!apiUrl) {
      throw new Error("API URL not configured");
    }

    try {
      const response = await fetch(
        `${apiUrl}/api/artigos/${articleToDelete.slug}`,
        {
          method: "DELETE",
        }
      );
      console.log("res: ", response);

      if (!response.ok) throw new Error("Delete failed");

      // Refresh the data
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsLoading(false);
      setArticleToDelete(null);
    }
  };

  return (
    <>
      <main className="w-screen box-border bg-background pb-10 min-h-[calc(92vh-1rem)]">
        <div className="relative w-full">
          <Image
            rel="preload"
            src="/articles.jpg"
            width={1920}
            height={1200}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1920px"
            alt="Article main image"
            className="h-[40vh] object-cover"
          />
          <span className="w-full h-full absolute top-0 bg-black/50 bg-gradient-to-t from-[#191a27aa] to-black/10" />
          <span className="absolute top-0 w-full h-full text-center text-white text-clamp-xxlarge backdrop-blur-sm flex justify-center items-center">
            <h1 className="max-w-[calc(100%-20px)] md:max-w-[40%]">
              Aprenda e transforme: artigos sobre a sustentabilidade, clima e
              meio ambiente
            </h1>
          </span>
        </div>
        <div className="px-5 lg:px-32 pt-10">
          {user && user.role === "admin" && (
            <Link
              href="artigos/admin-artigos/criar"
              className="flex justify-between items-center w-fit text-clamp-medium text-eWhite font-bold hover:bg-newO hover:text-new px-4 py-2 bg-newxxL rounded-2xl mb-8 lg:mb-0"
            >
              Criar um novo artigo
              <Image
                width={100}
                height={100}
                src="/svg/create.svg"
                alt="create icon"
                className="pl-2 w-7 md:w-10 h-7 md:h-10"
              />
            </Link>
          )}

          <h2 className="text-clamp-xxlarge font-semibold text-newL pb-4 md:py-6">
            Lista de Artigos
          </h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {articles.length === 0 ? (
              <h3 className="text-lightGrey font-semibold text-clamp-medium underline underline-offset-[6px]">
                Nenhum artigo disponível
              </h3>
            ) : (
              articles.map((article: Article) => (
                <div
                  key={article.id}
                  className="border-[#ddd] border-box shadow-[2px_2px_7px_rgba(0,0,0,.15)] relative max-w-[calc(95vw-20px)] rounded-lg overflow-hidden bg-white"
                >
                  <Image
                    width={1600}
                    height={400}
                    id={`${apiUrl}${article.image_url}`}
                    src={`${apiUrl}${article.image_url}`}
                    alt="article background"
                    onClick={() => router.push(`/artigos/${article.slug}`)}
                    className="w-full bg-cover aspect-[3/1] object-cover cursor-pointer"
                  />
                  <h3
                    className={`text-clamp-medium text-newL px-8 mb-2 pt-4 line-clamp-2`}
                  >
                    {article.title}
                  </h3>
                  <p
                    className={`text-clamp-small text-lightGrey px-8 pb-2 line-clamp-3`}
                  >
                    {article.subtitle}
                  </p>
                  <button
                    onClick={() => router.push(`/artigos/${article.slug}`)}
                    className="mb-6 w-full text-end px-8 hover:underline underline-offset-2 decoration-new"
                  >
                    Ler mais
                  </button>
                  {user && user.role === "admin" && (
                    <div className="p-8 pt-0 bottom-5 right-5 flex gap-x-3 place-self-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/artigos/admin-artigos/editar/${article.slug}`
                          );
                        }}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-800 text-clamp-small font-medium transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setArticleToDelete(article);
                        }}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-800 text-clamp-small font-medium transition"
                      >
                        Remover
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Delete confirmation modal */}
      {articleToDelete && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <dialog className="p-8 rounded-2xl w-full max-w-md border-none  z-50 shadow-[3px_4px_10px_#00000040] flex flex-col justify-between">
            <p className="text-clamp-medium text-mediumGrey">
              Deletar artigo &quot;{articleToDelete.title}&quot;?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setArticleToDelete(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white uppercase tracking-wide hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-red-400"
                disabled={isLoading}
              >
                {isLoading ? "Deletando..." : "Deletar"}
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
