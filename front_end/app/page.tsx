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
            podemos construir um futuro mais{" "}
            <strong className="text-[var(--main)]">verde</strong> e consciente!
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
