'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import {
  Search,
  Send,
  Paperclip,
  Mic,
  RotateCcw,
  Check,
  CheckCheck,
  AlertCircle,
  FileText,
  User,
  Calendar,
  Sparkles,
  ArrowLeft,
  Tag,
  Phone,
  Clock,
  MoreVertical,
} from 'lucide-react';

export function WhatsAppModule() {
  const {
    conversations,
    activeChatId,
    setActiveChatId,
    sendMessage,
    assignAgent,
    whatsAppConnected,
    setWhatsAppConnected,
    clients,
    appointments,
    setCurrentModule,
    setSelectedClientId,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'todas' | 'minhas' | 'nao_atribuidas' | 'nao_lidas'>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [showTemplatesMenu, setShowTemplatesMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];
  const activeClient = clients.find((c) => c.id === activeChat?.clientId);
  const nextAppointment = appointments.find(
    (a) => a.clientId === activeChat?.clientId && a.status !== 'cancelado'
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const filteredChats = conversations.filter((c) => {
    const matchSearch =
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchSearch) return false;

    if (activeTab === 'minhas') return c.assignedAgent === 'Marina Silveira';
    if (activeTab === 'nao_atribuidas') return !c.assignedAgent;
    if (activeTab === 'nao_lidas') return c.unreadCount > 0;
    return true;
  });

  const handleSend = () => {
    if (!inputText.trim() || !activeChat) return;
    sendMessage(activeChat.id, inputText.trim(), 'text');
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === '/') {
      setShowTemplatesMenu(true);
    }
  };

  const templates = [
    {
      title: 'Lembrete de Atendimento 24h',
      text: `Olá, ${activeChat?.clientName || 'Cliente'}! Lembrete do seu atendimento amanhã às 09:00 no Lunae. Responda 1 para confirmar ou 2 para reagendar.`,
    },
    {
      title: 'Chave Pix para Pagamento',
      text: `Olá! Segue nossa chave Pix para pagamento: financeiro@lunae.com.br. Assim que realizar o envio, pode nos mandar o comprovante por aqui!`,
    },
    {
      title: 'Instruções Pós-Procedimento',
      text: `Olá, ${activeChat?.clientName || 'Cliente'}! Esperamos que tenha adorado seu atendimento hoje. Evite exposição direta ao sol pelas próximas 48h. Qualquer dúvida, conte conosco!`,
    },
  ];

  return (
    <div className="h-[calc(100vh-8.5rem)] md:h-[calc(100vh-6.5rem)] flex flex-col bg-white dark:bg-[#1A1A2E] rounded-2xl border border-[#E4E4EE] dark:border-[#2E2E48] shadow-card overflow-hidden animate-in fade-in duration-150">
      {/* WhatsApp Disconnected Banner (spec requirement) */}
      {!whatsAppConnected && (
        <div className="bg-[#DC2626] text-white px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between shadow-xs z-10 shrink-0">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              <strong>WhatsApp desconectado.</strong> Você não recebe nem envia mensagens até reconectar.
            </span>
          </div>
          <button
            onClick={() => setWhatsAppConnected(true)}
            className="text-xs font-bold underline bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg cursor-pointer"
          >
            Reconectar WhatsApp
          </button>
        </div>
      )}

      {/* 3 Columns Layout (Desktop) / Stacked navigation (Mobile) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: Conversations List */}
        <div
          className={`w-full md:w-80 lg:w-88 border-r border-[#E4E4EE] dark:border-[#2E2E48] flex flex-col shrink-0 ${
            mobileView === 'chat' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Search & Filter Header */}
          <div className="p-3 border-b border-[#E4E4EE] dark:border-[#2E2E48] space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#6B6B80] dark:text-[#9E9EB5]" />
              <input
                type="text"
                placeholder="Buscar conversa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F7F7FB] dark:bg-[#121224] text-xs text-[#1B1B2F] dark:text-[#ECECF5] pl-9 pr-3 py-2 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {(['todas', 'minhas', 'nao_atribuidas', 'nao_lidas'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#5B4BDB] text-white shadow-xs'
                      : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]'
                  }`}
                >
                  {tab === 'todas'
                    ? 'Todas'
                    : tab === 'minhas'
                    ? 'Minhas'
                    : tab === 'nao_atribuidas'
                    ? 'Não atribuídas'
                    : 'Não lidas'}
                </button>
              ))}
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E4E4EE]/50 dark:divide-[#2E2E48]/50">
            {filteredChats.map((chat) => {
              const isSelected = chat.id === activeChat?.id;
              return (
                <div
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setMobileView('chat');
                  }}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#5B4BDB]/10 dark:bg-[#5B4BDB]/20 border-l-4 border-l-[#5B4BDB]'
                      : 'hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5B4BDB] to-[#14B8A6] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {chat.avatar || chat.clientName.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5] truncate">
                        {chat.clientName}
                      </h4>
                      <span className="text-[10px] text-[#6B6B80] dark:text-[#9E9EB5]">
                        {chat.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] truncate leading-tight">
                      {chat.lastMessage}
                    </p>

                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] text-[#5B4BDB] dark:text-[#6E60E6] font-medium bg-[#5B4BDB]/10 px-1.5 py-0.5 rounded">
                        {chat.assignedAgent || 'Sem responsável'}
                      </span>
                      {chat.unreadCount > 0 && (
                        <span className="bg-[#14B8A6] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Active Chat Window */}
        <div
          className={`flex-1 flex flex-col bg-[#F7F7FB]/40 dark:bg-[#121224]/40 ${
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-3.5 px-4 bg-white dark:bg-[#1A1A2E] border-b border-[#E4E4EE] dark:border-[#2E2E48] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileView('list')}
                    className="md:hidden p-1.5 text-[#6B6B80] hover:text-[#1B1B2F]"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="w-9 h-9 rounded-full bg-[#5B4BDB]/10 text-[#5B4BDB] font-bold text-xs flex items-center justify-center shrink-0">
                    {activeChat.avatar || activeChat.clientName.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                      {activeChat.clientName}
                    </h3>
                    <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5]">
                      {activeChat.clientPhone} • {activeChat.assignedAgent ? `Resp: ${activeChat.assignedAgent}` : 'Sem atendente'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={activeChat.assignedAgent}
                    onChange={(e) => assignAgent(activeChat.id, e.target.value)}
                    className="text-xs bg-[#F7F7FB] dark:bg-[#121224] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-lg px-2.5 py-1 text-[#1B1B2F] dark:text-[#ECECF5]"
                  >
                    <option value="Marina Silveira">Marina Silveira</option>
                    <option value="Juliana Costa">Juliana Costa</option>
                    <option value="Carlos Eduardo">Carlos Eduardo</option>
                    <option value="Edson Vinicius">Edson Vinicius</option>
                  </select>
                </div>
              </div>

              {/* 24h Window Notice (spec requirement) */}
              {activeChat.window24hExpired && (
                <div className="bg-[#F59E0B]/10 border-b border-[#F59E0B]/30 px-4 py-2 text-xs text-[#B45309] dark:text-[#FBBF24] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>
                      Passaram mais de 24h desde a última mensagem do cliente. Envie um modelo aprovado para retomar.
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => setShowTemplatesMenu(true)}
                  >
                    Ver modelos
                  </Button>
                </div>
              )}

              {/* Messages Scroll Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {activeChat.messages.map((msg) => {
                  if (msg.sender === 'system') {
                    return (
                      <div key={msg.id} className="flex justify-center my-2">
                        <span className="bg-[#E4E4EE]/60 dark:bg-[#2E2E48]/60 text-[#6B6B80] dark:text-[#9E9EB5] text-[11px] px-3 py-1 rounded-full font-medium">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  const isAgent = msg.sender === 'agent';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-md p-3 px-3.5 rounded-2xl shadow-xs text-xs sm:text-sm leading-relaxed ${
                          isAgent
                            ? 'bg-[#5B4BDB] text-white rounded-br-xs'
                            : 'bg-white dark:bg-[#1A1A2E] text-[#1B1B2F] dark:text-[#ECECF5] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-bl-xs'
                        }`}
                      >
                        {msg.mediaType === 'template' && (
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-white/80 border-b border-white/20 pb-1 mb-1.5">
                            <Sparkles className="w-3 h-3" />
                            <span>{msg.templateName || 'Modelo Oficial Meta'}</span>
                          </div>
                        )}
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        <div
                          className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                            isAgent ? 'text-white/70' : 'text-[#6B6B80] dark:text-[#9E9EB5]'
                          }`}
                        >
                          <span>{msg.timestamp}</span>
                          {isAgent && (
                            <span>
                              {msg.status === 'read' ? (
                                <CheckCheck className="w-3.5 h-3.5 text-[#2DD4BF]" />
                              ) : msg.status === 'delivered' ? (
                                <CheckCheck className="w-3.5 h-3.5" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Template Picker Menu */}
              {showTemplatesMenu && (
                <div className="p-3 bg-white dark:bg-[#1A1A2E] border-t border-[#E4E4EE] dark:border-[#2E2E48] space-y-2 animate-in slide-in-from-bottom-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#5B4BDB]">
                      Modelos de Mensagem Aprovados
                    </span>
                    <button
                      onClick={() => setShowTemplatesMenu(false)}
                      className="text-xs text-[#6B6B80] hover:text-[#1B1B2F]"
                    >
                      Fechar
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {templates.map((tpl, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          sendMessage(activeChat.id, tpl.text, 'template');
                          setShowTemplatesMenu(false);
                        }}
                        className="p-2 text-left rounded-lg border border-[#E4E4EE] dark:border-[#2E2E48] hover:border-[#5B4BDB] hover:bg-[#5B4BDB]/5 transition-colors cursor-pointer"
                      >
                        <p className="text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                          {tpl.title}
                        </p>
                        <p className="text-[10px] text-[#6B6B80] dark:text-[#9E9EB5] truncate mt-0.5">
                          {tpl.text}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Composer */}
              <div className="p-3 bg-white dark:bg-[#1A1A2E] border-t border-[#E4E4EE] dark:border-[#2E2E48] flex items-center gap-2">
                <button
                  onClick={() => setShowTemplatesMenu((prev) => !prev)}
                  title="Modelos de mensagem (Atalho: /)"
                  className="p-2 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#5B4BDB] rounded-lg hover:bg-[#F7F7FB] dark:hover:bg-[#25253E] cursor-pointer"
                >
                  <FileText className="w-5 h-5" />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite uma mensagem ou '/' para modelos..."
                    className="w-full bg-[#F7F7FB] dark:bg-[#121224] text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5] px-4 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]"
                  />
                </div>

                <Button
                  onClick={handleSend}
                  variant="primary"
                  size="md"
                  disabled={!inputText.trim()}
                  className="rounded-xl px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-[#6B6B80]">
              Selecione uma conversa para começar a atender.
            </div>
          )}
        </div>

        {/* Column 3: Client Quick Profile (Desktop only) */}
        {activeClient && (
          <div className="hidden lg:flex flex-col w-72 border-l border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#1A1A2E] p-4 overflow-y-auto space-y-4">
            <div className="text-center space-y-2 pb-4 border-b border-[#E4E4EE] dark:border-[#2E2E48]">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#5B4BDB]/10 text-[#5B4BDB] font-bold text-lg flex items-center justify-center">
                {activeClient.name.slice(0, 2).toUpperCase()}
              </div>
              <h4 className="font-bold text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                {activeClient.name}
              </h4>
              <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">{activeClient.phone}</p>
              <div className="flex flex-wrap gap-1 justify-center pt-1">
                {activeClient.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-[#5B4BDB]/10 text-[#5B4BDB] dark:text-[#6E60E6] px-2 py-0.5 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Next appointment */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase text-[#6B6B80] dark:text-[#9E9EB5]">
                Próximo Atendimento
              </span>
              {nextAppointment ? (
                <div className="p-2.5 bg-[#F7F7FB] dark:bg-[#121224] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] text-xs">
                  <p className="font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                    {nextAppointment.serviceName}
                  </p>
                  <p className="text-[#6B6B80] mt-0.5">
                    {nextAppointment.date} às {nextAppointment.time}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[#6B6B80]">Sem agendamento ativo.</p>
              )}
            </div>

            {/* Loyalty points */}
            <div className="p-3 bg-[#14B8A6]/10 rounded-xl border border-[#14B8A6]/20 text-xs">
              <span className="font-bold text-[#0D9488] dark:text-[#2DD4BF] block">
                Fidelidade Lunae
              </span>
              <p className="text-[#1B1B2F] dark:text-[#ECECF5] font-semibold text-sm mt-0.5">
                {activeClient.loyaltyPoints} pontos acumulados
              </p>
            </div>

            {/* Action to open full client dossier */}
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                setSelectedClientId(activeClient.id);
                setCurrentModule('clientes');
              }}
            >
              Abrir ficha completa
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
