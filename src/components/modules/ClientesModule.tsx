'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Client } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input, Select } from '@/components/common/Input';
import { Modal } from '@/components/common/Modal';
import { EmptyState } from '@/components/common/EmptyState';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  FileText,
  Clock,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle2,
  X,
  MessageSquare,
  ShieldCheck,
  DollarSign,
  ArrowLeft,
} from 'lucide-react';

export function ClientesModule() {
  const {
    clients,
    addClient,
    deleteClient,
    selectedClientId,
    setSelectedClientId,
    addTimelineNote,
    uploadClientDocument,
    setActiveChatId,
    setCurrentModule,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('todos');
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  // New Client Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hasWhatsApp, setHasWhatsApp] = useState(true);
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [origin, setOrigin] = useState('Instagram');
  const [notes, setNotes] = useState('');
  const [consentLgpd, setConsentLgpd] = useState(true);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // Client dossier active tab
  const [clientTab, setClientTab] = useState<'resumo' | 'historico' | 'financeiro' | 'documentos'>('resumo');
  const [newNoteText, setNewNoteText] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const selectedClient = clients.find((c) => c.id === selectedClientId) || null;

  // Filter clients
  const filteredClients = clients.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    const matchTag =
      selectedTag === 'todos' || c.tags.includes(selectedTag);

    return matchSearch && matchTag;
  });

  // Check duplicate phone on change
  const handlePhoneChange = (val: string) => {
    setPhone(val);
    const existing = clients.find((c) => c.phone.trim() === val.trim());
    if (existing && existing.id !== selectedClientId) {
      setDuplicateWarning(
        `Esse telefone já está cadastrado para ${existing.name}. Abrir cadastro existente?`
      );
    } else {
      setDuplicateWarning(null);
    }
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newC = addClient({
      name,
      phone,
      hasWhatsApp,
      email,
      document,
      birthdate,
      address,
      origin,
      notes,
      consentLgpd,
      tags: ['Novo Cliente'],
    });

    setIsNewClientModalOpen(false);
    setSelectedClientId(newC.id);

    // Reset form
    setName('');
    setPhone('');
    setEmail('');
    setDocument('');
    setBirthdate('');
    setAddress('');
    setNotes('');
  };

  const handleSimulateUpload = () => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          if (selectedClient) {
            uploadClientDocument(selectedClient.id, {
              name: `Avaliacao_Clinica_${Date.now().toString().slice(-4)}.pdf`,
              size: '1.8 MB',
              type: 'pdf',
            });
          }
          return null;
        }
        return prev + 30;
      });
    }, 200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      {/* If a client is selected, show the Client Dossier (Ficha Completa em 2 colunas) */}
      {selectedClient ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedClientId(null)}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5B4BDB] dark:text-[#6E60E6] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para lista de clientes</span>
            </button>

            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 className="w-3.5 h-3.5" />}
              onClick={() => setClientToDelete(selectedClient)}
            >
              Excluir cliente
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Client Data (Ficha 2 colunas) */}
            <Card className="space-y-5 self-start">
              <div className="flex items-start gap-3 pb-4 border-b border-[#E4E4EE] dark:border-[#2E2E48]">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#5B4BDB] to-[#14B8A6] text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-xs">
                  {selectedClient.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1B1B2F] dark:text-[#ECECF5] truncate max-w-[200px]" title={selectedClient.name}>
                    {selectedClient.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
                      {selectedClient.phone}
                    </span>
                    {selectedClient.hasWhatsApp && (
                      <span className="text-[10px] font-bold text-[#14B8A6] bg-[#14B8A6]/10 px-1.5 py-0.5 rounded">
                        WhatsApp OK
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#6B6B80] dark:text-[#9E9EB5] block">E-mail</span>
                  <span className="font-medium text-[#1B1B2F] dark:text-[#ECECF5]">
                    {selectedClient.email || 'Não informado'}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B6B80] dark:text-[#9E9EB5] block">CPF / Documento</span>
                  <span className="font-medium text-[#1B1B2F] dark:text-[#ECECF5]">
                    {selectedClient.document || 'Não informado'}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B6B80] dark:text-[#9E9EB5] block">Nascimento</span>
                  <span className="font-medium text-[#1B1B2F] dark:text-[#ECECF5]">
                    {selectedClient.birthdate || 'Não informado'}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B6B80] dark:text-[#9E9EB5] block">Endereço</span>
                  <span className="font-medium text-[#1B1B2F] dark:text-[#ECECF5]">
                    {selectedClient.address || 'Não informado'}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B6B80] dark:text-[#9E9EB5] block">Origem</span>
                  <span className="font-medium text-[#1B1B2F] dark:text-[#ECECF5]">
                    {selectedClient.origin}
                  </span>
                </div>
                {selectedClient.notes && (
                  <div>
                    <span className="text-[#6B6B80] dark:text-[#9E9EB5] block">Observações</span>
                    <p className="p-2.5 bg-[#F7F7FB] dark:bg-[#121224] rounded-lg border border-[#E4E4EE] dark:border-[#2E2E48] mt-1 text-[#1B1B2F] dark:text-[#ECECF5]">
                      {selectedClient.notes}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-[#6B6B80] dark:text-[#9E9EB5] block mb-1">Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedClient.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-[#5B4BDB]/10 text-[#5B4BDB] dark:text-[#6E60E6] text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    icon={<MessageSquare className="w-4 h-4" />}
                    onClick={() => {
                      setActiveChatId('chat1');
                      setCurrentModule('whatsapp');
                    }}
                  >
                    Iniciar conversa WhatsApp
                  </Button>
                </div>
              </div>
            </Card>

            {/* Right Column: Tabs (Resumo, Histórico, Financeiro, Documentos) */}
            <div className="lg:col-span-2 space-y-4">
              {/* Tab selector */}
              <div className="flex items-center gap-1 border-b border-[#E4E4EE] dark:border-[#2E2E48] pb-1 overflow-x-auto">
                {(['resumo', 'historico', 'financeiro', 'documentos'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setClientTab(tab)}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl transition-colors cursor-pointer capitalize ${
                      clientTab === tab
                        ? 'border-b-2 border-b-[#5B4BDB] text-[#5B4BDB] dark:text-[#6E60E6] bg-white dark:bg-[#1A1A2E]'
                        : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab 1: Resumo */}
              {clientTab === 'resumo' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <Card className="p-4 text-center">
                      <span className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">Total Gasto</span>
                      <p className="text-lg font-bold text-[#1B1B2F] dark:text-[#ECECF5] mt-1">
                        R$ {selectedClient.totalSpent.toFixed(2)}
                      </p>
                    </Card>
                    <Card className="p-4 text-center">
                      <span className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">Comparecimento</span>
                      <p className="text-lg font-bold text-[#14B8A6] mt-1">
                        {selectedClient.attendanceRate}%
                      </p>
                    </Card>
                    <Card className="p-4 text-center">
                      <span className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">Pontos Fidelidade</span>
                      <p className="text-lg font-bold text-[#5B4BDB] dark:text-[#6E60E6] mt-1">
                        {selectedClient.loyaltyPoints} pts
                      </p>
                    </Card>
                  </div>

                  <Card className="p-4 space-y-3">
                    <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                      Privacidade e Termo LGPD
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#14B8A6]">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Consentimento registrado para envio de lembretes e mensagens no WhatsApp.</span>
                    </div>
                  </Card>
                </div>
              )}

              {/* Tab 2: Histórico (Timeline reversa agrupada por dia) */}
              {clientTab === 'historico' && (
                <Card className="p-5 space-y-4">
                  <div className="space-y-2 pb-4 border-b border-[#E4E4EE] dark:border-[#2E2E48]">
                    <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                      Adicionar Nota Interna
                    </h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Escreva uma nota visível só para a equipe..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className="flex-1 bg-[#F7F7FB] dark:bg-[#121224] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-xl px-3 py-2 text-xs text-[#1B1B2F] dark:text-[#ECECF5] focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={!newNoteText.trim()}
                        onClick={() => {
                          addTimelineNote(selectedClient.id, newNoteText);
                          setNewNoteText('');
                        }}
                      >
                        Salvar nota
                      </Button>
                    </div>
                  </div>

                  {/* Timeline events */}
                  <div className="space-y-3">
                    {selectedClient.timeline.length === 0 ? (
                      <p className="text-xs text-[#6B6B80] py-6 text-center">
                        Sem registros ainda. Atendimentos, mensagens e pagamentos deste cliente aparecem aqui.
                      </p>
                    ) : (
                      selectedClient.timeline.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F7FB] dark:bg-[#121224] border border-[#E4E4EE] dark:border-[#2E2E48]"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#1A1A2E] border border-[#E4E4EE] dark:border-[#2E2E48] flex items-center justify-center shrink-0 text-[#5B4BDB]">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-[#1B1B2F] dark:text-[#ECECF5]">
                                {item.title}
                              </span>
                              <span className="text-[10px] text-[#6B6B80]">
                                {item.date} às {item.time}
                              </span>
                            </div>
                            <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-[#5B4BDB] font-medium">
                                Por {item.author}
                              </span>
                              {item.isInternal && (
                                <span className="text-[9px] bg-[#F59E0B]/10 text-[#D97706] font-bold px-1.5 py-0.2 rounded">
                                  Interna
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              )}

              {/* Tab 3: Financeiro */}
              {clientTab === 'financeiro' && (
                <Card className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                      Cobranças e Pagamentos do Cliente
                    </h4>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setCurrentModule('financeiro')}
                    >
                      Nova Cobrança
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-[#F7F7FB] dark:bg-[#121224] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-xs text-[#1B1B2F] dark:text-[#ECECF5]">
                          Limpeza de Pele Profunda
                        </span>
                        <p className="text-[10px] text-[#6B6B80]">28/09/2026 • Via Pix</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-xs text-[#14B8A6]">R$ 220,00</span>
                        <span className="block text-[10px] text-[#14B8A6]">Pago</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Tab 4: Documentos com Upload Simulado */}
              {clientTab === 'documentos' && (
                <Card className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                        Documentos e Anamnese (PDF/JPG máx 10 MB)
                      </h4>
                      <p className="text-xs text-[#6B6B80]">Anexe exames, termos assinados ou fotos de evolução.</p>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<Upload className="w-3.5 h-3.5" />}
                      onClick={handleSimulateUpload}
                    >
                      Enviar documento
                    </Button>
                  </div>

                  {uploadProgress !== null && (
                    <div className="p-3 bg-[#5B4BDB]/5 rounded-xl border border-[#5B4BDB]/20 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-[#5B4BDB] font-semibold">
                        <span>Enviando documento...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-[#E4E4EE] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#5B4BDB] h-full transition-all duration-200"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {selectedClient.documents.length === 0 ? (
                      <p className="text-xs text-[#6B6B80] py-6 text-center">
                        Nenhum documento anexado ainda.
                      </p>
                    ) : (
                      selectedClient.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-3 bg-[#F7F7FB] dark:bg-[#121224] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[#5B4BDB]" />
                            <div>
                              <p className="text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                                {doc.name}
                              </p>
                              <p className="text-[10px] text-[#6B6B80]">
                                {doc.size} • Enviado em {doc.uploadedAt}
                              </p>
                            </div>
                          </div>
                          <button className="text-xs font-semibold text-[#5B4BDB] hover:underline cursor-pointer">
                            Baixar
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Client List View */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#6B6B80]" />
                <input
                  type="text"
                  placeholder="Buscar por nome, telefone ou CPF..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white dark:bg-[#1A1A2E] text-xs text-[#1B1B2F] dark:text-[#ECECF5] pl-9 pr-3 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]"
                />
              </div>

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="text-xs bg-white dark:bg-[#1A1A2E] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-xl px-3 py-2.5 text-[#1B1B2F] dark:text-[#ECECF5]"
              >
                <option value="todos">Todas as Tags</option>
                <option value="VIP">VIP</option>
                <option value="Recorrente">Recorrente</option>
                <option value="Primeira Vez">Primeira Vez</option>
              </select>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setDuplicateWarning(null);
                setIsNewClientModalOpen(true);
              }}
            >
              Novo cliente
            </Button>
          </div>

          {filteredClients.length === 0 ? (
            <EmptyState
              icon={<Users className="w-6 h-6" />}
              title="Nenhum cliente encontrado"
              description="Nenhum cliente ainda. Cadastre o primeiro ou importe uma planilha para começar."
              actionText="Novo cliente"
              onAction={() => setIsNewClientModalOpen(true)}
            />
          ) : (
            <div className="bg-white dark:bg-[#1A1A2E] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-2xl shadow-card overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F7FB] dark:bg-[#121224] border-b border-[#E4E4EE] dark:border-[#2E2E48] text-[#6B6B80] dark:text-[#9E9EB5] font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Cliente</th>
                      <th className="py-3 px-4">Telefone</th>
                      <th className="py-3 px-4">Tags</th>
                      <th className="py-3 px-4">Origem</th>
                      <th className="py-3 px-4 text-right">Total Gasto</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E4EE] dark:divide-[#2E2E48]">
                    {filteredClients.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedClientId(c.id)}
                        className="hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]/50 transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4 font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#5B4BDB]/10 text-[#5B4BDB] font-bold flex items-center justify-center shrink-0">
                              {c.name.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="truncate max-w-[200px]" title={c.name}>
                              {c.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#6B6B80] dark:text-[#9E9EB5]">
                          {c.phone}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {c.tags.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="bg-[#5B4BDB]/10 text-[#5B4BDB] text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#6B6B80] dark:text-[#9E9EB5]">
                          {c.origin}
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                          R$ {c.totalSpent.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedClientId(c.id);
                            }}
                            className="text-xs font-semibold text-[#5B4BDB] hover:underline cursor-pointer"
                          >
                            Ver ficha
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <div className="md:hidden divide-y divide-[#E4E4EE] dark:divide-[#2E2E48]">
                {filteredClients.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedClientId(c.id)}
                    className="p-4 flex items-center justify-between gap-3 active:bg-[#F7F7FB] dark:active:bg-[#25253E] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#5B4BDB]/10 text-[#5B4BDB] font-bold text-sm flex items-center justify-center shrink-0">
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5] truncate">
                          {c.name}
                        </h4>
                        <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] truncate">
                          {c.phone}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#5B4BDB] shrink-0">
                      R$ {c.totalSpent.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal: Novo Cliente */}
      {isNewClientModalOpen && (
        <Modal
          isOpen={isNewClientModalOpen}
          onClose={() => setIsNewClientModalOpen(false)}
          title="Novo cliente"
          description="Preencha os dados cadastrais do cliente."
          size="lg"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsNewClientModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateClient}
              >
                Salvar cliente
              </Button>
            </div>
          }
        >
          <form onSubmit={handleCreateClient} className="space-y-4">
            {duplicateWarning && (
              <div className="p-3 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-xl flex items-start gap-2 text-xs text-[#DC2626]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p>{duplicateWarning}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsNewClientModalOpen(false);
                      setSelectedClientId('c1');
                    }}
                    className="font-bold underline mt-1 block"
                  >
                    Abrir cadastro existente
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Nome completo *"
                placeholder="Ex: Ana Souza"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Telefone com WhatsApp *"
                placeholder="(11) 98765-4321"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="E-mail"
                type="email"
                placeholder="cliente@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="CPF / CNPJ"
                placeholder="000.000.000-00"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Data de Nascimento"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
              <Select
                label="Origem do Cliente"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              >
                <option value="Instagram">Instagram</option>
                <option value="Google">Google</option>
                <option value="Indicação">Indicação</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Passante / Fachada">Passante / Fachada</option>
              </Select>
            </div>

            <Input
              label="Endereço Completo"
              placeholder="Rua, número, complemento, bairro, cidade - UF"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="flex items-center gap-2 p-3 bg-[#F7F7FB] dark:bg-[#121224] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48]">
              <input
                type="checkbox"
                id="consentLgpd"
                checked={consentLgpd}
                onChange={(e) => setConsentLgpd(e.target.checked)}
                className="w-4 h-4 text-[#5B4BDB] rounded"
              />
              <label htmlFor="consentLgpd" className="text-xs text-[#1B1B2F] dark:text-[#ECECF5]">
                Registre o consentimento do cliente para receber mensagens (LGPD).
              </label>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal (exact copy from spec) */}
      {clientToDelete && (
        <Modal
          isOpen={!!clientToDelete}
          onClose={() => setClientToDelete(null)}
          title={`Excluir ${clientToDelete.name}?`}
          description="O histórico e os documentos serão removidos e não poderão ser recuperados."
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setClientToDelete(null)}
              >
                Manter cliente
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  deleteClient(clientToDelete.id);
                  setClientToDelete(null);
                }}
              >
                Excluir cliente
              </Button>
            </div>
          }
        >
          <div className="p-4 bg-[#DC2626]/5 rounded-xl border border-[#DC2626]/20 text-xs text-[#DC2626]">
            Você terá até 10 segundos para desfazer esta ação através da notificação que aparecerá na tela.
          </div>
        </Modal>
      )}
    </div>
  );
}
