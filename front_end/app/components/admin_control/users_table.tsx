"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers, handleDelete } from "./api";
import { useAuth } from "@/app/contexts/AuthContext";
import { User } from "@/app/types";
import { Trash2 } from "lucide-react";

export const Users_table = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    if (!token) {
      console.error("Token não encontrado.");
      return;
    }
    getAllUsers(token)
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários: ", error);
      });
  }, [token]);

  const toggleSelectUser = (id: number) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const isSelected = (id: number) => {
    return selectedUsers.includes(id);
  };

  const handleDeleteUsers = async (token: string | null, userIds: number[]) => {
    console.log(userIds);

    if (!token) {
      console.error("Token não encontrado.");
      return;
    }
    try {
      await handleDelete(token, userIds);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => !userIds.includes(user.id))
      );
      setSelectedUsers([]);
    } catch (error) {
      console.error("Erro ao deletar usuários: ", error);
    }
  };

  return (
    <>
      <h2 className="text-clamp-xlarge text-darkGrey font-semibold mt-12">
        Usuários Ativos
      </h2>
      {selectedUsers.length > 0 ? (
        <button
          onClick={() => handleDeleteUsers(token, selectedUsers)}
          className="border px-4 py-2 rounded active:bg-eWhite duration-75 hover:bg-[f6White] w-fit text-clamp-medium"
        >
          Apagar usuário selecionados{" "}
          <Trash2 className="inline ml-1 -translate-y-px" stroke="#505050" />
        </button>
      ) : (
        <button
          disabled
          className="border px-4 py-2 rounded disabled:bg-eWhite text-lightestGrey w-fit text-clamp-medium"
        >
          Apagar usuário(s) selecionado(s){" "}
          <Trash2 className="inline ml-1 -translate-y-px" stroke="#aaa" />
        </button>
      )}
      <div className="overflow-x-scroll mt-4 max-w-[90vw]">
        <table className="text-mediumGrey min-w-[50vw] text-clamp-medium bg-dWhite">
          <thead>
            <tr>
              <th></th>
              <th>Role</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected(user.id)}
                    onChange={() => toggleSelectUser(user.id)}
                    className="accent-red-400 bg-green-500"
                  />
                </td>
                <td>{user.role}</td>
                <td>{user.name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
