'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Appointment, AppointmentStatus } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { Input, Select } from '@/components/common/Input';
import { EmptyState } from '@/components/common/EmptyState';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';

export function AgendaModule() {
  const {
    appointments,
    addAppointment,
    updateAppointmentStatus,
    cancelAppointment,
    rescheduleAppointment,
    clients,
    setActiveChatId,
    setCurrentModule,
    showToast,
  } = useApp();

  const [selectedDate, setSelectedDate] = useState('2026-10-01');
  const [viewMode, setViewMode] = useState<'dia' | 'semana' | 'profissional'>('dia');
  const [filterProfessional, setFilterProfessional] = useState<string>('todos');

  // Modal states
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newClientId, setNewClientId] = useState(clients[0]?.id || '');
  const [newProfessional, setNewProfessional] = useState('Marina Silveira');
  const [newService, setNewService] = useState('Limpeza de Pele Profunda');
  const [newDate, setNewDate] = useState('2026-10-01');
  const [newTime, setNewTime] = useState('11:00');
  const [conflictError, setConflictError] = useState('');

  // Selected appointment details drawer/modal
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('2026-10-02');
  const [rescheduleTime, setRescheduleTime] = useState('10:00');

  const professionals = ['Marina Silveira', 'Juliana Costa', 'Carlos Eduardo'];

  // Filtered list
  const dayAppointments = appointments.filter((a) => {
    const matchDate = a.date === selectedDate;
    const matchProf =
      filterProfessional === 'todos' || a.professionalName === filterProfessional;
    return matchDate && matchProf;
  });

  // Time slots for day grid
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  ];

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError('');

    // Check conflict (spec: "Marina já tem um atendimento às 14h. Escolha outro horário ou outro profissional.")
    const conflict = appointments.find(
      (a) =>
        a.date === newDate &&
        a.time === newTime &&
        a.professionalName === newProfessional &&
        a.status !== 'cancelado'
    );

    if (conflict) {
      setConflictError(
        `${newProfessional} já tem um atendimento às ${newTime}. Escolha outro horário ou outro profissional.`
      );
      return;
    }

    const client = clients.find((c) => c.id === newClientId) || clients[0];

    addAppointment({
      clientId: client.id,
      clientName: client.name,
      clientPhone: client.phone,
      professionalName: newProfessional,
      serviceName: newService,
      date: newDate,
      time: newTime,
      durationMinutes: 60,
      price: 180.0,
      status: 'confirmado',
      notes: 'Agendado manualmente via sistema',
    });

    setIsNewModalOpen(false);
  };

  const handleConfirmCancel = (notifyWhatsApp: boolean) => {
    if (!selectedApp) return;
    cancelAppointment(selectedApp.id, notifyWhatsApp);
    setIsCancelModalOpen(false);
    setSelectedApp(null);
  };

  const handleConfirmReschedule = () => {
    if (!selectedApp) return;
    rescheduleAppointment(selectedApp.id, rescheduleDate, rescheduleTime);
    setIsRescheduleModalOpen(false);
    setSelectedApp(null);
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmado':
        return <Badge variant="success">Confirmado</Badge>;
      case 'agendado':
        return <Badge variant="neutral">Agendado</Badge>;
      case 'concluido':
        return <Badge variant="neutral" icon={<CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6]" />}>Concluído</Badge>;
      case 'cancelado':
        return <Badge variant="danger">Cancelado</Badge>;
      case 'faltou':
        return <Badge variant="warning">Faltou</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Date Navigator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white dark:bg-[#1A1A2E] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setSelectedDate('2026-09-30')}
              className="p-1.5 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-white rounded-lg hover:bg-[#F7F7FB] dark:hover:bg-[#25253E] cursor-pointer"
              title="Dia anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedDate('2026-10-01')}
              className="px-3 py-1 text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] hover:bg-[#F7F7FB] dark:hover:bg-[#25253E] rounded-md"
            >
              Hoje, 01 de Outubro
            </button>
            <button
              onClick={() => setSelectedDate('2026-10-02')}
              className="p-1.5 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-white rounded-lg hover:bg-[#F7F7FB] dark:hover:bg-[#25253E] cursor-pointer"
              title="Próximo dia"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Professional filter */}
          <select
            value={filterProfessional}
            onChange={(e) => setFilterProfessional(e.target.value)}
            className="text-xs font-medium bg-white dark:bg-[#1A1A2E] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-xl px-3 py-2 text-[#1B1B2F] dark:text-[#ECECF5] focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]"
          >
            <option value="todos">Todos os Profissionais</option>
            {professionals.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* View Switcher & New Appointment CTA */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:inline-flex p-1 bg-[#E4E4EE]/50 dark:bg-[#121224] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48]">
            {(['dia', 'semana', 'profissional'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                  viewMode === mode
                    ? 'bg-white dark:bg-[#1A1A2E] text-[#1B1B2F] dark:text-[#ECECF5] shadow-xs'
                    : 'text-[#6B6B80] dark:text-[#9E9EB5]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <Button
            onClick={() => {
              setConflictError('');
              setIsNewModalOpen(true);
            }}
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
          >
            Novo agendamento
          </Button>
        </div>
      </div>

      {/* Main Agenda Grid (Dia) */}
      {dayAppointments.length === 0 ? (
        <EmptyState
          icon={<CalendarIcon className="w-6 h-6" />}
          title="Nenhum atendimento neste dia"
          description="Nenhum atendimento neste dia. Toque em um horário para agendar."
          actionText="Novo agendamento"
          onAction={() => setIsNewModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-[#1A1A2E] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-2xl shadow-card overflow-hidden">
          <div className="divide-y divide-[#E4E4EE] dark:divide-[#2E2E48]">
            {timeSlots.map((slot) => {
              const appsInSlot = dayAppointments.filter(
                (a) => a.time.startsWith(slot.slice(0, 2))
              );

              return (
                <div
                  key={slot}
                  className="flex flex-col sm:flex-row items-stretch min-h-[72px] group hover:bg-[#F7F7FB]/50 dark:hover:bg-[#25253E]/20 transition-colors"
                >
                  {/* Time label */}
                  <div className="w-20 sm:w-24 p-3.5 sm:p-4 text-xs font-bold text-[#6B6B80] dark:text-[#9E9EB5] border-r border-[#E4E4EE] dark:border-[#2E2E48] flex items-center justify-between sm:justify-start">
                    <span>{slot}</span>
                    <button
                      onClick={() => {
                        setNewTime(slot);
                        setConflictError('');
                        setIsNewModalOpen(true);
                      }}
                      className="opacity-0 group-hover:opacity-100 sm:ml-auto p-1 text-[#5B4BDB] hover:bg-[#5B4BDB]/10 rounded cursor-pointer"
                      title="Agendar neste horário"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Appointments in slot */}
                  <div className="flex-1 p-2 sm:p-3 flex flex-wrap gap-2.5 items-center">
                    {appsInSlot.length > 0 ? (
                      appsInSlot.map((app) => (
                        <div
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className={`flex-1 min-w-[260px] p-3 rounded-xl border text-left cursor-pointer transition-all hover:shadow-md ${
                            app.status === 'confirmado'
                              ? 'bg-[#14B8A6]/5 border-[#14B8A6]/30 hover:border-[#14B8A6]'
                              : app.status === 'cancelado'
                              ? 'bg-[#DC2626]/5 border-[#DC2626]/30 line-through opacity-70'
                              : 'bg-[#5B4BDB]/5 border-[#5B4BDB]/30 hover:border-[#5B4BDB]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                              {app.clientName}
                            </span>
                            {getStatusBadge(app.status)}
                          </div>
                          <div className="flex items-center justify-between text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-1.5">
                            <span>{app.serviceName} ({app.durationMinutes}m)</span>
                            <span className="font-medium text-[#1B1B2F] dark:text-[#ECECF5]">
                              {app.professionalName}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <button
                        onClick={() => {
                          setNewTime(slot);
                          setConflictError('');
                          setIsNewModalOpen(true);
                        }}
                        className="w-full h-full min-h-[44px] flex items-center justify-center text-xs text-[#6B6B80]/60 hover:text-[#5B4BDB] hover:bg-[#5B4BDB]/5 rounded-lg border border-transparent hover:border-dashed hover:border-[#5B4BDB]/40 transition-colors cursor-pointer"
                      >
                        + Clique para agendar às {slot}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title="Detalhes do Atendimento"
          description={`Horário: ${selectedApp.date} às ${selectedApp.time}`}
          footer={
            <div className="flex flex-wrap items-center justify-between w-full gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => setIsCancelModalOpen(true)}
              >
                Cancelar atendimento
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsRescheduleModalOpen(true)}
                >
                  Reagendar
                </Button>
                {selectedApp.status === 'agendado' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      updateAppointmentStatus(selectedApp.id, 'confirmado');
                      setSelectedApp(null);
                    }}
                  >
                    Confirmar
                  </Button>
                )}
                {selectedApp.status === 'confirmado' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      updateAppointmentStatus(selectedApp.id, 'concluido');
                      setSelectedApp(null);
                    }}
                  >
                    Concluir
                  </Button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-[#F7F7FB] dark:bg-[#121224] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48]">
              <div>
                <h4 className="font-bold text-base text-[#1B1B2F] dark:text-[#ECECF5]">
                  {selectedApp.clientName}
                </h4>
                <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">{selectedApp.clientPhone}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                icon={<MessageSquare className="w-3.5 h-3.5 text-[#14B8A6]" />}
                onClick={() => {
                  setSelectedApp(null);
                  setActiveChatId('chat1');
                  setCurrentModule('whatsapp');
                }}
              >
                WhatsApp
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48]">
                <span className="text-[#6B6B80] dark:text-[#9E9EB5]">Serviço</span>
                <p className="font-bold text-sm text-[#1B1B2F] dark:text-[#ECECF5] mt-0.5">
                  {selectedApp.serviceName}
                </p>
                <p className="text-[#6B6B80] mt-0.5">{selectedApp.durationMinutes} minutos</p>
              </div>
              <div className="p-3 bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48]">
                <span className="text-[#6B6B80] dark:text-[#9E9EB5]">Profissional</span>
                <p className="font-bold text-sm text-[#1B1B2F] dark:text-[#ECECF5] mt-0.5">
                  {selectedApp.professionalName}
                </p>
                <p className="text-[#6B6B80] mt-0.5">Sala 02</p>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] flex items-center justify-between">
              <span className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">Valor do serviço</span>
              <span className="text-base font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                R$ {selectedApp.price.toFixed(2)}
              </span>
            </div>

            {selectedApp.notes && (
              <div className="p-3 bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48]">
                <span className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">Observações</span>
                <p className="text-xs text-[#1B1B2F] dark:text-[#ECECF5] mt-1">
                  {selectedApp.notes}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Cancel Appointment Modal (Exact copy from spec) */}
      {isCancelModalOpen && selectedApp && (
        <Modal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          title="Cancelar atendimento"
          description={`Cancelar o atendimento de ${selectedApp.clientName} às ${selectedApp.time}? Você pode avisar a cliente pelo WhatsApp.`}
          footer={
            <div className="flex flex-wrap items-center justify-end gap-2 w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCancelModalOpen(false)}
              >
                Voltar
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleConfirmCancel(false)}
              >
                Cancelar sem avisar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleConfirmCancel(true)}
              >
                Cancelar e avisar
              </Button>
            </div>
          }
        >
          <div className="p-4 bg-[#DC2626]/5 rounded-xl border border-[#DC2626]/20 text-xs text-[#DC2626] leading-relaxed">
            Ao escolher <strong>Cancelar e avisar</strong>, o Lunae enviará uma mensagem automática pelo WhatsApp informando sobre o cancelamento e disponibilizando um link para reagendamento.
          </div>
        </Modal>
      )}

      {/* Reschedule Modal (Exact copy from spec) */}
      {isRescheduleModalOpen && selectedApp && (
        <Modal
          isOpen={isRescheduleModalOpen}
          onClose={() => setIsRescheduleModalOpen(false)}
          title="Reagendar atendimento"
          description={`Selecione uma nova data e horário para ${selectedApp.clientName}.`}
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRescheduleModalOpen(false)}
              >
                Voltar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmReschedule}
              >
                Confirmar reagendamento
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <Input
              label="Nova Data"
              type="date"
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
            />
            <Input
              label="Novo Horário"
              type="time"
              value={rescheduleTime}
              onChange={(e) => setRescheduleTime(e.target.value)}
            />
            <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
              O cliente receberá uma notificação automática no WhatsApp com os novos dados de confirmação.
            </p>
          </div>
        </Modal>
      )}

      {/* New Appointment Modal */}
      {isNewModalOpen && (
        <Modal
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          title="Novo agendamento"
          description="Preencha os dados para agendar um novo atendimento."
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsNewModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateAppointment}
              >
                Salvar agendamento
              </Button>
            </div>
          }
        >
          <form onSubmit={handleCreateAppointment} className="space-y-4">
            {conflictError && (
              <div className="p-3 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-xl flex items-start gap-2 text-xs text-[#DC2626]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{conflictError}</span>
              </div>
            )}

            <Select
              label="Cliente *"
              value={newClientId}
              onChange={(e) => setNewClientId(e.target.value)}
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.phone}
                </option>
              ))}
            </Select>

            <Select
              label="Profissional *"
              value={newProfessional}
              onChange={(e) => setNewProfessional(e.target.value)}
            >
              {professionals.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>

            <Select
              label="Serviço *"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
            >
              <option value="Limpeza de Pele Profunda">Limpeza de Pele Profunda (60 min - R$ 220,00)</option>
              <option value="Massagem Relaxante Terapêutica">Massagem Relaxante Terapêutica (60 min - R$ 180,00)</option>
              <option value="Design e Corte VIP">Design e Corte VIP (45 min - R$ 150,00)</option>
              <option value="Peeling de Diamante">Peeling de Diamante (60 min - R$ 280,00)</option>
              <option value="Drenagem Linfática">Drenagem Linfática (50 min - R$ 160,00)</option>
            </Select>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Data *"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
              <Input
                label="Horário *"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
