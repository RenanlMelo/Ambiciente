import { Article } from "@/app/types";
import Article_viewer from "@/app/components/articles/article_viewer";
import { Articles_sidebar } from "@/app/components/articles/articles_sidebar";

async function getArticle(slug: string): Promise<Article> {
  const apiUrl = getApiUrl();
  const res = await fetch(`${apiUrl}/api/artigos/${slug}`);
  if (!res.ok) throw new Error(`Failed to fetch article ${slug}`);
  return res.json();
}

export async function generateStaticParams() {
  const apiUrl = getApiUrl();
  const res = await fetch(`${apiUrl}/api/artigos?fields=slug`);
  const articles: Article[] = await res.json();
  return articles.map((article) => ({ slug: article.slug }));
}

export const revalidate = 60;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return (
    <div className="w-full grid grid-cols-[1fr_4fr]">
      <Articles_sidebar article={article} />
      <Article_viewer initialArticle={article} />
    </div>
  );
}

function getApiUrl() {
  return process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;
}
