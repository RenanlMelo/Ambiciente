import { Articles_all } from "@/app/components/articles/articles_all";
import Footer from "@/app/components/footer";

interface Article {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
}

export default async function ArticlesPage() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  const res = await fetch(`${apiUrl}/artigos`, {
    next: { revalidate: 60 }, // ISR (Incremental Static Regeneration)
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar artigos");
  }

  const articles: Article[] = await res.json();

  return (
    <div className="flex-col justify-start">
      <Articles_all articles={articles} />
      <Footer />
    </div>
  );
}
