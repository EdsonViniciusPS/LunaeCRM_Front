'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import {
  ShieldCheck,
  Lock,
  Check,
  Save,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export function PermissoesModule() {
  const { showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState<'Administrador' | 'Gerente' | 'Atendente' | 'Financeiro' | 'Somente leitura'>('Atendente');

  const modules = [
    { name: 'Agenda', sensitive: false },
    { name: 'WhatsApp', sensitive: false },
    { name: 'Clientes', sensitive: false },
    { name: 'Funil de Vendas', sensitive: false },
    { name: 'Financeiro', sensitive: true },
    { name: 'Campanhas', sensitive: false },
    { name: 'Fidelização', sensitive: false },
    { name: 'Relatórios', sensitive: true },
    { name: 'Configurações', sensitive: true },
  ];

  const actions = ['Ver', 'Criar', 'Editar', 'Excluir', 'Exportar'];

  // State matrix of permissions
  const [matrix, setMatrix] = useState<Record<string, Record<string, boolean>>>({
    Agenda: { Ver: true, Criar: true, Editar: true, Excluir: false, Exportar: false },
    WhatsApp: { Ver: true, Criar: true, Editar: true, Excluir: false, Exportar: false },
    Clientes: { Ver: true, Criar: true, Editar: true, Excluir: false, Exportar: false },
    'Funil de Vendas': { Ver: true, Criar: true, Editar: true, Excluir: false, Exportar: false },
    Financeiro: { Ver: false, Criar: false, Editar: false, Excluir: false, Exportar: false },
    Campanhas: { Ver: true, Criar: false, Editar: false, Excluir: false, Exportar: false },
    Fidelização: { Ver: true, Criar: true, Editar: false, Excluir: false, Exportar: false },
    Relatórios: { Ver: false, Criar: false, Editar: false, Excluir: false, Exportar: false },
    Configurações: { Ver: false, Criar: false, Editar: false, Excluir: false, Exportar: false },
  });

  const toggleCheck = (mod: string, act: string) => {
    setMatrix((prev) => ({
      ...prev,
      [mod]: {
        ...prev[mod],
        [act]: !prev[mod]?.[act],
      },
    }));
  };

  const markEntireColumn = (act: string) => {
    setMatrix((prev) => {
      const next = { ...prev };
      const allChecked = modules.every((m) => next[m.name]?.[act]);
      modules.forEach((m) => {
        if (!next[m.name]) next[m.name] = {};
        next[m.name][act] = !allChecked;
      });
      return next;
    });
  };

  const handleSave = () => {
    showToast(`Permissões de ${selectedRole} atualizadas. 4 usuários afetados.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            Matriz de Permissões por Função
          </h2>
          <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
            Defina o que cada profissional pode Ver, Criar, Editar, Excluir ou Exportar.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Save className="w-4 h-4" />}
          onClick={handleSave}
        >
          Salvar permissões
        </Button>
      </div>

      {/* Role selector buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['Administrador', 'Gerente', 'Atendente', 'Financeiro', 'Somente leitura'] as const).map(
          (role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                selectedRole === role
                  ? 'bg-[#5B4BDB] text-white shadow-sm'
                  : 'bg-white dark:bg-[#1A1A2E] border border-[#E4E4EE] dark:border-[#2E2E48] text-[#1B1B2F] dark:text-[#ECECF5] hover:bg-[#F7F7FB]'
              }`}
            >
              {role}
            </button>
          )
        )}
      </div>

      {/* Permissions Matrix Card */}
      <Card className="p-0 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F7FB] dark:bg-[#121224] text-[#6B6B80] dark:text-[#9E9EB5] font-semibold uppercase text-[11px] border-b border-[#E4E4EE] dark:border-[#2E2E48]">
              <tr>
                <th className="py-3 px-4">Módulo</th>
                {actions.map((act) => (
                  <th key={act} className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        {act === 'Exportar' && <Lock className="w-3 h-3 text-[#DC2626]" />}
                        <span>{act}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => markEntireColumn(act)}
                        className="text-[9px] font-bold text-[#5B4BDB] dark:text-[#6E60E6] hover:underline cursor-pointer lowercase"
                        title="Marcar ou desmarcar toda a coluna"
                      >
                        Marcar todos
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4EE] dark:divide-[#2E2E48]">
              {modules.map((m) => (
                <tr key={m.name} className="hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]/50">
                  <td className="py-3.5 px-4 font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                    <div className="flex items-center gap-2">
                      {m.sensitive && (
                        <span title="Área sensível">
                          <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
                        </span>
                      )}
                      <span>{m.name}</span>
                    </div>
                  </td>
                  {actions.map((act) => {
                    const isChecked = matrix[m.name]?.[act] || false;
                    return (
                      <td key={act} className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheck(m.name, act)}
                          className="w-4 h-4 rounded text-[#5B4BDB] focus:ring-[#5B4BDB] cursor-pointer"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
