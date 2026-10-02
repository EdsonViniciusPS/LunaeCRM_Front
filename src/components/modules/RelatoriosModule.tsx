'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import {
  BarChart3,
  Download,
  Filter,
  Calendar,
  Users,
  TrendingUp,
  FileSpreadsheet,
  FileText,
  RotateCcw,
} from 'lucide-react';

export function RelatoriosModule() {
  const { showToast } = useApp();

  const [reportType, setReportType] = useState('faturamento');
  const [period, setPeriod] = useState('mes_atual');
  const [professional, setProfessional] = useState('todos');

  const reportData = [
    { periodo: 'Semana 1', faturamento: 4500, atendimentos: 34, faltas: 2 },
    { periodo: 'Semana 2', faturamento: 5200, atendimentos: 39, faltas: 1 },
    { periodo: 'Semana 3', faturamento: 4100, atendimentos: 31, faltas: 3 },
    { periodo: 'Semana 4', faturamento: 4620, atendimentos: 38, faltas: 1 },
  ];

  const handleExport = (format: 'CSV' | 'PDF') => {
    showToast('Preparando seu relatório...', 'info');
    setTimeout(() => {
      showToast(`Relatório pronto. Baixar arquivo ${format}.`, 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            Relatórios e Métricas Gerenciais
          </h2>
          <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
            Análise detalhada de faturamento, novos clientes, faltas e performance da equipe.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<FileSpreadsheet className="w-4 h-4 text-[#10B981]" />}
            onClick={() => handleExport('CSV')}
          >
            Exportar CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<FileText className="w-4 h-4" />}
            onClick={() => handleExport('PDF')}
          >
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Top Filters Bar */}
      <Card className="p-4 flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[180px]">
          <label className="text-[11px] font-bold uppercase text-[#6B6B80] block mb-1">
            Tipo de Relatório
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full text-xs font-semibold bg-[#F7F7FB] dark:bg-[#121224] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-xl px-3 py-2 text-[#1B1B2F] dark:text-[#ECECF5]"
          >
            <option value="faturamento">Faturamento e Receita</option>
            <option value="clientes">Novos Clientes vs Ativos</option>
            <option value="retencao">Taxa de Retenção</option>
            <option value="conversao">Conversão do Funil</option>
            <option value="profissionais">Atendimentos por Profissional</option>
            <option value="faltas">Taxa de Faltas (No-Show)</option>
          </select>
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="text-[11px] font-bold uppercase text-[#6B6B80] block mb-1">
            Período
          </label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full text-xs bg-[#F7F7FB] dark:bg-[#121224] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-xl px-3 py-2 text-[#1B1B2F] dark:text-[#ECECF5]"
          >
            <option value="mes_atual">Mês Atual (Outubro 2026)</option>
            <option value="mes_anterior">Mês Anterior (Setembro 2026)</option>
            <option value="ultimos_3_meses">Últimos 3 Meses</option>
            <option value="ano_atual">Ano Atual (2026)</option>
          </select>
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="text-[11px] font-bold uppercase text-[#6B6B80] block mb-1">
            Profissional
          </label>
          <select
            value={professional}
            onChange={(e) => setProfessional(e.target.value)}
            className="w-full text-xs bg-[#F7F7FB] dark:bg-[#121224] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-xl px-3 py-2 text-[#1B1B2F] dark:text-[#ECECF5]"
          >
            <option value="todos">Todos os Profissionais</option>
            <option value="marina">Marina Silveira</option>
            <option value="juliana">Juliana Costa</option>
            <option value="carlos">Carlos Eduardo</option>
          </select>
        </div>
      </Card>

      {/* Visual Chart Bars Mock */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
              Evolução Semanal de Faturamento
            </h3>
            <p className="text-xs text-[#6B6B80]">Total acumulado: R$ 18.420,00</p>
          </div>
          <Badge variant="success">+12% vs mês anterior</Badge>
        </div>

        <div className="grid grid-cols-4 gap-4 h-48 items-end pt-6 border-b border-[#E4E4EE] dark:border-[#2E2E48]">
          {reportData.map((d) => {
            const heightPercent = (d.faturamento / 5500) * 100;
            return (
              <div key={d.periodo} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-bold text-[#5B4BDB] opacity-0 group-hover:opacity-100 transition-opacity">
                  R$ {d.faturamento}
                </span>
                <div
                  className="w-full max-w-[64px] bg-[#5B4BDB] hover:bg-[#4A3BC4] rounded-t-xl transition-all cursor-pointer shadow-xs"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-xs text-[#6B6B80] font-medium">{d.periodo}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Detailed Table */}
      <Card className="p-0 overflow-hidden shadow-card">
        <div className="p-4 border-b border-[#E4E4EE] dark:border-[#2E2E48] font-bold text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
          Demonstrativo Detalhado por Semana
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F7F7FB] dark:bg-[#121224] text-[#6B6B80] dark:text-[#9E9EB5] font-semibold uppercase text-[11px]">
            <tr>
              <th className="py-3 px-4">Período</th>
              <th className="py-3 px-4 text-center">Atendimentos</th>
              <th className="py-3 px-4 text-center">Faltas (No-Show)</th>
              <th className="py-3 px-4 text-right">Faturamento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E4EE] dark:divide-[#2E2E48]">
            {reportData.map((row) => (
              <tr key={row.periodo} className="hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]/50">
                <td className="py-3.5 px-4 font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                  {row.periodo}
                </td>
                <td className="py-3.5 px-4 text-center">{row.atendimentos}</td>
                <td className="py-3.5 px-4 text-center text-[#DC2626] font-medium">
                  {row.faltas} ({((row.faltas / row.atendimentos) * 100).toFixed(1)}%)
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-[#14B8A6]">
                  R$ {row.faturamento.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
