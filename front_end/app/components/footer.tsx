import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2c3e50] text-white pt-5 text-center absolute bottom-0 w-full">
      <div className="flex justify-around flex-wrap max-w-6xl mx-auto p-5">
        {/* Sobre Nós */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <h4 className="text-lg mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Sobre Nós
          </h4>
          <p>
            Nosso objetivo é ajudar na preservação do meio ambiente e na
            proteção dos animais, facilitando denúncias e conscientização.
          </p>
        </div>
        {/* Links Úteis */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <h4 className="text-lg mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Links Úteis
          </h4>
          <ul className="list-none p-0">
            <li className="my-2">
              <a
                href="#"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Mapa de Denúncias
              </a>
            </li>
            <li className="my-2">
              <a
                href="#"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Artigos e Notícias
              </a>
            </li>
            <li className="my-2">
              <a
                href="#"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Faça sua Denúncia
              </a>
            </li>
            <li className="my-2">
              <a
                href="#"
                className="text-white no-underline transition duration-300 hover:text-[#1abc9c]"
              >
                Política de Privacidade
              </a>
            </li>
          </ul>
        </div>
        {/* Contato */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <h4 className="text-lg mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Contato
          </h4>
          <p>Email: contato@ambicente.com</p>
          <p>Telefone: (11) 99999-9999</p>
          <p>Endereço: Rua Sustentável, 123 - São Paulo, SP</p>
        </div>
        {/* Siga-nos */}
        <div className="flex-1 min-w-[250px] m-2.5">
          <h4 className="text-lg mb-2.5 border-b-2 border-[#1abc9c] inline-block pb-1">
            Siga-nos
          </h4>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-white text-[20px] transition duration-300 hover:text-[#1abc9c]"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-[#1a252f] p-2.5 text-sm">
        <p>&copy; 2025 Ambiente Seguro | Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
