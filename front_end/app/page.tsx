"use client";
import Footer from "./components/ui/footer";
import { GraduationCap, Map, MessageSquareWarning } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-background flex flex-col items-center justify-center">
        <section className="w-screen h-[75lvh] flex flex-col justify-center items-center relative px-5">
          <Image
            src="/bg.jpg"
            rel="preload"
            width={1920}
            height={1200}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
            alt="Article main image"
            className="h-[75lvh] object-cover absolute top-0"
          />
          <span className="w-full h-full absolute top-0 bg-gradient-to-t from-[#191a27aa] to-black/10" />
          <h1 className="text-f5White font-bold text-center text-4xl md:text-clamp-xxxlarge mb-6 tracking-wider z-10">
            Bem-vindo ao <span>Ambiciente</span>🌍
          </h1>
          <p className="text-eWhite text-clamp-medium tracking-wider md:w-[calc(564px+15vw)] z-10 text-center font-medium">
            Nosso planeta precisa de nós, e o Ambiciente. É o espaço para quem
            quer fazer a diferença. Aqui, você pode denunciar crimes ambientais,
            se informar com artigos sobre sustentabilidade e visualizar o
            impacto ambiental no Brasil através de um mapa interativo. Juntos,
            podemos construir um futuro mais verde e consciente!
          </p>
        </section>
        <section className="w-full h-full grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 py-20 md:w-[calc(564px+25vw)] gap-12 px-5 md:px-0">
          <Link
            href="/denuncia"
            className="flex flex-col items-center justify-start gap-y-2 shadow-[0px_10px_30px_rgba(80,80,60,.25)] hover:shadow-[0px_20px_40px_rgba(80,80,60,.3)] duration-150 p-9 rounded-2xl cursor-pointer"
          >
            <span className="bg-blue-900 p-5 rounded-full">
              <MessageSquareWarning className="stroke-background" size={96} />
            </span>
            <h2 className="font-bold tracking-wide text-clamp-xlarge text-blue-900">
              Denúncias
            </h2>
            <p className="text-center text-clamp-medium">
              Reporte crimes contra o meio ambiente para ajudar a combater a
              degradação.
            </p>
          </Link>
          <Link
            href="/artigos"
            className="flex flex-col items-center justify-start gap-y-2 shadow-[0px_10px_30px_rgba(80,80,60,.25)] hover:shadow-[0px_20px_40px_rgba(80,80,60,.3)] duration-150 p-9 rounded-2xl cursor-pointer"
          >
            <span className="bg-green-900 p-5 rounded-full">
              <GraduationCap className="stroke-background" size={96} />
            </span>
            <h2 className="font-bold tracking-wide text-clamp-xlarge text-green-900">
              Educação
            </h2>
            <p className="text-center text-clamp-medium">
              Aprenda mais sobre práticas sustentáveis através de nossos
              artigos.
            </p>
          </Link>
          <Link
            href="/mapa"
            className="flex flex-col items-center justify-start gap-y-2 shadow-[0px_10px_30px_rgba(80,80,60,.25)] hover:shadow-[0px_20px_40px_rgba(80,80,60,.3)] duration-150 p-9 rounded-2xl cursor-pointer"
          >
            <span className="bg-[#5c4033] p-5 rounded-full">
              <Map className="stroke-background" size={96} />
            </span>
            <h2 className="font-bold tracking-wide text-clamp-xlarge text-[#5c4033]">
              Mapa
            </h2>
            <p className="text-center text-clamp-medium">
              Visualize impactos ambientais com nosso mapa interativo.
            </p>
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}
