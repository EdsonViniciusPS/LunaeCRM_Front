'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LoyaltyReward, LoyaltyCoupon } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import {
  Gift,
  Ticket,
  Sparkles,
  Award,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
} from 'lucide-react';

export function FidelizacaoModule() {
  const { loyaltyRewards, loyaltyCoupons, clients, redeemPoints, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'programa' | 'recompensas' | 'cupons'>('programa');
  const [redeemModalReward, setRedeemModalReward] = useState<LoyaltyReward | null>(null);
  const [selectedClientForRedeem, setSelectedClientForRedeem] = useState<string>(clients[0]?.id || '');

  const client = clients.find((c) => c.id === selectedClientForRedeem) || clients[0];

  const handleConfirmRedeem = () => {
    if (!redeemModalReward || !client) return;
    const success = redeemPoints(client.id, redeemModalReward.id);
    if (success) {
      setRedeemModalReward(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            Programa de Fidelidade e Cupons
          </h2>
          <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
            Recompense clientes recorrentes e aumente a retenção média em até 35%.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E4E4EE] dark:border-[#2E2E48] pb-1 overflow-x-auto">
        {(['programa', 'recompensas', 'cupons'] as const).map((tab) => (
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

      {/* Tab 1: Programa de Pontos */}
      {activeTab === 'programa' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#5B4BDB]" />
                <h3 className="text-base font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                  Regra Ativa do Programa
                </h3>
              </div>
              <Badge variant="success">Ativo</Badge>
            </div>

            <div className="p-4 bg-[#5B4BDB]/5 border border-[#5B4BDB]/20 rounded-2xl space-y-2">
              <h4 className="text-sm font-bold text-[#5B4BDB]">
                1 ponto a cada R$ 10,00 gastos
              </h4>
              <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
                Calculado automaticamente a cada pagamento confirmado em qualquer procedimento ou produto.
              </p>
            </div>

            {/* Simulação de saldo do cliente */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B6B80]">
                Simular Resgate na Ficha do Cliente
              </h4>
              <div className="p-4 bg-white dark:bg-[#1A1A2E] rounded-2xl border border-[#E4E4EE] dark:border-[#2E2E48] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                    {client.name}
                  </span>
                  <span className="text-xs font-bold text-[#5B4BDB]">
                    {client.loyaltyPoints} pontos disponíveis
                  </span>
                </div>

                {/* Progress bar towards next reward */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-[#6B6B80]">
                    <span>Próxima recompensa (100 pts)</span>
                    <span className="font-semibold text-[#14B8A6]">
                      {client.loyaltyPoints >= 100
                        ? 'Recompensa liberada!'
                        : `Faltam ${100 - client.loyaltyPoints} pontos`}
                    </span>
                  </div>
                  <div className="w-full bg-[#E4E4EE] dark:bg-[#2E2E48] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#14B8A6] h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (client.loyaltyPoints / 100) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setRedeemModalReward(loyaltyRewards[0])}
                  >
                    Resgatar benefício
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick FAQ / Specs info */}
          <div className="space-y-4">
            <Card className="p-5 space-y-2">
              <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                Regras de Resgate
              </h4>
              <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
                O resgate não pode ser desfeito sem autorização de nível Gerente ou Administrador, garantindo a integridade financeira do caixa.
              </p>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: Catálogo de Recompensas */}
      {activeTab === 'recompensas' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {loyaltyRewards.map((reward) => (
            <Card key={reward.id} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#5B4BDB] uppercase tracking-wider">
                  {reward.pointsRequired} PONTOS
                </span>
                <Badge variant={reward.active ? 'success' : 'neutral'}>
                  {reward.active ? 'Ativo' : 'Pausado'}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
                {reward.title}
              </h3>
              <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
                {reward.description}
              </p>

              <div className="pt-2 border-t border-[#E4E4EE] dark:border-[#2E2E48]">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => setRedeemModalReward(reward)}
                >
                  Resgatar para cliente
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 3: Cupons de Desconto */}
      {activeTab === 'cupons' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {loyaltyCoupons.map((coupon) => (
            <Card
              key={coupon.id}
              className={`p-5 space-y-3 ${
                !coupon.active ? 'opacity-60 bg-[#F7F7FB] dark:bg-[#121224]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold bg-[#5B4BDB]/10 text-[#5B4BDB] px-2.5 py-1 rounded-lg">
                  {coupon.code}
                </span>
                <Badge variant={coupon.active ? 'success' : 'danger'}>
                  {coupon.active ? 'Válido' : 'Expirado'}
                </Badge>
              </div>

              <div className="text-2xl font-bold text-[#14B8A6]">
                {coupon.discountPercent}% OFF
              </div>

              <div className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] space-y-1">
                <p>Validade: até {coupon.validUntil}</p>
                <p>Usos: {coupon.totalUses} de {coupon.maxUses}</p>
              </div>

              {!coupon.active && (
                <p className="text-xs text-[#DC2626] font-medium pt-1">
                  Este cupom expirou em 30/09. Gere um novo ou prorrogue a validade.
                </p>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Resgate (Exact copy from spec) */}
      {redeemModalReward && (
        <Modal
          isOpen={!!redeemModalReward}
          onClose={() => setRedeemModalReward(null)}
          title={`Resgatar ${redeemModalReward.pointsRequired} pontos de ${client.name} por '${redeemModalReward.title}'?`}
          description="Essa ação debitará os pontos do cliente e gerará uma ordem de cortesia no sistema."
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRedeemModalReward(null)}
              >
                Voltar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmRedeem}
              >
                Resgatar
              </Button>
            </div>
          }
        >
          <div className="p-4 bg-[#14B8A6]/10 rounded-xl border border-[#14B8A6]/20 text-xs text-[#0D9488] dark:text-[#2DD4BF] leading-relaxed">
            Saldo atual: <strong>{client.loyaltyPoints} pontos</strong>. Saldo após o resgate: <strong>{Math.max(0, client.loyaltyPoints - redeemModalReward.pointsRequired)} pontos</strong>.
          </div>
        </Modal>
      )}
    </div>
  );
}
