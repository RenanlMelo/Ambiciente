import { Articles_all } from "@/app/components/articles/articles_all";
import Footer from "@/app/components/ui/footer";
import { Article } from "@/app/types";

// ISR Configuration - revalidates every 60 seconds in production, 1 second in development
export const revalidate = 1;

async function getArticles(): Promise<Article[]> {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  if (!apiUrl) {
    throw new Error("API URL not configured");
  }

  const res = await fetch(`${apiUrl}/api/artigos`, {
    next: {
      tags: ["articles"], // For on-demand revalidation
      revalidate: revalidate,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.statusText}`);
  }

  return res.json();
}

export default async function ArticlesPage() {
  let articles: Article[] = [];

  try {
    articles = await getArticles();
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  console.log(articles);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Articles_all articles={articles} />
      </main>
      <Footer />
    </div>
  );
}
