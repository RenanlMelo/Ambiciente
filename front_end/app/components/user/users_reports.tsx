import React, { useEffect, useState } from 'react'
import { getUsersReports } from '../report/api'
import { Report } from '@/app/types'

export const Users_reports = () => {
    const [reports, setReports] = useState<Report[]>([])

    useEffect(() => {
        getUsersReports()
            .then(data => {
                setReports(data)
            })
            .catch(error => {
                console.error("Erro ao buscar denúncias: ", error);
                
            })
    }, [])
    return (
        <main className="text-clamp-small text-[var(--font-body)] font-medium ">
            {reports.length === 0 ? (
                <p>Nenhuma denúncia encontrada.</p>
            ) : (
                <ul className="space-y-4">
                {reports.map((report, index) => (
                    <li key={index} className="border p-4 rounded shadow">
                    <p className='text-clamp-large mb-4'><strong className='text-[var(--font-title)]'>Status</strong><br/>{report.status}</p>
                    <strong className='text-[var(--font-title)] text-clamp-large'>Informações do ocorrido</strong>
                    <p className='truncate'><strong>Data:</strong> {report.data_ocorrido}</p>
                    <p className='truncate'><strong>Local:</strong> {report.local_ocorrido}</p>
                    <p className='truncate'><strong>Descrição:</strong> {report.descricao_ocorrido}</p>
                    <p className='truncate'><strong>Impactos:</strong> {report.impactos_ocorrido}</p>
                    <p className='truncate'><strong>Responsável:</strong> {report.responsavel}</p>
                    </li>
                ))}
                </ul>
            )}     
        </main>
    )
}
