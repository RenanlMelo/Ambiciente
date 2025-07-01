"use client";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-new text-white pt-5 text-center w-screen z-40 text-clamp-small">
      <div className="flex justify-around flex-wrap max-w-6xl mx-auto p-5">
        {/* Sobre Nós */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <p className="text-clamp-medium mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Sobre Nós
          </p>
          <p>
            Nosso objetivo é ajudar na preservação do meio ambiente e na
            proteção dos animais, facilitando denúncias e conscientização.
          </p>
        </div>
        {/* Links Úteis */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <p className="text-clamp-medium mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Links Úteis
          </p>
          <ul className="list-none p-0">
            <li className="my-2">
              <Link
                aria-label="Acesse o mapa para monitorar as condições do Brasil inteiro"
                href="/mapa"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Mapa de Monitoramento
              </Link>
            </li>
            <li className="my-2">
              <Link
                aria-label="Acesse nossa página de artigos e fique informado"
                href="/artigos"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Artigos e Notícias
              </Link>
            </li>
            <li className="my-2">
              <Link
                aria-label="Faça sua denúncia agora"
                href="/denuncia"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Faça sua Denúncia
              </Link>
            </li>
            <li className="my-2">
              <Link
                aria-label="Leia nossa política de privacidade"
                href="/"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
        {/* Contato */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <p className="text-clamp-medium mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Contato
          </p>
          <a
            href="mailto:renanlaramelo@gmail.com"
            aria-label="Envie um email para contato@ambicente.com"
          >
            <p className="p-1 transition duration-300 hover:text-[#1abc9c]">
              Email: contato@ambicente.com
            </p>
          </a>
          <a
            href="tel:+5515996839690"
            aria-label="Ligue ou entre em contato via whatsApp"
          >
            <p className="p-1 transition duration-300 hover:text-[#1abc9c]">
              Telefone: (15) 99683-9690
            </p>
          </a>
          <a href="https://g.co/kgs/u8DQW6H" aria-label="Venha nos visitar">
            <p className="p-1 transition duration-300 hover:text-[#1abc9c]">
              Endereço: Rod. Sen. José Ermírio de Moraes, 1425 Sorocaba, SP
            </p>
          </a>
        </div>
        {/* Siga-nos */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <p className="text-clamp-medium mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Siga-nos
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link
              aria-label="Siga-nos no Facebook"
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaFacebook />
            </Link>
            <Link
              aria-label="Siga-nos no Instagram"
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaInstagram />
            </Link>
            <Link
              aria-label="Siga-nos no Twitter"
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaTwitter />
            </Link>
            <Link
              aria-label="Siga-nos no Linkedin"
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-newD p-2.5 text-clamp-xsmall">
        <p>&copy; 2025 Ambiente Seguro | Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
