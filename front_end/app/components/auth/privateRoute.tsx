"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type PrivateRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[]; // <- Adicione isso
};

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user) {
    return (
      <div className="bg-black text-white text-clamp-xlarge w-screen h-screen absolute flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
