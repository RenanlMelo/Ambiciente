"use client";

import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";

interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
}

export default function Articles_all() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

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
      <a
        className="underline text-[var(--font-title)] decoration-[var(--line)] text-xl"
        href="/admin-artigos"
      >
        Acessar painel de Artigos
      </a>

      <h1 className="text-3xl font-semibold text-[var(--font-title)] pb-6 pt-12">
        Lista de Artigos
      </h1>
      <div className="grid grid-cols-2 gap-x-8 gap-y-12">
        {articles.map((article) => (
          <a
            href={`/artigos/${article.slug}`}
            key={article.id}
            className="border-[#ddd] border cursor-pointer hover:opacity-75 shadow-[2px_2px_7px_rgba(0,0,0,.15)]"
          >
            <img
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
          </a>
        ))}
      </div>
    </main>
  );
}
