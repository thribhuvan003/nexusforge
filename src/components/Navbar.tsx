'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Menu, X, Hexagon } from 'lucide-react';

const NAV_LINKS = [
  { href: '/create', label: 'Create' },
  { href: '/organisms', label: 'Organisms' },
  { href: '/mesh', label: 'Mesh' },
  { href: '/breed', label: 'Breed' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { organisms } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isBreedActive = pathname === '/breed' || pathname.startsWith('/breed/');

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6 transition-all duration-500"
      >
        <div
          className={`flex items-center justify-between w-full max-w-[1600px] transition-all duration-500 ${
            scrolled ? 'bg-black border-4 border-white px-6 py-4 shadow-[8px_8px_0_rgba(255,255,255,1)] transform -rotate-1' : 'bg-transparent border-4 border-transparent px-2 py-4'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group bg-white/10 px-4 py-2 border-2 border-transparent hover:border-[var(--brand-lime)] transition-colors">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="w-12 h-12 bg-[var(--brand-lime)] flex items-center justify-center flex-shrink-0 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]"
            >
              <Hexagon size={28} className="text-black" fill="#000" />
            </motion.div>
            <span className="font-sans font-black text-3xl tracking-tighter text-white leading-none uppercase mt-1 group-hover:text-[var(--brand-lime)] transition-colors">
              NEXUSFORGE
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-4 bg-black p-2 border-4 border-white/20">
            {NAV_LINKS.map(link => {
              const isActive = link.href === '/breed'
                ? isBreedActive
                : pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-8 py-3 font-sans font-black text-lg uppercase tracking-widest transition-transform border-4 ${
                    isActive ? 'text-black bg-[var(--brand-lime)] border-black shadow-[4px_4px_0_rgba(255,255,255,1)] transform -translate-y-1' : 'text-white border-transparent hover:border-white hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.href === '/organisms' && organisms.length > 0 && (
                    <span className="absolute top-2 right-2 w-3 h-3 bg-[var(--brand-orange)] border-2 border-black animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link href="/create" className="btn-brutal !py-4 !px-8 !text-lg !border-4 !rounded-none">
              DEPLOY SEED
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden w-14 h-14 bg-black border-4 border-[var(--brand-lime)] flex items-center justify-center text-[var(--brand-lime)] shadow-[4px_4px_0_rgba(212,255,0,1)]"
          >
            {mobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[99] bg-[var(--bg-abyss)]/95 backdrop-blur-3xl pt-32 px-6 flex flex-col gap-6"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: "spring" }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-6xl font-sans font-black tracking-tighter uppercase border-b border-white/10 pb-6 ${
                    pathname === link.href || (link.href === '/breed' && isBreedActive) ? 'text-[var(--brand-lime)]' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8"
            >
              <Link href="/create" onClick={() => setMobileOpen(false)} className="btn-brutal w-full text-center">
                Deploy Seed
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
