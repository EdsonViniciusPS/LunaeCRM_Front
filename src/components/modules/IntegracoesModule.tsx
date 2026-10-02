'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Integration } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import {
  Plug,
  MessageSquare,
  Calendar,
  CreditCard,
  Mail,
  Code,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export function IntegracoesModule() {
  const { integrations, toggleIntegration, showToast } = useApp();

  const [disconnectModalItem, setDisconnectModalItem] = useState<Integration | null>(null);

  const getIntegrationIcon = (key: string) => {
    switch (key) {
      case 'whatsapp':
        return <MessageSquare className="w-6 h-6 text-[#14B8A6]" />;
      case 'gcalendar':
        return <Calendar className="w-6 h-6 text-[#5B4BDB]" />;
      case 'payments':
        return <CreditCard className="w-6 h-6 text-[#F59E0B]" />;
      case 'sms_email':
        return <Mail className="w-6 h-6 text-[#5B4BDB]" />;
      default:
        return <Code className="w-6 h-6 text-[#6B6B80]" />;
    }
  };

  const handleAction = (item: Integration) => {
    if (item.connected) {
      setDisconnectModalItem(item);
    } else {
      toggleIntegration(item.id);
      showToast(`${item.name} conectado com sucesso. Última sincronização agora.`, 'success');
    }
  };

  const handleConfirmDisconnect = () => {
    if (!disconnectModalItem) return;
    toggleIntegration(disconnectModalItem.id);
    setDisconnectModalItem(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            Integrações e Conexões Externas
          </h2>
          <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
            Conecte suas ferramentas de agenda, mensageria e gateway de pagamento.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map((item) => (
          <Card key={item.id} className="p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F7F7FB] dark:bg-[#121224] border border-[#E4E4EE] dark:border-[#2E2E48] flex items-center justify-center shrink-0 shadow-xs">
                  {getIntegrationIcon(item.key)}
                </div>
                <Badge variant={item.connected ? 'success' : 'neutral'}>
                  {item.connected ? 'Conectado' : 'Desconectado'}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                  {item.name}
                </h3>
                <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.connected && item.lastSync && (
                <div className="text-[11px] text-[#14B8A6] font-medium flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.lastSync}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E4E4EE] dark:border-[#2E2E48]">
              <Button
                variant={item.connected ? 'secondary' : 'primary'}
                size="sm"
                className="w-full text-xs"
                onClick={() => handleAction(item)}
              >
                {item.connected ? 'Desconectar' : 'Conectar ferramenta'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Disconnect Modal (Exact copy from spec) */}
      {disconnectModalItem && (
        <Modal
          isOpen={!!disconnectModalItem}
          onClose={() => setDisconnectModalItem(null)}
          title={`Desconectar ${disconnectModalItem.name}?`}
          description={
            disconnectModalItem.key === 'whatsapp'
              ? 'Você deixa de enviar e receber mensagens e as automações serão pausadas.'
              : `A sincronização com ${disconnectModalItem.name} será interrompida.`
          }
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDisconnectModalItem(null)}
              >
                Manter conectado
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleConfirmDisconnect}
              >
                Desconectar
              </Button>
            </div>
          }
        >
          <div className="p-4 bg-[#DC2626]/5 rounded-xl border border-[#DC2626]/20 text-xs text-[#DC2626] leading-relaxed">
            Após desconectar, agendamentos e lembretes automáticos vinculados a esta ferramenta ficarão suspensos até nova reconexão.
          </div>
        </Modal>
      )}
    </div>
  );
}
