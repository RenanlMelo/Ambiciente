import { useAuth } from "@/app/contexts/AuthContext";
import React from "react";

export const Users_info = () => {
  const { user } = useAuth();

  return (
    <section className="text-clamp-medium text-[var(--light-grey)]">
      <h2 className="text-clamp-large text-[var(--dark-grey)] font-semibold mb-4">
        Informações do usuário
      </h2>
      <p>
        <strong>Nome: </strong>
        {user?.name} {user?.last_name}
      </p>
      <p>
        <strong>Email: </strong>
        {user?.email}
      </p>
    </section>
  );
};
