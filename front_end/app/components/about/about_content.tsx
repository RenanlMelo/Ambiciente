"use client";
import React, { useState } from "react";
import {
  TreePine,
  ThermometerSun,
  BookOpenText,
  ChevronDown,
  SquareArrowOutUpRight,
  Code2,
  Github,
  Leaf,
  ArrowRight,
  Terminal,
  Database,
  Paintbrush,
  Cloud,
  ChartColumn,
  CornerRightDown,
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

      <main className="px-5 md:px-[20vw] pt-10 pb-24 bg-white w-full min-h-[calc(92vh-1rem)]">
        {/* Tecnologias Utilizadas */}
        <div className="col-span-2 mb-12 border-b pb-12">
          <div
            onClick={() => setTechInfo(!techInfo)}
            className="flex items-center gap-2 cursor-pointer  hover:underline decoration-mediumGrey"
          >
            <h3 className="text-clamp-xlarge mb-4 text-mediumGrey">
              Informações Técnicas
            </h3>
            <ChevronDown
              size={36}
              className={`stroke-mediumGrey inline -translate-y-[6px] ${
                techInfo ? "rotate-180" : ""
              }`}
            />
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out 
            ${techInfo ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            {techInfo && (
              <div className="overflow-scroll max-h-[80vh] border rounded-xl px-8 py-6 gap-y-12 flex flex-col bg-[#fafafa] shadow-sm">
                <div className="pb-2 border-b border-mediumGrey/20">
                  <h4 className="text-clamp-large mb-4 text-mediumGrey">
                    1. Tecnologias Utilizadas
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-clamp-medium text-lightGrey">
                    <li className="flex items-start gap-3">
                      <Code2
                        className="stroke-mediumGrey mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <strong className="block mb-1">Frontend:</strong>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Next.js",
                            "TypeScript",
                            "React",
                            "Tailwind CSS",
                          ].map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-mediumGrey/10 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>

                    {/* Backend */}
                    <li className="flex items-start gap-3">
                      <Terminal
                        className="stroke-mediumGrey mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <strong className="block mb-1">Backend:</strong>
                        <div className="flex flex-wrap gap-2">
                          {["Python", "FastAPI", "JWT", "Pydantic"].map(
                            (tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-mediumGrey/10 rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </li>

                    {/* Banco de Dados */}
                    <li className="flex items-start gap-3">
                      <Database
                        className="stroke-mediumGrey mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <strong className="block mb-1">Banco de Dados:</strong>
                        <div className="flex flex-wrap gap-2">
                          {["SQLite"].map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-mediumGrey/10 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>

                    {/* Design */}
                    <li className="flex items-start gap-3">
                      <Paintbrush
                        className="stroke-mediumGrey mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <strong className="block mb-1">
                          Design e Gerenciamento:
                        </strong>
                        <div className="flex flex-wrap gap-2">
                          {["Figma", "Trello"].map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-mediumGrey/10 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>

                    {/* Versionamento */}
                    <li className="flex items-start gap-3">
                      <Github
                        className="stroke-mediumGrey mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <strong className="block mb-1">Versionamento:</strong>
                        <div className="flex flex-wrap gap-2">
                          {["Git & GitHub"].map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-mediumGrey/10 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>

                    {/* APIs */}
                    <li className="flex items-start gap-3">
                      <Cloud
                        className="stroke-mediumGrey mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <strong className="block mb-1">APIs:</strong>
                        <div className="flex flex-wrap gap-2">
                          {["API pública de dados climáticos"].map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-mediumGrey/10 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>

                    {/* Análise de Dados */}
                    <li className="flex items-start gap-3">
                      <ChartColumn
                        className="stroke-mediumGrey mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <strong className="block mb-1">
                          Análise de Dados:
                        </strong>
                        <div className="flex flex-wrap gap-2">
                          {["Power BI"].map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-mediumGrey/10 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
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

                  {/* Diagrama simplificado */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                    {/* Frontend */}
                    <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Code2 className="stroke-blue-600 mb-2" size={28} />
                      <span className="text-clamp-small font-medium text-blue-600">
                        Frontend
                      </span>
                      <span className="text-clamp-small text-lightGrey">
                        Next.js
                      </span>
                    </div>

                    {/* Seta (↔) */}
                    <ArrowRight
                      className="stroke-mediumGrey mx-2 hidden md:block"
                      size={32}
                    />

                    {/* Backend */}
                    <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <Terminal className="stroke-green-600 mb-2" size={28} />
                      <span className="text-clamp-small font-medium text-green-600">
                        Backend
                      </span>
                      <span className="text-clamp-small text-lightGrey">
                        FastAPI
                      </span>
                    </div>

                    {/* Seta (↔) */}
                    <ArrowRight
                      className="stroke-mediumGrey mx-2 hidden md:block"
                      size={32}
                    />

                    {/* Banco de Dados */}
                    <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <Database className="stroke-purple-600 mb-2" size={28} />
                      <span className="text-clamp-small font-medium text-purple-600">
                        Database
                      </span>
                      <span className="text-clamp-small text-lightGrey">
                        SQLite
                      </span>
                    </div>
                  </div>

                  <p className="text-clamp-medium text-lightGrey">
                    Integração via REST API, consumo de dados climáticos
                    externos e renderização otimizada pelo Next.js.
                  </p>
                </div>
                <div className="pb-2 border-b">
                  <h4 className="text-clamp-large mb-4 text-mediumGrey">
                    4. Deploy e Infraestrutura
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-clamp-medium text-lightGrey">
                    <li>
                      <strong>Frontend:</strong> Vercel
                    </li>
                    <li>
                      <strong>Backend:</strong> Render
                    </li>
                    <li>
                      <strong>Repositório: </strong> GitHub
                      <Link
                        href="https://github.com/RenanlMelo/Ambiciente"
                        className="group flex items-center w-fit hover:bg-lightGrey/10 -ml-3 px-3 py-2 rounded-lg transition-colors"
                      >
                        <Github className="stroke-mediumGrey mr-2" size={20} />
                        <span className="text-mediumGrey">
                          Link do Repositório no GitHub
                        </span>
                        <SquareArrowOutUpRight
                          className="ml-2 stroke-mediumGrey group-hover:translate-x-0.5 transition-transform"
                          size={16}
                        />
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="pb-2 border-b">
                  <h4 className="text-clamp-large mb-4 text-mediumGrey">
                    5. Meu Portfólio
                  </h4>
                  <p className="text-clamp-medium text-lightGrey">
                    Fique à vontade para conhecer mais de meus projetos e também
                    sobre mim!
                  </p>
                  <Link
                    className="text-clamp-medium text-lightGrey underline underline-offset-2 hover:text-darkGrey"
                    href="https://renanmelo-portifolio.vercel.app/"
                  >
                    Portfólio{" "}
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
        </div>

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
            Funcionalidades Sustentáveis
            <Leaf className="stroke-green-600 inline ml-2" />
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
      </main>
    </>
  );
};
