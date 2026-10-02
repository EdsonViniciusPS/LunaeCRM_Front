import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lunae CRM — Agenda, WhatsApp & Vendas para Negócios de Atendimento",
  description: "O CRM completo para clínicas, consultórios, salões e estúdios. Centralize WhatsApp com múltiplos atendentes, acabe com as faltas com lembretes automáticos e receba pagamentos por Pix.",
  icons: {
    icon: "/Lunae Solutions/LogoNoBgIcon.png",
    shortcut: "/Lunae Solutions/LogoNoBgIcon.png",
    apple: "/Lunae_CRM_logo_design_2K_20261001144951.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased text-[#1B1B2F] bg-[#F7F7FB] dark:bg-[#0F0F1A] dark:text-[#ECECF5]">
        <AuthProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

