'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useStore } from '@/store/useStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ErrorBoundary>
      <Navbar />
      <main>{children}</main>
    </ErrorBoundary>
  );
}
