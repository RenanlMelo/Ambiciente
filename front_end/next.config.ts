import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const isAnalyze = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL_PROD: "https://ambiciente.onrender.com",
    NEXT_PUBLIC_API_URL_HOMOLOG: "http://127.0.0.1:8000",
  },
  images: {
    domains: ["ambiciente.onrender.com", "127.0.0.1"],
  },
  reactStrictMode: true,
};

export default withBundleAnalyzer({
  enabled: isAnalyze,
})(nextConfig);
