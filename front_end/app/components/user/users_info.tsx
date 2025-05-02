import { useAuth } from '@/app/contexts/AuthContext'
import React from 'react'

export const Users_info = () => {
  const { user } = useAuth()

  return (
    <section className="text-clamp-medium text-[var(--font-body)]">
        <h2 className="text-clamp-large text-[var(--font-black)] font-semibold mt-12 md:mt-20 mb-4">Informações do usuário</h2>
        <p><strong>Nome: </strong>{user?.name} {user?.last_name}</p>
        <p><strong>Email: </strong>{user?.email}</p>
    </section>
  )
}
