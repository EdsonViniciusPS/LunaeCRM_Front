'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserMember } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { Input, Select } from '@/components/common/Input';
import {
  UserCheck,
  Plus,
  Mail,
  Shield,
  Clock,
  RotateCcw,
  AlertCircle,
  UserX,
} from 'lucide-react';

export function UsuariosModule() {
  const { users, inviteUser, toggleUserStatus, showToast } = useApp();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserMember['role']>('Atendente');

  const [deactivateUserTarget, setDeactivateUserTarget] = useState<UserMember | null>(null);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    inviteUser(inviteEmail.trim(), inviteRole);
    setIsInviteModalOpen(false);
    setInviteEmail('');
  };

  const handleConfirmDeactivate = () => {
    if (!deactivateUserTarget) return;
    toggleUserStatus(deactivateUserTarget.id);
    setDeactivateUserTarget(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B2F] dark:text-[#ECECF5]">
            Membros da Equipe e Usuários
          </h2>
          <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
            Gerencie os profissionais e atendentes com acesso ao sistema.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsInviteModalOpen(true)}
        >
          Convidar usuário
        </Button>
      </div>

      <Card className="p-0 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F7FB] dark:bg-[#121224] text-[#6B6B80] dark:text-[#9E9EB5] font-semibold uppercase text-[11px] border-b border-[#E4E4EE] dark:border-[#2E2E48]">
              <tr>
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">E-mail</th>
                <th className="py-3 px-4">Função</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Último Acesso</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4EE] dark:divide-[#2E2E48]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F7FB] dark:hover:bg-[#25253E]/50">
                  <td className="py-3.5 px-4 font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                    {u.name}
                  </td>
                  <td className="py-3.5 px-4 text-[#6B6B80] dark:text-[#9E9EB5]">
                    {u.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-xs text-[#5B4BDB] bg-[#5B4BDB]/10 px-2 py-0.5 rounded">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        u.status === 'ativo'
                          ? 'success'
                          : u.status === 'pendente'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {u.status === 'ativo'
                        ? 'Ativo'
                        : u.status === 'pendente'
                        ? 'Convite pendente'
                        : 'Inativo'}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-[#6B6B80] dark:text-[#9E9EB5]">
                    {u.lastAccess}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {u.status === 'pendente' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => showToast(`Convite reenviado para ${u.email}.`, 'info')}
                          className="text-xs font-semibold text-[#5B4BDB] hover:underline cursor-pointer"
                        >
                          Reenviar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeactivateUserTarget(u)}
                        className={`text-xs font-semibold hover:underline cursor-pointer ${
                          u.status === 'ativo' ? 'text-[#DC2626]' : 'text-[#14B8A6]'
                        }`}
                      >
                        {u.status === 'ativo' ? 'Desativar' : 'Reativar'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal: Convidar Usuário */}
      {isInviteModalOpen && (
        <Modal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          title="Convidar usuário"
          description="O profissional receberá um link por e-mail para definir a senha."
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsInviteModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSendInvite}
              >
                Enviar convite
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSendInvite} className="space-y-4">
            <Input
              label="E-mail profissional *"
              type="email"
              placeholder="profissional@email.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
            />
            <Select
              label="Função no Lunae *"
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as UserMember['role'])}
            >
              <option value="Atendente">Atendente (Agenda e WhatsApp)</option>
              <option value="Gerente">Gerente (Acesso total exceto financeiro avançado)</option>
              <option value="Financeiro">Financeiro (Cobranças e relatórios)</option>
              <option value="Somente leitura">Somente leitura (Visualização)</option>
              <option value="Administrador">Administrador (Controle completo)</option>
            </Select>
          </form>
        </Modal>
      )}

      {/* Modal: Desativar Usuário (Exact copy from spec) */}
      {deactivateUserTarget && (
        <Modal
          isOpen={!!deactivateUserTarget}
          onClose={() => setDeactivateUserTarget(null)}
          title={`Desativar ${deactivateUserTarget.name}?`}
          description="Ela perde o acesso agora, mas o histórico dela é mantido."
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeactivateUserTarget(null)}
              >
                Manter ativa
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleConfirmDeactivate}
              >
                Desativar
              </Button>
            </div>
          }
        >
          <div className="p-4 bg-[#DC2626]/5 rounded-xl border border-[#DC2626]/20 text-xs text-[#DC2626]">
            Os agendamentos passados e notas criadas por este usuário permanecerão intactos no banco de dados.
          </div>
        </Modal>
      )}
    </div>
  );
}
