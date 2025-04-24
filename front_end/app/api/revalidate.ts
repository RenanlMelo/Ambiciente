import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tag } = req.query;

  try {
    if (tag === "articles") {
      // Revalida páginas que dependem da lista de artigos
      await res.revalidate("/artigos"); // Ajuste essa rota conforme seu projeto
      return res.json({ revalidated: true });
    }

    return res.status(400).json({ message: "Tag inválida" });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao revalidar" });
  }
}
