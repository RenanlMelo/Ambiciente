"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Link as LinkScroll } from "react-scroll";
import { useHeader } from "../contexts/HeaderContext";
import { IBM_Plex_Sans } from "next/font/google";

const ibmPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

interface Topic {
  id: number;
  title: string;
  content: string;
}

interface Props {
  article: {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    topics: Topic[];
  };
}

export const Articles_sidebar: React.FC<Props> = ({ article }) => {
  const { headerHeight } = useHeader();
  const [admin, setAdmin] = useState(true);

  return (
    <aside
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
        top: `${headerHeight}px`,
      }}
      className={`${ibmPlexSans.className} fixed bg-[var(--background)] w-[20vw] pl-20 pr-12 pt-6 flex flex-col gap-y-5`}
    >
      {admin && (
        <div id="create_article">
          <h2 className="text-[var(--font-title)] font-semibold text-2xl tracking-wide">
            Articles
          </h2>
          <Link
            href="/artigos"
            className="text-[var(--line)] text-sm font-semibold tracking-wide hover:decoration-[var(--line)] underline underline-offset-[6px] decoration-transparent cursor-pointer"
          >
            See All Articles
          </Link>
          <ul className="grid grid-rows-3 grid-cols-1 items-start justify-center py-4 text-base">
            <li className="cursor-pointer border-y border-[var(--line)] py-2 px-2 w-full flex items-center justify-between hover:bg-[#6d823730]">
              <Link href="admin-article/create">Create a New Article</Link>
              <img
                src="/svg/create.svg"
                alt="create icon"
                className="w-7 h-7"
              />
            </li>
            <li className="cursor-pointer border-b border-[var(--line)] w-full py-2 px-2 flex items-center justify-between hover:bg-[#6d823730]">
              Edit This Article
              <img
                src="/svg/edit.svg"
                alt="edit icon"
                className="w-6 h-6 mt-[2px] mb-[3px]"
              />
            </li>
            <li className="cursor-pointer border-b border-[var(--line)] w-full py-2 px-2 flex items-center justify-between hover:bg-[#6d823730]">
              Remove
              <img
                src="/svg/remove.svg"
                alt="remove icon"
                className="w-7 h-7"
              />
            </li>
          </ul>
        </div>
      )}
      <div id="navigation">
        <h2 className="text-[var(--font-title)] font-semibold text-2xl tracking-wide pb-4">
          Navigation
        </h2>
        <div className="relative">
          <span className="w-[2px] bg-[var(--line)] h-4/5 top-1/2 -translate-y-1/2 absolute left-0" />
          <ul className="flex flex-col gap-y-8 text-xl">
            <li className="flex items-center gap-x-2 cursor-pointer hover:decoration-[var(--font-title)] decoration-transparent underline underline-offset-[6px]">
              <div className="-translate-x-[45%] bg-[var(--font-title)] w-3 h-3 rounded-full" />
              <LinkScroll
                smooth
                spy
                to="title"
                className="font-semibold text-[var(--font-title)]"
              >
                {article.title}
              </LinkScroll>
            </li>

            {article.topics?.map((topic, index) => (
              <li
                key={topic.id || `topic-${index}`}
                className="flex items-center gap-x-2 cursor-pointer hover:decoration-[var(--font-title)] decoration-transparent underline underline-offset-[6px] text-[var(--font-title)]"
              >
                <div className="-translate-x-[45%] bg-[var(--font-title)] w-3 h-3 rounded-full" />
                <LinkScroll smooth spy to={String(topic.id || index)}>
                  {topic.title}
                </LinkScroll>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
