"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchArticles } from "../../api/articles";
import Link from "next/link";
import Image from "next/image";

interface Article {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
}

export default function Articles_all() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Adicionado o useRouter

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 text-white">
        Carregando artigos...
      </p>
    );

  return (
    <main className="w-full min-h-[100vh] h-full bg-white p-32">
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
        {articles.map((article) => (
          <div
            key={article.id}
            className="border-[#ddd] border cursor-pointer opacity-75 hover:opacity-100 shadow-[2px_2px_7px_rgba(0,0,0,.15)] relative"
            onClick={() => router.push(`/artigos/${article.slug}`)} // Navegação ao clicar no card
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
                  e.stopPropagation(); // Impede o clique de afetar o card
                  router.push(`/artigos/admin-artigos/editar/${article.slug}`);
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
                  router.push(`/artigos/admin-artigos/editar/${article.slug}`);
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
        ))}
      </div>
    </main>
  );
}
