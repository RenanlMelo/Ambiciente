"use client";
import React, { useState } from "react";
import {
  TreePine,
  ThermometerSun,
  BookOpenText,
  ChevronDown,
  SquareArrowOutUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const About_content = () => {
  const [techInfo, setTechInfo] = useState<boolean>(false);

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
          <h3 className="text-clamp-xlarge mb-4 text-mediumGrey">
            Visão Geral
          </h3>
          <p className="text-clamp-medium text-lightGrey">
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
          <h3 className="mb-4 text-clamp-xlarge text-mediumGrey">
            Funcionalidades
          </h3>

          <div className="mb-6">
            <h4 className="text-clamp-large text-mediumGrey mb-1">
              1. Denúncias Ambientais{" "}
              <TreePine className="inline -translate-y-[2px]" size={26} />
            </h4>
            <p className="text-clamp-medium text-lightGrey">
              Relate desmatamentos, queimadas, poluição hídrica e descartes
              irregulares. Suas denúncias são encaminhadas com segurança a
              organizações parceiras.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-clamp-large text-mediumGrey mb-1">
              2. Relatórios Climáticos e Monitoramento{" "}
              <ThermometerSun className="inline -translate-y-[2px]" size={26} />
            </h4>
            <p className="text-clamp-medium text-lightGrey">
              Dados como temperatura, umidade e qualidade do ar em tempo real
              são obtidos por API pública, auxiliando a população e gestores
              ambientais com informações confiáveis.
            </p>
          </div>

          <div>
            <h4 className="text-clamp-large text-mediumGrey mb-1">
              3. Conteúdo Socioeducativo{" "}
              <BookOpenText className="inline -translate-y-[2px]" size={26} />
            </h4>
            <p className="text-clamp-medium text-lightGrey">
              Artigos e conteúdos didáticos para informar e formar cidadãos
              conscientes, promovendo educação ambiental de forma acessível e
              engajadora.
            </p>
          </div>
        </div>

        {/* Justificativa */}
        <div className="col-span-2 mt-12">
          <h3 className="text-clamp-xlarge mb-4 text-mediumGrey">
            Justificativa do Projeto
          </h3>
          <p className="text-clamp-medium text-lightGrey">
            O <strong>AMBICIENTE</strong> surgiu como uma resposta direta aos
            desafios climáticos e à carência de canais acessíveis de denúncia.
            Queremos conectar tecnologia, dados e informação a favor da natureza
            e da sociedade.
          </p>
        </div>

        {/* Conclusão */}
        <div className="col-span-2 mt-12">
          <h3 className="text-clamp-xlarge mb-4 text-mediumGrey">Conclusão</h3>
          <p className="text-clamp-medium text-lightGrey">
            O <strong>AMBICIENTE</strong> é mais do que uma plataforma — é um
            movimento. Unimos denúncia cidadã, dados ambientais e educação para
            promover impacto positivo no presente e no futuro do planeta.
          </p>
        </div>

        {/* Tecnologias Utilizadas */}
        <div className="col-span-2 mt-12">
          <div
            onClick={() => setTechInfo(!techInfo)}
            className="flex hover:underline decoration-mediumGrey underline-offset-2 cursor-pointer w-fit"
          >
            <h3 className="text-clamp-xlarge mb-4 text-mediumGrey">
              Informações Técnicas
            </h3>
            <ChevronDown
              size={36}
              className={`stroke-mediumGrey inline translate-y-[6px] ${
                techInfo ? "rotate-180" : ""
              }`}
            />
          </div>
          {techInfo && (
            <div className="border px-8 py-4 gap-y-12 flex flex-col">
              <div className="pb-2 border-b">
                <h4 className="text-clamp-large mb-4 text-mediumGrey">
                  1. Tecnologias Utilizadas
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-clamp-medium text-lightGrey">
                  <li>
                    <strong>Frontend:</strong> HTML, CSS, JavaScript,
                    TypeScript, Next.js
                  </li>
                  <li>
                    <strong>Backend:</strong> Python, FastAPI
                  </li>
                  <li>
                    <strong>Banco de Dados:</strong> SQLite
                  </li>
                  <li>
                    <strong>Design e Gerenciamento:</strong> Figma, Trello
                  </li>
                  <li>
                    <strong>Versionamento:</strong> Git & GitHub
                  </li>
                  <li>
                    <strong>APIs:</strong> API pública de dados climáticos
                  </li>
                  <li>
                    <strong>Análise de Dados:</strong> Power BI
                  </li>
                </ul>
              </div>
              <div className="pb-2 border-b">
                <h4 className="text-clamp-large mb-4 text-mediumGrey">
                  2. Funcionalidades Técnicas
                </h4>
                <p className="text-clamp-medium text-lightGrey">
                  A plataforma conta com diversas funcionalidades avançadas,
                  como:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-clamp-medium text-lightGrey">
                  <li>
                    <strong>Sistema de usuários e cargos:</strong> controle de
                    acesso com diferentes permissões para usuários comuns,
                    moderadores e administradores.
                  </li>
                  <li>
                    <strong>Gerenciamento de denúncias:</strong> visualização,
                    filtragem e acompanhamento de denúncias ambientais
                    registradas na plataforma.
                  </li>
                  <li>
                    <strong>Editor de artigos:</strong> criação e edição de
                    conteúdos educativos com múltiplos tópicos e suporte a
                    imagens.
                  </li>
                </ul>
              </div>
              <div className="pb-2 border-b">
                <h4 className="text-clamp-large mb-4 text-mediumGrey">
                  3. Arquitetura
                </h4>
                <p className="text-clamp-medium text-lightGrey">
                  Aplicação separada em frontend (Next.js) e backend (FastAPI),
                  integrados por requisições REST. Dados são armazenados em
                  SQLite, com consumo de APIs públicas e renderização de
                  informações ambientais.
                </p>
              </div>
              <div className="pb-2 border-b">
                <h4 className="text-clamp-large mb-4 text-mediumGrey">
                  4. Autenticação e Segurança
                </h4>
                <p className="text-clamp-medium text-lightGrey">
                  Autenticação por token (JWT) em rotas protegidas. Backend com
                  validação de dados e controle de permissões via FastAPI.
                </p>
              </div>
              <div className="pb-2 border-b">
                <h4 className="text-clamp-large mb-4 text-mediumGrey">
                  5. Deploy e Infraestrutura
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-clamp-medium text-lightGrey">
                  <li>
                    <strong>Frontend:</strong> Vercel
                  </li>
                  <li>
                    <strong>Backend:</strong> Render
                  </li>
                  <li>
                    <strong>Repositório: </strong>
                    <Link
                      href="https://github.com/RenanlMelo/Ambiciente"
                      target="_blank"
                      className="underline underline-offset-2 hover:text-darkGrey"
                    >
                      GitHub{" "}
                      <SquareArrowOutUpRight
                        className="inline ml-1 -translate-y-px"
                        strokeWidth={2}
                        size={18}
                      />
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="pb-2 border-b">
                <h4 className="text-clamp-large mb-4 text-mediumGrey">
                  6. Meu Portifólio
                </h4>
                <p className="text-clamp-medium text-lightGrey">
                  Fique à vontade para conhecer mais de meus projetos e também
                  sobre mim!
                </p>
                <Link
                  className="text-clamp-medium text-lightGrey underline underline-offset-2 hover:text-darkGrey"
                  href="https://renanmelo-portifolio.vercel.app/"
                >
                  Portifólio{" "}
                  <SquareArrowOutUpRight
                    className="inline ml-1 -translate-y-px "
                    strokeWidth={2}
                    size={18}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
