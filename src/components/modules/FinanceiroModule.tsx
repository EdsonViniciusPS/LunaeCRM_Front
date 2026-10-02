'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Transaction, PaymentMethod, TransactionStatus } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { Input, Select } from '@/components/common/Input';
import { EmptyState } from '@/components/common/EmptyState';
import {
  DollarSign,
  Plus,
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  RotateCcw,
  Share2,
  CreditCard,
  QrCode,
  FileText,
  TrendingUp,
} from 'lucide-react';

export function FinanceiroModule() {
  const {
    transactions,
    addTransaction,
    markTransactionPaid,
    refundTransaction,
    clients,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'recebimentos' | 'pendencias' | 'recorrencias' | 'historico'>('recebimentos');
  const [isNewChargeModalOpen, setIsNewChargeModalOpen] = useState(false);
  const [refundModalTx, setRefundModalTx] = useState<Transaction | null>(null);

  // New charge form
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('2026-10-05');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [sendWhatsAppImmediate, setSendWhatsAppImmediate] = useState(true);

  // Metrics calculation
  const totalReceived = transactions
    .filter((t) => t.status === 'pago')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalPending = transactions
    .filter((t) => t.status === 'pendente')
    .reduce((acc, t) => acc + t.amount, 0);

  const delayedList = transactions.filter((t) => t.status === 'atrasado');
  const totalDelayed = delayedList.reduce((acc, t) => acc + t.amount, 0);

  // Filtered by tab
  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === 'recebimentos') return t.status === 'pago';
    if (activeTab === 'pendencias') return t.status === 'pendente' || t.status === 'atrasado';
    if (activeTab === 'recorrencias') return false; // In preparation
    return true; // historico
  });

  const handleCreateCharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    const client = clients.find((c) => c.id === clientId) || clients[0];

    addTransaction({
      clientId: client.id,
      clientName: client.name,
      description,
      amount: parseFloat(amount),
      dueDate,
      paymentMethod,
      status: 'pendente',
    });

    if (sendWhatsAppImmediate) {
      showToast(`Link de pagamento Pix enviado para o WhatsApp de ${client.name}!`, 'success');
    }

    setIsNewChargeModalOpen(false);
    setDescription('');
    setAmount('');
  };

  const handleConfirmRefund = () => {
    if (!refundModalTx) return;
    refundTransaction(refundModalTx.id);
    setRefundModalTx(null);
  };

  const getMethodBadge = (method: PaymentMethod) => {
    switch (method) {
      case 'pix':
        return <span className="bg-[#14B8A6]/10 text-[#0D9488] font-bold text-[10px] px-2 py-0.5 rounded">PIX</span>;
      case 'cartao':
        return <span className="bg-[#5B4BDB]/10 text-[#5B4BDB] font-bold text-[10px] px-2 py-0.5 rounded">CARTÃO</span>;
      case 'boleto':
        return <span className="bg-[#6B6B80]/10 text-[#6B6B80] font-bold text-[10px] px-2 py-0.5 rounded">BOLETO</span>;
      case 'link':
        return <span className="bg-[#F59E0B]/10 text-[#D97706] font-bold text-[10px] px-2 py-0.5 rounded">LINK</span>;
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'pago':
        return <Badge variant="success">Pago</Badge>;
      case 'pendente':
        return <Badge variant="warning">Pendente</Badge>;
      case 'atrasado':
        return <Badge variant="danger">Atrasado</Badge>;
      case 'reembolsado':
        return <Badge variant="neutral">Reembolsado</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      {/* Top Header & CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            Controle Financeiro
          </h2>
          <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
            Acompanhe recebimentos, emita links Pix e envie cobranças amigáveis por WhatsApp.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsNewChargeModalOpen(true)}
        >
          Nova cobrança
        </Button>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Recebido */}
        <Card variant="metric">
          <span className="text-xs font-medium text-[#6B6B80] dark:text-[#9E9EB5]">
            Recebido no Período
          </span>
          <div className="text-2xl font-bold text-[#14B8A6] mt-1">
            R$ {totalReceived.toFixed(2)}
          </div>
          <p className="text-[11px] text-[#6B6B80] mt-1">Valores confirmados na conta</p>
        </Card>

        {/* A Receber */}
        <Card variant="metric">
          <span className="text-xs font-medium text-[#6B6B80] dark:text-[#9E9EB5]">
            A Receber (Previsto)
          </span>
          <div className="text-2xl font-bold text-[#5B4BDB] dark:text-[#6E60E6] mt-1">
            R$ {totalPending.toFixed(2)}
          </div>
          <p className="text-[11px] text-[#6B6B80] mt-1">Cobranças dentro do prazo</p>
        </Card>

        {/* Atrasado (spec alert copy) */}
        <Card variant="metric" className="border-l-4 border-l-[#DC2626]">
          <span className="text-xs font-bold text-[#DC2626] uppercase">
            Atrasado
          </span>
          <div className="text-2xl font-bold text-[#DC2626] mt-1">
            R$ {totalDelayed.toFixed(2)}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-[#DC2626] font-medium">
              {delayedList.length} cobranças em atraso
            </span>
            <button
              onClick={() => {
                showToast('Lembretes de cobrança enviados via WhatsApp para todos os atrasados!', 'success');
              }}
              className="text-[11px] font-bold text-[#DC2626] hover:underline cursor-pointer"
            >
              Cobrar via WhatsApp
            </button>
          </div>
        </Card>
      </div>

      {/* Notice Banner when delayed transactions exist (Exact copy from spec) */}
      {delayedList.length > 0 && (
        <div className="p-4 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0" />
            <p className="text-xs text-[#DC2626] font-medium leading-relaxed">
              <strong>{delayedList.length} cobranças atrasadas somam R$ {totalDelayed.toFixed(2)}.</strong> Deseja enviar lembretes de pagamento com link Pix?
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => showToast('Disparando lembrete de pagamento no WhatsApp...', 'info')}
          >
            Enviar lembrete de pagamento
          </Button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E4E4EE] dark:border-[#2E2E48] pb-1 overflow-x-auto">
        {(['recebimentos', 'pendencias', 'recorrencias', 'historico'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl transition-colors cursor-pointer capitalize ${
              activeTab === tab
                ? 'border-b-2 border-b-[#5B4BDB] text-[#5B4BDB] dark:text-[#6E60E6] bg-white dark:bg-[#1A1A2E]'
                : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transactions Table / List */}
      {filteredTransactions.length === 0 ? (
        <EmptyState
          icon={<DollarSign className="w-6 h-6" />}
          title="Nenhum pagamento registrado"
          description="Nenhum pagamento registrado nesta aba. Crie uma cobrança ou conecte seu meio de pagamento."
          actionText="Nova cobrança"
          onAction={() => setIsNewChargeModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-[#1A1A2E] border border-[#E4E4EE] dark:border-[#2E2E48] rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F7FB] dark:bg-[#121224] border-b border-[#E4E4EE] dark:border-[#2E2E48] text-[#6B6B80] dark:text-[#9E9EB5] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Descrição</th>
                  <th className="py-3 px-4">Vencimento</th>
                  <th className="py-3 px-4">Forma</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Valor</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4EE] dark:divide-[#2E2E48]">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                      {tx.clientName}
                    </td>
                    <td className="py-3.5 px-4 text-[#6B6B80] dark:text-[#9E9EB5]">
                      {tx.description}
                    </td>
                    <td className="py-3.5 px-4 text-[#6B6B80] dark:text-[#9E9EB5]">
                      {tx.dueDate}
                    </td>
                    <td className="py-3.5 px-4">{getMethodBadge(tx.paymentMethod)}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(tx.status)}</td>
                    {/* Aligned to right as specified: R$ 1.234,56 */}
                    <td
                      className={`py-3.5 px-4 text-right font-bold ${
                        tx.status === 'atrasado'
                          ? 'text-[#DC2626]'
                          : 'text-[#1B1B2F] dark:text-[#ECECF5]'
                      }`}
                    >
                      R$ {tx.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {tx.status === 'pendente' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 text-xs px-2.5"
                            onClick={() => markTransactionPaid(tx.id)}
                          >
                            Marcar pago
                          </Button>
                        )}
                        {tx.status === 'atrasado' && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="h-8 text-xs px-2.5"
                            onClick={() => {
                              showToast(`Cobrança de R$ ${tx.amount.toFixed(2)} reenviada para o WhatsApp de ${tx.clientName}!`, 'success');
                            }}
                          >
                            Cobrar WhatsApp
                          </Button>
                        )}
                        {tx.status === 'pago' && (
                          <button
                            onClick={() => setRefundModalTx(tx)}
                            className="text-xs text-[#DC2626] hover:underline cursor-pointer px-2 py-1"
                          >
                            Reembolsar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Nova Cobrança */}
      {isNewChargeModalOpen && (
        <Modal
          isOpen={isNewChargeModalOpen}
          onClose={() => setIsNewChargeModalOpen(false)}
          title="Nova cobrança"
          description="Gere um pagamento com confirmação instantânea."
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsNewChargeModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateCharge}
              >
                Gerar cobrança
              </Button>
            </div>
          }
        >
          <form onSubmit={handleCreateCharge} className="space-y-4">
            <Select
              label="Cliente *"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.phone}
                </option>
              ))}
            </Select>

            <Input
              label="Descrição do Procedimento / Venda *"
              placeholder="Ex: Limpeza de Pele Profunda + Sérum"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Valor (R$) *"
                type="number"
                step="0.01"
                placeholder="220.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <Input
                label="Data de Vencimento *"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <Select
              label="Forma de Cobrança"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            >
              <option value="pix">Pix (Chave com QR Code Copia e Cola)</option>
              <option value="link">Link de Pagamento (Cartão até 12x)</option>
              <option value="cartao">Cartão de Crédito/Débito Presencial</option>
              <option value="boleto">Boleto Bancário</option>
            </Select>

            <div className="p-3 bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-xl flex items-center gap-2">
              <input
                type="checkbox"
                id="sendWa"
                checked={sendWhatsAppImmediate}
                onChange={(e) => setSendWhatsAppImmediate(e.target.checked)}
                className="w-4 h-4 text-[#14B8A6] rounded"
              />
              <label htmlFor="sendWa" className="text-xs text-[#0D9488] dark:text-[#2DD4BF] font-medium">
                Enviar link Pix de pagamento automaticamente pelo WhatsApp do cliente
              </label>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Estorno / Reembolso (Exact copy from spec) */}
      {refundModalTx && (
        <Modal
          isOpen={!!refundModalTx}
          onClose={() => setRefundModalTx(null)}
          title={`Reembolsar R$ ${refundModalTx.amount.toFixed(2)} para ${refundModalTx.clientName}?`}
          description="Essa ação não pode ser desfeita. O valor será estornado e registrado no extrato do cliente."
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRefundModalTx(null)}
              >
                Voltar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleConfirmRefund}
              >
                Reembolsar
              </Button>
            </div>
          }
        >
          <div className="p-4 bg-[#DC2626]/5 rounded-xl border border-[#DC2626]/20 text-xs text-[#DC2626] leading-relaxed">
            O comprovante de reembolso será gerado automaticamente e uma notificação de estorno será enviada ao cliente.
          </div>
        </Modal>
      )}
    </div>
  );
}
