'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ModuleType,
  Client,
  Appointment,
  ChatConversation,
  Lead,
  Transaction,
  ReminderRule,
  LoyaltyReward,
  LoyaltyCoupon,
  AutomationRule,
  UserMember,
  Integration,
  AppNotification,
  ChatMessage,
} from '@/types';
import {
  INITIAL_CLIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_CONVERSATIONS,
  INITIAL_LEADS,
  INITIAL_TRANSACTIONS,
  INITIAL_REMINDERS,
  INITIAL_LOYALTY_REWARDS,
  INITIAL_COUPONS,
  INITIAL_AUTOMATIONS,
  INITIAL_USERS,
  INITIAL_INTEGRATIONS,
  INITIAL_NOTIFICATIONS,
} from '@/data/mockData';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  undoAction?: () => void;
}

interface AppContextType {
  currentModule: ModuleType;
  setCurrentModule: (mod: ModuleType) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isOffline: boolean;
  toggleOffline: () => void;
  whatsAppConnected: boolean;
  setWhatsAppConnected: (connected: boolean) => void;
  toggleWhatsAppConnected: () => void;

  onboardingSteps: Array<{ id: number; title: string; completed: boolean }>;
  completeOnboardingStep: (id: number) => void;
  skipOnboarding: boolean;
  setSkipOnboarding: (skip: boolean) => void;

  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isMobileMoreOpen: boolean;
  setIsMobileMoreOpen: (open: boolean) => void;

  // Clients
  clients: Client[];
  selectedClientId: string | null;
  setSelectedClientId: (id: string | null) => void;
  addClient: (clientData: Partial<Client>) => Client;
  deleteClient: (id: string) => void;
  addTimelineNote: (clientId: string, note: string) => void;
  uploadClientDocument: (clientId: string, file: { name: string; size: string; type: 'pdf' | 'jpg' | 'png' }) => void;

