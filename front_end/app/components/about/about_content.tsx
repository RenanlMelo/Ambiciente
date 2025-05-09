"use client";
import React from "react";
import { TreePine, ThermometerSun, BookOpenText } from "lucide-react";
import Image from "next/image";

export const About_content = () => {
  return (
    <>
      {/* Título com contexto */}
      <div className="relative w-full">
        <Image
          src="/bg.jpg"
          width={1920}
          height={1080}
          alt="Article main image"
          className="h-[40vh] object-cover"
        />
        <span className="w-full h-full absolute top-0 bg-black/10 bg-gradient-to-t from-[#191a27aa] to-black/10" />
        <span className="absolute top-0 w-full h-full text-center text-white text-clamp-xxlarge backdrop-blur-sm flex justify-center items-center">
          <p className="max-w-[calc(100%-20px)] md:max-w-[40%]">
            🌍 Por um futuro mais consciente: conheça o AMBICIENTE
          </p>
        </span>
      </div>

      <main className="px-5 md:px-[20vw] pt-10 pb-24 bg-white w-full min-h-[calc(92vh-1rem)] grid grid-cols-2 gap-x-10">
        {/* Visão Geral */}
        <div className="w-full col-span-2">
          <h3 className="text-clamp-xlarge mb-4 text-[--medium_grey]">
            Visão Geral
          </h3>
          <p className="text-clamp-medium text-[--light_grey]">
            O <strong>AMBICIENTE</strong> é uma plataforma inovadora dedicada à
            proteção ambiental e à conscientização climática. Nosso objetivo é
            criar um mundo mais consciente e eficiente para todos, permitindo
            que qualquer pessoa possa relatar infrações ambientais, acessar
            dados climáticos em tempo real e consumir conteúdos educativos sobre
            sustentabilidade.
          </p>
        </div>

        {/* Funcionalidades */}
        <div className="w-full col-span-2 mt-12">
          <h3 className="mb-4 text-clamp-xlarge text-[--medium_grey]">
            Funcionalidades
          </h3>

          <div className="mb-6">
            <h4 className="text-clamp-large text-[--medium_grey] mb-1">
              1. Denúncias Ambientais{" "}
              <TreePine className="inline -translate-y-[2px]" size={26} />
            </h4>
            <p className="text-clamp-medium text-[--light_grey]">
              Relate desmatamentos, queimadas, poluição hídrica e descartes
              irregulares. Suas denúncias são encaminhadas com segurança a
              organizações parceiras.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-clamp-large text-[--medium_grey] mb-1">
              2. Relatórios Climáticos e Monitoramento{" "}
              <ThermometerSun className="inline -translate-y-[2px]" size={26} />
            </h4>
            <p className="text-clamp-medium text-[--light_grey]">
              Dados como temperatura, umidade e qualidade do ar em tempo real
              são obtidos por API pública, auxiliando a população e gestores
              ambientais com informações confiáveis.
            </p>
          </div>

          <div>
            <h4 className="text-clamp-large text-[--medium_grey] mb-1">
              3. Conteúdo Socioeducativo{" "}
              <BookOpenText className="inline -translate-y-[2px]" size={26} />
            </h4>
            <p className="text-clamp-medium text-[--light_grey]">
              Artigos e conteúdos didáticos para informar e formar cidadãos
              conscientes, promovendo educação ambiental de forma acessível e
              engajadora.
            </p>
          </div>
        </div>

        {/* Justificativa */}
        <div className="col-span-2 mt-12">
          <h3 className="text-clamp-xlarge mb-4 text-[--medium_grey]">
            Justificativa do Projeto
          </h3>
          <p className="text-clamp-medium text-[--light_grey]">
            O <strong>AMBICIENTE</strong> surgiu como uma resposta direta aos
            desafios climáticos e à carência de canais acessíveis de denúncia.
            Queremos conectar tecnologia, dados e informação a favor da natureza
            e da sociedade.
          </p>
        </div>

        {/* Tecnologias Utilizadas */}
        <div className="col-span-2 mt-12">
          <h3 className="text-clamp-xlarge mb-4 text-[--medium_grey]">
            Tecnologias Utilizadas
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-clamp-medium text-[--light_grey]">
            <li>
              <strong>Frontend:</strong> HTML, CSS, JavaScript, TypeScript,
              Next.js
            </li>
            <li>
              <strong>Backend:</strong> Python, FastAPI
            </li>
            <li>
              <strong>Banco de Dados:</strong> SQLite
            </li>
            <li>
              <strong>Análise de Dados:</strong> Power BI
            </li>
            <li>
              <strong>Outras Ferramentas:</strong> Git/GitHub, API pública de
              dados climáticos, Figma, Trello
            </li>
          </ul>
        </div>

        {/* Conclusão */}
        <div className="col-span-2 mt-12">
          <h3 className="text-clamp-xlarge mb-4 text-[--medium_grey]">
            Conclusão
          </h3>
          <p className="text-clamp-medium text-[--light_grey]">
            O <strong>AMBICIENTE</strong> é mais do que uma plataforma — é um
            movimento. Unimos denúncia cidadã, dados ambientais e educação para
            promover impacto positivo no presente e no futuro do planeta.
          </p>
        </div>
      </main>
    </>
  );
};
