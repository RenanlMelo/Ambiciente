"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types";

interface ArticlesAllProps {
  articles: Article[];
}

export const Articles_all = ({ articles }: ArticlesAllProps) => {
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

  return (
    <>
      <main className="w-full bg-white px-32 py-10 relative top-[calc(8vh+1rem)] min-h-[calc(92vh-1rem)]">
        <Link
          href="artigos/admin-artigos/criar"
          className="flex justify-between items-center w-fit text-clamp-medium text-[var(--font-body)] font-bold hover:bg-[var(--politicas-bg)] px-2 py-1"
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

        <h2 className="text-clamp-xlarge font-semibold text-[var(--font-title)] py-6">
          Lista de Artigos
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
          {articles.length === 0 ? (
            <h2 className="text-[var(--font-body)] font-semibold text-clamp-medium underline underline-offset-[6px]">
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
                <h2 className="text-clamp-medium text-[var(--font-title)] px-8 pb-2 pt-4">
                  {article.title}
                </h2>
                <p className="text-clamp-small text-[var(--font-body)] px-8 pb-6">
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
      </main>

      {/* Delete confirmation modal */}
      {articleToDelete && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <dialog className="p-12 w-[35rem] h-48 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 z-50 shadow-[3px_4px_10px_#00000040] flex flex-col justify-between items-center rounded-lg">
            <p className="text-xl text-[var(--font-title)]">
              Deletar artigo &quot;{articleToDelete.title}&quot;?
            </p>
            <div className="grid grid-cols-2 items-center gap-x-12">
              <button
                onClick={() => setArticleToDelete(null)}
                className="bg-green-200 text-green-600 border border-green-600 uppercase tracking-wider py-2 px-8"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-200 text-red-600 border border-red-600 uppercase tracking-wider py-2 px-8"
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
