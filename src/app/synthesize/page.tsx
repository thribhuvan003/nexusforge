'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SynthesizePage() {
  const router = useRouter();
  useEffect(() => { router.replace('/organisms'); }, [router]);
  return null;
}
