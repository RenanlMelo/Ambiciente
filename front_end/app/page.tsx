"use client";
import Footer from "./components/footer";
import { useHeader } from "./contexts/HeaderContext";

export default function Home() {
  const { headerHeight } = useHeader();
  return (
    <>
      <section
        style={{
          marginTop: `${headerHeight}px`,
        }}
        className=" w-full min-h-[75lvh] bg-white flex flex-col justify-center items-center"
      >
        <div>
          <h2 className="text-[var(--font-title)] font-bold text-4xl max-w-3xl mb-6 tracking-wider">
            Bem-vindo ao <span>Ambiciente</span> 🌱🌍
          </h2>
          <p className="text-[var(--font-body)] text-xl max-w-3xl tracking-wider">
            Nosso planeta precisa de nós, e o Ambiciente. é o espaço para quem
            quer fazer a diferença. Aqui, você pode denunciar crimes ambientais,
            se informar com artigos sobre sustentabilidade e visualizar o
            impacto ambiental no Brasil através de um mapa interativo. Juntos,
            podemos construir um futuro mais verde e consciente. Vamos começar?
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
