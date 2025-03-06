"use client";
import React, { FormEvent, useState } from "react";
import { useHeader } from "@/app/contexts/HeaderContext";

interface Topic {
  id: number;
  title: string;
  content: string;
}

export const Create_article = () => {
  const { headerHeight } = useHeader();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [topics, setTopics] = useState<Topic[]>([]);

  function addTopic() {
    setTopics([...topics, { id: Date.now(), title: "", content: "" }]);
  }

  function removeTopic(id: number) {
    setTopics(topics.filter((topic) => topic.id !== id));
  }

  function handleTopicChange(id: number, field: keyof Topic, value: string) {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, [field]: value } : topic
      )
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const articleData = {
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        slug: "", // O backend gera automaticamente
        topics: topics.filter(t => t.title && t.content) // Filtrar tópicos vazios
      };

      console.log("Enviando:", articleData);

      const response = await fetch("http://127.0.0.1:8000/artigos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      });

      const data = await response.json();
      console.log("Resposta:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
        top: `${headerHeight}px`,
      }}
      className="bg-white absolute w-full py-32 px-96"
    >
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
            required
            className="w-full border px-4 py-1 rounded-sm focus:outline-none"
          />
        </div>

        {/* Tópicos Dinâmicos */}
        <div className="col-span-2">
          <h3 className="font-semibold text-lg mb-2">Tópicos</h3>

          {topics.map((topic, index) => (
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
    </div>
  );
};
