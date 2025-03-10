// services/api.ts
export const fetchArticles = async () => {
  // Definir a URL da API dependendo do ambiente
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

  console.log("api",process.env.NEXT_PUBLIC_API_URL_PROD);
  // Fazendo a requisição com a URL configurada
  const res = await fetch(`${apiUrl}/artigos`);
  
  if (!res.ok) {
    throw new Error("Erro ao buscar artigos");
  }

  return res.json();
};
