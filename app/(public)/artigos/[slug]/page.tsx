"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Articles_sidebar } from "@/app/components/articles/articles_sidebar";
import { useHeader } from "../../../contexts/HeaderContext";

interface Topic {
  id: number;
  title: string;
  content: string;
}

interface Article {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  topics: Topic[]; // Adicionando os tópicos corretamente
}

// Função para buscar os dados da API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArticlePage() {
  const { headerHeight } = useHeader();
  const params = useParams();
  const slug = params?.slug as string;

  // Usando SWR para buscar os artigos
  const {
    data: article,
    error,
    isLoading,
  } = useSWR<Article>(
    slug ? `http://127.0.0.1:8000/artigos/${slug}` : null,
    fetcher
  );

  if (isLoading) return <p>Carregando artigo...</p>;
  if (error) return <p>Erro ao buscar o artigo.</p>;
  if (!article) return <p>Artigo não encontrado.</p>;

  return (
    <div>
      <Articles_sidebar article={article} />
      <main
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
          top: `${headerHeight}px`,
        }}
        className="w-[80vw] place-self-end bg-white relative py-24 px-80"
      >
        <h1 className="text-4xl font-semibold text-[var(--main)]">
          {article.title}
        </h1>
        <p className="text-[var(--mainHover)]">{article.subtitle}</p>

        {/* Renderizando os tópicos dinamicamente */}
        <div>
          {article.topics?.length > 0 ? (
            article.topics.map((topic, index) => (
              <div key={topic.id || `topic-${index}`} className="mt-4">
                <h3 className="text-xl font-semibold text-[var(--font-title)]">
                  {topic.title}
                </h3>
                <p className="text-[var(--font-body)]">{topic.content}</p>
              </div>
            ))
          ) : (
            <p>No topics available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
