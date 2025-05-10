"use client";

import React, { useEffect, useState } from "react";
import {
  approveReport,
  deleteReport,
  getReports,
} from "@/app/components/report/api";
import { Report } from "@/app/types";
import { Check, CircleX } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";

export const All_reports = () => {
  const { token } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [confirmRemoval, setConfirmRemoval] = useState<boolean>(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState<string>("Em andamento");

  useEffect(() => {
    getReports()
      .then((data) => {
        setReports(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar denúncias: ", error);
      });
  }, []);

  const handleData = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString("pt-BR");
  };

  const handleApprove = async (id: number) => {
    setIsLoading(true);

    if (!token) {
      console.error("Token não encontrado.");
      return;
    }

    try {
      await approveReport(id, token);
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "Concluída" } : r))
      );
    } catch (error) {
      console.error("Erro ao aprovar denúncia:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedReportId) return;
    setIsLoading(true);

    if (!token) {
      console.error("Token não encontrado.");
      return;
    }

    try {
      await deleteReport(selectedReportId, token);
      setReports((prev) =>
        prev.map((r) =>
          r.id === selectedReportId ? { ...r, status: "Rejeitada" } : r
        )
      );
    } catch (error) {
      console.error("Erro ao rejeitar denúncia:", error);
    } finally {
      setIsLoading(false);
      setConfirmRemoval(false);
      setSelectedReportId(null);
    }
  };

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

  console.log(active);

  return (
    <main className="w-full min-h-screen bg-white px-5 md:px-32 py-16">
      <h2 className="text-clamp-xlarge text-darkGrey font-semibold mb-4">
        Denúncias
      </h2>
      <div className="grid md:grid-cols-3 gap-4 mb-4 md:w-fit">
        <button
          onClick={(e) => handleActiveReports(e.currentTarget.innerText)}
          className={`${
            active === "Em andamento"
              ? "bg-newxL text-white"
              : " hover:bg-cWhite"
          } border px-4 py-2 rounded  duration-75 w-full`}
        >
          Em andamento
        </button>
        <button
          onClick={(e) => handleActiveReports(e.currentTarget.innerText)}
          className={`${
            active === "Aprovadas" ? "bg-newxL text-white" : " hover:bg-cWhite"
          } border px-4 py-2 rounded  duration-75 w-full`}
        >
          Aprovadas
        </button>
        <button
          onClick={(e) => handleActiveReports(e.currentTarget.innerText)}
          className={`${
            active === "Rejeitadas" ? "bg-newxL text-white" : " hover:bg-cWhite"
          } border px-4 py-2 rounded  duration-75 w-full`}
        >
          Rejeitadas
        </button>
      </div>

      {filteredReports.length === 0 ? (
        <p>Nenhuma denúncia encontrada.</p>
      ) : (
        <ul className="space-y-4">
          {filteredReports.map((report) => (
            <li key={report.id} className="border p-8 rounded shadow">
              <p className="text-clamp-large mb-4">
                <strong className="text-mediumGrey">Envio da denúncia</strong>
                <br />
                {handleData(report.data_criacao)}
              </p>
              <p className="text-clamp-large mb-4">
                <strong className="text-mediumGrey">Status</strong>
                <br />
                {report.status}
              </p>
              <div className="mb-4">
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
              </div>
              <strong className="text-mediumGrey text-clamp-large">
                Informações do usuário
              </strong>
              {report.is_anonimo ? (
                <p className="text-mediumGrey text-clamp-large">Anônimo</p>
              ) : (
                <div>
                  <p className="truncate">
                    <strong>Nome:</strong> {report.nome}
                  </p>
                  <p className="truncate">
                    <strong>Sobrenome:</strong> {report.sobrenome}
                  </p>
                  <p className="truncate">
                    <strong>E-mail:</strong> {report.email}
                  </p>
                  <p className="truncate">
                    <strong>Telefone:</strong> {report.telefone}
                  </p>
                </div>
              )}
              {report.status == "Em andamento" && (
                <div className="mt-6 flex flex-col md:flex-row justify-evenly items-center gap-8 w-fit">
                  <button
                    onClick={() => handleApprove(report.id)}
                    disabled={isLoading}
                    className="shadow-xl p-2 px-4 rounded-md bg-green-600 text-white uppercase hover:bg-green-700"
                  >
                    <Check
                      stroke="#fff"
                      strokeWidth={3}
                      className="inline -translate-y-px"
                    />{" "}
                    Aprovar Denúncia
                  </button>
                  <button
                    onClick={() => {
                      setSelectedReportId(report.id);
                      setConfirmRemoval(true);
                    }}
                    disabled={isLoading}
                    className="shadow-xl p-2 px-4 rounded-md bg-red-600 text-white uppercase hover:bg-red-700"
                  >
                    <CircleX
                      stroke="#fff"
                      strokeWidth={3}
                      className="inline -translate-y-px"
                    />{" "}
                    Rejeitar Denúncia
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {confirmRemoval && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <dialog
            open
            className="p-8 rounded-2xl w-full max-w-md border-none shadow-[3px_4px_10px_#00000040] flex flex-col justify-between bg-white"
          >
            <p className="text-clamp-medium text-mediumGrey">
              Tem certeza que deseja rejeitar esta denúncia?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setConfirmRemoval(false);
                  setSelectedReportId(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 rounded-lg bg-red-600 text-white uppercase tracking-wide hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-red-400"
                disabled={isLoading}
              >
                {isLoading ? "Rejeitando..." : "Rejeitar"}
              </button>
            </div>
          </dialog>
        </div>
      )}
    </main>
  );
};
