"use client";
import Footer from "./components/ui/footer";

export default function Home() {
  return (
    <>
      <section className=" w-full min-h-[85lvh] bg-white flex flex-col justify-center items-center mt-[calc(8vh+1rem)]">
        <div>
          <h2 className="text-[var(--font-title)] font-bold text-clamp-title mb-6 tracking-wider">
            Bem-vindo ao <span>Ambiciente</span> 🌱🌍
          </h2>
          <p className="text-[var(--font-body)] text-clamp-medium w-[calc(564px+10vw)] tracking-wider">
            Nosso planeta precisa de nós, e o Ambiciente. é o espaço para quem
            quer fazer a diferença. Aqui, você pode denunciar crimes ambientais,
            se informar com artigos sobre sustentabilidade e visualizar o
            impacto ambiental no Brasil através de um mapa interativo. Juntos,
            podemos construir um futuro mais verde e consciente. Vamos começar?
          </p>
        </div>
        <div className="flex justify-start items-center gap-12 mt-6 w-[calc(564px+10vw)] text-clamp-medium text-[var(--font-title)] font-medium">
          <div className="flex flex-col gap-4">
            <p>Faça login e denuncie agora</p>
            <a
              href="/login"
              className="font-bold text-center text-white bg-[var(--secondary)] px-3 py-1 md:px-4 md:py-2 rounded-[4px] hover:bg-[var(--secondaryHover)] transition-colors duration-200 text-clamp-small"
            >
              Login
            </a>
          </div>
          <div className="flex flex-col gap-4">
            Esteja ciente sobre o ambiente
            <a
              href="/artigos"
              className="font-bold text-center text-white bg-[var(--secondary)] px-3 py-1 md:px-4 md:py-2 rounded-[4px] hover:bg-[var(--secondaryHover)] transition-colors duration-200 text-clamp-small"
            >
              Artigos
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
