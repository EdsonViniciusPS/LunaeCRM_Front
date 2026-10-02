'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import {
  Calendar,
  MessageSquare,
  BellRing,
  Users,
  GitBranch,
  DollarSign,
  Zap,
  Megaphone,
  Gift,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Play,
  Smartphone,
  Check,
  TrendingUp,
  Moon,
  Sun,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollProgress } from '@/components/animation/ScrollProgress';
import { FadeIn } from '@/components/animation/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animation/Stagger';
import { AnimatedCounter } from '@/components/animation/AnimatedNumber';
import { triggerConfetti, triggerRealisticCannons, triggerStars } from '@/lib/confetti';

export function LandingPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal controls
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup' | 'reset'>('signup');

  // Dark mode state for the landing page
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Billing toggle (Monthly vs Annual)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // FAQ accordion open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive mouse tracking for Hero spotlight and parallax
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleOpenAuth = (tab: 'login' | 'signup', celebrate = false) => {
    if (celebrate) {
      triggerConfetti();
    }
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
    if (cycle === 'annual') {
      triggerStars();
    }
  };

  const handleDirectDemoAccess = () => {
    triggerConfetti();
    router.push('/crm');
  };

  // Toggle dark class on root document
  const toggleDarkTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen bg-[#F7F7FB] dark:bg-[#0F0F1A] text-[#1B1B2F] dark:text-[#ECECF5] selection:bg-[#5B4BDB]/20 selection:text-[#5B4BDB] font-sans transition-colors duration-200 relative overflow-hidden`}>
      {/* Top Reading Scroll Progress Bar */}
      <ScrollProgress />

      {/* Background ambient orbs for glassmorphism refraction */}
      <div className="fixed top-0 left-1/4 w-[650px] h-[650px] bg-[#5B4BDB]/12 dark:bg-[#5B4BDB]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-1/3 right-5 w-[550px] h-[550px] bg-[#14B8A6]/10 dark:bg-[#14B8A6]/12 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-2/3 left-10 w-[600px] h-[600px] bg-[#6E60E6]/10 dark:bg-[#6E60E6]/12 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ========================================================
          1. STICKY NAVBAR
      ======================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#080816]/80 backdrop-blur-xl border-b border-white/10 transition-all shadow-md text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/Lunae Solutions/LogoNoBg.png"
              alt="Lunae CRM Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105 brightness-110"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <a href="#problema" className="hover:text-white hover:text-shadow transition-colors">
              Por que a Lunae?
            </a>
            <a href="#funcoes" className="hover:text-white hover:text-shadow transition-colors">
              Funcionalidades
            </a>
            <a href="#potencial" className="hover:text-white hover:text-shadow transition-colors">
              Potencial & ROI
            </a>
            <a href="#planos" className="hover:text-white hover:text-shadow transition-colors">
              Planos & Preços
            </a>
            <a href="#depoimentos" className="hover:text-white hover:text-shadow transition-colors">
              Depoimentos
            </a>
            <a href="#faq" className="hover:text-white hover:text-shadow transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkTheme}
              className="p-2.5 rounded-xl text-slate-300 bg-white/10 border border-white/15 hover:border-white/30 hover:text-white transition-colors cursor-pointer"
              title="Alternar tema claro/escuro"
              aria-label="Alternar tema"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-[#A78BFA]" />}
            </button>


            {mounted && user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/crm"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#5B4BDB] hover:from-[#5457E5] hover:to-[#4A3BC4] text-white text-sm font-semibold shadow-md hover:shadow-lg shadow-[#5B4BDB]/30 transition-all cursor-pointer hover:scale-102"
                >
                  <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                  <span>Acessar o CRM</span>
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-white/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B4BDB] to-[#14B8A6] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300 hover:underline"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleOpenAuth('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  Entrar
                </button>
                <button
                  onClick={() => handleOpenAuth('signup', true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#5B4BDB] hover:from-[#5457E5] hover:to-[#4A3BC4] text-white text-sm font-semibold shadow-md hover:shadow-lg shadow-[#5B4BDB]/30 transition-all cursor-pointer flex items-center gap-1.5 hover:scale-102"
                >
                  <span>Começar Grátis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkTheme}
              className="p-2 text-slate-300"
              aria-label="Alternar tema"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-[#A78BFA]" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E4E4EE] dark:border-[#2E2E48] bg-white dark:bg-[#0F0F1A] px-4 py-6 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-3 font-semibold text-sm">
              <a
                href="#problema"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#6B6B80] dark:text-[#9E9EB5]"
              >
                Por que a Lunae?
              </a>
              <a
                href="#funcoes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#6B6B80] dark:text-[#9E9EB5]"
              >
                Funcionalidades
              </a>
              <a
                href="#potencial"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#6B6B80] dark:text-[#9E9EB5]"
              >
                Potencial & ROI
              </a>
              <a
                href="#planos"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#6B6B80] dark:text-[#9E9EB5]"
              >
                Planos & Preços
              </a>
              <a
                href="#depoimentos"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#6B6B80] dark:text-[#9E9EB5]"
              >
                Depoimentos
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#6B6B80] dark:text-[#9E9EB5]"
              >
                Perguntas Frequentes
              </a>
            </div>

            <div className="pt-4 border-t border-[#E4E4EE] dark:border-[#2E2E48] space-y-2">
              {mounted && user ? (
                <Link
                  href="/crm"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#5B4BDB] text-white font-bold text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Ir para o CRM
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleOpenAuth('login');
                    }}
                    className="w-full py-2.5 rounded-xl border border-[#E4E4EE] dark:border-[#2E2E48] font-bold text-sm"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleOpenAuth('signup', true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#5B4BDB] text-white font-bold text-sm shadow-md"
                  >
                    Criar Conta Grátis
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ========================================================
          2. IMMERSIVE HERO SECTION WITH 3D ILLUSTRATION AS BACKGROUND
      ======================================================== */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        className="relative overflow-hidden min-h-[95vh] flex items-center justify-center pt-12 pb-24 lg:pt-20 lg:pb-32 group/hero bg-[#080816]"
      >
        {/* Full-bleed 3D Illustration Background with interactive hover parallax zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/Ilustration/3D_illustration_Hero 16x9.jpg"
            alt="Lunae CRM 3D Hero Ilustração"
            className="w-full h-full object-cover object-center scale-100 group-hover/hero:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Deep atmospheric gradient overlay preserving vibrant 3D glow & cybernetic details */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080816]/75 via-[#080816]/30 to-[#080816]/85" />

          {/* Dynamic interactive spotlight that follows cursor hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHeroHovered ? 1 : 0,
              background: isHeroHovered
                ? `radial-gradient(750px circle at ${heroMousePos.x}px ${heroMousePos.y}px, rgba(124, 58, 237, 0.28), rgba(20, 184, 166, 0.16) 40%, transparent 70%)`
                : undefined,
            }}
          />

          {/* Radiant ambient glow meshes accentuating purple and teal neon lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#5B4BDB]/30 via-[#EC4899]/15 to-[#14B8A6]/25 blur-[100px] rounded-full pointer-events-none" />

          {/* Smooth bottom transition gradient fading gracefully into the sections below */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#F7F7FB] dark:from-[#0F0F1A] to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Main Translucent Glass Cockpit Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto bg-[#0B0B1F]/65 backdrop-blur-2xl border border-white/20 hover:border-white/40 p-6 sm:p-10 lg:p-12 rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7),0_0_40px_rgba(91,75,219,0.2)] hover:shadow-[0_30px_80px_rgba(91,75,219,0.4)] transition-all duration-500 text-center space-y-6 relative overflow-hidden group/cockpit"
          >
            {/* Shimmer light reflection sweep on cockpit hover */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[-150%] group-hover/cockpit:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Tag / Badge with Vibrant Neon Hover State */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#2DD4BF] text-xs sm:text-sm font-semibold shadow-xs hover:scale-105 hover:border-[#14B8A6]/80 hover:bg-[#14B8A6]/20 hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] transition-all duration-300 cursor-default backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#14B8A6] animate-pulse" />
              <span>O CRM definitivo para negócios de atendimento</span>
            </div>

            {/* Main Headline with Drop-Shadow & Electric Gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] leading-[1.12]">
              Multiplique seus atendimentos, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#60A5FA] to-[#2DD4BF] hover:brightness-125 transition-all">
                elimine as faltas
              </span>{' '}
              e venda mais pelo WhatsApp
            </h1>

            {/* Subtitle with High Readability */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed max-w-2xl mx-auto font-normal">
              Centralize seu WhatsApp com múltiplos atendentes no mesmo número, acabe com furos na agenda com confirmações automáticas em 1 toque e receba pagamentos por Pix em segundos.
            </p>

            {/* Dual CTAs with Explosive Hover States */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <button
                onClick={() => handleOpenAuth('signup', true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366F1] via-[#5B4BDB] to-[#7C3AED] hover:from-[#5457E5] hover:via-[#4A3BC4] hover:to-[#6D28D9] text-white font-bold text-base shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_45px_rgba(124,58,237,0.75)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-1.5 hover:scale-105 active:scale-95 group/btn"
              >
                <span>Começar Grátis por 14 Dias</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
              </button>

              <button
                onClick={handleDirectDemoAccess}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/60 text-white font-semibold text-base backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-1.5 hover:scale-105 active:scale-95 group/demo"
              >
                <Play className="w-4 h-4 text-[#14B8A6] fill-current group-hover/demo:scale-125 transition-transform duration-200" />
                <span>Ver Demonstração ao Vivo</span>
              </button>
            </div>

            {/* Micro Social Proof with Hover States */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 hover:text-white hover:scale-105 hover:bg-white/10 px-3 py-1 rounded-full border border-transparent hover:border-white/15 transition-all duration-200 cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                Sem cartão de crédito necessário
              </span>
              <span className="flex items-center gap-1.5 hover:text-white hover:scale-105 hover:bg-white/10 px-3 py-1 rounded-full border border-transparent hover:border-white/15 transition-all duration-200 cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                Configuração em 3 minutos
              </span>
              <span className="flex items-center gap-1.5 hover:text-white hover:scale-105 hover:bg-white/10 px-3 py-1 rounded-full border border-transparent hover:border-white/15 transition-all duration-200 cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                Conforme com a LGPD
              </span>
            </div>
          </motion.div>

          {/* ========================================================
              4 FLOATING INTERACTIVE GLASS CARDS WITH HOVER STATES
          ======================================================== */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {/* Card 1: WhatsApp Automated Reminder */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-4.5 rounded-2xl bg-[#0B0B1E]/75 hover:bg-[#0E0E28]/90 backdrop-blur-2xl border border-white/15 hover:border-[#14B8A6] shadow-2xl hover:shadow-[0_20px_45px_rgba(20,184,166,0.35)] transition-all duration-300 cursor-pointer group/card flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#14B8A6]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-ping" />
                    WhatsApp Lembretes
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#14B8A6]/20 text-[#2DD4BF] font-semibold group-hover/card:bg-[#14B8A6] group-hover/card:text-white transition-colors">
                    Automático
                  </span>
                </div>
                <div className="mt-2.5 text-xs bg-white/10 p-2.5 rounded-xl border border-white/15 text-slate-100 group-hover/card:border-[#14B8A6]/40 transition-colors">
                  &ldquo;Olá Camila! Seu atendimento é amanhã às 14h. Responda 1 para confirmar.&rdquo;
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[#2DD4BF] pt-2 border-t border-white/15">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6]" />
                  Camila: 1 (Confirmado)
                </span>
                <span className="text-[10px] text-slate-400 group-hover/card:text-white transition-colors">14:02 ✓✓</span>
              </div>
            </motion.div>

            {/* Card 2: Faturamento & Ocupação */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-4.5 rounded-2xl bg-[#0B0B1E]/75 hover:bg-[#0E0E28]/90 backdrop-blur-2xl border border-white/15 hover:border-[#8B5CF6] shadow-2xl hover:shadow-[0_20px_45px_rgba(139,92,246,0.35)] transition-all duration-300 cursor-pointer group/card flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-300">
                    Faturamento Hoje
                  </span>
                  <span className="text-xs font-bold text-[#A78BFA] bg-[#8B5CF6]/20 px-2 py-0.5 rounded-full group-hover/card:bg-[#8B5CF6] group-hover/card:text-white transition-colors">
                    <AnimatedCounter end={28} prefix="+" suffix="%" /> este mês
                  </span>
                </div>
                <p className="text-2xl font-black text-white mt-1.5 group-hover/card:text-[#A78BFA] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  R$ 3.840,00
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-white/15">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#A78BFA]" />
                  12 Atendimentos
                </span>
                <span className="text-[10px] font-bold text-[#2DD4BF]">94% ocupação</span>
              </div>
            </motion.div>

            {/* Card 3: Anti-No-Show Metric */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-4.5 rounded-2xl bg-[#0B0B1E]/75 hover:bg-[#0E0E28]/90 backdrop-blur-2xl border border-white/15 hover:border-[#F59E0B] shadow-2xl hover:shadow-[0_20px_45px_rgba(245,158,11,0.35)] transition-all duration-300 cursor-pointer group/card flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 text-[#FBBF24] flex items-center justify-center font-bold text-lg group-hover/card:scale-110 group-hover/card:rotate-12 transition-transform">
                  ⚡
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    Redução de Faltas
                  </p>
                  <p className="text-xl font-black text-[#2DD4BF] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    <AnimatedCounter end={74} prefix="-" suffix="%" /> No-Show
                  </p>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-slate-300 pt-2 border-t border-white/15 flex items-center justify-between">
                <span>Economia mensal</span>
                <span className="font-bold text-[#FBBF24] group-hover/card:underline">+R$ 4.200/mês</span>
              </div>
            </motion.div>

            {/* Card 4: Pix Payment */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-4.5 rounded-2xl bg-[#0B0B1E]/75 hover:bg-[#0E0E28]/90 backdrop-blur-2xl border border-white/15 hover:border-[#10B981] shadow-2xl hover:shadow-[0_20px_45px_rgba(16,185,129,0.35)] transition-all duration-300 cursor-pointer group/card flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 text-[#34D399] flex items-center justify-center font-bold group-hover/card:scale-110 transition-transform">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-300">
                    Sinal Pix Antecipado
                  </p>
                  <p className="text-sm font-black text-white group-hover/card:text-[#34D399] transition-colors">
                    R$ 150,00 • Confirmado
                  </p>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-[#34D399] font-semibold pt-2 border-t border-white/15 flex items-center justify-between">
                <span>✓ Saldo liberado</span>
                <span className="text-[10px] text-slate-400">Instantâneo</span>
              </div>
            </motion.div>
          </div>

          {/* Social Proof Trust Bar below Hero with Hover States */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0B0B1E]/70 hover:bg-[#0E0E28]/85 backdrop-blur-2xl border border-white/15 hover:border-white/35 shadow-xl hover:shadow-[0_20px_50px_rgba(91,75,219,0.3)] transition-all duration-300 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full border-2 border-[#1A1A2E] bg-purple-500 text-white flex items-center justify-center text-xs font-bold shadow-xs hover:scale-125 hover:z-20 hover:ring-2 hover:ring-[#14B8A6] transition-all cursor-pointer">
                  C
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-[#1A1A2E] bg-teal-500 text-white flex items-center justify-center text-xs font-bold shadow-xs hover:scale-125 hover:z-20 hover:ring-2 hover:ring-[#14B8A6] transition-all cursor-pointer">
                  M
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-[#1A1A2E] bg-amber-500 text-white flex items-center justify-center text-xs font-bold shadow-xs hover:scale-125 hover:z-20 hover:ring-2 hover:ring-[#14B8A6] transition-all cursor-pointer">
                  L
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-[#1A1A2E] bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shadow-xs hover:scale-125 hover:z-20 hover:ring-2 hover:ring-[#14B8A6] transition-all cursor-pointer">
                  A
                </div>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">
                  Mais de 2.500 profissionais ativos
                </p>
                <p className="text-[11px] text-slate-300">
                  Clínicas, consultórios, estúdios e salões em todo o Brasil
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 hover:scale-105 transition-transform cursor-default">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#F59E0B]">
                  {'★'.repeat(5)}
                </div>
                <span className="font-bold text-white ml-1">4.9/5</span>
                <span className="text-[11px] text-slate-300">(+1.200 avaliações)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. PAIN SECTION: THE PROBLEM VS THE LUNAE TRANSFORMATION
      ======================================================== */}
      <section id="problema" className="py-16 sm:py-24 bg-white/40 dark:bg-[#121224]/50 backdrop-blur-md border-y border-white/60 dark:border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: The Illustration of Stressed Manager */}
            <FadeIn direction="right" className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden glass-card border border-[#DC2626]/30 shadow-2xl group p-2">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="/Ilustration/stressed-manager-talking-smartphone-with-employee-working-financial-problems-before-deadlines-sitting-desk-business-office.jpg_2K.jpg"
                    alt="Gestor estressado antes da Lunae CRM"
                    className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#DC2626] text-white text-[11px] font-bold uppercase tracking-wider w-max mb-2 shadow-sm">
                      A Realidade sem a Lunae
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold">
                      O Caos do Atendimento Manual está custando seu lucro
                    </h3>
                    <p className="text-xs text-white/80 mt-1">
                      Mensagens acumuladas, clientes que faltam de última hora e planilhas confusas.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right: Pain vs. Solution comparison */}
            <FadeIn direction="left" className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">
                  Chega de Perder Tempo e Dinheiro
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-white mt-1.5 leading-tight">
                  Sua equipe perde até 4 horas por dia só tentando organizar a rotina
                </h2>
                <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] mt-3">
                  Quando o atendimento depende de WhatsApp pessoal, papel e anotações soltas, o negócio sangra dinheiro todos os dias.
                </p>
              </div>

              {/* The 4 Big Pain Points */}
              <StaggerContainer className="space-y-3.5">
                <StaggerItem>
                  <div className="p-3.5 rounded-2xl glass-card border border-[#DC2626]/25 dark:border-[#DC2626]/30 flex items-start gap-3 hover:border-[#DC2626]/50 transition-all hover:translate-x-1 duration-200">
                    <div className="w-7 h-7 rounded-lg bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center font-bold shrink-0 mt-0.5">
                      ✕
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-white">
                        Faltas Sem Aviso (No-Show)
                      </h4>
                      <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                        O cliente simplesmente não aparece e você perde a hora, a sala e a comissão do profissional.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="p-3.5 rounded-2xl glass-card border border-[#DC2626]/25 dark:border-[#DC2626]/30 flex items-start gap-3 hover:border-[#DC2626]/50 transition-all hover:translate-x-1 duration-200">
                    <div className="w-7 h-7 rounded-lg bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center font-bold shrink-0 mt-0.5">
                      ✕
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-white">
                        WhatsApp Pessoal Descontrolado
                      </h4>
                      <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                        Vários aparelhos, mensagens não respondidas a tempo e clientes esfriando esperando retorno.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="p-3.5 rounded-2xl glass-card border border-[#DC2626]/25 dark:border-[#DC2626]/30 flex items-start gap-3 hover:border-[#DC2626]/50 transition-all hover:translate-x-1 duration-200">
                    <div className="w-7 h-7 rounded-lg bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center font-bold shrink-0 mt-0.5">
                      ✕
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-white">
                        Conflitos e Horários Duplicados na Agenda
                      </h4>
                      <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                        Dois clientes no mesmo horário e constrangimento na recepção por falta de sincronização.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="p-3.5 rounded-2xl glass-card border border-[#DC2626]/25 dark:border-[#DC2626]/30 flex items-start gap-3 hover:border-[#DC2626]/50 transition-all hover:translate-x-1 duration-200">
                    <div className="w-7 h-7 rounded-lg bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center font-bold shrink-0 mt-0.5">
                      ✕
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-white">
                        Inadimplência e Cobrança Constrangedora
                      </h4>
                      <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                        Ter que mandar áudios cobrando clientes e sem controle de quem pagou o sinal do procedimento.
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>

              {/* The Lunae Solution Callout */}
              <div className="pt-2">
                <div className="p-4 rounded-2xl glass-card border border-[#5B4BDB]/40 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5B4BDB] text-white flex items-center justify-center font-bold shadow-sm">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA]">A Transformação Lunae</p>
                      <p className="text-sm font-extrabold text-[#1B1B2F] dark:text-white">
                        Controle total da sua operação na palma da mão
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenAuth('signup', true)}
                    className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-[#5B4BDB] hover:bg-[#4A3BC4] text-white text-xs font-bold transition-all shadow-md shadow-[#5B4BDB]/25 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    Resolver Agora
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. BUSINESS POTENTIAL & ROI METRICS
      ======================================================== */}
      <section id="potencial" className="py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider">
              Resultados Comprovados
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-white mt-1.5">
              O Potencial de Retorno (ROI) para o seu Negócio
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] mt-2">
              A Lunae não é só um software bonito. É um acelerador de faturamento e tranquilidade operacional.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1 */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-lg group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center font-extrabold text-xl group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#14B8A6] mt-4">
                  <AnimatedCounter end={74} prefix="-" suffix="%" />
                </p>
                <h3 className="text-base font-bold text-[#1B1B2F] dark:text-white mt-1">
                  Faltas (No-Show)
                </h3>
                <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-2 leading-relaxed">
                  Lembretes automáticos enviados via WhatsApp 24h e 2h antes com confirmação direta de presença evitam buracos na agenda.
                </p>
              </div>
            </StaggerItem>

            {/* Metric 2 */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-lg group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#5B4BDB]/10 text-[#5B4BDB] flex items-center justify-center font-extrabold text-xl group-hover:scale-110 transition-transform">
                  📈
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#5B4BDB] dark:text-[#A78BFA] mt-4">
                  <AnimatedCounter end={35} prefix="+" suffix="%" />
                </p>
                <h3 className="text-base font-bold text-[#1B1B2F] dark:text-white mt-1">
                  Taxa de Fechamento
                </h3>
                <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-2 leading-relaxed">
                  Responda novos contatos em menos de 2 minutos e acompanhe cada lead no Funil Kanban sem deixar orçamentos esfriarem.
                </p>
              </div>
            </StaggerItem>

            {/* Metric 3 */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-lg group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center font-extrabold text-xl group-hover:scale-110 transition-transform">
                  ⏱️
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#F59E0B] mt-4">
                  <AnimatedCounter end={15} suffix=" Horas" />
                </p>
                <h3 className="text-base font-bold text-[#1B1B2F] dark:text-white mt-1">
                  Economizadas por Semana
                </h3>
                <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-2 leading-relaxed">
                  Sua recepção passa menos tempo presa digitando mensagens manuais e mais tempo acolhendo e encantando quem está presente.
                </p>
              </div>
            </StaggerItem>

            {/* Metric 4 */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-lg group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#6E60E6]/10 text-[#6E60E6] flex items-center justify-center font-extrabold text-xl group-hover:scale-110 transition-transform">
                  🔄
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#6E60E6] dark:text-[#9E9EB5] mt-4">
                  <AnimatedCounter end={3} suffix="x Mais" />
                </p>
                <h3 className="text-base font-bold text-[#1B1B2F] dark:text-white mt-1">
                  Retorno de Clientes
                </h3>
                <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-2 leading-relaxed">
                  Automações de pós-atendimento, lembretes de aniversário e clube de pontos que estimulam a recorrência contínua.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================================
          5. COMPLETE MODULES & FEATURES EXPLANATION
             (CADA FUNÇÃO DO CRM DA LUNAE E SEU POTENCIAL)
      ======================================================== */}
      <section id="funcoes" className="py-16 sm:py-24 bg-white/35 dark:bg-[#121224]/40 backdrop-blur-md border-t border-white/60 dark:border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA] uppercase tracking-wider">
              Solução Completa e Integrada
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B1B2F] dark:text-white mt-2 leading-tight">
              Tudo o que seu negócio precisa para operar com excelência
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] mt-3">
              Descubra em detalhes cada módulo do Lunae CRM e como ele potencializa o faturamento e a organização da sua empresa.
            </p>
          </div>

          {/* ========================================================
              FEATURE 1: AGENDA INTELIGENTE
          ======================================================== */}
          <div className="mb-20 sm:mb-28 grid lg:grid-cols-12 gap-10 items-center">
            <FadeIn direction="right" className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold glass-pill text-[#5B4BDB] dark:text-[#A78BFA]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Módulo 01: Agenda Multiprofissional</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B2F] dark:text-white leading-tight">
                Agenda Inteligente com Zero Conflito de Horários
              </h3>
              <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
                Gerencie salas, profissionais e especialidades em um calendário fluido. Arraste para reagendar com aviso automático ao cliente e sincronize com Google Calendar.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Visão por Dia, Semana, Mês ou Colunas por Profissional</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Bloqueio automático contra horários duplicados e feriados</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Reagendamento em 1 toque com notificação instantânea</span>
                </div>
              </div>

              {/* Potential Box */}
              <div className="p-4 rounded-2xl glass-card border border-[#5B4BDB]/30 mt-4 shadow-sm">
                <p className="text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Potencial para o seu negócio:
                </p>
                <p className="text-xs sm:text-sm text-[#1B1B2F] dark:text-white mt-1 font-medium">
                  Elimina 100% dos conflitos de agenda, reduz o tempo de marcação pela metade e eleva a ocupação das salas em até 35%.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden glass-card border border-white/70 dark:border-white/15 p-2 shadow-2xl group hover:-translate-y-1.5 transition-transform duration-300">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/Ilustration/Professional_managing_time_and_t._2K_20261001184255.jpg"
                    alt="Profissional gerenciando agenda e tarefas na Lunae"
                    className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ========================================================
              FEATURE 2: WHATSAPP INTEGRADO & MULTIATENDENTE
          ======================================================== */}
          <div className="mb-20 sm:mb-28 grid lg:grid-cols-12 gap-10 items-center">
            <FadeIn direction="right" className="lg:col-span-6 order-2 lg:order-1">
              <div className="p-6 rounded-3xl glass-card border border-white/80 dark:border-white/15 shadow-2xl space-y-4 hover:-translate-y-1.5 transition-transform duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/60 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#14B8A6] text-white flex items-center justify-center font-bold shadow-sm">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1B1B2F] dark:text-white">Caixa Compartilhada Lunae</p>
                      <p className="text-[11px] text-[#14B8A6] font-semibold">● 3 Atendentes Online no mesmo número</p>
                    </div>
                  </div>
                  <span className="text-[11px] bg-[#14B8A6]/10 text-[#0D9488] dark:text-[#2DD4BF] px-2.5 py-1 rounded-full font-bold">
                    WhatsApp Oficial
                  </span>
                </div>

                {/* Mock Chat Conversation */}
                <div className="space-y-3 text-xs">
                  <div className="glass-panel p-3.5 rounded-2xl rounded-tl-sm max-w-[85%] border border-white/70 dark:border-white/10 shadow-xs">
                    <p className="font-semibold text-[#5B4BDB]">Mariana (Cliente):</p>
                    <p className="text-[#1B1B2F] dark:text-[#ECECF5] mt-0.5">
                      Olá! Vocês teriam horário para limpeza de pele nesta quinta às 15h?
                    </p>
                    <span className="text-[10px] text-[#6B6B80] dark:text-[#9E9EB5] block text-right mt-1">14:32</span>
                  </div>

                  <div className="bg-[#5B4BDB] text-white p-3.5 rounded-2xl rounded-tr-sm max-w-[85%] ml-auto shadow-md">
                    <p className="font-semibold text-white/90">Marina (Recepção):</p>
                    <p className="mt-0.5">
                      Olá Mariana! Temos sim! Já reservei com a Dra. Camila. Toque abaixo para confirmar seu agendamento! 🗓️✨
                    </p>
                    <span className="text-[10px] text-white/70 block text-right mt-1">14:33 ✓✓</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl glass-pill border border-white/60 dark:border-white/10 flex items-center justify-between text-xs font-medium">
                  <span className="text-[#6B6B80] dark:text-[#9E9EB5]">Tempo médio de primeira resposta:</span>
                  <span className="font-bold text-[#14B8A6]">1 min 15 seg</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold glass-pill text-[#14B8A6]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Módulo 02: WhatsApp Integrado</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B2F] dark:text-white leading-tight">
                Vários Atendentes em um Único WhatsApp Oficial
              </h3>
              <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
                Toda a sua recepção e equipe atendendo no mesmo número de WhatsApp. Atribua conversas por atendente, use modelos prontos com a barra &ldquo;/&rdquo; e acabe com o desvio de clientes para celulares particulares.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Caixa de entrada unificada com histórico de conversas</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Respostas ultra rápidas com atalhos de modelos aprovados</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Atribuição clara de responsabilidade por atendente</span>
                </div>
              </div>

              {/* Potential Box */}
              <div className="p-4 rounded-2xl glass-card border border-[#14B8A6]/30 mt-4 shadow-sm">
                <p className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Potencial para o seu negócio:
                </p>
                <p className="text-xs sm:text-sm text-[#1B1B2F] dark:text-white mt-1 font-medium">
                  Zero mensagens esquecidas. Atendimento humanizado e imediato que multiplica por 3x a conversão de novos orçamentos.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* ========================================================
              FEATURE 3: LEMBRETES AUTOMÁTICOS ANTI-FALTA
          ======================================================== */}
          <div className="mb-20 sm:mb-28 grid lg:grid-cols-12 gap-10 items-center">
            <FadeIn direction="right" className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold glass-pill text-[#F59E0B]">
                <BellRing className="w-3.5 h-3.5" />
                <span>Módulo 03: Lembretes Automáticos</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B2F] dark:text-white leading-tight">
                Reduza as Faltas em 74% sem Esforço Manual
              </h3>
              <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
                Mensagens enviadas automaticamente com antecedência de 24h e 2h antes de cada procedimento. O cliente confirma com um clique e a agenda atualiza em tempo real.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Disparo inteligente via WhatsApp com fallback SMS/Email</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Botões de &ldquo;Confirmar&rdquo; ou &ldquo;Reagendar&rdquo; sem atrito</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Liberação imediata do horário se o cliente avisar cancelamento</span>
                </div>
              </div>

              {/* Potential Box */}
              <div className="p-4 rounded-2xl glass-card border border-[#F59E0B]/30 mt-4 shadow-sm">
                <p className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Potencial para o seu negócio:
                </p>
                <p className="text-xs sm:text-sm text-[#1B1B2F] dark:text-white mt-1 font-medium">
                  Recupere de R$ 3.500 a R$ 8.000 por mês em atendimentos que antes seriam perdidos com cadeiras vazias.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="lg:col-span-6">
              <div className="p-6 rounded-3xl glass-card border border-white/80 dark:border-white/15 shadow-2xl space-y-4 hover:-translate-y-1.5 transition-transform duration-300">
                <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-white flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-[#5B4BDB]" />
                  Linha do Tempo de Disparos Automáticos
                </h4>

                <div className="relative pl-6 space-y-6 border-l-2 border-[#5B4BDB]/40 my-4">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#5B4BDB] ring-4 ring-white dark:ring-[#1A1A2E]" />
                    <p className="text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA]">24 Horas Antes</p>
                    <p className="text-xs text-[#1B1B2F] dark:text-[#ECECF5] mt-1">
                      Lembrete amigável no WhatsApp: &ldquo;Olá Rodrigo! Seu atendimento é amanhã às 10h. Digite 1 para confirmar.&rdquo;
                    </p>
                    <span className="inline-block mt-1 text-[10px] text-[#14B8A6] font-semibold">
                      ✓ Taxa de resposta: 91%
                    </span>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#14B8A6] ring-4 ring-white dark:ring-[#1A1A2E]" />
                    <p className="text-xs font-bold text-[#14B8A6]">2 Horas Antes</p>
                    <p className="text-xs text-[#1B1B2F] dark:text-[#ECECF5] mt-1">
                      Aviso de deslocamento com link de localização do GPS e instruções de estacionamento.
                    </p>
                    <span className="inline-block mt-1 text-[10px] text-[#14B8A6] font-semibold">
                      ✓ Zero atrasos na recepção
                    </span>
                  </div>
                </div>

                <div className="p-3 glass-pill rounded-xl border border-white/60 dark:border-white/10 text-xs flex items-center justify-between">
                  <span className="text-[#6B6B80] dark:text-[#9E9EB5]">Status do Lembrete:</span>
                  <span className="font-bold text-[#14B8A6]">Automático e Ativo</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ========================================================
              FEATURE 4: CADASTRO 360° DO CLIENTE
          ======================================================== */}
          <div className="mb-20 sm:mb-28 grid lg:grid-cols-12 gap-10 items-center">
            <FadeIn direction="right" className="lg:col-span-6 order-2 lg:order-1">
              <div className="p-6 rounded-3xl glass-card border border-white/80 dark:border-white/15 shadow-2xl space-y-4 hover:-translate-y-1.5 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5B4BDB] to-[#14B8A6] text-white flex items-center justify-center font-bold text-lg shadow-md">
                    A
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1B1B2F] dark:text-white">
                      Ana Clara Siqueira
                    </h4>
                    <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
                      (81) 98844-2211 • Cliente VIP
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl glass-pill border border-white/60 dark:border-white/10">
                    <span className="text-[#6B6B80] dark:text-[#9E9EB5]">Total Gasto:</span>
                    <p className="font-bold text-[#1B1B2F] dark:text-white mt-0.5">R$ 2.450,00</p>
                  </div>
                  <div className="p-2.5 rounded-xl glass-pill border border-white/60 dark:border-white/10">
                    <span className="text-[#6B6B80] dark:text-[#9E9EB5]">Atendimentos:</span>
                    <p className="font-bold text-[#1B1B2F] dark:text-white mt-0.5">8 Concluídos</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl glass-pill border border-white/60 dark:border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#5B4BDB] dark:text-[#A78BFA]">Nota Interna da Equipe:</span>
                    <span className="text-[10px] bg-[#5B4BDB]/10 text-[#5B4BDB] dark:text-[#A78BFA] px-1.5 py-0.5 rounded font-semibold">Privado</span>
                  </div>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">
                    &ldquo;Prefere atendimento com café sem açúcar. Pele sensível a ácidos fortes.&rdquo;
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold glass-pill text-[#5B4BDB] dark:text-[#A78BFA]">
                <Users className="w-3.5 h-3.5" />
                <span>Módulo 04: Cadastro 360°</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B2F] dark:text-white leading-tight">
                Ficha Única do Cliente com Histórico Completo
              </h3>
              <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
                Esqueça fichas de papel e arquivos espalhados. Acesse preferências, histórico de procedimentos, notas internas que só a equipe vê, documentos/laudos em PDF e consentimento LGPD em uma única tela.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Histórico cronológico de cada sessão e observações</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Notas internas privadas (nunca compartilhadas com o cliente)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Upload seguro de documentos, fotos de antes/depois e exames</span>
                </div>
              </div>

              {/* Potential Box */}
              <div className="p-4 rounded-2xl glass-card border border-[#5B4BDB]/30 mt-4 shadow-sm">
                <p className="text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Potencial para o seu negócio:
                </p>
                <p className="text-xs sm:text-sm text-[#1B1B2F] dark:text-white mt-1 font-medium">
                  Atendimento de alta hospitalidade que encanta o cliente, quadruplica a fidelidade e gera indicações espontâneas.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* ========================================================
              FEATURE 5: FUNIL DE VENDAS KANBAN
          ======================================================== */}
          <div className="mb-20 sm:mb-28 grid lg:grid-cols-12 gap-10 items-center">
            <FadeIn direction="right" className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold glass-pill text-[#14B8A6]">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Módulo 05: Funil de Vendas</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B2F] dark:text-white leading-tight">
                Funil de Vendas Visual: Transforme Leads em Clientes
              </h3>
              <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
                Acompanhe o caminho de cada novo interessado desde o primeiro &ldquo;olá&rdquo; no WhatsApp até o agendamento pago. Alertas inteligentes destacam leads parados há mais de 7 dias para reengajamento imediato.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Etapas: Lead → Contato Feito → Agendado → Cliente Concluído</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Alerta visual para orçamentos e conversas paradas</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Registro do motivo de perda para melhoria contínua</span>
                </div>
              </div>

              {/* Potential Box */}
              <div className="p-4 rounded-2xl glass-card border border-[#14B8A6]/30 mt-4 shadow-sm">
                <p className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Potencial para o seu negócio:
                </p>
                <p className="text-xs sm:text-sm text-[#1B1B2F] dark:text-white mt-1 font-medium">
                  Aumento de até 40% na taxa de conversão de novos contatos. Nunca mais perca um cliente em potencial por esquecimento da recepção.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="lg:col-span-6">
              <div className="p-5 rounded-3xl glass-card border border-white/80 dark:border-white/15 shadow-2xl hover:-translate-y-1.5 transition-transform duration-300">
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <div className="glass-panel p-3 rounded-2xl border border-white/60 dark:border-white/10">
                    <div className="font-bold text-[#5B4BDB] dark:text-[#A78BFA] pb-1 border-b border-white/40 dark:border-white/10 flex justify-between">
                      <span>Novo Lead</span>
                      <span className="text-[10px] bg-[#5B4BDB]/10 px-1.5 rounded">4</span>
                    </div>
                    <div className="mt-2 p-2 glass-pill rounded-xl text-[11px] font-medium border border-white/50 dark:border-white/10">
                      <p className="font-bold text-[#1B1B2F] dark:text-white">Juliana M.</p>
                      <p className="text-[10px] text-[#6B6B80] dark:text-[#9E9EB5]">Procedimento Facial</p>
                      <span className="text-[9px] text-[#14B8A6] font-bold">R$ 450,00</span>
                    </div>
                  </div>

                  <div className="glass-panel p-3 rounded-2xl border border-white/60 dark:border-white/10">
                    <div className="font-bold text-[#F59E0B] pb-1 border-b border-white/40 dark:border-white/10 flex justify-between">
                      <span>Em Contato</span>
                      <span className="text-[10px] bg-[#F59E0B]/10 px-1.5 rounded">3</span>
                    </div>
                    <div className="mt-2 p-2 glass-pill rounded-xl text-[11px] font-medium border border-white/50 dark:border-white/10">
                      <p className="font-bold text-[#1B1B2F] dark:text-white">Lucas Silva</p>
                      <p className="text-[10px] text-[#6B6B80] dark:text-[#9E9EB5]">Avaliação Clínica</p>
                      <span className="text-[9px] text-[#F59E0B] font-bold">Aguardando Data</span>
                    </div>
                  </div>

                  <div className="glass-panel p-3 rounded-2xl border border-white/60 dark:border-white/10">
                    <div className="font-bold text-[#14B8A6] pb-1 border-b border-white/40 dark:border-white/10 flex justify-between">
                      <span>Agendado</span>
                      <span className="text-[10px] bg-[#14B8A6]/10 px-1.5 rounded">8</span>
                    </div>
                    <div className="mt-2 p-2 glass-pill rounded-xl text-[11px] font-medium border border-white/50 dark:border-white/10">
                      <p className="font-bold text-[#1B1B2F] dark:text-white">Beatriz F.</p>
                      <p className="text-[10px] text-[#6B6B80] dark:text-[#9E9EB5]">Sexta, 14:00h</p>
                      <span className="text-[9px] text-[#14B8A6] font-bold">✓ Sinal Pago</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ========================================================
              FEATURE 6: FINANCEIRO & COBRANÇA PIX
          ======================================================== */}
          <div className="mb-20 sm:mb-28 grid lg:grid-cols-12 gap-10 items-center">
            <FadeIn direction="right" className="lg:col-span-6 order-2 lg:order-1">
              <div className="p-6 rounded-3xl glass-card border border-white/80 dark:border-white/15 shadow-2xl space-y-4 hover:-translate-y-1.5 transition-transform duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/60 dark:border-white/10">
                  <div>
                    <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">Recebimentos do Mês</p>
                    <p className="text-2xl font-extrabold text-[#1B1B2F] dark:text-white">R$ 28.650,00</p>
                  </div>
                  <span className="text-xs font-bold text-[#14B8A6] bg-[#14B8A6]/10 px-2.5 py-1 rounded-full">
                    96% Pontualidade
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="p-3 glass-panel rounded-xl border border-white/60 dark:border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#1B1B2F] dark:text-white">Camila Duarte — Limpeza de Pele</p>
                      <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5]">Pix Instantâneo • 10:15h</p>
                    </div>
                    <span className="font-bold text-[#14B8A6]">+ R$ 180,00</span>
                  </div>

                  <div className="p-3 glass-panel rounded-xl border border-white/60 dark:border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#1B1B2F] dark:text-white">Lucas Lima — Sessão Laser</p>
                      <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5]">Cartão de Crédito 3x</p>
                    </div>
                    <span className="font-bold text-[#14B8A6]">+ R$ 450,00</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl glass-pill border border-[#5B4BDB]/30 flex items-center justify-between text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA]">
                  <span>🔗 Link de Pagamento no WhatsApp</span>
                  <span>1 Toque</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold glass-pill text-[#5B4BDB] dark:text-[#A78BFA]">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Módulo 06: Financeiro & Pix</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B2F] dark:text-white leading-tight">
                Receba Antecipado com Links Pix e Acabe com Calotes
              </h3>
              <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
                Gere links de pagamento com código Pix e cartão diretamente na conversa do WhatsApp. Acompanhe quem já pagou o sinal, identifique atrasos e tenha previsibilidade de caixa.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Cobrança de sinal antecipado direto no agendamento</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Controle claro: Recebido, A Receber e Atrasados</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5]">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                  <span>Lembretes de cobrança automáticos e elegantes por WhatsApp</span>
                </div>
              </div>

              {/* Potential Box */}
              <div className="p-4 rounded-2xl glass-card border border-[#5B4BDB]/30 mt-4 shadow-sm">
                <p className="text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Potencial para o seu negócio:
                </p>
                <p className="text-xs sm:text-sm text-[#1B1B2F] dark:text-white mt-1 font-medium">
                  Reduz a inadimplência a índices próximos de zero e elimina horas gastas conferindo comprovantes bancários na recepção.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* ========================================================
              FEATURE 7, 8, 9, 10: GRID OF OTHER CORE FEATURES
          ======================================================== */}
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {/* Feature 7: Automações */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-lg space-y-4 hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#5B4BDB]/10 text-[#5B4BDB] dark:text-[#A78BFA] flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#1B1B2F] dark:text-white mt-3">
                    Automações 24/7
                  </h4>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed mt-2">
                    Workflows inteligentes: &ldquo;Quando o atendimento terminar → Enviar pesquisa de satisfação&rdquo; ou &ldquo;Se cliente inativo há 45 dias → Disparar convite de retorno&rdquo;.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/50 dark:border-white/10">
                  <span className="text-[11px] font-bold text-[#5B4BDB] dark:text-[#A78BFA]">
                    Potencial: Vendas no piloto automático 24 horas por dia.
                  </span>
                </div>
              </div>
            </StaggerItem>

            {/* Feature 8: Campanhas */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-lg space-y-4 hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center font-bold">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#1B1B2F] dark:text-white mt-3">
                    Campanhas em Massa LGPD
                  </h4>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed mt-2">
                    Dispare novidades e ofertas para públicos segmentados (ex: aniversariantes do mês) com respeito total à LGPD e botão automático de descadastro.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/50 dark:border-white/10">
                  <span className="text-[11px] font-bold text-[#14B8A6]">
                    Potencial: Picos de receita imediata reativando sua base sem anúncios.
                  </span>
                </div>
              </div>
            </StaggerItem>

            {/* Feature 9: Fidelização */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-lg space-y-4 hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center font-bold">
                    <Gift className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#1B1B2F] dark:text-white mt-3">
                    Clube de Fidelidade & Cupons
                  </h4>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed mt-2">
                    Crie um programa de pontos a cada R$ gasto, catálogo de recompensas e cupons de desconto para estimular o cliente a sempre voltar até você.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/50 dark:border-white/10">
                  <span className="text-[11px] font-bold text-[#F59E0B]">
                    Potencial: Aumento de 50% na retenção e valor do cliente no ano.
                  </span>
                </div>
              </div>
            </StaggerItem>

            {/* Feature 10: Relatórios */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-lg space-y-4 hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#6E60E6]/10 text-[#6E60E6] flex items-center justify-center font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#1B1B2F] dark:text-white mt-3">
                    Relatórios em 5 Segundos
                  </h4>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed mt-2">
                    Faturamento consolidado, comissões por colaborador, faltas por serviço e comparativos de crescimento com exportação em PDF e CSV em um clique.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/50 dark:border-white/10">
                  <span className="text-[11px] font-bold text-[#6E60E6] dark:text-[#A78BFA]">
                    Potencial: Clareza total para tomar decisões estratégicas seguras.
                  </span>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Feature 11 & 12 Highlight Banner with Team Illustration */}
          <FadeIn className="mt-14">
            <div className="p-8 sm:p-12 rounded-3xl glass-card border border-[#5B4BDB]/30 shadow-2xl grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden group hover:border-[#5B4BDB]/60 transition-colors">
              <div className="lg:col-span-7 space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#5B4BDB] text-white shadow-sm">
                  Equipe Alinhada & Segurança Total
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B1B2F] dark:text-white">
                  Permissões Granulares por Cargo e Integrações Nativas
                </h3>
                <p className="text-sm text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed">
                  Controle exatamente o que cada colaborador pode ver ou editar (Administrador, Gerente, Atendente, Financeiro). Oculte valores financeiros de recepcionistas e conecte Google Calendar e Webhooks de forma transparente.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
                    <span>Segurança Blindada com Firebase & Criptografia</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <Smartphone className="w-4 h-4 text-[#5B4BDB]" />
                    <span>100% Responsivo no celular com uma mão</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-white/60 dark:border-white/15 p-1.5 glass-panel group-hover:scale-101 transition-transform">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src="/Ilustration/Team_collaborating_around_digita._2K_20261001185510.jpg"
                      alt="Equipe colaborando com o Lunae CRM"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================================
          6. SEGMENTS: WHO IS LUNAE BUILT FOR?
      ======================================================== */}
      <section className="py-16 sm:py-24 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA] uppercase tracking-wider">
              Feito para o seu Nicho
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-white mt-1.5">
              A Lunae foi desenhada sob medida para:
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] mt-2 max-w-2xl mx-auto">
              Negócios onde a agenda, o atendimento humanizado no WhatsApp e a pontualidade são o coração da operação.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            <StaggerItem>
              <div className="p-5 rounded-2xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-md text-center group h-full flex flex-col items-center justify-center hover:-translate-y-2 hover:scale-103 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#5B4BDB]/10 text-[#5B4BDB] flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform">
                  ✨
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B1B2F] dark:text-white mt-3">
                  Clínicas de Estética
                </h4>
                <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5] mt-1">
                  Botox, laser e skincare
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-5 rounded-2xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-md text-center group h-full flex flex-col items-center justify-center hover:-translate-y-2 hover:scale-103 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform">
                  🦷
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B1B2F] dark:text-white mt-3">
                  Consultórios Odonto
                </h4>
                <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5] mt-1">
                  Dentistas e ortodontia
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-5 rounded-2xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-md text-center group h-full flex flex-col items-center justify-center hover:-translate-y-2 hover:scale-103 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform">
                  💇‍♀️
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B1B2F] dark:text-white mt-3">
                  Salões de Beleza
                </h4>
                <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5] mt-1">
                  Cabelo, unhas e spa
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-5 rounded-2xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-md text-center group h-full flex flex-col items-center justify-center hover:-translate-y-2 hover:scale-103 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#6E60E6]/10 text-[#6E60E6] flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform">
                  💈
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B1B2F] dark:text-white mt-3">
                  Barbearias Premium
                </h4>
                <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5] mt-1">
                  Cortes e barboterapia
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-5 rounded-2xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-md text-center group h-full flex flex-col items-center justify-center hover:-translate-y-2 hover:scale-103 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform">
                  🧘
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B1B2F] dark:text-white mt-3">
                  Pilates & Fisioterapia
                </h4>
                <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5] mt-1">
                  Sessões e turmas
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-5 rounded-2xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-md text-center group h-full flex flex-col items-center justify-center hover:-translate-y-2 hover:scale-103 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#5B4BDB]/10 text-[#5B4BDB] flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform">
                  🎨
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B1B2F] dark:text-white mt-3">
                  Tatuagem & Piercing
                </h4>
                <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5] mt-1">
                  Sinais e orçamentos
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================================
          7. PRICING & PLANS SECTION
      ======================================================== */}
      <section id="planos" className="py-16 sm:py-24 bg-white/40 dark:bg-[#121224]/50 backdrop-blur-md border-y border-white/60 dark:border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA] uppercase tracking-wider">
              Investimento Transparente
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-white mt-1.5">
              Planos Simples que se Pagam no Primeiro Mês
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] mt-2">
              Recuperando apenas 2 ou 3 atendimentos que antes eram perdidos por falta, a Lunae já está 100% paga.
            </p>

            {/* Monthly / Annual Toggle with Motion Layout Animation */}
            <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl glass-pill border border-white/60 dark:border-white/15 shadow-xs relative">
              <button
                onClick={() => handleBillingCycleChange('monthly')}
                className={`relative z-10 py-2 px-5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'text-[#1B1B2F] dark:text-white'
                    : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-white'
                }`}
              >
                {billingCycle === 'monthly' && (
                  <motion.div
                    layoutId="billingCycleHighlight"
                    className="absolute inset-0 bg-white dark:bg-[#25253E] rounded-xl shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                Mensal
              </button>
              <button
                onClick={() => handleBillingCycleChange('annual')}
                className={`relative z-10 py-2 px-5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'text-[#1B1B2F] dark:text-white'
                    : 'text-[#6B6B80] dark:text-[#9E9EB5] hover:text-[#1B1B2F] dark:hover:text-white'
                }`}
              >
                {billingCycle === 'annual' && (
                  <motion.div
                    layoutId="billingCycleHighlight"
                    className="absolute inset-0 bg-white dark:bg-[#25253E] rounded-xl shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>Anual</span>
                <span className="text-[10px] bg-[#14B8A6] text-white px-2 py-0.5 rounded-full font-extrabold shadow-xs">
                  20% OFF
                </span>
              </button>
            </div>
          </FadeIn>

          {/* Pricing Cards with Stagger and Confetti Triggers */}
          <StaggerContainer className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Plan 1: Essencial */}
            <StaggerItem>
              <div className="p-7 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-xl flex flex-col justify-between h-full hover:-translate-y-2 transition-transform duration-300">
                <div>
                  <span className="text-xs font-bold text-[#6B6B80] dark:text-[#9E9EB5] uppercase tracking-wider">
                    Individual
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#1B1B2F] dark:text-white mt-1">
                    Plano Essencial
                  </h3>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-1">
                    Para quem atende sozinho e quer se livrar do caderno.
                  </p>

                  <div className="my-6">
                    <span className="text-3xl sm:text-4xl font-black text-[#1B1B2F] dark:text-white">
                      {billingCycle === 'monthly' ? 'R$ 97' : 'R$ 77'}
                    </span>
                    <span className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">/mês</span>
                    {billingCycle === 'annual' && (
                      <p className="text-[11px] text-[#14B8A6] font-semibold mt-1">
                        Faturado anualmente (Economia de R$ 240)
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 text-xs text-[#1B1B2F] dark:text-[#ECECF5] pb-6 border-t border-white/50 dark:border-white/10 pt-6">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>1 Profissional incluso</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Agenda Inteligente sem conflitos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Cadastro de Clientes e Histórico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Lembretes via WhatsApp (até 200/mês)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Links de Pagamento Pix</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAuth('signup', true)}
                  className="w-full py-3.5 px-4 rounded-xl border border-[#5B4BDB] text-[#5B4BDB] dark:text-white hover:bg-[#5B4BDB] hover:text-white font-bold text-sm transition-all cursor-pointer shadow-xs transform hover:scale-102 active:scale-98"
                >
                  Testar 14 Dias Grátis
                </button>
              </div>
            </StaggerItem>

            {/* Plan 2: Profissional (Featured) */}
            <StaggerItem>
              <div className="relative p-7 rounded-3xl glass-card glass-card-hover border-2 border-[#5B4BDB] shadow-2xl flex flex-col justify-between transform lg:-translate-y-2 ring-4 ring-[#5B4BDB]/10 h-full hover:-translate-y-4 transition-transform duration-300">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#5B4BDB] to-[#14B8A6] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                  ⭐ O Mais Escolhido
                </div>

                <div>
                  <span className="text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA] uppercase tracking-wider">
                    Equipes & Clínicas
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#1B1B2F] dark:text-white mt-1">
                    Plano Profissional
                  </h3>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-1">
                    O pacote completo para transformar atendimento em vendas.
                  </p>

                  <div className="my-6">
                    <span className="text-3xl sm:text-4xl font-black text-[#5B4BDB] dark:text-white">
                      {billingCycle === 'monthly' ? 'R$ 197' : 'R$ 157'}
                    </span>
                    <span className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">/mês</span>
                    {billingCycle === 'annual' && (
                      <p className="text-[11px] text-[#14B8A6] font-semibold mt-1">
                        Faturado anualmente (Economia de R$ 480)
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 text-xs text-[#1B1B2F] dark:text-[#ECECF5] pb-6 border-t border-white/50 dark:border-white/10 pt-6">
                    <div className="flex items-center gap-2 font-bold text-[#5B4BDB] dark:text-[#A78BFA]">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Até 5 Profissionais inclusos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>WhatsApp Multiatendente no mesmo número</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Lembretes Anti-No-Show Ilimitados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Funil de Vendas Visual (Kanban)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Automações de Pós-Atendimento e Aniversário</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Programa de Fidelidade, Cupons e Recompensas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Sincronização Google Calendar</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAuth('signup', true)}
                  className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#5B4BDB] to-[#4A3BC4] hover:from-[#4A3BC4] hover:to-[#382BB0] text-white font-bold text-sm shadow-lg shadow-[#5B4BDB]/30 transition-all cursor-pointer transform hover:scale-102 active:scale-98"
                >
                  Começar Teste de 14 Dias
                </button>
              </div>
            </StaggerItem>

            {/* Plan 3: Clínicas & Redes */}
            <StaggerItem>
              <div className="p-7 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-xl flex flex-col justify-between h-full hover:-translate-y-2 transition-transform duration-300">
                <div>
                  <span className="text-xs font-bold text-[#6B6B80] dark:text-[#9E9EB5] uppercase tracking-wider">
                    Escala & Franquias
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#1B1B2F] dark:text-white mt-1">
                    Clínicas & Redes
                  </h3>
                  <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-1">
                    Para negócios de alta demanda e múltiplas unidades.
                  </p>

                  <div className="my-6">
                    <span className="text-3xl sm:text-4xl font-black text-[#1B1B2F] dark:text-white">
                      {billingCycle === 'monthly' ? 'R$ 347' : 'R$ 277'}
                    </span>
                    <span className="text-xs text-[#6B6B80] dark:text-[#9E9EB5]">/mês</span>
                    {billingCycle === 'annual' && (
                      <p className="text-[11px] text-[#14B8A6] font-semibold mt-1">
                        Faturado anualmente (Economia de R$ 840)
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 text-xs text-[#1B1B2F] dark:text-[#ECECF5] pb-6 border-t border-white/50 dark:border-white/10 pt-6">
                    <div className="flex items-center gap-2 font-bold text-[#14B8A6]">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Profissionais Ilimitados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Tudo do Plano Profissional incluso</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Campanhas em Massa Segmentadas Avançadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Relatórios Gerenciais Exportáveis (PDF/CSV)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Suporte VIP Prioritário com Gerente de Conta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14B8A6]" />
                      <span>Onboarding dedicado e migração de dados gratuita</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAuth('signup', true)}
                  className="w-full py-3.5 px-4 rounded-xl border border-[#5B4BDB] text-[#5B4BDB] dark:text-white hover:bg-[#5B4BDB] hover:text-white font-bold text-sm transition-all cursor-pointer shadow-xs transform hover:scale-102 active:scale-98"
                >
                  Falar com Consultor
                </button>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Guarantee Box */}
          <FadeIn className="mt-14 max-w-2xl mx-auto">
            <div className="p-5 rounded-2xl glass-card border border-[#14B8A6]/40 shadow-lg flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-[#14B8A6] text-white flex items-center justify-center font-bold text-xl shrink-0 mx-auto sm:mx-0 shadow-sm">
                🛡️
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1B1B2F] dark:text-white">
                  Garantia Incondicional de 14 Dias
                </h4>
                <p className="text-xs text-[#6B6B80] dark:text-[#9E9EB5] mt-0.5">
                  Experimente com todas as funcionalidades liberadas. Se a Lunae não multiplicar a organização do seu negócio, você não paga absolutamente nada.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================================
          8. TESTIMONIALS & SOCIAL PROOF
      ======================================================== */}
      <section id="depoimentos" className="py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider">
              Casos Reais
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-white mt-1.5">
              Quem Usou, Nunca Mais Voltou para o Caderno
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] mt-2">
              Veja os resultados de clínicas e estúdios que confiam na Lunae no dia a dia.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {/* Depoimento 1 */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-xl flex flex-col justify-between h-full hover:-translate-y-2 transition-transform duration-300">
                <div>
                  <div
                    onClick={() => triggerStars()}
                    title="Clique para celebrar!"
                    className="flex text-[#F59E0B] mb-3 cursor-pointer hover:scale-110 transition-transform w-max select-none"
                  >
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5] italic leading-relaxed">
                    &ldquo;Nossas faltas caíram de quase 30% para menos de 4%. O lembrete de WhatsApp com confirmação em um toque recuperou mais de R$ 6.000 em procedimentos só no primeiro mês.&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/50 dark:border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#5B4BDB] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    C
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1B1B2F] dark:text-white">
                      Dra. Camila Duarte
                    </p>
                    <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5]">
                      Clínica Dermatológica Renovare (Recife - PE)
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Depoimento 2 */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-xl flex flex-col justify-between h-full hover:-translate-y-2 transition-transform duration-300">
                <div>
                  <div
                    onClick={() => triggerStars()}
                    title="Clique para celebrar!"
                    className="flex text-[#F59E0B] mb-3 cursor-pointer hover:scale-110 transition-transform w-max select-none"
                  >
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5] italic leading-relaxed">
                    &ldquo;Três recepcionistas respondendo no mesmo número de WhatsApp da clínica sem bater cabeça foi a melhor coisa que nos aconteceu. O suporte é rápido e atencioso.&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/50 dark:border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#14B8A6] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    L
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1B1B2F] dark:text-white">
                      Dr. Lucas Fontes
                    </p>
                    <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5]">
                      Consultório Odontológico Sorrir Mais (São Paulo - SP)
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Depoimento 3 */}
            <StaggerItem>
              <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/70 dark:border-white/10 shadow-xl flex flex-col justify-between h-full hover:-translate-y-2 transition-transform duration-300">
                <div>
                  <div
                    onClick={() => triggerStars()}
                    title="Clique para celebrar!"
                    className="flex text-[#F59E0B] mb-3 cursor-pointer hover:scale-110 transition-transform w-max select-none"
                  >
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs sm:text-sm text-[#1B1B2F] dark:text-[#ECECF5] italic leading-relaxed">
                    &ldquo;A cobrança do sinal via Pix no próprio WhatsApp acabou com os clientes que marcavam horário no salão aos sábados e sumiam. A Lunae pagou o plano anual em 2 semanas!&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/50 dark:border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    J
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1B1B2F] dark:text-white">
                      Juliana Medeiros
                    </p>
                    <p className="text-[11px] text-[#6B6B80] dark:text-[#9E9EB5]">
                      Espaço Bella & Spa (Curitiba - PR)
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================================
          9. FREQUENTLY ASKED QUESTIONS (FAQ)
      ======================================================== */}
      <section id="faq" className="py-16 sm:py-24 bg-white/35 dark:bg-[#121224]/40 backdrop-blur-md border-t border-white/60 dark:border-white/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="text-xs font-bold text-[#5B4BDB] dark:text-[#A78BFA] uppercase tracking-wider">
              Tire suas Dúvidas
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-white mt-1.5">
              Perguntas Frequentes
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B80] dark:text-[#9E9EB5] mt-2">
              Tudo o que você precisa saber antes de começar seu teste gratuito.
            </p>
          </FadeIn>

          <div className="space-y-3.5">
            {[
              {
                q: 'Preciso cadastrar cartão de crédito para fazer o teste grátis?',
                a: 'Não! Você pode criar sua conta em menos de 1 minuto apenas com seu nome e e-mail. Não solicitamos dados de cartão de crédito para o período de teste de 14 dias.',
              },
              {
                q: 'Como funciona a integração com o WhatsApp? Eu perco meu número atual?',
                a: 'Você continua usando exatamente o seu número atual! A conexão é rápida e segura via QR Code ou API oficial. Sua equipe poderá atender do computador ou celular simultaneamente.',
              },
              {
                q: 'Consigo importar os clientes das minhas planilhas antigas?',
                a: 'Sim! A Lunae possui um importador fácil de arquivos Excel ou CSV. Em poucos cliques, toda a sua base de clientes, telefones e e-mails é migrada para a plataforma.',
              },
              {
                q: 'O sistema funciona bem no celular? Dá para usar na correria do atendimento?',
                a: 'Com certeza! A Lunae foi projetada com a filosofia de operação móvel com uma mão só. Todos os botões possuem tamanho de toque confortável (≥44px) e navegação simples para quem está de pé atendendo.',
              },
              {
                q: 'Os lembretes automáticos realmente reduzem as faltas?',
                a: 'Sim, estatisticamente os negócios que utilizam a confirmação de 24h e 2h antes no WhatsApp reduzem a taxa de faltas (no-show) em média de 74%, porque o cliente pode confirmar ou pedir reagendamento com 1 toque.',
              },
              {
                q: 'Como funciona a segurança e a LGPD na Lunae?',
                a: 'Seus dados e os dados dos seus clientes são criptografados com padrões bancários em infraestrutura de nuvem segura com Firebase e Google Cloud. O sistema possui ferramentas nativas para registro de consentimento LGPD e opt-out automático em mensagens de campanha.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/70 dark:border-white/10 glass-card overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1B1B2F] dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#5B4BDB] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B6B80] dark:text-[#9E9EB5] shrink-0" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#6B6B80] dark:text-[#9E9EB5] leading-relaxed border-t border-white/50 dark:border-white/10 pt-3.5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          10. FINAL CALL TO ACTION (CTA)
      ======================================================== */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-[#5B4BDB] via-[#4A3BC4] to-[#25253E] text-white border-y border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.3),transparent)] pointer-events-none" />

        <FadeIn className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-[#14B8A6]" />
            Comece hoje a transformar seus resultados
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Pronto para acabar com a bagunça <br className="hidden sm:block" />
            e ver sua agenda cheia todos os dias?
          </h2>

          <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Junte-se a mais de 2.500 profissionais que elevaram o padrão do seu atendimento com a Lunae CRM.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOpenAuth('signup', true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-[#F7F7FB] text-[#5B4BDB] font-extrabold text-base shadow-2xl transition-all cursor-pointer transform hover:-translate-y-0.5 hover:scale-105 active:scale-95"
            >
              Criar Conta Grátis (14 Dias)
            </button>

            <button
              onClick={handleDirectDemoAccess}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-base backdrop-blur-md transition-all cursor-pointer shadow-sm transform hover:-translate-y-0.5 hover:scale-105 active:scale-95"
            >
              Testar Demonstração do CRM
            </button>
          </div>

          <p className="text-xs text-white/70 pt-2">
            Sem compromisso • Cancele quando quiser • Suporte humanizado incluso
          </p>
        </FadeIn>
      </section>

      {/* ========================================================
          11. FOOTER
      ======================================================== */}
      <footer className="glass-panel border-t border-white/60 dark:border-white/10 pt-14 pb-8 text-[#6B6B80] dark:text-[#9E9EB5] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/50 dark:border-white/10">
            {/* Col 1: Logo & About */}
            <div className="col-span-2 space-y-4">
              <img
                src="/Lunae Solutions/LogoNoBg.png"
                alt="Lunae CRM"
                className="h-10 w-auto object-contain"
              />
              <p className="text-xs leading-relaxed max-w-sm">
                O CRM + Agenda + WhatsApp projetado especificamente para clínicas, consultórios, salões e negócios de atendimento.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#14B8A6]/10 text-[#0D9488] dark:text-[#2DD4BF] font-semibold text-[11px] border border-[#14B8A6]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                  Servidores 100% Operacionais
                </span>
              </div>
            </div>

            {/* Col 2: Funcionalidades */}
            <div className="space-y-2.5">
              <p className="font-bold text-[#1B1B2F] dark:text-white uppercase tracking-wider text-[11px]">
                Funcionalidades
              </p>
              <ul className="space-y-2">
                <li><a href="#funcoes" className="hover:text-[#5B4BDB]">Agenda Inteligente</a></li>
                <li><a href="#funcoes" className="hover:text-[#5B4BDB]">WhatsApp Multiatendente</a></li>
                <li><a href="#funcoes" className="hover:text-[#5B4BDB]">Lembretes Anti-No-Show</a></li>
                <li><a href="#funcoes" className="hover:text-[#5B4BDB]">Funil de Vendas</a></li>
                <li><a href="#funcoes" className="hover:text-[#5B4BDB]">Financeiro & Pix</a></li>
                <li><a href="#funcoes" className="hover:text-[#5B4BDB]">Automações 24/7</a></li>
              </ul>
            </div>

            {/* Col 3: Segmentos */}
            <div className="space-y-2.5">
              <p className="font-bold text-[#1B1B2F] dark:text-white uppercase tracking-wider text-[11px]">
                Segmentos
              </p>
              <ul className="space-y-2">
                <li><span>Clínicas de Estética</span></li>
                <li><span>Consultórios Médicos</span></li>
                <li><span>Odontologia</span></li>
                <li><span>Salões & Spas</span></li>
                <li><span>Barbearias</span></li>
                <li><span>Estúdios de Pilates</span></li>
              </ul>
            </div>

            {/* Col 4: Empresa & Legal */}
            <div className="space-y-2.5">
              <p className="font-bold text-[#1B1B2F] dark:text-white uppercase tracking-wider text-[11px]">
                Empresa & Legal
              </p>
              <ul className="space-y-2">
                <li><button onClick={() => handleOpenAuth('login')} className="hover:text-[#5B4BDB] cursor-pointer">Acessar Conta</button></li>
                <li><Link href="/crm" className="hover:text-[#5B4BDB]">Acessar Painel CRM</Link></li>
                <li><a href="#planos" className="hover:text-[#5B4BDB]">Planos e Preços</a></li>
                <li><span>Termos de Uso</span></li>
                <li><span>Privacidade & LGPD</span></li>
                <li><span>Segurança dos Dados</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© {new Date().getFullYear()} Lunae CRM — Lunae Solutions. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <span>Feito com paixão para negócios de atendimento</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================
          12. AUTH MODAL
      ======================================================== */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
        onSuccess={() => {
          setAuthModalOpen(false);
          router.push('/crm');
        }}
      />
    </div>
  );
}
