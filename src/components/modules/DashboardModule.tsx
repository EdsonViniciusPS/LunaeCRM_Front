'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import {
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  MessageSquare,
  Clock,
  ChevronRight,
  Sparkles,
  X,
} from 'lucide-react';

export function DashboardModule() {
  const {
    setCurrentModule,
    appointments,
    updateAppointmentStatus,
    transactions,
    leads,
    onboardingSteps,
    completeOnboardingStep,
    skipOnboarding,
    setSkipOnboarding,
    setActiveChatId,
  } = useApp();

  const [period, setPeriod] = useState<'hoje' | '7dias' | '30dias'>('hoje');

  // Count pending/delayed items
  const delayedTransactions = transactions.filter((t) => t.status === 'atrasado');
  const delayedTotal = delayedTransactions.reduce((acc, t) => acc + t.amount, 0);
  const leadsWithoutContact = leads.filter((l) => l.daysWithoutContact > 7 && l.stage !== 'perdido');

  const todayAppointments = appointments.filter((a) => a.date === '2026-10-01');

  const completedOnboardingCount = onboardingSteps.filter((s) => s.completed).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      {/* Greeting and Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src="/Lunae_CRM_logo_design_2K_20261001144951-Photoroom.png"
            alt="Lunae CRM Logo"
            className="w-12 h-12 object-contain rounded-2xl p-1 bg-white dark:bg-[#1A1A2E] border border-[#E4E4EE] dark:border-[#2E2E48] shadow-xs shrink-0"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1B2F] dark:text-[#ECECF5] tracking-tight">
              Bom dia, Edson. Você tem {todayAppointments.length} atendimentos hoje.
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
              Aqui está o resumo operacional e financeiro do seu negócio.
            </p>
          </div>
        </div>

        {/* Period Selector */}
        <div className="inline-flex p-1 bg-[#E4E4EE]/50 dark:bg-[#121224] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] self-start sm:self-auto">
          {(['hoje', '7dias', '30dias'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                period === p
                  ? 'bg-white dark:bg-[#1A1A2E] text-[#1B1B2F] dark:text-[#ECECF5] shadow-xs'
                  : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F]'
              }`}
            >
              {p === 'hoje' ? 'Hoje' : p === '7dias' ? '7 dias' : '30 dias'}
            </button>
          ))}
        </div>
      </div>

      {/* Onboarding Checklist Banner (5 steps, dismissible) */}
      {!skipOnboarding && completedOnboardingCount < onboardingSteps.length && (
        <Card className="bg-gradient-to-r from-[#5B4BDB]/5 via-[#14B8A6]/5 to-transparent border-[#5B4BDB]/20 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#5B4BDB]" />
                <span className="text-xs font-bold text-[#5B4BDB] uppercase tracking-wider">
                  Primeiros Passos no Lunae
                </span>
                <span className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
                  ({completedOnboardingCount} de {onboardingSteps.length} concluídos)
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                Configure sua clínica para começar a faturar e agendar
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSkipOnboarding(true)}
              >
                Pular tour
              </Button>
            </div>
          </div>

          {/* Steps list */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-4 border-t border-[#E4E4EE]/60 dark:border-[#2E2E48]/60">
            {onboardingSteps.map((step) => (
              <div
                key={step.id}
                onClick={() => {
                  if (step.id === 5) setCurrentModule('agenda');
                }}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs cursor-pointer transition-all ${
                  step.completed
                    ? 'bg-[#14B8A6]/10 border-[#14B8A6]/30 text-[#0D9488] dark:text-[#2DD4BF]'
                    : 'bg-white dark:bg-[#1A1A2E] border-[#E4E4EE] dark:border-[#2E2E48] text-[#1B1B2F] dark:text-[#ECECF5] hover:border-[#5B4BDB]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    step.completed
                      ? 'bg-[#14B8A6] text-white'
                      : 'bg-[#E4E4EE] dark:bg-[#2E2E48] text-[#6B6B80]'
                  }`}
                >
                  {step.completed ? '✓' : step.id}
                </div>
                <span className="truncate font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Metrics Row (5 Cards - Mobile scrollable/carousel as specified) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-1">
        {/* Metric 1: Faturamento */}
        <Card variant="metric" className="min-w-[150px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#6B6B80] dark:text-[#9E9EB5]">
              Faturamento
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#5B4BDB]/10 text-[#5B4BDB] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            R$ 18.420
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#14B8A6]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12% vs período anterior</span>
          </div>
        </Card>

        {/* Metric 2: Atendimentos */}
        <Card variant="metric" className="min-w-[150px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#6B6B80] dark:text-[#9E9EB5]">
              Atendimentos
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            142
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#14B8A6]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8% vs anterior</span>
          </div>
        </Card>

        {/* Metric 3: Novos Clientes */}
        <Card variant="metric" className="min-w-[150px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#6B6B80] dark:text-[#9E9EB5]">
              Novos Clientes
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#5B4BDB]/10 text-[#5B4BDB] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            38
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#14B8A6]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+15% no mês</span>
          </div>
        </Card>

        {/* Metric 4: Comparecimento */}
        <Card variant="metric" className="min-w-[150px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#6B6B80] dark:text-[#9E9EB5]">
              Comparecimento
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            94,2%
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#14B8A6]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+2.4% retenção</span>
          </div>
        </Card>

        {/* Metric 5: Conversão Funil */}
        <Card variant="metric" className="min-w-[150px] col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#6B6B80] dark:text-[#9E9EB5]">
              Conversão Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            28,5%
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#14B8A6]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.1% taxa conv.</span>
          </div>
        </Card>
      </div>

      {/* Main Row: Próximos Atendimentos & Pendências */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximos Atendimentos de Hoje (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5B4BDB]" />
              <h3 className="text-base font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                Próximos Atendimentos de Hoje
              </h3>
            </div>
            <button
              onClick={() => setCurrentModule('agenda')}
              className="text-xs font-semibold text-[#5B4BDB] dark:text-[#6E60E6] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver agenda completa</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {todayAppointments.map((app) => (
              <Card
                key={app.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#5B4BDB]/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#5B4BDB]/10 text-[#5B4BDB] font-bold text-sm flex flex-col items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 mb-0.5 text-[#5B4BDB]" />
                    <span>{app.time}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                        {app.clientName}
                      </h4>
                      <Badge
                        variant={
                          app.status === 'confirmado'
                            ? 'success'
                            : app.status === 'agendado'
                            ? 'neutral'
                            : app.status === 'cancelado'
                            ? 'danger'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {app.status === 'confirmado'
                          ? 'Confirmado'
                          : app.status === 'agendado'
                          ? 'Agendado'
                          : app.status === 'cancelado'
                          ? 'Cancelado'
                          : 'Faltou'}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                      {app.serviceName} • {app.durationMinutes} min • Profissional: {app.professionalName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      setActiveChatId('chat1');
                      setCurrentModule('whatsapp');
                    }}
                    className="p-2 text-[#14B8A6] hover:bg-[#14B8A6]/10 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer touch-target"
                    title="Conversar no WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>

                  {app.status === 'agendado' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => updateAppointmentStatus(app.id, 'confirmado')}
                    >
                      Confirmar
                    </Button>
                  )}
                  {app.status === 'confirmado' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => updateAppointmentStatus(app.id, 'concluido')}
                    >
                      Concluir
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tarefas e Pendências (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="text-base font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
              Tarefas e Pendências
            </h3>
          </div>

          <div className="space-y-3">
            {/* Atraso financeiro alert */}
            {delayedTransactions.length > 0 && (
              <Card className="p-4 border-l-4 border-l-[#DC2626] bg-[#DC2626]/5 dark:bg-[#DC2626]/10 space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-[#DC2626] uppercase">
                    Cobranças Atrasadas
                  </span>
                  <span className="text-xs font-bold text-[#DC2626]">
                    R$ {delayedTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-[#1B1B2F] dark:text-[#ECECF5] leading-relaxed">
                  {delayedTransactions.length} cobranças atrasadas somam R$ {delayedTotal.toFixed(2)}. Enviar lembrete de pagamento?
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => setCurrentModule('financeiro')}
                >
                  Enviar lembretes no Financeiro
                </Button>
              </Card>
            )}

            {/* Leads sem contato > 7 dias */}
            {leadsWithoutContact.length > 0 && (
              <Card className="p-4 border-l-4 border-l-[#F59E0B] bg-[#F59E0B]/5 dark:bg-[#F59E0B]/10 space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-[#D97706] dark:text-[#FBBF24] uppercase">
                    Leads Sem Contato
                  </span>
                  <span className="text-xs font-bold text-[#D97706] dark:text-[#FBBF24]">
                    {leadsWithoutContact.length} leads
                  </span>
                </div>
                <p className="text-xs text-[#1B1B2F] dark:text-[#ECECF5] leading-relaxed">
                  Lucas Martins está parado há 11 dias sem interação no funil.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => setCurrentModule('funil')}
                >
                  Ver Funil de Vendas
                </Button>
              </Card>
            )}

            {/* Lembrete de Fidelidade */}
            <Card className="p-4 space-y-2">
              <span className="text-xs font-bold text-[#5B4BDB] uppercase">
                Programa Fidelidade
              </span>
              <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
                Ana Souza atingiu 180 pontos e tem resgate de benefício disponível!
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
                onClick={() => setCurrentModule('fidelizacao')}
              >
                Ver Recompensas
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
