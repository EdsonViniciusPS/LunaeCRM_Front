'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export interface LunaeUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  businessName?: string;
  role?: 'admin' | 'atendente' | 'financeiro';
  isDemo?: boolean;
}

interface AuthContextType {
  user: LunaeUser | null;
  loading: boolean;
  authError: string | null;
  setAuthError: (error: string | null) => void;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithEmail: (name: string, businessName: string, email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signInDemo: (role?: 'admin' | 'atendente' | 'financeiro') => void;
  sendPasswordReset: (email: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to convert Firebase error codes into friendly Brazilian Portuguese messages
function getFriendlyErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'O endereço de e-mail informado não é válido.';
    case 'auth/user-disabled':
      return 'Esta conta de usuário foi desativada.';
    case 'auth/user-not-found':
      return 'Nenhuma conta encontrada com este e-mail.';
    case 'auth/wrong-password':
      return 'Senha incorreta. Verifique e tente novamente.';
    case 'auth/invalid-credential':
      return 'E-mail ou senha incorretos.';
    case 'auth/email-already-in-use':
      return 'Este e-mail já está sendo utilizado por outra conta.';
    case 'auth/weak-password':
      return 'A senha é fraca. Crie uma senha com pelo menos 6 caracteres.';
    case 'auth/popup-closed-by-user':
      return 'A janela do Google foi fechada antes de concluir o login.';
    case 'auth/cancelled-popup-request':
      return 'A solicitação de login com o Google foi cancelada.';
    case 'auth/popup-blocked':
      return 'O navegador bloqueou a janela do Google. Permita pop-ups para entrar.';
    case 'auth/operation-not-allowed':
      return 'Este método de login ainda não foi ativado no Firebase Console. Você pode usar o modo Demonstração!';
    case 'auth/network-request-failed':
      return 'Falha de conexão. Verifique sua internet e tente novamente.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas sem sucesso. Aguarde alguns minutos antes de tentar de novo.';
    default:
      return 'Ocorreu um erro na autenticação. Tente novamente ou use o Acesso Demonstração.';
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LunaeUser | null>(() => {
    if (typeof window !== 'undefined') {
      const savedDemoUser = localStorage.getItem('lunae_demo_user');
      if (savedDemoUser) {
        try {
          return JSON.parse(savedDemoUser);
        } catch {
          localStorage.removeItem('lunae_demo_user');
        }
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Usuário Lunae',
          email: fbUser.email,
          photoURL: fbUser.photoURL,
          role: 'admin',
          isDemo: false,
        });
      } else {
        // If not demo user in localStorage, set to null
        if (typeof window !== 'undefined' && !localStorage.getItem('lunae_demo_user')) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  // Email and Password Login
  const signInWithEmail = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lunae_demo_user');
      }
      setUser({
        uid: cred.user.uid,
        displayName: cred.user.displayName || cred.user.email?.split('@')[0] || 'Usuário Lunae',
        email: cred.user.email,
        photoURL: cred.user.photoURL,
        role: 'admin',
        isDemo: false,
      });
      return true;
    } catch (err: unknown) {
      console.warn('Firebase signInWithEmail error:', err);
      const errorCode = (err as { code?: string })?.code || '';
      const msg = getFriendlyErrorMessage(errorCode);
      setAuthError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with Email and Password + name and business
  const signUpWithEmail = async (
    name: string,
    businessName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, {
        displayName: name,
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lunae_demo_user');
      }
      setUser({
        uid: cred.user.uid,
        displayName: name,
        email: cred.user.email,
        photoURL: null,
        businessName,
        role: 'admin',
        isDemo: false,
      });
      return true;
    } catch (err: unknown) {
      console.warn('Firebase signUpWithEmail error:', err);
      const errorCode = (err as { code?: string })?.code || '';
      const msg = getFriendlyErrorMessage(errorCode);
      setAuthError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const signInWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lunae_demo_user');
      }
      setUser({
        uid: cred.user.uid,
        displayName: cred.user.displayName,
        email: cred.user.email,
        photoURL: cred.user.photoURL,
        role: 'admin',
        isDemo: false,
      });
      return true;
    } catch (err: unknown) {
      console.warn('Firebase signInWithGoogle error:', err);
      const errorCode = (err as { code?: string })?.code || '';
      const msg = getFriendlyErrorMessage(errorCode);
      setAuthError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Instant Demo Sign-in for immediate preview/evaluation without credentials
  const signInDemo = (role: 'admin' | 'atendente' | 'financeiro' = 'admin') => {
    setLoading(true);
    setAuthError(null);
    const names = {
      admin: 'Edson Vinícius (Admin)',
      atendente: 'Marina Silveira (Atendimento)',
      financeiro: 'Juliana Costa (Financeiro)',
    };
    const emails = {
      admin: 'edson.admin@lunaecrm.com.br',
      atendente: 'marina.atendimento@lunaecrm.com.br',
      financeiro: 'juliana.financeiro@lunaecrm.com.br',
    };
    const demoUser: LunaeUser = {
      uid: `demo-${role}-${Date.now()}`,
      displayName: names[role],
      email: emails[role],
      photoURL: null,
      businessName: 'Clínica & Espaço Estética Lunae',
      role,
      isDemo: true,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('lunae_demo_user', JSON.stringify(demoUser));
    }
    setUser(demoUser);
    setLoading(false);
  };

  // Password Reset Email
  const sendPasswordReset = async (email: string): Promise<boolean> => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (err: unknown) {
      const errorCode = (err as { code?: string })?.code || '';
      const msg = getFriendlyErrorMessage(errorCode);
      setAuthError(msg);
      return false;
    }
  };

  // Sign out
  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn('Firebase signOut error', err);
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lunae_demo_user');
    }
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        setAuthError,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInDemo,
        sendPasswordReset,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
