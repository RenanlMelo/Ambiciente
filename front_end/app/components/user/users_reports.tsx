import React, { useEffect, useState } from "react";
import { getUsersReports } from "../report/api";
import { Report } from "@/app/types";
import { useAuth } from "@/app/contexts/AuthContext";

export const Users_reports = () => {
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

  return (
    <main className="text-clamp-small text-[--light_grey] font-medium ">
      {reports.length === 0 ? (
        <p>Nenhuma denúncia encontrada.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p className="text-clamp-large mb-4">
                <strong className="text-[--medium_grey]">Status</strong>
                <br />
                {report.status}
              </p>
              <strong className="text-[--medium_grey] text-clamp-large">
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
