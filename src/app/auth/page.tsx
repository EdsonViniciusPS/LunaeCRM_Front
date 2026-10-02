'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
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
  ArrowLeft,
  Calendar,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';


export default function AuthPage() {
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

  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [localValidationMsg, setLocalValidationMsg] = useState<string | null>(null);

  const handleSuccessfulAuth = () => {
    router.push('/crm');
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
      setLocalValidationMsg('Por favor, informe seu nome.');
      return;
    }
    if (!email.trim()) {
      setLocalValidationMsg('Por favor, informe seu e-mail.');
      return;
    }
    if (password.length < 6) {
      setLocalValidationMsg('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalValidationMsg('As senhas digitadas não coincidem.');
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
      setLocalValidationMsg('Informe seu e-mail cadastrado.');
      return;
    }

    setLoading(true);
    const ok = await sendPasswordReset(email.trim());
    setLoading(false);
    if (ok) {
      setResetSent(true);
    }
  };

  const handleDemo = (role: 'admin' | 'atendente' | 'financeiro' = 'admin') => {
    setLocalValidationMsg(null);
    setAuthError(null);
    signInDemo(role);
    handleSuccessfulAuth();
  };

  const activeError = localValidationMsg || authError;

  return (
    <div className="min-h-screen bg-[#F7F7FB] dark:bg-[#0F0F1A] text-[#1B1B2F] dark:text-[#ECECF5] flex flex-col justify-center relative overflow-hidden">
      {/* Ambient background glow orbs for glassmorphism refraction */}
      <div className="fixed top-0 left-10 w-[500px] h-[500px] bg-[#5B4BDB]/12 dark:bg-[#5B4BDB]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-[#14B8A6]/10 dark:bg-[#14B8A6]/12 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Bar with back link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#5B4BDB] dark:hover:text-white transition-colors px-3 py-2 rounded-xl glass-panel border border-white/60 dark:border-white/10 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Início</span>
        </Link>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 py-12 flex items-center justify-center relative z-10">
        <div className="w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Branding, Social Proof & Benefits */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-8 pr-4">
            <div className="flex items-center gap-3">
              <img
                src="/Lunae Solutions/LogoNoBg.png"
                alt="Lunae CRM"
                className="h-10 w-auto object-contain"
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass-pill text-[#5B4BDB] dark:text-[#A78BFA] border border-[#5B4BDB]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" /> O CRM definitivo para negócios de atendimento
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-white tracking-tight mt-4 leading-tight">
                Acelere o crescimento do seu consultório ou clínica
              </h1>
              <p className="text-base text-[#6B6B80] dark:text-[#9E9EB5] mt-3 leading-relaxed">
                Centralize seu WhatsApp, acabe com as faltas através de lembretes automáticos e organize sua agenda com zero conflitos.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl glass-card border border-white/70 dark:border-white/10 shadow-md">
                <div className="p-2.5 rounded-xl bg-[#5B4BDB]/10 text-[#5B4BDB] shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#1B1B2F] dark:text-white">Agenda Inteligente & Multiprofissional</h2>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                    Organize salas, colaboradores e horários sem duplicidade ou estresse.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl glass-card border border-white/70 dark:border-white/10 shadow-md">
                <div className="p-2.5 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#1B1B2F] dark:text-white">WhatsApp Oficial & Lembretes Anti-Falta</h2>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                    Confirmações automáticas 24h e 2h antes com queda de até 74% nas faltas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl glass-card border border-white/70 dark:border-white/10 shadow-md">
                <div className="p-2.5 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#1B1B2F] dark:text-white">Financeiro & Cobrança Pix Integrada</h2>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                    Envie links de pagamento direto na conversa do WhatsApp e reduza calotes.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-4 rounded-2xl glass-card border border-[#5B4BDB]/30 shadow-md">
              <p className="text-xs italic text-[#1B1B2F] dark:text-white leading-relaxed">
                &ldquo;Em menos de um mês usando a Lunae CRM, recuperamos R$ 5.400 em atendimentos que antes eram perdidos por no-show. É indispensável.&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-7 h-7 rounded-full bg-[#5B4BDB] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  C
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B1B2F] dark:text-white">Dra. Camila Duarte</p>
                  <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5]">Clínica Dermatológica Renovare</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Auth Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="glass-card rounded-3xl shadow-2xl border border-white/80 dark:border-white/15 overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#5B4BDB] via-[#14B8A6] to-[#5B4BDB]" />

              <div className="p-6 sm:p-8">
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center gap-2.5 mb-4">
                  <img
                    src="/Lunae Solutions/LogoNoBgIcon.png"
                    alt="Lunae CRM Icon"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-extrabold text-xl tracking-tight text-[#1B1B2F] dark:text-white">
                    Lunae<span className="text-[#5B4BDB]">CRM</span>
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#1B1B2F] dark:text-white">
                  {mode === 'login' && 'Bem-vindo de volta!'}
                  {mode === 'signup' && 'Comece seu teste grátis'}
                  {mode === 'reset' && 'Recuperar Senha'}
                </h2>
                <p className="text-xs sm:text-sm text-[#6B6B80] dark:text-[#9E9EB5] mt-1 mb-6">
                  {mode === 'login' && 'Entre para acessar sua agenda e clientes.'}
                  {mode === 'signup' && '14 dias grátis com todas as ferramentas liberadas.'}
                  {mode === 'reset' && 'Digite seu e-mail para receber as instruções de recuperação.'}
                </p>

                {/* Tab Switcher */}
                {mode !== 'reset' && (
                  <div className="flex p-1 mb-6 bg-[#F7F7FB] dark:bg-[#121224] rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48]">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setLocalValidationMsg(null);
                        setAuthError(null);
                      }}
                      className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                        mode === 'login'
                          ? 'bg-white dark:bg-[#1A1A2E] text-[#5B4BDB] dark:text-white shadow-sm'
                          : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F]'
                      }`}
                    >
                      Entrar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setLocalValidationMsg(null);
                        setAuthError(null);
                      }}
                      className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                        mode === 'signup'
                          ? 'bg-white dark:bg-[#1A1A2E] text-[#5B4BDB] dark:text-white shadow-sm'
                          : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F]'
                      }`}
                    >
                      Criar Conta
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

                {/* Reset Confirmation */}
                {resetSent && (
                  <div className="mb-5 p-4 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#0D9488] dark:text-[#2DD4BF] text-xs space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4" /> E-mail de redefinição enviado com sucesso!
                    </div>
                    <p>Verifique sua caixa de entrada e spam para continuar.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setResetSent(false);
                        setMode('login');
                      }}
                      className="text-[#5B4BDB] dark:text-[#A78BFA] font-bold underline hover:no-underline pt-1 inline-block"
                    >
                      Voltar ao login
                    </button>
                  </div>
                )}

                {/* Google Sign In */}
                {mode !== 'reset' && (
                  <>
                    <button
                      type="button"
                      onClick={handleGoogle}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] hover:bg-[#F7F7FB] dark:hover:bg-[#1C1C36] text-[#1B1B2F] dark:text-white text-sm font-semibold transition-all cursor-pointer shadow-sm hover:shadow disabled:opacity-50"
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

                {/* Login Form */}
                {mode === 'login' && (
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
                            setMode('reset');
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
                          <span>Entrar no CRM</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Sign up Form */}
                {mode === 'signup' && (
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
                          placeholder="Ex: Dra. Camila Duarte"
                          required
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] text-[#1B1B2F] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]/40 focus:border-[#5B4BDB] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mb-1">
                        Nome do seu Negócio / Clínica / Salão
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-[#6B6B80] dark:text-[#9E9EB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Ex: Clínica Renovare"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#121224] text-[#1B1B2F] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4BDB]/40 focus:border-[#5B4BDB] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1B1B2F] dark:text-[#ECECF5] mb-1">
                        E-mail de Acesso
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#6B6B80] dark:text-[#9E9EB5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="contato@clinica.com.br"
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
                          <span>Criando conta...</span>
                        </>
                      ) : (
                        <>
                          <span>Criar Conta & Começar Teste</span>
                          <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Reset Form */}
                {mode === 'reset' && (
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
                          setMode('login');
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

                {/* Instant Demo Access (1-Click) */}
                <div className="mt-6 pt-5 border-t border-[#E4E4EE] dark:border-[#2E2E48]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-semibold text-[#6B6B80] dark:text-[#9E9EB5] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#5B4BDB]" />
                      Acesso Rápido para Avaliação:
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDemo('admin')}
                      className="py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-[#5B4BDB]/10 text-[#5B4BDB] dark:text-[#A78BFA] hover:bg-[#5B4BDB]/20 border border-[#5B4BDB]/20 transition-all text-center cursor-pointer"
                      title="Entrar com perfil de Administrador"
                    >
                      👑 Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDemo('atendente')}
                      className="py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-[#14B8A6]/10 text-[#0D9488] dark:text-[#2DD4BF] hover:bg-[#14B8A6]/20 border border-[#14B8A6]/20 transition-all text-center cursor-pointer"
                      title="Entrar com perfil de Atendimento"
                    >
                      💬 Atendente
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDemo('financeiro')}
                      className="py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-[#F59E0B]/10 text-[#B45309] dark:text-[#FBBF24] hover:bg-[#F59E0B]/20 border border-[#F59E0B]/20 transition-all text-center cursor-pointer"
                      title="Entrar com perfil Financeiro"
                    >
                      💵 Financeiro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
