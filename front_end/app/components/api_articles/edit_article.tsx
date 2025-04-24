"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Topic {
  id: number;
  title: string;
  content: string;
}

interface ArticleData {
  title: string;
  subtitle: string;
  topics: Topic[];
}

export const Edit_article = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const params = useParams();
  const slug = params?.slug as string;
  // Estado para o formulário
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    topics: [] as Topic[],
  });

  // Define a URL base da API com base nas variáveis de ambiente
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  // 1. Carregar o artigo existente
  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`${apiUrl}/api/artigos/${slug}`);
        const data: { title: string; subtitle: string; topics: Topic[] } =
          await res.json();

        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
          topics: data.topics.map((topic: Topic, index: number) => ({
            ...topic,
            id: topic.id ? topic.id : Date.now() + index, // Apenas gera um ID se não existir
          })),
        });
      } catch (error) {
        console.error("Erro ao carregar artigo:", error);
      }
    }

    fetchArticle();
  }, [slug, apiUrl]);

  // Função para adicionar um tópico
  function addTopic() {
    const newTopic = { id: Date.now(), title: "", content: "" };
    setFormData({
      ...formData,
      topics: [...formData.topics, newTopic],
    });
  }

  // Função para remover um tópico
  function removeTopic(id: number) {
    setFormData({
      ...formData,
      topics: formData.topics.filter((topic: Topic) => topic.id !== id),
    });
  }

  // Atualizar dados de um tópico específico
  function handleTopicChange(id: number, field: keyof Topic, value: string) {
    setFormData((prevData) => ({
      ...prevData,
      topics: prevData.topics.map((topic) =>
        topic.id === id ? { ...topic, [field]: value } : topic
      ),
    }));
  }

  // Atualizar campos de texto (título, subtítulo)
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // 2. Submeter formulário (fazendo PUT para atualizar)
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Filtrar tópicos vazios (caso queira)
      const validTopics = formData.topics.filter(
        (t) => t.title.trim() && t.content.trim()
      );

      const articleData: ArticleData = {
        title: formData.title,
        subtitle: formData.subtitle,
        topics: validTopics,
      };

      console.log("Enviando (PUT):", articleData);

      // Chamar a API para atualizar usando a URL definida
      const response = await fetch(`${apiUrl}/api/artigos/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      });

      const data = await response.json();
      console.log("Resposta da atualização:", data);

      // Exibir mensagem de sucesso
      setSuccessMessage(true);
    } catch (error) {
      console.error("Erro ao atualizar artigo:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white absolute w-full py-32 px-96 top-[calc(8vh+1rem)] min-h-[calc(92vh-1rem)]">
      <div className="absolute top-4 left-10 flex flex-col">
        <Link
          href={`/artigos/${slug}`}
          className="text-xl justify-between w-full"
        >
          &lt; Voltar para o artigo
        </Link>
        <Link href={`/artigos`} className="text-xl justify-between w-full">
          &lt; Ver todos os artigos
        </Link>
      </div>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-2 justify-between items-start gap-x-12 gap-y-10"
      >
        {/* Campos de título e subtítulo */}
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

          {formData.topics.map((topic, index) => (
            <div
              key={topic.id || `topic-${index}`}
              className="mb-4 p-3 border rounded-md"
            >
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
          {isLoading ? "Enviando..." : "Atualizar Artigo"}
        </button>
      </form>
      {successMessage && (
        <p className="text-fontBody text-lg">
          Seu artigo foi atualizado com sucesso!
        </p>
      )}
    </div>
  );
};
