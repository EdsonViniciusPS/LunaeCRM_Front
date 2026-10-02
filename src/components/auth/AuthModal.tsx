'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { triggerRealisticCannons, triggerConfetti } from '@/lib/confetti';
import {
  X,
  Mail,
  Lock,
  User,
  Building2,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup' | 'reset';
  onSuccess?: () => void;
}

export function AuthModal({
  isOpen,
  onClose,
  defaultTab = 'login',
  onSuccess,
}: AuthModalProps) {
  const router = useRouter();
  const {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInDemo,
    sendPasswordReset,
    authError,
    setAuthError,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'reset'>(defaultTab);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Local feedback states
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [localValidationMsg, setLocalValidationMsg] = useState<string | null>(null);

  const handleSuccessfulAuth = () => {
    triggerRealisticCannons();
    onClose();
    if (onSuccess) {
      onSuccess();
    } else {
      router.push('/crm');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalValidationMsg(null);
    setAuthError(null);

    if (!email || !password) {
      setLocalValidationMsg('Preencha seu e-mail e sua senha.');
      return;
    }

    setLoading(true);
    const ok = await signInWithEmail(email.trim(), password);
    setLoading(false);
    if (ok) {
      handleSuccessfulAuth();
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalValidationMsg(null);
    setAuthError(null);

    if (!name.trim()) {
      setLocalValidationMsg('Por favor, informe seu nome completo.');
      return;
    }
    if (!email.trim()) {
      setLocalValidationMsg('Por favor, informe seu e-mail.');
      return;
    }
    if (password.length < 6) {
      setLocalValidationMsg('A senha precisa ter no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalValidationMsg('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const ok = await signUpWithEmail(
      name.trim(),
      businessName.trim() || 'Minha Empresa',
      email.trim(),
      password
    );
    setLoading(false);
    if (ok) {
      handleSuccessfulAuth();
    }
  };

  const handleGoogle = async () => {
    setLocalValidationMsg(null);
    setAuthError(null);
    setLoading(true);
    const ok = await signInWithGoogle();
    setLoading(false);
    if (ok) {
      handleSuccessfulAuth();
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalValidationMsg(null);
    setAuthError(null);

    if (!email.trim()) {
      setLocalValidationMsg('Informe o e-mail cadastrado para redefinir sua senha.');
      return;
    }

    setLoading(true);
    const ok = await sendPasswordReset(email.trim());
    setLoading(false);
    if (ok) {
      setResetSent(true);
    }
  };

  const handleDemoLogin = (role: 'admin' | 'atendente' | 'financeiro' = 'admin') => {
    setLocalValidationMsg(null);
    setAuthError(null);
    triggerConfetti();
    signInDemo(role);
    handleSuccessfulAuth();
  };

  const activeError = localValidationMsg || authError;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            className="relative w-full max-w-md glass-card rounded-3xl shadow-2xl border border-white/60 dark:border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header decoration bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#5B4BDB] via-[#14B8A6] to-[#5B4BDB]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-white rounded-full hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Logo & Headline */}
          <div className="flex items-center gap-2.5 mb-2">
            <img
              src="/Lunae Solutions/LogoNoBgIcon.png"
              alt="Lunae CRM Icon"
              className="w-8 h-8 object-contain"
            />
            <span className="font-extrabold text-xl tracking-tight text-[#1B1B2F] dark:text-white">
              Lunae<span className="text-[#5B4BDB]">CRM</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#1B1B2F] dark:text-white">
            {activeTab === 'login' && 'Acesse sua conta'}
            {activeTab === 'signup' && 'Comece seu teste grátis'}
            {activeTab === 'reset' && 'Recuperar senha'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B80] dark:text-[#9E9EB5] mt-1 mb-6">
            {activeTab === 'login' && 'Gerencie seus clientes, agenda e WhatsApp em um só lugar.'}
            {activeTab === 'signup' && '14 dias grátis com todas as funções liberadas. Sem cartão.'}
            {activeTab === 'reset' && 'Enviaremos um link de redefinição para o seu e-mail.'}
          </p>

          {/* Tab Selector (for login/signup) */}
          {activeTab !== 'reset' && (
            <div className="flex p-1 mb-6 glass-pill rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setLocalValidationMsg(null);
                  setAuthError(null);
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'login'
                    ? 'bg-white dark:bg-[#1A1A2E] text-[#5B4BDB] dark:text-white shadow-sm'
                    : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F]'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setLocalValidationMsg(null);
                  setAuthError(null);
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'signup'
                    ? 'bg-white dark:bg-[#1A1A2E] text-[#5B4BDB] dark:text-white shadow-sm'
                    : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F]'
                }`}
              >
                Criar Conta Grátis
              </button>
            </div>
          )}


          {/* Error Banner */}
          {activeError && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/30 flex items-start gap-2.5 text-[#DC2626] dark:text-[#F87171] text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">{activeError}</div>
            </div>
          )}

          {/* Reset Sent Confirmation Banner */}
          {resetSent && (
            <div className="mb-5 p-4 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#0D9488] dark:text-[#2DD4BF] text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                E-mail de recuperação enviado!
              </div>
              <p>
                Confira a caixa de entrada (e a pasta de spam) de <strong>{email}</strong> para redefinir sua senha.
              </p>
              <button
                type="button"
                onClick={() => {
                  setResetSent(false);
                  setActiveTab('login');
                }}
                className="text-[#5B4BDB] dark:text-[#A78BFA] font-bold underline hover:no-underline pt-1 inline-block"
              >
                Voltar para o login
              </button>
            </div>
          )}

          {/* Google Sign In Button */}
          {activeTab !== 'reset' && (
            <>
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] hover:bg-[#F7F7FB] dark:hover:bg-[#1C1C36] text-[#1B1B2F] dark:text-white text-sm font-semibold transition-all cursor-pointer shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continuar com o Google</span>
              </button>

              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E4E4EE] dark:border-[#2E2E48]" />
                </div>
                <span className="relative px-3 bg-white dark:bg-[#1A1A2E] text-xs uppercase font-medium text-[#6B6B80] dark:text-[#9E9EB5]">
                  ou com seu e-mail
                </span>
              </div>
            </>
          )}

          {/* Form Content */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mb-1.5">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B6B80] dark:text-[#9E9EB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] text-[#1B1B2F] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]/40 focus:border-[#5B4BDB] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5]">
                    Senha
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('reset');
                      setLocalValidationMsg(null);
                      setAuthError(null);
                    }}
                    className="text-xs text-[#5B4BDB] dark:text-[#A78BFA] hover:underline cursor-pointer"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6B6B80] dark:text-[#9E9EB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] text-[#1B1B2F] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]/40 focus:border-[#5B4BDB] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F]"
                    aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#5B4BDB] hover:bg-[#4A3BC4] text-white font-semibold text-sm shadow-md hover:shadow-lg shadow-[#5B4BDB]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar na Conta</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mb-1">
                  Seu Nome Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6B6B80] dark:text-[#9E9EB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Dra. Camila Lima"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] text-[#1B1B2F] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]/40 focus:border-[#5B4BDB] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mb-1">
                  Nome do Negócio / Clínica / Salão
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#6B6B80] dark:text-[#9E9EB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Ex: Espaço Estética Renovare"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] text-[#1B1B2F] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]/40 focus:border-[#5B4BDB] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mb-1">
                  E-mail Profissional
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B6B80] dark:text-[#9E9EB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@empresa.com"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] text-[#1B1B2F] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]/40 focus:border-[#5B4BDB] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mín. 6 dígitos"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] text-[#1B1B2F] dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]/40 focus:border-[#5B4BDB] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a senha"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] text-[#1B1B2F] dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]/40 focus:border-[#5B4BDB] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-[#5B4BDB] to-[#4A3BC4] hover:from-[#4A3BC4] hover:to-[#382BB0] text-white font-semibold text-sm shadow-md hover:shadow-lg shadow-[#5B4BDB]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Criando sua conta...</span>
                  </>
                ) : (
                  <>
                    <span>Criar Minha Conta Grátis</span>
                    <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5] text-center mt-2 leading-relaxed">
                Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade (LGPD).
              </p>
            </form>
          )}

          {activeTab === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mb-1.5">
                  Informe o e-mail cadastrado
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B6B80] dark:text-[#9E9EB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] text-[#1B1B2F] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]/40 focus:border-[#5B4BDB] transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setLocalValidationMsg(null);
                    setAuthError(null);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] text-xs sm:text-sm font-semibold text-[#6B6B80] dark:text-[#9E9EB5] hover:bg-[#F7F7FB] dark:hover:bg-[#25253E] transition-colors"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#5B4BDB] hover:bg-[#4A3BC4] text-white text-xs sm:text-sm font-semibold shadow transition-all disabled:opacity-60 flex items-center justify-center gap-1.5"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enviar Link'}
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Access (Instant evaluation without credentials) */}
          <div className="mt-6 pt-5 border-t border-[#E4E4EE] dark:border-[#2E2E48]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-semibold text-[#6B6B80] dark:text-[#9E9EB5] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#5B4BDB]" />
                Modo Demonstração Instantâneo:
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-[#5B4BDB]/10 text-[#5B4BDB] dark:text-[#A78BFA] hover:bg-[#5B4BDB]/20 border border-[#5B4BDB]/20 transition-all text-center cursor-pointer"
                title="Entrar com perfil completo de Administrador"
              >
                👑 Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('atendente')}
                className="py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-[#14B8A6]/10 text-[#0D9488] dark:text-[#2DD4BF] hover:bg-[#14B8A6]/20 border border-[#14B8A6]/20 transition-all text-center cursor-pointer"
                title="Entrar com perfil de Atendimento / Recepção"
              >
                💬 Atendente
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('financeiro')}
                className="py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-[#F59E0B]/10 text-[#B45309] dark:text-[#FBBF24] hover:bg-[#F59E0B]/20 border border-[#F59E0B]/20 transition-all text-center cursor-pointer"
                title="Entrar com perfil Financeiro"
              >
                💵 Financeiro
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
);
}