  // Appointments
  appointments: Appointment[];
  addAppointment: (app: Omit<Appointment, 'id'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  cancelAppointment: (id: string, notifyWhatsApp: boolean) => void;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void;

  // WhatsApp
  conversations: ChatConversation[];
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  sendMessage: (chatId: string, text: string, mediaType?: 'text' | 'template') => void;
  assignAgent: (chatId: string, agent: string) => void;

  // Leads
  leads: Lead[];
  moveLeadStage: (leadId: string, targetStage: Lead['stage'], reason?: string) => void;
  addLead: (lead: Omit<Lead, 'id' | 'daysWithoutContact'>) => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  markTransactionPaid: (id: string) => void;
  refundTransaction: (id: string) => void;

  // Reminders
  reminders: ReminderRule[];
  toggleReminder: (id: string) => void;
  updateReminderTemplate: (id: string, template: string) => void;

  // Loyalty
  loyaltyRewards: LoyaltyReward[];
  loyaltyCoupons: LoyaltyCoupon[];
  redeemPoints: (clientId: string, rewardId: string) => boolean;

  // Automations
  automations: AutomationRule[];
  toggleAutomation: (id: string) => void;

  // Users
  users: UserMember[];
  inviteUser: (email: string, role: UserMember['role']) => void;
  toggleUserStatus: (id: string) => void;

  // Integrations
  integrations: Integration[];
  toggleIntegration: (id: string) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastItem['type'], undoAction?: () => void) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentModule, setCurrentModule] = useState<ModuleType>('inicio');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [whatsAppConnected, setWhatsAppConnected] = useState<boolean>(true);

  const [skipOnboarding, setSkipOnboarding] = useState<boolean>(false);
  const [onboardingSteps, setOnboardingSteps] = useState([
    { id: 1, title: 'Dados do negócio', completed: true },
    { id: 2, title: 'Equipe e profissionais', completed: true },
    { id: 3, title: 'Serviços e horários', completed: true },
    { id: 4, title: 'Conectar WhatsApp Oficial', completed: true },
    { id: 5, title: 'Primeiro agendamento', completed: false },
  ]);

  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  // Entities
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState<string>('chat1');
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [reminders, setReminders] = useState<ReminderRule[]>(INITIAL_REMINDERS);
  const [loyaltyRewards] = useState<LoyaltyReward[]>(INITIAL_LOYALTY_REWARDS);
  const [loyaltyCoupons] = useState<LoyaltyCoupon[]>(INITIAL_COUPONS);
  const [automations, setAutomations] = useState<AutomationRule[]>(INITIAL_AUTOMATIONS);
  const [users, setUsers] = useState<UserMember[]>(INITIAL_USERS);
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Global Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const toggleOffline = () => {
    setIsOffline((prev) => {
      const next = !prev;
      return next;
    });
    if (!isOffline) {
      showToast('Você está offline. Alterações serão enviadas quando a conexão voltar.', 'warning');
    } else {
      showToast('Conexão restabelecida. Sistema sincronizado!', 'success');
    }
  };

  const toggleWhatsAppConnected = () => {
    setWhatsAppConnected((prev) => !prev);
    if (whatsAppConnected) {
      showToast('WhatsApp desconectado. Você não recebe nem envia mensagens até reconectar.', 'danger');
    } else {
      showToast('WhatsApp reconectado com sucesso!', 'success');
    }
  };

  const showToast = React.useCallback((message: string, type: ToastItem['type'] = 'info', undoAction?: () => void) => {
    const id = `t_${Math.floor(performance.now() * 1000)}`;
    setToasts((prev) => [...prev, { id, message, type, undoAction }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, undoAction ? 10000 : 4000);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const completeOnboardingStep = (id: number) => {
    setOnboardingSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, completed: true } : step))
    );
  };

  // Client actions
  const addClient = (clientData: Partial<Client>): Client => {
    const newClient: Client = {
      id: `c_${Date.now()}`,
      name: clientData.name || 'Novo Cliente',
      phone: clientData.phone || '',
      hasWhatsApp: clientData.hasWhatsApp ?? true,
      email: clientData.email || '',
      document: clientData.document || '',
      birthdate: clientData.birthdate || '',
      address: clientData.address || '',
      tags: clientData.tags || ['Novo'],
      origin: clientData.origin || 'Direto',
      notes: clientData.notes || '',
      consentLgpd: clientData.consentLgpd ?? true,
      totalSpent: 0,
      attendanceRate: 100,
      loyaltyPoints: 0,
      documents: [],
      timeline: [
        {
          id: `t_${Date.now()}`,
          type: 'etapa',
          title: 'Cadastro Criado',
          description: 'Cliente cadastrado no Lunae.',
          author: 'Edson Vinicius',
          date: new Date().toLocaleDateString('pt-BR'),
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    setClients((prev) => [newClient, ...prev]);
    showToast(`Cliente ${newClient.name} cadastrado com sucesso!`, 'success');
    return newClient;
  };

  const deleteClient = (id: string) => {
    const deleted = clients.find((c) => c.id === id);
    if (!deleted) return;
    setClients((prev) => prev.filter((c) => c.id !== id));
    if (selectedClientId === id) setSelectedClientId(null);

    showToast(
      `Cliente ${deleted.name} removido.`,
      'info',
      () => {
        setClients((prev) => [deleted, ...prev]);
        showToast(`Exclusão desfeita. ${deleted.name} foi restaurado.`, 'success');
      }
    );
  };

  const addTimelineNote = (clientId: string, note: string) => {
    const event = {
      id: `t_${Date.now()}`,
      type: 'nota_interna' as const,
      title: 'Nota Interna da Equipe',
      description: note,
      author: 'Edson Vinicius',
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isInternal: true,
    };

    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, timeline: [event, ...c.timeline] } : c
      )
    );
    showToast('Nota interna adicionada com sucesso!', 'success');
  };

  const uploadClientDocument = (
    clientId: string,
    file: { name: string; size: string; type: 'pdf' | 'jpg' | 'png' }
  ) => {
    const newDoc = {
      id: `d_${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toLocaleDateString('pt-BR'),
    };
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, documents: [...c.documents, newDoc] } : c
      )
    );
    showToast(`Documento ${file.name} anexado com sucesso!`, 'success');
  };

  // Appointment actions
  const addAppointment = (app: Omit<Appointment, 'id'>): Appointment => {
    const newApp: Appointment = {
      ...app,
      id: `a_${Date.now()}`,
    };
    setAppointments((prev) => [...prev, newApp]);
    completeOnboardingStep(5);
    showToast(`Agendamento de ${newApp.clientName} criado para ${newApp.time}.`, 'success');
    return newApp;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    showToast(`Atendimento atualizado para ${status}.`, 'info');
  };

  const cancelAppointment = (id: string, notifyWhatsApp: boolean) => {
    const app = appointments.find((a) => a.id === id);
    if (!app) return;
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelado' } : a))
    );
    if (notifyWhatsApp) {
      showToast(`Atendimento de ${app.clientName} cancelado e aviso enviado via WhatsApp.`, 'success');
    } else {
      showToast(`Atendimento de ${app.clientName} cancelado sem aviso.`, 'info');
    }
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    const app = appointments.find((a) => a.id === id);
    if (!app) return;
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, date: newDate, time: newTime } : a))
    );
    showToast(`Atendimento reagendado para ${newDate}, ${newTime}. ${app.clientName} foi avisada.`, 'success');
  };

  // WhatsApp
  const sendMessage = (chatId: string, text: string, mediaType: 'text' | 'template' = 'text') => {
    if (!whatsAppConnected) {
      showToast('WhatsApp desconectado. Você não recebe nem envia mensagens até reconectar.', 'danger');
      return;
    }
    const newMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'agent',
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
      mediaType,
    };

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessage: text,
              lastMessageTime: newMessage.timestamp,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );
  };

  const assignAgent = (chatId: string, agent: string) => {
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, assignedAgent: agent } : chat
      )
    );
    showToast(`Conversa atribuída a ${agent}.`, 'info');
  };

  // Leads
  const moveLeadStage = (leadId: string, targetStage: Lead['stage'], reason?: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId ? { ...l, stage: targetStage, lostReason: reason } : l
      )
    );

    if (targetStage === 'cliente') {
      showToast(`${lead.name} virou cliente! Quer agendar o primeiro atendimento?`, 'success');
    } else if (targetStage === 'perdido') {
      showToast(`Lead movido para perdido. Motivo registrado: ${reason || 'Não informado'}`, 'info');
    } else {
      showToast(`Lead movido para a etapa: ${targetStage}.`, 'info');
    }
  };

  const addLead = (lead: Omit<Lead, 'id' | 'daysWithoutContact'>) => {
    const newLead: Lead = {
      ...lead,
      id: `l_${Date.now()}`,
      daysWithoutContact: 0,
    };
    setLeads((prev) => [newLead, ...prev]);
    showToast(`Lead ${newLead.name} adicionado ao funil.`, 'success');
  };

  // Transactions
  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tr_${Date.now()}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Cobrança de R$ ${newTx.amount.toFixed(2)} criada com sucesso!`, 'success');
  };

  const markTransactionPaid = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: 'pago', paymentDate: new Date().toISOString().split('T')[0] }
          : t
      )
    );
    showToast('Cobrança marcada como paga!', 'success');
  };

  const refundTransaction = (id: string) => {
    const tx = transactions.find((t) => t.id === id);
    if (!tx) return;
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'reembolsado' } : t))
    );
    showToast(`Reembolso de R$ ${tx.amount.toFixed(2)} registrado para ${tx.clientName}.`, 'info');
  };

  // Reminders
  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
    showToast('Status do lembrete alterado.', 'info');
  };

  const updateReminderTemplate = (id: string, template: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, template } : r))
    );
    showToast('Modelo de lembrete salvo com sucesso!', 'success');
  };

  // Loyalty
  const redeemPoints = (clientId: string, rewardId: string): boolean => {
    const client = clients.find((c) => c.id === clientId);
    const reward = loyaltyRewards.find((r) => r.id === rewardId);
    if (!client || !reward) return false;

    if (client.loyaltyPoints < reward.pointsRequired) {
      showToast(`Saldo insuficiente. Faltam ${reward.pointsRequired - client.loyaltyPoints} pontos.`, 'warning');
      return false;
    }

    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, loyaltyPoints: c.loyaltyPoints - reward.pointsRequired } : c
      )
    );
    showToast(`Resgate de ${reward.title} concluído com sucesso para ${client.name}!`, 'success');
    return true;
  };

  // Automations
  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
    showToast('Status da automação alterado.', 'info');
  };

  // Users
  const inviteUser = (email: string, role: UserMember['role']) => {
    const newUser: UserMember = {
      id: `u_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      status: 'pendente',
      lastAccess: 'Convite pendente',
    };
    setUsers((prev) => [...prev, newUser]);
    showToast(`Convite enviado para ${email}.`, 'success');
  };

  const toggleUserStatus = (id: string) => {
    const u = users.find((item) => item.id === id);
    if (!u) return;

    if (u.role === 'Administrador') {
      const activeAdmins = users.filter((x) => x.role === 'Administrador' && x.status === 'ativo');
      if (activeAdmins.length <= 1 && u.status === 'ativo') {
        showToast('Você precisa de pelo menos um administrador. Defina outro antes de remover este.', 'danger');
        return;
      }
    }

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'ativo' ? 'inativo' : 'ativo' }
          : user
      )
    );
    showToast(`Status de ${u.name} atualizado.`, 'info');
  };

  // Integrations
  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
    showToast('Status da integração atualizado.', 'info');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Todas as notificações foram marcadas como lidas.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentModule,
        setCurrentModule,
        darkMode,
        toggleDarkMode,
        isOffline,
        toggleOffline,
        whatsAppConnected,
        setWhatsAppConnected,
        toggleWhatsAppConnected,
        onboardingSteps,
        completeOnboardingStep,
        skipOnboarding,
        setSkipOnboarding,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isMobileMoreOpen,
        setIsMobileMoreOpen,

        clients,
        selectedClientId,
        setSelectedClientId,
        addClient,
        deleteClient,
        addTimelineNote,
        uploadClientDocument,

        appointments,
        addAppointment,
        updateAppointmentStatus,
        cancelAppointment,
        rescheduleAppointment,

        conversations,
        activeChatId,
        setActiveChatId,
        sendMessage,
        assignAgent,

        leads,
        moveLeadStage,
        addLead,

        transactions,
        addTransaction,
        markTransactionPaid,
        refundTransaction,

        reminders,
        toggleReminder,
        updateReminderTemplate,

        loyaltyRewards,
        loyaltyCoupons,
        redeemPoints,

        automations,
        toggleAutomation,

        users,
        inviteUser,
        toggleUserStatus,

        integrations,
        toggleIntegration,

        notifications,
        markNotificationRead,
        markAllNotificationsRead,

        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
