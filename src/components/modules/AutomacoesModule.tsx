'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AutomationRule } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import {
  Zap,
  Plus,
  Play,
  AlertTriangle,
  ArrowDown,
  Clock,
  Sparkles,
  CheckCircle2,
  Settings,
  HelpCircle,
} from 'lucide-react';

export function AutomacoesModule() {
  const { automations, toggleAutomation, clients, showToast } = useApp();

  const [selectedRule, setSelectedRule] = useState<AutomationRule>(automations[0]);
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const handleSimulate = (clientName: string) => {
    setSimulationResult(
      `Simulação executada com sucesso para ${clientName}:\n` +
      `✓ Gatilho verificado: "${selectedRule.trigger}"\n` +
      `✓ Condição testada: "${selectedRule.condition || 'Sem condições restritivas'}"\n` +
      `✓ Ação disparada: "${selectedRule.action}"\n` +
      `✓ Limite de 24h respeitado: Nenhuma outra mensagem automática enviada nas últimas 24h.`
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            Automações de Processos
          </h2>
          <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
            Configure fluxos Quando → Se → Então para automatizar mensagens no WhatsApp e tarefas.
          </p>
        </div>

        <div className="p-3 bg-[#5B4BDB]/10 border border-[#5B4BDB]/20 rounded-xl text-xs text-[#5B4BDB] font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Proteção ativa: Máximo de 1 mensagem automática por cliente a cada 24h.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Automation list */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B6B80]">
            Automações Criadas
          </h3>

          <div className="space-y-2.5">
            {automations.map((item) => {
              const isSelected = item.id === selectedRule?.id;
              return (
                <Card
                  key={item.id}
                  onClick={() => setSelectedRule(item)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#5B4BDB] ring-2 ring-[#5B4BDB]/20 bg-[#5B4BDB]/5 dark:bg-[#5B4BDB]/10'
                      : 'hover:border-[#5B4BDB]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                      {item.title}
                    </h4>

                    {/* Switch */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAutomation(item.id);
                      }}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        item.active ? 'bg-[#14B8A6]' : 'bg-[#E4E4EE] dark:bg-[#2E2E48]'
                      }`}
                      role="switch"
                      aria-checked={item.active}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          item.active ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {item.hasError && (
                    <div className="mt-2 text-xs text-[#DC2626] font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.errorMessage}</span>
                    </div>
                  )}

                  <div className="mt-2 text-[11px] text-[#6B6B80]">
                    Último disparo: {item.lastRun || 'Nunca'}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Center / Right: Flow Editor (Quando -> Se -> Então) */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4E4EE] dark:border-[#2E2E48]">
              <div>
                <h3 className="text-base font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                  {selectedRule.title}
                </h3>
                <p className="text-xs text-[#6B6B80]">Fluxo operacional ativo</p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                icon={<Play className="w-3.5 h-3.5 text-[#14B8A6]" />}
                onClick={() => {
                  setSimulationResult(null);
                  setIsSimulateModalOpen(true);
                }}
              >
                Simular com um cliente
              </Button>
            </div>

            {/* Vertical Flow Steps (Quando -> Se -> Então) */}
            <div className="space-y-4 max-w-lg mx-auto">
              {/* Step 1: Quando (Gatilho) */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1A2E] border-2 border-[#5B4BDB] shadow-sm space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B4BDB] bg-[#5B4BDB]/10 px-2 py-0.5 rounded">
                  Quando (Gatilho)
                </span>
                <p className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5] mt-1">
                  {selectedRule.trigger}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-[#5B4BDB]">
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </div>

              {/* Step 2: Se (Condição) */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1A2E] border-2 border-[#F59E0B] shadow-sm space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706] dark:text-[#FBBF24] bg-[#F59E0B]/10 px-2 py-0.5 rounded">
                  Se (Condição)
                </span>
                <p className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5] mt-1">
                  {selectedRule.condition || 'Qualquer cliente que preencha o gatilho'}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-[#14B8A6]">
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </div>

              {/* Step 3: Então (Ação) */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1A2E] border-2 border-[#14B8A6] shadow-sm space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488] dark:text-[#2DD4BF] bg-[#14B8A6]/10 px-2 py-0.5 rounded">
                  Então (Ação Automática)
                </span>
                <p className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5] mt-1">
                  {selectedRule.action}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal: Simular com um Cliente */}
      {isSimulateModalOpen && (
        <Modal
          isOpen={isSimulateModalOpen}
          onClose={() => setIsSimulateModalOpen(false)}
          title="Simular automação com um cliente"
          description="Teste os gatilhos e mensagens em ambiente de sandbox seguro."
          footer={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsSimulateModalOpen(false)}
            >
              Fechar simulação
            </Button>
          }
        >
          <div className="space-y-4">
            <label className="text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
              Escolha um cliente para o teste:
            </label>
            <div className="space-y-1.5">
              {clients.slice(0, 3).map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSimulate(c.name)}
                  className="w-full p-3 text-left rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] hover:border-[#5B4BDB] hover:bg-[#5B4BDB]/5 transition-colors flex items-center justify-between"
                >
                  <span className="text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                    {c.name} ({c.phone})
                  </span>
                  <span className="text-xs text-[#5B4BDB] font-bold">Simular teste</span>
                </button>
              ))}
            </div>

            {simulationResult && (
              <div className="p-4 bg-[#14B8A6]/10 border border-[#14B8A6]/30 rounded-xl space-y-2 text-xs font-mono text-[#0D9488] dark:text-[#2DD4BF] whitespace-pre-line leading-relaxed">
                {simulationResult}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
