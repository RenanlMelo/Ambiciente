import { User } from "@/app/types";

export const revalidate = 60;
const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_HOMOLOG;

export async function getAllUsers(token: string): Promise<User[]> {
  const res = await fetch(`${apiUrl}/api/users/all_users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["Usuários"], // For on-demand revalidation
      revalidate: revalidate,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.statusText}`);
  }

  return res.json();
}

export async function handleSignup(
  token: string | null,
  name: string,
  last_name: string,
  email: string,
  password: string,
  role: string
) {
  if (!token) {
    throw new Error("Token não encontrado.");
  }

  const payload = { name, last_name, email, password, role };

  const res = await fetch(`${apiUrl}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = "Erro ao criar usuário.";
    try {
      const data = await res.json();

      if (typeof data.detail === "string") {
        // Mapeia mensagens conhecidas para algo mais amigável
        if (data.detail.includes("email already registered")) {
          message = "Este e-mail já está cadastrado.";
        } else {
          message = data.detail;
        }
      }
    } catch (e) {
      message = res.statusText;
    }

    throw new Error(message);
  }

  return await res.json();
}

export async function handleDelete(token: string, user_ids: number[]) {
  console.log(
    JSON.stringify({
      user_ids,
    })
  );

  const res = await fetch(`${apiUrl}/api/users/delete_user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_ids,
    }),
  });
  console.log(res);

  if (!res.ok) {
    throw new Error(`Failed to delete user: ${res.statusText}`);
  }

  return res;
}
