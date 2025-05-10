"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";
import Image from "next/image";

interface Topic {
  id: number;
  title: string;
  content: string;
}

export const Edit_article = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    topics: [] as Topic[],
    image_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const params = useParams();
  const slug = params?.slug as string;

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  console.log(`${apiUrl}/api/artigos/${slug}`);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`${apiUrl}/api/artigos/${slug}`);
        const data = await res.json();
        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
          image_url: data.image_url || "", // Certifique-se que a imagem está vindo aqui
          topics:
            data.topics?.map((topic: Topic, i: number) => ({
              ...topic,
              id: topic.id ?? Date.now() + i,
            })) || [],
        });

        if (data.image_url) {
          setPreviewUrl(data.image_url); // Atualize a imagem do frontend
        }
      } catch (err) {
        console.error("Erro ao buscar artigo:", err);
        setErrorMessage("Erro ao carregar o artigo.");
      }
    }
    fetchArticle();
  }, [slug, apiUrl]);

  function addTopic() {
    setFormData((prev) => ({
      ...prev,
      topics: [...prev.topics, { id: Date.now(), title: "", content: "" }],
    }));
  }

  function removeTopic(id: number) {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((t) => t.id !== id),
    }));
  }

  function handleTopicChange(id: number, field: keyof Topic, value: string) {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.map((t) =>
        t.id === id ? { ...t, [field]: value } : t
      ),
    }));
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setPreviewUrl(null);
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(false);

    const validTopics = formData.topics.filter(
      (t) => t.title.trim() && t.content.trim()
    );

    if (!formData.title || !formData.subtitle || validTopics.length === 0) {
      setErrorMessage("Preencha título, subtítulo e pelo menos um tópico.");
      setIsLoading(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("subtitle", formData.subtitle);
      form.append("slug", slug);
      form.append("topics", JSON.stringify(validTopics));
      if (imageFile) form.append("image_url", imageFile);

      const res = await fetch(`${apiUrl}/api/artigos/${slug}`, {
        method: "PUT",
        body: form,
      });

      if (res.ok) {
        const updatedData = await res.json();
        setPreviewUrl(updatedData.image_url); // Atualize a imagem diretamente após o sucesso
        setSuccessMessage(true);
      }

      setSuccessMessage(true);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setErrorMessage("Erro ao atualizar o artigo.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-background absolute w-full pt-24 md:pt-32 md:pb-20 md:px-[20vw] min-h-[calc(92vh-1rem)]">
      <Link
        href={`/artigos`}
        className="absolute top-4 left-4 md:left-10 text-clamp-medium text-mediumGrey"
      >
        <ChevronsLeft stroke="#505050" className="inline" /> Ver todos os
        artigos
      </Link>

      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-between items-start gap-x-12 gap-y-10 text-clamp-small px-5 md:p-0"
      >
        <div className="space-y-4 w-full">
          <label className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-newxxL text-white cursor-pointer hover:bg-newxL transition w-fit">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v4a2 2 0 002 2h1v3.586A1 1 0 006.707 15l3.293-3.293a1 1 0 000-1.414L6.707 7A1 1 0 006 8.414V12H5a1 1 0 01-1-1V5a1 1 0 011-1h10a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 100 2h2a3 3 0 003-3V5a3 3 0 00-3-3H4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Escolher nova imagem</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {previewUrl && (
            <div className="relative aspect-[4/1] w-1/2 rounded-xl shadow overflow-hidden bg-gray-100">
              <Image
                width={1000}
                height={1000}
                src={previewUrl}
                alt="Pré-visualização"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>

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

        <div className="w-full">
          <h3 className="text-mediumGrey text-clamp-medium mb-2">Tópicos</h3>

          {formData.topics.map((topic) => (
            <div key={topic.id} className="mb-4 p-3 border rounded-md">
              <label>Título do Tópico</label>
              <input
                type="text"
                value={topic.title}
                onChange={(e) =>
                  handleTopicChange(topic.id, "title", e.target.value)
                }
                className="w-full border px-4 py-1 rounded-sm focus:outline-none"
              />
              <label className="mt-2 block">Conteúdo</label>
              <textarea
                value={topic.content}
                rows={3}
                onChange={(e) =>
                  handleTopicChange(topic.id, "content", e.target.value)
                }
                className="resize-none w-full border px-4 py-1 focus:outline-none"
              />
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
          className="w-full md:w-auto font-normal text-white bg-newxxL px-4 py-2 h-10 rounded-[4px] hover:bg-newxL mb-4"
        >
          {isLoading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>

      {successMessage && (
        <p className="text-mediumGrey bg-eWhite font-bold mt-4 px-4 py-2 rounded-md">
          Artigo atualizado com sucesso!
        </p>
      )}

      {errorMessage && (
        <p className="text-red-500 bg-red-200 mt-4 px-4 py-2 rounded-md">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
