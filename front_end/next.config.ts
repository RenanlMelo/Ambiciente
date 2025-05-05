import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL_PROD: "https://ambiciente.onrender.com",
    NEXT_PUBLIC_API_URL_HOMOLOG: "http://127.0.0.1:8000",
    // NEXT_PUBLIC_API_URL_HOMOLOG: "https://ambiciente.onrender.com",
  },
  images: {
    domains: ["ambiciente.onrender.com", "127.0.0.1"],
  },
};

export default nextConfig;
