'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, User, Calendar, MessageSquare, Plus, ArrowRight, X } from 'lucide-react';
import { ModuleType } from '@/types';

export function GlobalSearchModal() {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    setCurrentModule,
    clients,
    appointments,
    conversations,
    setSelectedClientId,
    setActiveChatId,
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setQuery('');
    setIsGlobalSearchOpen(false);
  };

  useEffect(() => {
    if (isGlobalSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query) ||
      c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredAppointments = appointments.filter(
    (a) =>
      a.clientName.toLowerCase().includes(query.toLowerCase()) ||
      a.serviceName.toLowerCase().includes(query.toLowerCase()) ||
      a.professionalName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredChats = conversations.filter(
    (chat) =>
      chat.clientName.toLowerCase().includes(query.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setCurrentModule('clientes');
    handleClose();
  };

  const handleSelectAppointment = () => {
    setCurrentModule('agenda');
    handleClose();
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setCurrentModule('whatsapp');
    handleClose();
  };

  const handleNavigate = (mod: ModuleType) => {
    setCurrentModule(mod);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl glass-panel rounded-3xl shadow-2xl border border-white/60 dark:border-white/10 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/40 dark:border-white/10 gap-3">
          <Search className="w-5 h-5 text-[#5B4BDB] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar clientes, atendimentos, conversas ou módulos..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1B1B2F] dark:text-[#ECECF5] placeholder:text-[#6B6B80] dark:placeholder:text-[#9E9EB5] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#6B6B80] hover:text-[#1B1B2F] dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded-lg border border-white/60 dark:border-white/10 text-[#6B6B80] dark:text-[#9E9EB5] glass-pill">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          {!query && (
            <div>
              <p className="text-xs font-semibold text-[#6B6B80] dark:text-[#9E9EB5] px-3 py-1">
                Ações Rápidas
              </p>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                <button
                  onClick={() => handleNavigate('agenda')}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left text-[#1B1B2F] dark:text-[#ECECF5] hover:glass-card transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#5B4BDB]" />
                  <span>Novo Agendamento</span>
                </button>
                <button
                  onClick={() => handleNavigate('clientes')}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left text-[#1B1B2F] dark:text-[#ECECF5] hover:glass-card transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#5B4BDB]" />
                  <span>Novo Cliente</span>
                </button>
                <button
                  onClick={() => handleNavigate('financeiro')}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left text-[#1B1B2F] dark:text-[#ECECF5] hover:glass-card transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#5B4BDB]" />
                  <span>Nova Cobrança</span>
                </button>
                <button
                  onClick={() => handleNavigate('whatsapp')}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left text-[#1B1B2F] dark:text-[#ECECF5] hover:glass-card transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#14B8A6]" />
                  <span>Abrir WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {/* Clientes */}
          {filteredClients.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#6B6B80] dark:text-[#9E9EB5] px-3 py-1 flex items-center justify-between">
                <span>Clientes</span>
                <span className="text-[10px]">{filteredClients.length}</span>
              </p>
              <div className="space-y-1 mt-1">
                {filteredClients.slice(0, 4).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectClient(c.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:glass-card transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#5B4BDB]/10 text-[#5B4BDB] font-semibold text-xs flex items-center justify-center">
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1B1B2F] dark:text-[#ECECF5]">
                          {c.name}
                        </p>
                        <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">{c.phone}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6B6B80] opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Agendamentos */}
          {filteredAppointments.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#6B6B80] dark:text-[#9E9EB5] px-3 py-1 flex items-center justify-between">
                <span>Atendimentos</span>
                <span className="text-[10px]">{filteredAppointments.length}</span>
              </p>
              <div className="space-y-1 mt-1">
                {filteredAppointments.slice(0, 3).map((a) => (
                  <button
                    key={a.id}
                    onClick={handleSelectAppointment}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:glass-card transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#5B4BDB]" />
                      <div>
                        <p className="text-sm font-medium text-[#1B1B2F] dark:text-[#ECECF5]">
                          {a.clientName} — {a.serviceName}
                        </p>
                        <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
                          {a.time} com {a.professionalName}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversas WhatsApp */}
          {filteredChats.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#6B6B80] dark:text-[#9E9EB5] px-3 py-1 flex items-center justify-between">
                <span>Conversas WhatsApp</span>
                <span className="text-[10px]">{filteredChats.length}</span>
              </p>
              <div className="space-y-1 mt-1">
                {filteredChats.slice(0, 3).map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:glass-card transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 text-[#14B8A6]" />
                      <div>
                        <p className="text-sm font-medium text-[#1B1B2F] dark:text-[#ECECF5]">
                          {chat.clientName}
                        </p>
                        <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] truncate max-w-xs">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query &&
            filteredClients.length === 0 &&
            filteredAppointments.length === 0 &&
            filteredChats.length === 0 && (
              <div className="py-8 text-center text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
                Nenhum resultado encontrado para &quot;{query}&quot;.
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-white/20 dark:bg-black/20 border-t border-white/40 dark:border-white/10 text-[11px] text-[#6B6B80] dark:text-[#9E9EB5] flex items-center justify-between">
          <span>Dica: Use as setas para navegar e Enter para selecionar</span>
          <span>Lunae CRM</span>
        </div>
      </div>
    </div>
  );
}
