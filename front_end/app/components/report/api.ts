import { Report } from "@/app/types";

export const revalidate = 60;
const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;
if (!apiUrl) {
    throw new Error("API URL not configured");
}

export async function getReports(): Promise<Report[]> {
  const res = await fetch(`${apiUrl}/api/denuncias/all`, {
    next: {
      tags: ["Denúncias"], // For on-demand revalidation
      revalidate: revalidate,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.statusText}`);
  }

  return res.json();
}


export async function getUsersReports(): Promise<Report[]> {
    const res = await fetch(`${apiUrl}/api/denuncias/users`, {
      next: {
        tags: ["Denúncias"], // For on-demand revalidation
        revalidate: revalidate,
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.statusText}`);
    }
  
    return res.json();
  }


export const approveReport = async (id: number, token: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/api/denuncias/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'Concluída' }),
    });
    console.log("res: ", response);
    
    if (!response.ok) {
      throw new Error('Falha ao aprovar a denúncia');
    }
  } catch (error) {
    console.error('Erro ao aprovar denúncia:', error);
    throw error;
  }
};


export const deleteReport = async (id: number, token: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/api/denuncias/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'Rejeitada' }),
    });
    console.log("res: ", response);

    if (!response.ok) {
      throw new Error('Falha ao atualizar o status da denúncia');
    }
  } catch (error) {
    console.error('Erro ao rejeitar denúncia:', error);
    throw error;
  }
};