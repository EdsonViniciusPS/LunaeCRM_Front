export type ModuleType =
  | 'inicio'
  | 'agenda'
  | 'whatsapp'
  | 'clientes'
  | 'funil'
  | 'financeiro'
  | 'lembretes'
  | 'campanhas'
  | 'fidelizacao'
  | 'relatorios'
  | 'automacoes'
  | 'integracoes'
  | 'usuarios'
  | 'permissoes';

export interface ClientDocument {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'jpg' | 'png';
  uploadedAt: string;
  url?: string;
}

export interface ClientTimelineEvent {
  id: string;
  type: 'atendimento' | 'mensagem' | 'pagamento' | 'nota_interna' | 'etapa' | 'automacao';
  title: string;
  description: string;
  author: string;
  date: string;
  time: string;
  isInternal?: boolean;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  hasWhatsApp: boolean;
  email: string;
  document: string; // CPF or CNPJ
  birthdate: string;
  address: string;
  tags: string[];
  origin: string;
  notes: string;
  consentLgpd: boolean;
  totalSpent: number;
  attendanceRate: number;
  loyaltyPoints: number;
  documents: ClientDocument[];
  timeline: ClientTimelineEvent[];
}

export type AppointmentStatus = 'agendado' | 'confirmado' | 'concluido' | 'cancelado' | 'faltou';

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  professionalName: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  price: number;
  status: AppointmentStatus;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'agent' | 'system';
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  mediaType?: 'text' | 'audio' | 'image' | 'template';
  templateName?: string;
}

export interface ChatConversation {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  assignedAgent: string;
  window24hExpired: boolean;
  tags: string[];
  messages: ChatMessage[];
}

export type LeadStage = 'lead' | 'contato' | 'agendamento' | 'cliente' | 'perdido';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  origin: string;
  estimatedValue: number;
  lastContactDate: string;
  daysWithoutContact: number;
  responsibleAgent: string;
  stage: LeadStage;
  lostReason?: string;
}

export type PaymentMethod = 'pix' | 'cartao' | 'boleto' | 'link';
export type TransactionStatus = 'pago' | 'pendente' | 'atrasado' | 'reembolsado';

export interface Transaction {
  id: string;
  clientId: string;
  clientName: string;
  description: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
}

export interface ReminderRule {
  id: string;
  name: string;
  channel: 'whatsapp' | 'sms' | 'email';
  timing: string; // ex: "24h antes", "2h antes"
  template: string;
  active: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  segment: string;
  targetCount: number;
  optOutExcluded: number;
  scheduledDate: string;
  status: 'rascunho' | 'agendada' | 'enviada';
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  repliesCount: number;
  appointmentsCount: number;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  pointsRequired: number;
  description: string;
  active: boolean;
}

export interface LoyaltyCoupon {
  id: string;
  code: string;
  discountPercent: number;
  validUntil: string;
  totalUses: number;
  maxUses: number;
  active: boolean;
}

export interface AutomationRule {
  id: string;
  title: string;
  trigger: string;
  condition?: string;
  action: string;
  active: boolean;
  lastRun?: string;
  hasError?: boolean;
  errorMessage?: string;
}

export interface UserMember {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Gerente' | 'Atendente' | 'Financeiro' | 'Somente leitura';
  status: 'ativo' | 'inativo' | 'pendente';
  lastAccess: string;
}

export interface Integration {
  id: string;
  key: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  lastSync?: string;
  hasError?: boolean;
  errorMessage?: string;
}

export interface AppNotification {
  id: string;
  category: 'Agenda' | 'WhatsApp' | 'Financeiro';
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionModule?: ModuleType;
}
