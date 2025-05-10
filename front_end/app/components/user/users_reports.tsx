import React, { useEffect, useState } from "react";
import { getUsersReports } from "../report/api";
import { Report } from "@/app/types";
import { useAuth } from "@/app/contexts/AuthContext";

export const Users_reports = () => {
  const [active, setActive] = useState<string>("em andamento");
  const [reports, setReports] = useState<Report[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      console.error("Token não encontrado. Usuário não autenticado.");
      return;
    }
    getUsersReports(token)
      .then((data) => {
        setReports(data.reverse());
      })
      .catch((error) => {
        console.error("Erro ao buscar denúncias: ", error);
      });
  }, [token]);

  const handleActiveReports = (label: string) => {
    setActive(label);
  };

  const statusMap: Record<string, string> = {
    "em andamento": "Em andamento",
    aprovadas: "Concluída",
    rejeitadas: "Rejeitada",
  };

  const filteredReports = active
    ? reports.filter(
        (report) => report.status === statusMap[active.toLowerCase()]
      )
    : reports;

  return (
    <main className="text-clamp-small text-lightGrey font-medium ">
      <div className="flex gap-x-4 mb-4">
        <button
          onClick={(e) => handleActiveReports(e.currentTarget.innerText)}
          className={`${
            active === "Em andamento"
              ? "bg-newxL text-white"
              : " hover:bg-cWhite"
          } border px-4 py-2 rounded  duration-75 w-fit`}
        >
          Em andamento
        </button>
        <button
          onClick={(e) => handleActiveReports(e.currentTarget.innerText)}
          className={`${
            active === "Aprovadas" ? "bg-newxL text-white" : " hover:bg-cWhite"
          } border px-4 py-2 rounded  duration-75 w-fit`}
        >
          Aprovadas
        </button>
        <button
          onClick={(e) => handleActiveReports(e.currentTarget.innerText)}
          className={`${
            active === "Rejeitadas" ? "bg-newxL text-white" : " hover:bg-cWhite"
          } border px-4 py-2 rounded  duration-75 w-fit`}
        >
          Rejeitadas
        </button>
      </div>
      {filteredReports.length === 0 ? (
        <p>Nenhuma denúncia encontrada.</p>
      ) : (
        <ul className="space-y-4">
          {filteredReports.map((report, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p className="text-clamp-large mb-4">
                <strong className="text-mediumGrey">Status</strong>
                <br />
                {report.status}
              </p>
              <strong className="text-mediumGrey text-clamp-large">
                Informações do ocorrido
              </strong>
              <p className="truncate">
                <strong>Data:</strong> {report.data_ocorrido}
              </p>
              <p className="truncate">
                <strong>Local:</strong> {report.local_ocorrido}
              </p>
              <p className="truncate">
                <strong>Descrição:</strong> {report.descricao_ocorrido}
              </p>
              <p className="truncate">
                <strong>Impactos:</strong> {report.impactos_ocorrido}
              </p>
              <p className="truncate">
                <strong>Responsável:</strong> {report.responsavel}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
