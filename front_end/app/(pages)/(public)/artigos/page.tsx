import { Articles_all } from "@/app/components/articles/articles_all";
import Footer from "@/app/components/footer";

interface Article {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
}

async function getArticles(): Promise<Article[]> {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  console.log("API URL:", apiUrl);

  const res = await fetch(`${apiUrl}/artigos`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar artigos");
  }

  return res.json();
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="flex-col justify-start">
      <Articles_all articles={articles} />
      <Footer />
    </div>
  );
}
