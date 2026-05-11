'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useStore } from '@/store/useStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useStore();

  // Sync theme to DOM on mount and whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
