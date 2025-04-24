import Article_viewer from "@/app/components/articles/article_viewer";
import { Articles_sidebar } from "@/app/components/articles/articles_sidebar";
import { Article } from "@/app/types";

interface Props {
  params: { slug: string };
}

// Replaces getStaticPaths - generates static paths at build time
export async function generateStaticParams() {
  const apiUrl = getApiUrl();
  try {
    const res = await fetch(`${apiUrl}/api/artigos?fields=slug`);
    const articles: Article[] = await res.json();
    return articles.map((article) => ({ slug: article.slug }));
  } catch (error) {
    console.error("Failed to generate static paths:", error);
    return [];
  }
}

// ISR Configuration - revalidates every 60 seconds
export const revalidate = 5;

async function getArticle(slug: string): Promise<Article> {
  const apiUrl = getApiUrl();
  const res = await fetch(`${apiUrl}/api/artigos/${slug}`, {
    next: { tags: [`article-${slug}`] }, // For on-demand revalidation
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch article ${slug}`);
  }
  return res.json();
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug);

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
