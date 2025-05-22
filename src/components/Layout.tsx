
import React from 'react';
import { NavigationBar } from './NavigationBar';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from './ui/spinner';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-medical-light">
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      <NavigationBar />
    </div>
  );
};

export const AuthenticatedLayout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!user) {
    window.location.href = '/login';
    return null;
  }
  
  return <Layout>{children}</Layout>;
};
