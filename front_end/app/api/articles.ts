// services/api.ts
export const fetchArticles = async () => {
    const res = await fetch("http://127.0.0.1:8000/artigos");
    if (!res.ok) {
      throw new Error("Erro ao buscar artigos");
    }
    return res.json();
  };
  