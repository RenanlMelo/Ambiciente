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

export const Articles_all = ({ articles }: ArticlesAllProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!articleToDelete) return;

    setIsLoading(true);

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PROD
        : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

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
  if (user) {
    console.log(user);
    console.log("role", user.role);
  }

  return (
    <>
      <main className="w-screen box-border bg-white px-5 lg:px-32 pb-10 pt-10 mt-[calc(8vh+1rem)] min-h-[calc(92vh-1rem)]">
        {user && user.role === "admin" && (
          <Link
            href="artigos/admin-artigos/criar"
            className="flex justify-between items-center w-fit text-clamp-medium text-[var(--light-grey)] font-bold hover:bg-[var(--politicas-bg)] px-2 py-1 -translate-x-2"
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

        <h2 className="text-clamp-xlarge font-semibold text-[var(--medium-grey)] pb-4 md:py-6">
          Lista de Artigos
        </h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
          {articles.length === 0 ? (
            <h2 className="text-[var(--light-grey)] font-semibold text-clamp-medium underline underline-offset-[6px]">
              Nenhum artigo disponível
            </h2>
          ) : (
            articles.map((article: Article) => (
              <div
                key={article.id}
                className="border-[#ddd] border-box cursor-pointer opacity-100 hover:opacity-90 shadow-[2px_2px_7px_rgba(0,0,0,.15)] relative max-w-[calc(95vw-20px)]"
                onClick={() => router.push(`/artigos/${article.slug}`)}
              >
                <Image
                  width={1600}
                  height={900}
                  src="/article1.png"
                  alt="article background"
                  className="w-full bg-cover"
                />
                <h2
                  className={`text-clamp-medium text-[var(--medium-grey)] px-8 mb-2 pt-4 line-clamp-2`}
                >
                  {article.title}
                </h2>
                <p
                  className={`text-clamp-small text-[var(--light-grey)] px-8 mb-6 line-clamp-3`}
                >
                  {article.subtitle}
                </p>
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
      </main>

      {/* Delete confirmation modal */}
      {articleToDelete && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <dialog className="p-8 rounded-2xl w-full max-w-md border-none  z-50 shadow-[3px_4px_10px_#00000040] flex flex-col justify-between">
            <p className="text-clamp-medium text-[var(--medium-grey)]">
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
};
