// pages/api/admin-route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth_options";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Admin-only logic
  res.status(200).json({ secretData: "Admin Dashboard Data" });
}
