// services/api.ts
export const fetchArticles = async () => {
    const res = await fetch("https://ambiciente.onrender.com/artigos");
    if (!res.ok) {
      throw new Error("Erro ao buscar artigos");
    }
    return res.json();
  };
  