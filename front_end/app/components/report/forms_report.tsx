"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

export const Denuncia_forms = () => {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();

  // Estados do formulário
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [dataOcorrido, setDataOcorrido] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [impactos, setImpactos] = useState("");
  const [anonimo, setAnonimo] = useState(false);

  // Estados do usuário
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Arquivos e feedback
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  if (!apiUrl) {
    throw new Error("API URL not configured");
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  // Preenche dados do usuário autenticado
  useEffect(() => {
    if (user) {
      setNome(user.name ?? "");
      setSobrenome(user.last_name ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("descricao", descricao);
      formData.append("local", local);
      formData.append("data", dataOcorrido);
      formData.append("responsavel", responsavel);
      formData.append("impactos", impactos);
      formData.append("is_anonimo", String(anonimo));

      if (!anonimo) {
        formData.append("nome", nome);
        formData.append("sobrenome", sobrenome);
        formData.append("email", email);
        formData.append("telefone", telefone);
      }

      console.log(formData);

      const res = await fetch(`${apiUrl}/api/denuncias/enviar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const body = await res.json();
      console.log(body);

      if (!res.ok) {
        throw new Error(body.detail || "Falha ao enviar denúncia");
      }

      router.push("/perfil");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando usuário…</p>
      </div>
    );
  }

  return (
    <main className="w-full h-fit bg-white px-[12vw] py-12 mt-[calc(8vh+1rem)]">
      <h2 className="text-[var(--font-title)] font-semibold text-clamp-xxlarge">
        Envie uma nova denúncia
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-start gap-8"
      >
        {/* Detalhes da Infração */}
        <div className="flex flex-col justify-center items-center border w-[48%] relative px-6 gap-y-6 py-8 my-10">
          <h3 className="bg-white px-2 absolute top-0 -translate-y-1/2 text-[var(--font-title)] font-bold text-clamp-medium self-start">
            Detalhes da Infração
          </h3>
          {/* Descrição */}
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <label className="bg-[var(--form-subtitle)] text-[var(--font-title)] font-bold w-full px-4 py-1 text-clamp-small">
              O QUE ACONTECEU <strong className="text-red-500">*</strong>
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              minLength={10}
              rows={5}
              placeholder="Descreva detalhadamente a violação ambiental..."
              className="resize-none w-full border px-4 py-1 focus:outline-none text-clamp-small"
            />
          </div>
          {/* Onde */}
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <label className="bg-[var(--form-subtitle)] text-[var(--font-title)] font-bold w-full px-4 py-1 text-clamp-small">
              ONDE ACONTECEU <strong className="text-red-500">*</strong>
            </label>
            <textarea
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              required
              rows={3}
              placeholder="Informe a localização exata..."
              className="resize-none w-full border px-4 py-1 focus:outline-none text-clamp-small"
            />
          </div>
          {/* Quando */}
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <label className="bg-[var(--form-subtitle)] text-[var(--font-title)] font-bold w-full px-4 py-1 text-clamp-small">
              QUANDO ACONTECEU <strong className="text-red-500">*</strong>
            </label>
            <input
              type="date"
              value={dataOcorrido}
              max={formattedDate}
              onChange={(e) => {
                const newDataOcorrido = e.target.value;
                setDataOcorrido(newDataOcorrido);
                console.log(newDataOcorrido);  // Mostra o valor atualizado
              }}
              required
              className="w-full border px-4 py-1 focus:outline-none text-clamp-small"
            />
          </div>
          {/* Impactos */}
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <label className="bg-[var(--form-subtitle)] text-[var(--font-title)] font-bold w-full px-4 py-1 text-clamp-small">
              IMPACTOS <strong className="text-red-500">*</strong>
            </label>
            <textarea
              value={impactos}
              onChange={(e) => setImpactos(e.target.value)}
              required
              rows={4}
              placeholder="Descreva os danos ambientais ou à saúde..."
              className="resize-none w-full border px-4 py-1 focus:outline-none text-clamp-small"
            />
          </div>
          {/* Responsável */}
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <label className="bg-[var(--form-subtitle)] text-[var(--font-title)] font-bold w-full px-4 py-1 text-clamp-small">
              QUEM FOI O RESPONSÁVEL
            </label>
            <textarea
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              rows={3}
              placeholder="Informe nome ou empresa responsável..."
              className="resize-none w-full border px-4 py-1 focus:outline-none text-clamp-small"
            />
          </div>
        </div>

        {/* Fotos do ocorrido e Dados */}
        <div className="flex flex-col justify-center items-center w-[48%] relative gap-y-10 mt-10">
            
          {/* Dados do usuário */}
          <div className="flex flex-col justify-center items-start border w-full relative px-6 gap-x-2 py-8 text-clamp-small">
            <h3 className="bg-white px-2 absolute top-0 -translate-y-1/2 text-[var(--font-title)] font-bold text-clamp-medium self-start">
              Seus Dados
            </h3>
            <div className="flex items-center gap-2 mb-6">
              <input
                id="checkbox_anonimo"
                type="checkbox"
                checked={anonimo}
                onChange={(e) => setAnonimo(e.target.checked)}
              />
              <label htmlFor="checkbox_anonimo" className="cursor-pointer">
                Desejo permanecer anônimo
              </label>
            </div>

            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={anonimo}
              className="w-full border px-2 py-1 mb-2 rounded-sm focus:outline-none text-clamp-small disabled:bg-[#ddd] disabled:text-[#666] disabled:cursor-not-allowed"
            />

            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              disabled={anonimo}
              className="w-full border px-2 py-1 mb-2 rounded-sm focus:outline-none text-clamp-small disabled:bg-[#ddd] disabled:text-[#666] disabled:cursor-not-allowed"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={anonimo}
              required={!anonimo}
              className="w-full border px-2 py-1 rounded-sm focus:outline-none text-clamp-small disabled:bg-[#ddd] disabled:text-[#666] disabled:cursor-not-allowed"
            />
            <p className="text-[var(--form-obs)] text-clamp-xsmall mb-2">
              Obrigatório para confirmação e acompanhamento.
            </p>

            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              disabled={anonimo}
              className="w-full border px-2 py-1 rounded-sm focus:outline-none text-clamp-small disabled:bg-[#ddd] disabled:text-[#666] disabled:cursor-not-allowed"
            />
          </div>

          {/* Políticas e Enviar */}
          <div className="flex flex-col items-start w-full bg-[var(--politicas-bg)] py-8 px-6 gap-y-4">
            <div className="flex items-center justify-start gap-2">
              <input id="checkbox_politicas" type="checkbox" required />
              <label htmlFor="checkbox_politicas" className="font-light">
                Li e concordo com a{" "}
                <Link
                  href="/"
                  className="font-normal text-[var(--secondary)] hover:underline decoration-[var(--secondary)]"
                >
                  Política de Privacidade
                </Link>{" "}
                e os{" "}
                <Link
                  href="/"
                  className="font-normal text-[var(--secondary)] hover:underline decoration-[var(--secondary)]"
                >
                  Termos & Condições
                </Link>
                .
              </label>
            </div>
            <button
              className="font-bold text-white bg-[var(--secondary)] px-4 py-2 h-10 rounded-[4px] hover:bg-[var(--secondaryHover)] cursor-pointer text-clamp-small"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Enviando…" : "ENVIAR DENÚNCIA"}
            </button>
            <p className="text-[var(--form-obs)] text-clamp-small">
              Este site é protegido pelo reCAPTCHA e pelas políticas do Google.
            </p>
          </div>
        </div>
      </form>
    </main>
  );
};
