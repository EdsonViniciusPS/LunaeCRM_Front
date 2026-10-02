'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { Input, Select } from '@/components/common/Input';
import {
  Megaphone,
  Plus,
  Users,
  CheckCircle2,
  Calendar,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  TrendingUp,
} from 'lucide-react';

export function CampanhasModule() {
  const { showToast } = useApp();

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Wizard state
  const [segment, setSegment] = useState('Inativos > 30 dias');
  const [targetCount, setTargetCount] = useState(252);
  const [optOutExcluded, setOptOutExcluded] = useState(14);
  const finalCount = targetCount - optOutExcluded; // 238

  const [message, setMessage] = useState(
    'Olá, {nome}! Sentimos sua falta no Lunae. Preparamos uma condição exclusiva de 20% OFF para você renovar seus cuidados este mês. Responda esta mensagem para agendar!'
  );
  const [scheduleDate, setScheduleDate] = useState('2026-10-12');
  const [scheduleTime, setScheduleTime] = useState('09:00');

  const pastCampaigns = [
    {
      id: 'cmp1',
      name: 'Especial Primavera — Hidratação Facial',
      segment: 'Inativos > 30 dias',
      target: 238,
      status: 'agendada',
      date: '12/10 às 09:00',
    },
    {
      id: 'cmp2',
      name: 'Aniversariantes de Setembro',
      segment: 'Aniversariantes do Mês',
      target: 43,
      status: 'enviada',
      sent: 43,
      delivered: 42,
      read: 39,
      replies: 18,
      converted: 12,
    },
  ];

  const handleFinishWizard = () => {
    setIsWizardOpen(false);
    setStep(1);
    showToast(`Campanha agendada com sucesso para 238 pessoas em 12/10 às 09h!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            Campanhas e Divulgação
          </h2>
          <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
            Envie novidades e ofertas para públicos segmentados com proteção automática de opt-out (LGPD).
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => {
            setStep(1);
            setIsWizardOpen(true);
          }}
        >
          Nova campanha
        </Button>
      </div>

      {/* Campaigns List */}
      <div className="grid grid-cols-1 gap-4">
        {pastCampaigns.map((cmp) => (
          <Card key={cmp.id} className="p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                    {cmp.name}
                  </h3>
                  <Badge variant={cmp.status === 'enviada' ? 'success' : 'neutral'}>
                    {cmp.status === 'enviada' ? 'Enviada' : 'Agendada'}
                  </Badge>
                </div>
                <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-1">
                  Público: <strong>{cmp.segment}</strong> • {cmp.target} contatos elegíveis
                </p>
              </div>

              {cmp.status === 'enviada' && (
                <div className="flex items-center gap-4 text-center">
                  <div>
                    <span className="text-xs text-[#6B6B80]">Entregues</span>
                    <p className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                      {cmp.delivered}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B6B80]">Lidas</span>
                    <p className="text-sm font-bold text-[#14B8A6]">{cmp.read}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B6B80]">Respostas</span>
                    <p className="text-sm font-bold text-[#5B4BDB] dark:text-[#6E60E6]">
                      {cmp.replies}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-[#6B6B80]">Agendamentos</span>
                    <p className="text-sm font-bold text-[#10B981]">{cmp.converted}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* 4-Step Campaign Wizard Modal */}
      {isWizardOpen && (
        <Modal
          isOpen={isWizardOpen}
          onClose={() => setIsWizardOpen(false)}
          title={`Nova Campanha — Passo ${step} de 4`}
          description={
            step === 1
              ? 'Selecione o segmento do público alvo.'
              : step === 2
              ? 'Escreva a mensagem personalizada.'
              : step === 3
              ? 'Defina data e horário do disparo.'
              : 'Revise os dados antes de agendar.'
          }
          size="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              {step > 1 ? (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ArrowLeft className="w-4 h-4" />}
                  onClick={() => setStep((prev) => (prev === 4 ? 3 : prev === 3 ? 2 : 1))}
                >
                  Voltar
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsWizardOpen(false)}
                >
                  Cancelar
                </Button>
              )}

              {step < 4 ? (
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => setStep((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : 4))}
                >
                  Próximo passo
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleFinishWizard}
                >
                  Agendar campanha
                </Button>
              )}
            </div>
          }
        >
          <div className="space-y-4">
            {/* Step 1: Público */}
            {step === 1 && (
              <div className="space-y-4">
                <Select
                  label="Segmento de Clientes / Leads"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                >
                  <option value="Inativos > 30 dias">Inativos por mais de 30 dias (238 pessoas)</option>
                  <option value="Aniversariantes do Mês">Aniversariantes do mês (45 pessoas)</option>
                  <option value="Clientes VIP">Clientes VIP (32 pessoas)</option>
                  <option value="Leads do Instagram">Leads recentes do Instagram (68 pessoas)</option>
                </Select>

                <div className="p-4 bg-[#F7F7FB] dark:bg-[#121224] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6B6B80]">Contatos no segmento:</span>
                    <span className="font-bold text-[#1B1B2F] dark:text-[#ECECF5]">252 contatos</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#DC2626]">
                    <span>Excluídos por opt-out (responderam SAIR):</span>
                    <span className="font-bold">- 14 contatos</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-[#14B8A6] pt-2 border-t border-[#E4E4EE] dark:border-[#2E2E48]">
                    <span>Total elegível para receber:</span>
                    <span>238 pessoas</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Mensagem */}
            {step === 2 && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                  Mensagem WhatsApp
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F7F7FB] dark:bg-[#121224] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-xl p-3 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5] focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]"
                />

                {/* Opt-out footer from spec */}
                <div className="p-3 bg-[#E4E4EE]/50 dark:bg-[#121224] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
                  <strong>Rodapé obrigatório de opt-out (LGPD):</strong> &quot;Para não receber mais mensagens, responda SAIR.&quot;
                </div>
              </div>
            )}

            {/* Step 3: Agendar */}
            {step === 3 && (
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Data do Disparo"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
                <Input
                  label="Horário"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
            )}

            {/* Step 4: Revisar (Exact copy from spec) */}
            {step === 4 && (
              <div className="p-5 bg-[#5B4BDB]/5 border border-[#5B4BDB]/20 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold text-[#5B4BDB] uppercase tracking-wider">
                  Resumo do Envio
                </h4>
                <p className="text-sm font-medium text-[#1B1B2F] dark:text-[#ECECF5] leading-relaxed">
                  <strong>Enviar para 238 pessoas em 12/10 às 9h.</strong> 14 foram excluídas por optarem por não receber mensagens.
                </p>
                <div className="text-xs text-[#6B6B80] pt-2 border-t border-[#5B4BDB]/20">
                  Canal: WhatsApp Cloud API Oficial • Custo estimado: R$ 0,00 (dentro da cota mensal)
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
