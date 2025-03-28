import { Articles_all } from "@/app/components/articles/articles_all";
import Footer from "@/app/components/footer";

interface Article {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
}

export async function getStaticProps() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  const res = await fetch(`${apiUrl}/artigos`);

  if (!res.ok) {
    return {
      notFound: true, // Retorna erro 404 se falhar
    };
  }

  const articles: Article[] = await res.json();

  return {
    props: { articles },
    revalidate: 60, // Regenera a página a cada 60 segundos
  };
}

export default function ArticlesPage({ articles }: { articles: Article[] }) {
  return (
    <div className="flex-col justify-start">
      <Articles_all articles={articles} />
      <Footer />
    </div>
  );
}
