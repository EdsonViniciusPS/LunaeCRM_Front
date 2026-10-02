'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Lead, LeadStage } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Input, Select } from '@/components/common/Input';
import { EmptyState } from '@/components/common/EmptyState';
import {
  GitBranch,
  Plus,
  AlertTriangle,
  Clock,
  User,
  DollarSign,
  ChevronDown,
  ArrowRight,
  MoreVertical,
  Calendar,
  Sparkles,
} from 'lucide-react';

export function FunilModule() {
  const {
    leads,
    moveLeadStage,
    addLead,
    setCurrentModule,
  } = useApp();

  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [lostModalLead, setLostModalLead] = useState<Lead | null>(null);
  const [lostReason, setLostReason] = useState('Sem resposta');

  // New lead form
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadOrigin, setLeadOrigin] = useState('Instagram');
  const [leadValue, setLeadValue] = useState('250');
  const [leadResponsible, setLeadResponsible] = useState('Marina Silveira');

  const [filterAgent, setFilterAgent] = useState('todos');

  const columns: Array<{ stage: LeadStage; title: string; color: string }> = [
    { stage: 'lead', title: 'Lead', color: '#5B4BDB' },
    { stage: 'contato', title: 'Contato', color: '#14B8A6' },
    { stage: 'agendamento', title: 'Agendamento', color: '#F59E0B' },
    { stage: 'cliente', title: 'Cliente', color: '#10B981' },
    { stage: 'perdido', title: 'Perdido', color: '#DC2626' },
  ];

  const filteredLeads = leads.filter((l) => {
    return filterAgent === 'todos' || l.responsibleAgent === filterAgent;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim()) return;

    addLead({
      name: leadName,
      phone: leadPhone,
      email: leadEmail,
      origin: leadOrigin,
      estimatedValue: parseFloat(leadValue) || 200,
      lastContactDate: 'Agora',
      responsibleAgent: leadResponsible,
      stage: 'lead',
    });

    setIsNewLeadModalOpen(false);
    setLeadName('');
    setLeadPhone('');
    setLeadEmail('');
  };

  const handleMoveAction = (lead: Lead, targetStage: LeadStage) => {
    if (targetStage === 'perdido') {
      setLostModalLead(lead);
    } else if (targetStage === 'agendamento') {
      moveLeadStage(lead.id, targetStage);
      setCurrentModule('agenda');
    } else {
      moveLeadStage(lead.id, targetStage);
    }
  };

  const handleConfirmLost = () => {
    if (!lostModalLead) return;
    moveLeadStage(lostModalLead.id, 'perdido', lostReason);
    setLostModalLead(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            Pipeline de Conversão de Leads
          </h2>
          <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
            Arraste ou selecione a etapa para converter leads em atendimentos e clientes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
            className="text-xs bg-white dark:bg-[#1A1A2E] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-xl px-3 py-2 text-[#1B1B2F] dark:text-[#ECECF5]"
          >
            <option value="todos">Todos os Responsáveis</option>
            <option value="Marina Silveira">Marina Silveira</option>
            <option value="Juliana Costa">Juliana Costa</option>
            <option value="Carlos Eduardo">Carlos Eduardo</option>
          </select>

          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsNewLeadModalOpen(true)}
          >
            Novo lead
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
        {columns.map((col) => {
          const colLeads = filteredLeads.filter((l) => l.stage === col.stage);
          const colTotal = colLeads.reduce((acc, l) => acc + l.estimatedValue, 0);

          return (
            <div
              key={col.stage}
              className="bg-[#F7F7FB] dark:bg-[#121224] rounded-2xl p-3 border border-[#E4E4EE] dark:border-[#2E2E48] min-w-[240px] flex flex-col gap-3"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E4E4EE] dark:border-[#2E2E48]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: col.color }}
                  />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B1B2F] dark:text-[#ECECF5]">
                    {col.title}
                  </h3>
                  <span className="text-[11px] font-bold bg-white dark:bg-[#1A1A2E] px-2 py-0.5 rounded-full border border-[#E4E4EE] dark:border-[#2E2E48] text-[#6B6B80]">
                    {colLeads.length}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#6B6B80] dark:text-[#9E9EB5]">
                  R$ {colTotal.toFixed(0)}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="space-y-2.5 min-h-[150px]">
                {colLeads.length === 0 ? (
                  <div className="text-center py-8 text-[11px] text-[#6B6B80] border border-dashed border-[#E4E4EE] dark:border-[#2E2E48] rounded-xl">
                    Sem leads nesta etapa
                  </div>
                ) : (
                  colLeads.map((lead) => {
                    const isStagnant = lead.daysWithoutContact > 7 && lead.stage !== 'perdido';

                    return (
                      <Card
                        key={lead.id}
                        className={`p-3.5 space-y-2.5 border transition-all ${
                          isStagnant
                            ? 'border-l-4 border-l-[#F59E0B] border-[#E4E4EE]'
                            : 'border-[#E4E4EE] dark:border-[#2E2E48]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5] truncate">
                            {lead.name}
                          </h4>
                          <span className="text-xs font-bold text-[#14B8A6] shrink-0">
                            R$ {lead.estimatedValue.toFixed(0)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                          <span className="bg-[#5B4BDB]/10 text-[#5B4BDB] px-1.5 py-0.5 rounded font-medium">
                            {lead.origin}
                          </span>

                          {/* Rule from spec: lead parado > 7 dias recebe selo "Sem contato" */}
                          {isStagnant && (
                            <span className="bg-[#F59E0B]/10 text-[#D97706] dark:text-[#FBBF24] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Sem contato ({lead.daysWithoutContact}d)
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-[#E4E4EE]/60 dark:border-[#2E2E48]/60 text-[11px] text-[#6B6B80] dark:text-[#9E9EB5]">
                          <span>{lead.responsibleAgent.split(' ')[0]}</span>
                          <span className="text-[10px]">{lead.lastContactDate}</span>
                        </div>

                        {/* Stage mover action (Accessibility / Keyboard alternative) */}
                        <div className="pt-1 flex items-center justify-between gap-1">
                          <select
                            value={lead.stage}
                            onChange={(e) => handleMoveAction(lead, e.target.value as LeadStage)}
                            className="w-full text-[11px] font-semibold bg-[#F7F7FB] dark:bg-[#121224] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-lg px-2 py-1 text-[#5B4BDB] dark:text-[#6E60E6] cursor-pointer"
                          >
                            <option value="lead">Mover para Lead</option>
                            <option value="contato">Mover para Contato</option>
                            <option value="agendamento">Mover para Agendamento</option>
                            <option value="cliente">Mover para Cliente</option>
                            <option value="perdido">Mover para Perdido</option>
                          </select>
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Lead Perdido (Exact question from spec) */}
      {lostModalLead && (
        <Modal
          isOpen={!!lostModalLead}
          onClose={() => setLostModalLead(null)}
          title="Por que este lead foi perdido?"
          description={`Registre o motivo de perda para o lead ${lostModalLead.name}.`}
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLostModalLead(null)}
              >
                Voltar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleConfirmLost}
              >
                Confirmar perda
              </Button>
            </div>
          }
        >
          <div className="space-y-3">
            <label className="text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
              Selecione o motivo:
            </label>
            <div className="space-y-2">
              {['Sem resposta', 'Preço', 'Foi para concorrente', 'Outro'].map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                    lostReason === reason
                      ? 'bg-[#DC2626]/10 border-[#DC2626] text-[#DC2626]'
                      : 'border-[#E4E4EE] dark:border-[#2E2E48] text-[#1B1B2F] dark:text-[#ECECF5] hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]'
                  }`}
                >
                  <input
                    type="radio"
                    name="lostReason"
                    value={reason}
                    checked={lostReason === reason}
                    onChange={(e) => setLostReason(e.target.value)}
                    className="w-4 h-4 text-[#DC2626]"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Novo Lead */}
      {isNewLeadModalOpen && (
        <Modal
          isOpen={isNewLeadModalOpen}
          onClose={() => setIsNewLeadModalOpen(false)}
          title="Novo lead"
          description="Cadastre um novo lead no topo do funil."
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsNewLeadModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateLead}
              >
                Adicionar ao funil
              </Button>
            </div>
          }
        >
          <form onSubmit={handleCreateLead} className="space-y-3">
            <Input
              label="Nome do Lead *"
              placeholder="Ex: Gabriela Toledo"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="WhatsApp"
                placeholder="(11) 98888-7777"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
              />
              <Input
                label="Valor Estimado (R$)"
                type="number"
                placeholder="250"
                value={leadValue}
                onChange={(e) => setLeadValue(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Origem"
                value={leadOrigin}
                onChange={(e) => setLeadOrigin(e.target.value)}
              >
                <option value="Instagram">Instagram</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Indicação">Indicação</option>
              </Select>
              <Select
                label="Responsável"
                value={leadResponsible}
                onChange={(e) => setLeadResponsible(e.target.value)}
              >
                <option value="Marina Silveira">Marina Silveira</option>
                <option value="Juliana Costa">Juliana Costa</option>
                <option value="Carlos Eduardo">Carlos Eduardo</option>
              </Select>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
