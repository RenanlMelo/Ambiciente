"use client";

import React from "react";
import Link from "next/link";

export const Denuncia_forms = () => {
  return (
    <main className="w-full h-fit bg-white px-[12vw] py-12 mt-[calc(8vh+1rem)]">
      <h2 className="text-[var(--font-title)] font-semibold text-clamp-xxlarge">
        Envie uma nova denúncia
      </h2>
      <form action="" className="flex justify-between items-start">
        <div className="flex flex-col justify-center items-center border w-[48%] relative px-6 gap-y-6 py-8 my-10">
          <h3 className="bg-white px-2 absolute top-0 -translate-y-1/2 text-[var(--font-title)] font-bold text-clamp-medium self-start">
            Detalhes da Infração
          </h3>
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <p className="bg-[var(--form-subtitle)] text-[var(--font-title)] font-bold w-full px-4 py-1 text-clamp-small">
              O QUE ACONTECEU
            </p>
            <textarea
              rows={5}
              placeholder="Descreva detalhadamente a violação ambiental que deseja denunciar. O que aconteceu?"
              className="resize-none w-full border px-4 py-1 focus:outline-none text-clamp-small"
            ></textarea>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <p className="bg-[var(--form-subtitle)] text-[var(--font-title)] font-bold w-full px-4 py-1 text-clamp-small">
              ONDE ACONTECEU
            </p>
            <textarea
              rows={5}
              placeholder="Informe a localização exata do incidente, incluindo endereço, coordenadas GPS ou ponto de referência mais próximo."
              className="resize-none w-full border px-4 py-1 focus:outline-none text-clamp-small"
            ></textarea>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <p className="bg-[var(--form-subtitle)] text-[var(--font-title)] font-bold w-full px-4 py-1 text-clamp-small">
              QUANDO ACONTECEU
            </p>
            <textarea
              rows={5}
              placeholder="O incidente foi único ou está em andamento? Informe as datas, se possível."
              className="resize-none w-full border px-4 py-1 focus:outline-none text-clamp-small"
            ></textarea>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <p className="bg-[var(--form-subtitle)] text-[var(--font-title)] font-bold w-full px-4 py-1 text-clamp-small">
              QUEM FOI O RESPONSÁVEL
            </p>
            <textarea
              rows={5}
              placeholder="Se souber, informe quem está envolvido no incidente (pessoa ou empresa). Inclua qualquer informação que ajude na identificação, como nomes ou placas de veículos."
              className="resize-none w-full border px-4 py-1 focus:outline-none text-clamp-small"
            ></textarea>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <p className="bg-[var(--form-subtitle)] text-[var(--font-title)] font-bold w-full px-4 py-1 text-clamp-small">
              IMPACTOS
            </p>
            <textarea
              rows={5}
              placeholder="Como esse incidente impactou você ou o meio ambiente? Descreva os danos ambientais ou à saúde humana."
              className="resize-none w-full border px-4 py-1 focus:outline-none text-clamp-small"
            ></textarea>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center items-center w-[48%] relative gap-y-10 mt-10">
          <div className="flex flex-col justify-center items-center border w-full relative px-6 gap-y-6 py-8">
            <h3 className="bg-white px-2 absolute top-0 -translate-y-1/2 text-[var(--font-title)] font-bold text-clamp-medium self-start">
              Buscar Arquivo
            </h3>
            <label
              htmlFor="files"
              className="font-bold text-white bg-[var(--secondary)] px-4 py-2 h-10 rounded-[4px] hover:bg-[var(--secondaryHover)] cursor-pointer self-start tracking-wider text-clamp-small"
            >
              SELECIONE O ARQUIVO
            </label>
            <input id="files" type="file" className="hidden" />
            <p className="text-[var(--form-obs)] text-clamp-xsmall">
              Imagens do formato JPG, GIF ou PNG são aceitos. O maior tamanho
              permitido para um arquivo é 5mb.
            </p>
          </div>

          <div className="flex flex-col justify-center items-start border w-full relative px-6 gap-x-2 py-8 text-clamp-small">
            <h3 className="bg-white px-2 absolute top-0 -translate-y-1/2 text-[var(--font-title)] font-bold text-clamp-medium self-start">
              Seus Dados
            </h3>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              className="w-full border px-4 py-1 mb-2 rounded-sm focus:outline-none text-clamp-small"
            ></input>
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              className="w-full border px-4 py-1 mb-2 rounded-sm focus:outline-none text-clamp-small"
            ></input>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="w-full border px-4 py-1 rounded-sm focus:outline-none text-clamp-small"
            ></input>
            <p className="text-[var(--form-obs)] text-clamp-small mb-2">
              Obrigatório para confirmação da denúncia e para acompanhamento da
              denúncia.
            </p>
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              className="w-full border px-4 py-1 rounded-sm focus:outline-none text-clamp-small"
            ></input>
            <div className="flex items-center">
              <input
                id="checkbox_anonimo"
                type="checkbox"
                className="absolute appearance-none w-4 h-4 border rounded-sm checked:bg-black peer shrink-0 border-[var(--line)] bg-white checked:border-0"
              />
              <label
                htmlFor="checkbox_anonimo"
                className="cursor-pointer text-[#6b6b6b] w-full px-6 z-10 text-clamp-small"
              >
                Desejo permanecer anônimo
              </label>
              <svg
                className="
              absolute 
              w-4 h-4 mt-[2px]
                hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 26 26"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="text-[var(--form-obs)] text-clamp-small">
              Seus dados serão protegidos e não serão compartilhados.
            </p>
          </div>
          <div className="flex flex-col items-center w-full bg-[var(--politicas-bg)] py-8 px-6 gap-y-4">
            <div className="w-full relative">
              <input
                id="checkbox_politicas"
                type="checkbox"
                className="absolute appearance-none w-4 h-4 border rounded-sm checked:bg-black peer shrink-0 border-[var(--line)] bg-white checked:border-0 translate-y-1"
              />
              <label
                htmlFor="checkbox_politicas"
                className="cursor-pointer text-[#6b6b6b] w-full px-6 z-10 font-light text-clamp-small"
              >
                Li e concordo com a{" "}
                <Link
                  href="/"
                  className="font-normal text-[var(--secondary)] hover:underline decoration-[var(--secondary)] w-fit text-clamp-small"
                >
                  Política de Privacidade
                </Link>{" "}
                e os{" "}
                <Link
                  href="/"
                  className="font-normal text-[var(--secondary)] hover:underline decoration-[var(--secondary)] w-fit text-clamp-small"
                >
                  Termos & Condições.
                </Link>
              </label>
              <svg
                className="
              absolute w-4 h-4 mt-[2px] top-0 translate-y-[3px]
                hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 26 26"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <button
              className="font-bold text-white bg-[var(--secondary)] px-4 py-2 h-10 rounded-[4px] hover:bg-[var(--secondaryHover)] cursor-pointer self-start text-clamp-small"
              type="submit"
            >
              ENVIAR DENÚNCIA
            </button>
          </div>
          <p className="text-[var(--form-obs)] text-clamp-small">
            Este site é protegido pelo reCAPTCHA e pelas políticas do Google
            Privacy Policy and Terms of Service apply.
          </p>
        </div>
      </form>
      {/* {output && ()} */}
    </main>
  );
};
