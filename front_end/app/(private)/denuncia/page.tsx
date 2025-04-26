"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { Denuncia_forms } from "@/app/components/report/denuncia_forms";
import Footer from "@/app/components/ui/footer";

export default function Denuncia() {
  const { user, loading } = useAuth();
  const Router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      alert("Você precisa estar logado para acessar esta página.");
      Router.push("/login");
    }
  }, [user, loading, Router]);

  if (loading) return null;

  return (
    <>
      <Denuncia_forms />
      <Footer />
    </>
  );
}
