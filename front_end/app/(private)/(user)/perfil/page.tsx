"use client"

import { useAuth } from "@/app/contexts/AuthContext";
import React from "react";

export default function Perfil() {
    const { user } = useAuth()
    return (
        <div className="w-screen h-screen mt-[calc(8vh+1rem)] bg-white px-32 py-16">
            <section className="text-clamp-medium text-[var(--font-body)] font-medium">
                <h2 className="text-clamp-large text-[var(--font-title)] font-semibold">Informações do usuário</h2>
                <p>{user?.name} {user?.last_name}</p>
                <p>{user?.email}</p>
            </section>
            <h3 className="text-clamp-large text-[var(--font-title)] font-semibold mt-20 mb-4">Minhas Denúncias</h3>
            <main className="border text-clamp-medium text-[var(--font-body)] font-medium">
                <p></p>
            </main>
        </div>
    )
}