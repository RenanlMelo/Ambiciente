"use client";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2c3e50] text-white pt-5 text-center w-screen z-50 text-clamp-small">
      <div className="flex justify-around flex-wrap max-w-6xl mx-auto p-5">
        {/* Sobre Nós */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <h4 className="text-clamp-medium mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Sobre Nós
          </h4>
          <p>
            Nosso objetivo é ajudar na preservação do meio ambiente e na
            proteção dos animais, facilitando denúncias e conscientização.
          </p>
        </div>
        {/* Links Úteis */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <h4 className="text-clamp-medium mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Links Úteis
          </h4>
          <ul className="list-none p-0">
            <li className="my-2">
              <Link
                href="/mapa"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Mapa de Denúncias
              </Link>
            </li>
            <li className="my-2">
              <Link
                href="/artigos"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Artigos e Notícias
              </Link>
            </li>
            <li className="my-2">
              <Link
                href="/denuncia"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Faça sua Denúncia
              </Link>
            </li>
            <li className="my-2">
              <Link
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
          <h4 className="text-clamp-medium mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Contato
          </h4>
          <p>
            <a href="mailto:renanlaramelo@gmail.com">
              Email: contato@ambicente.com
            </a>
          </p>
          <p>
            <a href="tel:+5515996839690">Telefone: (15) 99683-9690</a>
          </p>
          <p>
            <a href="https://g.co/kgs/u8DQW6H">
              Endereço: Rod. Sen. José Ermírio de Moraes, 1425 Sorocaba, SP
            </a>
          </p>
        </div>
        {/* Siga-nos */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <h4 className="text-clamp-medium mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Siga-nos
          </h4>
          <div className="flex justify-center space-x-4 mt-2">
            <Link
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaFacebook />
            </Link>
            <Link
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaTwitter />
            </Link>
            <Link
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-[#1a252f] p-2.5 text-clamp-xsmall">
        <p>&copy; 2025 Ambiente Seguro | Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
