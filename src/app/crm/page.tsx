'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { OfflineBanner } from '@/components/layout/OfflineBanner';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { MobileMoreDrawer } from '@/components/layout/MobileMoreDrawer';
import { GlobalSearchModal } from '@/components/layout/GlobalSearchModal';
import { NotificationDrawer } from '@/components/layout/NotificationDrawer';
import { ToastContainer } from '@/components/layout/ToastContainer';

// Module views
import { DashboardModule } from '@/components/modules/DashboardModule';
import { AgendaModule } from '@/components/modules/AgendaModule';
import { WhatsAppModule } from '@/components/modules/WhatsAppModule';
import { ClientesModule } from '@/components/modules/ClientesModule';
import { FunilModule } from '@/components/modules/FunilModule';
import { FinanceiroModule } from '@/components/modules/FinanceiroModule';
import { LembretesModule } from '@/components/modules/LembretesModule';
import { CampanhasModule } from '@/components/modules/CampanhasModule';
import { FidelizacaoModule } from '@/components/modules/FidelizacaoModule';
import { RelatoriosModule } from '@/components/modules/RelatoriosModule';
import { AutomacoesModule } from '@/components/modules/AutomacoesModule';
import { IntegracoesModule } from '@/components/modules/IntegracoesModule';
import { UsuariosModule } from '@/components/modules/UsuariosModule';
import { PermissoesModule } from '@/components/modules/PermissoesModule';

function CRMContent() {
  const { currentModule } = useApp();


  const renderActiveModule = () => {
    switch (currentModule) {
      case 'inicio':
        return <DashboardModule />;
      case 'agenda':
        return <AgendaModule />;
      case 'whatsapp':
        return <WhatsAppModule />;
      case 'clientes':
        return <ClientesModule />;
      case 'funil':
        return <FunilModule />;
      case 'financeiro':
        return <FinanceiroModule />;
      case 'lembretes':
        return <LembretesModule />;
      case 'campanhas':
        return <CampanhasModule />;
      case 'fidelizacao':
        return <FidelizacaoModule />;
      case 'relatorios':
        return <RelatoriosModule />;
      case 'automacoes':
        return <AutomacoesModule />;
      case 'integracoes':
        return <IntegracoesModule />;
      case 'usuarios':
        return <UsuariosModule />;
      case 'permissoes':
        return <PermissoesModule />;
      default:
        return <DashboardModule />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FB] dark:bg-[#0F0F1A] text-[#1B1B2F] dark:text-[#ECECF5] relative overflow-hidden">
      {/* Ambient background glow orbs for glassmorphism refraction */}
      <div className="fixed top-0 left-10 w-[500px] h-[500px] bg-[#5B4BDB]/10 dark:bg-[#5B4BDB]/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-1/3 right-0 w-[450px] h-[450px] bg-[#14B8A6]/10 dark:bg-[#14B8A6]/12 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-0 left-1/3 w-[600px] h-[400px] bg-[#6E60E6]/8 dark:bg-[#6E60E6]/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Offline banner at the very top */}
      <OfflineBanner />

      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Desktop / Tablet Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Topbar />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1280px] w-full mx-auto pb-24 md:pb-8">
            {renderActiveModule()}
          </main>
        </div>
      </div>


      {/* Mobile Navigation bar (<768px) */}
      <MobileBottomNav />

      {/* Mobile More drawer */}
      <MobileMoreDrawer />

      {/* Modals and Drawers */}
      <GlobalSearchModal />
      <NotificationDrawer />
      <ToastContainer />
    </div>
  );
}

export default function CRMPage() {
  return (
    <AppProvider>
      <CRMContent />
    </AppProvider>
  );
}
