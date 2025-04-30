"use client";
import React from "react";
import Image from "next/image";
import { TreePine, ThermometerSun, BookOpenText } from "lucide-react";

export const About_content = () => {
  return (
    <main className="px-5 md:px-[30vw] pt-10 md:pt-24 pb-24 bg-white w-full mt-[calc(8vh+1rem)] min-h-[calc(92vh-1rem)]">
      <Image
        src="/logo.png"
        alt="logo do site"
        width={1050}
        height={1050}
        loading="lazy"
        className="fixed left-1/2 top-2/3 -translate-x-1/2 -translate-y-2/3 w-[700px] opacity-10 pointer-events-none"
      />

      <h2 className="text-clamp-xlarge mb-4 text-[var(--font-title)]">
        Visão Geral
      </h2>
      <p className="text-clamp-medium text-[var(--font-body)]">
        O AMBICIENTE é uma plataforma inovadora dedicada à proteção ambiental e
        à conscientização climática. Nosso objetivo principal é fornecer um
        canal acessível e eficiente para que a população possa relatar infrações
        ambientais, bem como acessar conteúdos informativos sobre
        sustentabilidade e mudanças climáticas.
      </p>

      <h2 className="mt-8 mb-4 text-clamp-xlarge text-[var(--font-title)]">
        Funcionalidades
      </h2>

      <h3 className="mb-1 text-clamp-large text-[var(--font-title)]">
        1. Denúncias Ambientais{" "}
        <TreePine className="inline -translate-y-[2px]" size={30} />
      </h3>
      <p className="text-clamp-medium text-[var(--font-body)] mb-4">
        Os usuários poderão relatar problemas ambientais como desmatamento
        ilegal, poluição e descarte irregular de resíduos. As denúncias serão
        encaminhadas para uma ONG parceira.
      </p>

      <h3 className="mb-1 text-clamp-large text-[var(--font-title)]">
        2. Relatórios Climáticos e Monitoramento{" "}
        <ThermometerSun className="inline -translate-y-[2px]" size={30} />
      </h3>
      <p className="text-clamp-medium text-[var(--font-body)] mb-4">
        Informações detalhadas sobre o clima, como temperatura, umidade do ar e
        qualidade do ar, serão exibidas em tempo real por meio de uma API
        pública.
      </p>

      <h3 className="mb-1 text-clamp-large text-[var(--font-title)]">
        3. Conteúdo Socioeducativo{" "}
        <BookOpenText className="inline -translate-y-[2px]" size={30} />
      </h3>
      <p className="text-clamp-medium text-[var(--font-body)]">
        A plataforma contará com artigos informativos sobre sustentabilidade e
        mudanças climáticas para conscientizar a população.
      </p>

      <h2 className="mt-8 mb-4 text-clamp-large text-[var(--font-title)]">
        Justificativa do Projeto
      </h2>
      <p className="text-clamp-medium text-[var(--font-body)]">
        O AMBICIENTE surge como uma solução para facilitar denúncias ambientais,
        fornecer acesso a dados climáticos e promover a educação ambiental,
        incentivando ações responsáveis.
      </p>

      <h2 className="mt-8 mb-4 text-clamp-large text-[var(--font-title)]">
        Tecnologias Utilizadas
      </h2>
      <ul>
        <li className="text-clamp-medium text-[var(--font-body)]">
          <strong>Frontend:</strong> HTML, CSS, JavaScript, React.js, Next.js
        </li>
        <li className="text-clamp-medium text-[var(--font-body)]">
          <strong>Backend:</strong> C#, ASP.NET
        </li>
        <li className="text-clamp-medium text-[var(--font-body)]">
          <strong>Banco de Dados:</strong> SQL Server
        </li>
        <li className="text-clamp-medium text-[var(--font-body)]">
          <strong>Análise de Dados:</strong> Power BI
        </li>
        <li className="text-clamp-medium text-[var(--font-body)]">
          <strong>Outras Ferramentas:</strong> Git/GitHub, API pública de dados
          climáticos, Figma, Trello
        </li>
      </ul>

      <h2 className="mt-8 mb-4 text-clamp-large text-[var(--font-title)]">
        Conclusão
      </h2>
      <p className="text-clamp-medium text-[var(--font-body)]">
        O AMBICIENTE é uma iniciativa voltada para a proteção ambiental e a
        conscientização da população. Com denúncias rápidas e eficazes, dados
        climáticos confiáveis e conteúdos educativos, buscamos um impacto
        positivo na sociedade.
      </p>
    </main>
  );
};
