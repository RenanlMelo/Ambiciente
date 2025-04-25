"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";

interface Topic {
  id: number;
  title: string;
  content: string;
}

export const Create_article = () => {
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
    const newTopic = { id: Date.now(), title: "", content: "" };
    setFormData({
      ...formData,
      topics: [...formData.topics, newTopic],
    });
  }

  function removeTopic(id: number) {
    setFormData({
      ...formData,
      topics: formData.topics.filter((topic: Topic) => topic.id !== id),
    });
  }

  function handleTopicChange(id: number, field: keyof Topic, value: string) {
    setFormData({
      ...formData,
      topics: formData.topics.map((topic: Topic) =>
        topic.id === id ? { ...topic, [field]: value } : topic
      ),
    });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const articleData = {
        title: formData.title,
        subtitle: formData.subtitle,
        slug: "", // O backend gera automaticamente
        topics: formData.topics.filter((t) => t.title && t.content), // Filtrar tópicos vazios
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
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro ao enviar o artigo. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white absolute w-full pt-32 pb-20 px-96 mt-[calc(8vh+1rem)] min-h-[calc(92vh-1rem)]">
      <Link
        href={`/artigos`}
        className="absolute top-4 left-10 text-xl justify-between w-full"
      >
        &lt;&lt; Ver todos os artigos
      </Link>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-2 justify-between items-start gap-x-12 gap-y-10"
      >
        <div>
          <label htmlFor="title">Título do Artigo *</label>
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
        <div>
          <label htmlFor="subtitle">Subtítulo do Artigo *</label>
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

        {/* Tópicos Dinâmicos */}
        <div className="col-span-2">
          <h3 className="font-semibold text-lg mb-2">Tópicos</h3>

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
          className="col-span-2 font-normal text-white bg-[var(--secondary)] px-4 py-2 h-10 rounded-[4px] hover:bg-[var(--secondaryHover)] cursor-pointer"
        >
          {isLoading ? "Enviando..." : "Criar Artigo"}
        </button>
      </form>
      {successMessage && (
        <p className="text-[var(--font-body)] text-lg">
          Seu artigo foi criado com sucesso!
        </p>
      )}

      {errorMessage && (
        <p className="text-red-500 bg-red-100 text-lg mt-4 px-4 py-2 rounded-md">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
