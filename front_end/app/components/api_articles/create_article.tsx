"use client";
import React, { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";

interface Topic {
  id: number;
  title: string;
  content: string;
}

export const Create_article = () => {
  const nextTopicId = useRef(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Estado para o formulário
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    topics: [] as Topic[],
  });

  function addTopic() {
    const newTopic = { id: nextTopicId.current++, title: "", content: "" };
    setFormData((prev) => ({
      ...prev,
      topics: [...prev.topics, newTopic],
    }));
  }

  function removeTopic(id: number) {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((topic: Topic) => topic.id !== id),
    }));
  }

  function handleTopicChange(id: number, field: keyof Topic, value: string) {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.map((topic: Topic) =>
        topic.id === id ? { ...topic, [field]: value } : topic
      ),
    }));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(false);

    const validTopics = formData.topics.filter(
      (t) => t.title.trim() && t.content.trim()
    );

    if (validTopics.length === 0) {
      setErrorMessage("Adicione pelo menos um tópico com título e conteúdo.");
      setIsLoading(false);
      return;
    }

    try {
      const articleData = {
        title: formData.title,
        subtitle: formData.subtitle,
        slug: "", // O backend gera automaticamente
        topics: validTopics,
      };

      console.log("Enviando:", articleData);

      // Definir a URL da API dependendo do ambiente
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_API_URL_PROD
          : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

      // Fazendo a requisição com a URL configurada
      const response = await fetch(`${apiUrl}/api/artigos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        // Opcional: obter mensagem de erro do corpo da resposta
        const errorBody = await response.text(); // ou response.json(), se for JSON
        throw new Error(
          `Erro ${response.status}: ${response.statusText} - ${errorBody}`
        );
      }

      const data = await response.json();
      console.log("Resposta:", data);

      // Limpar os campos após o envio bem-sucedido
      setFormData({
        title: "",
        subtitle: "",
        topics: [] as Topic[],
      });
      setSuccessMessage(true);
      nextTopicId.current = 1;
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro ao enviar o artigo. Tente novamente.");
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white absolute w-full pt-24 md:pt-32 md:pb-20 md:px-96 mt-[calc(8vh+1rem)] min-h-[calc(92vh-1rem)]">
      <Link
        href={`/artigos`}
        className="absolute top-4 left-4 md:left-10 text-clamp-medium justify-between w-fit text-[var(--medium-grey)]"
      >
        <ChevronsLeft stroke="#505050" className="inline" /> Ver todos os
        artigos
      </Link>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-between items-start gap-x-12 gap-y-10 text-clamp-small px-5 md:p-0"
      >
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-12">
          <div className="w-full">
            <label htmlFor="title" className="text-clamp-medium">
              Título do Artigo <strong className="text-red-500">*</strong>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full border px-4 py-1 rounded-sm focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label htmlFor="subtitle" className="text-clamp-medium">
              Subtítulo do Artigo <strong className="text-red-500">*</strong>
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              required
              className="w-full border px-4 py-1 rounded-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Tópicos Dinâmicos */}
        <div className="w-full">
          <h3 className="text-[var(--title)] text-clamp-medium mb-2">
            Tópicos
          </h3>

          {formData.topics.map((topic) => (
            <div key={topic.id} className="mb-4 p-3 border rounded-md">
              <label htmlFor={`topic_title_${topic.id}`}>
                Título do Tópico
              </label>
              <input
                type="text"
                id={`topic_title_${topic.id}`}
                value={topic.title}
                onChange={(e) =>
                  handleTopicChange(topic.id, "title", e.target.value)
                }
                className="w-full border px-4 py-1 rounded-sm focus:outline-none"
              />

              <label
                htmlFor={`topic_content_${topic.id}`}
                className="mt-2 block"
              >
                Conteúdo
              </label>
              <textarea
                id={`topic_content_${topic.id}`}
                value={topic.content}
                rows={3}
                onChange={(e) =>
                  handleTopicChange(topic.id, "content", e.target.value)
                }
                className="resize-none w-full border px-4 py-1 focus:outline-none"
              ></textarea>

              <button
                type="button"
                onClick={() => removeTopic(topic.id)}
                className="mt-2 text-red-500 hover:underline"
              >
                Remover Tópico
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addTopic}
            className="text-blue-500 font-semibold hover:underline"
          >
            + Adicionar Tópico
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto col-span-2 font-normal text-white bg-[var(--secondary)] px-4 py-2 h-10 rounded-[4px] hover:bg-[var(--secondaryHover)] cursor-pointer mb-24"
        >
          {isLoading ? "Enviando..." : "Criar Artigo"}
        </button>
      </form>
      {successMessage && (
        <p className="text-[var(--medium-grey)] font-bold text-clamp-small mt-4 px-4 py-2 rounded-md">
          Seu artigo foi criado com sucesso!
        </p>
      )}

      {errorMessage && (
        <p className="text-red-500 bg-red-200 text-clamp-small mt-4 px-4 py-2 rounded-md">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
