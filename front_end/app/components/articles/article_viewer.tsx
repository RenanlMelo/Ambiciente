"use client";
import { Article } from "@/app/types";
import useSWR from "swr";
import { Element } from "react-scroll";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Article_viewer({
  initialArticle,
}: {
  initialArticle: Article;
}) {
  const { data: article } = useSWR<Article>(
    initialArticle?.slug ? `/api/articles/${initialArticle.slug}` : null,
    fetcher,
    {
      fallbackData: initialArticle,
      refreshInterval: 1000,
      revalidateOnFocus: false,
    }
  );

  if (!article) return <div>Loading...</div>;

  return (
    <>
      <div className="col-start-2 w-screen md:w-[80vw] h-96 aspect-[3/1] object-cover relative flex justify-center items-center">
        <Image
          width={1920}
          height={1080}
          alt="Imagem do artigo"
          src={article.image_url}
        />
      </div>
      <main
        id="content"
        className="col-start-2 overflow-y-scroll relative w-screen md:w-[80vw] bg-white py-12 md:pt-12 md:pb-24 px-8 md:px-16 lg:px-32 box-border min-h-[calc(92vh-1rem)]"
      >
        <Element name="section-title">
          <h2
            key={article.title}
            className="text-clamp-xxlarge font-semibold text-new break-words"
          >
            {article.title}
          </h2>
          <p className="text-clamp-small text-newxL break-words">
            {article.subtitle}
          </p>
        </Element>

        <div className="mt-6 md:mt-12 flex flex-col gap-4 md:gap-12">
          {article.topics?.length > 0 ? (
            article.topics.map((topic) => (
              <Element key={`topic-${topic.title}`} name={topic.title}>
                <h3 className="text-clamp-large font-semibold text-mediumGrey break-words">
                  {topic.title}
                </h3>
                <p className="text-clamp-small text-lightGrey break-words">
                  {topic.content}
                </p>
              </Element>
            ))
          ) : (
            <p>No topics available.</p>
          )}
        </div>
      </main>
    </>
  );
}
