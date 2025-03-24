"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Articles_sidebar } from "@/app/components/articles/articles_sidebar";
import { useHeader } from "@/app/contexts/HeaderContext";

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

  // Definir a URL da API dependendo do ambiente
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  // Usando SWR para buscar os artigos
  const {
    data: article,
    error,
    isLoading,
  } = useSWR<Article>(
    slug ? `${apiUrl}/artigos/${slug}` : null, // Usando a URL definida
    fetcher
  );

  if (isLoading) return <p>Carregando artigo...</p>;
  if (error) return <p>Erro ao buscar o artigo.</p>;
  if (!article) return <p>Artigo não encontrado.</p>;

  return (
    <div className="w-full ">
      <Articles_sidebar article={article} />
      <main
        style={{
          minHeight: `calc(100vh - ${headerHeight}px)`,
          top: `${headerHeight}px`,
        }}
        className="w-full max-w-[80vw] place-self-end bg-white relative py-24 px-8 md:px-16 lg:px-32 box-border"
      >
        <h1 className="text-4xl font-semibold text-[var(--main)] break-words">
          {article.title}
        </h1>
        <p className="text-[var(--mainHover)] break-words">
          {article.subtitle}
        </p>

        {/* Renderizando os tópicos dinamicamente */}
        <div className="mt-12">
          {article.topics?.length > 0 ? (
            article.topics.map((topic, index) => (
              <div key={topic.id || `topic-${index}`} className="mt-8">
                <h3 className="text-xl font-semibold text-[var(--font-title)] break-words">
                  {topic.title}
                </h3>
                <p className="text-[var(--font-body)] break-words">
                  {topic.content}
                </p>
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
