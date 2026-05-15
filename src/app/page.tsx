'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Sparkles, ArrowRight, Brain, Zap, GitMerge, Database, Hexagon } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const FEATURES = [
  {
    icon: Database,
    title: 'IDEAS THAT STAY ALIVE',
    desc: 'Your spark gets a permanent home. Refresh, close the tab, come back in a week — it\'s still there, still growing, still ready to evolve.',
    accent: 'var(--brand-lime)',
  },
  {
    icon: Brain,
    title: 'FIVE MINDS, ONE IDEA',
    desc: 'Nova sparks. Atlas structures. Cipher challenges. Forge prototypes. Echo dreams. Five distinct perspectives debate your concept in real time.',
    accent: 'var(--brand-violet)',
  },
  {
    icon: GitMerge,
    title: 'BREED YOUR IDEAS',
    desc: 'Pick two organisms. The swarm debates which traits survive. A hybrid child is born — DNA from both parents, brand new direction.',
    accent: 'var(--brand-orange)',
  },
  {
    icon: Zap,
    title: 'PUSH IT FURTHER',
    desc: 'Stuck? Hit evolve. The swarm generates new mutations on demand. Or dream — speculative fragments that take your idea somewhere unexpected.',
    accent: 'var(--brand-lime)',
  },
];

const STEPS = [
  { n: '01', t: 'DROP THE SEED', d: 'Type your idea raw. No formatting. The swarm decodes it into structured DNA.' },
  { n: '02', t: 'SWARM REACTS', d: 'Five agents weigh in immediately. You watch the organism come alive.' },
  { n: '03', t: 'EVOLVE & BREED', d: 'Mutate it. Dream it. Cross it with another organism. Nothing stays static.' },
  { n: '04', t: 'EXPORT', d: 'Markdown, README, pitch outline, raw JSON. Take it anywhere.' },
];

const DEMO_ORGS = [
  { name: 'NEURO-PARASITE', gen: 2, mutations: 3, health: 95, color: '#D4FF00' },
  { name: 'CHRONO-PHAGE', gen: 3, mutations: 5, health: 80, color: '#4300FF' },
  { name: 'VOID-WEAVER', gen: 2, mutations: 1, health: 100, color: '#FF3300' },
];

const AGENTS = [
  { name: 'NOVA', role: 'INNOVATOR', emoji: '🚀', color: '#D4FF00' },
  { name: 'ATLAS', role: 'ARCHITECT', emoji: '🏛️', color: '#4300FF' },
  { name: 'CIPHER', role: 'CRITIC', emoji: '🔓', color: '#FF3300' },
  { name: 'FORGE', role: 'BUILDER', emoji: '⚒️', color: '#D4FF00' },
  { name: 'ECHO', role: 'FUTURIST', emoji: '🌌', color: '#4300FF' },
];

// Magnetic button — follows cursor within a radius
function MagneticBtn({ children, href, variant = 'lime', className = '' }: { children: React.ReactNode; href: string; variant?: 'lime' | 'ghost'; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    x.set(dx);
    y.set(dy);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`btn-brutal ${variant === 'ghost' ? '!bg-transparent !text-white border-white hover:!bg-white hover:!text-black' : ''} ${className}`}
    >
      {children}
    </motion.a>
  );
}

// 3D-tilt card
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt-card ${className}`}>
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="tilt-card-inner h-full">
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-black min-h-screen pt-[120px] font-sans selection:bg-[var(--brand-lime)] selection:text-black">
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center justify-center overflow-hidden border-b-8 border-white/10 px-6">
        {/* aurora gradient drift */}
        <div className="aurora" />
        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)', backgroundSize: '28px 28px' }} />

        {/* animated DNA strands SVG, decorative */}
        <svg aria-hidden className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-[300px] opacity-30 pointer-events-none dna-strand" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0 100 Q 150 20 300 100 T 600 100 T 900 100 T 1200 100" />
          <path d="M0 100 Q 150 180 300 100 T 600 100 T 900 100 T 1200 100" />
        </svg>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <span className="sticker">⚡ NOW IN PUBLIC BETA</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, staggerChildren: 0.08 }}
              className="display-massive text-white uppercase tracking-tighter leading-[0.82] mt-8 mb-8"
            >
              {['IDEAS', 'DON\'T', 'DIE'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 100, damping: 12 }}
                  className="block"
                  style={{ color: i === 2 ? 'var(--brand-lime)' : '#fff' }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="block text-2xl md:text-4xl mt-6 font-mono normal-case tracking-normal text-[var(--text-secondary)] font-bold"
              >
                they evolve.<span className="caret" />
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-xl md:text-2xl text-[var(--text-secondary)] font-bold mb-12 max-w-xl leading-tight border-l-8 border-[var(--brand-violet)] pl-6"
            >
              Drop a raw idea. Five agents tear into it, give it DNA, and it lives — mutating, breeding, evolving — every time you come back.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn href="/create" className="!py-6 !text-2xl flex items-center gap-3">
                <Sparkles size={28} /> PLANT A SEED
              </MagneticBtn>
              <MagneticBtn href="/organisms" variant="ghost" className="!py-6 !text-2xl flex items-center gap-3">
                <Brain size={28} /> SEE THE GARDEN
              </MagneticBtn>
            </motion.div>

            {/* Inline counter / stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-16 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: '5', label: 'AGENTS' },
                { n: '∞', label: 'MUTATIONS' },
                { n: '0', label: 'IDEAS LOST' },
              ].map((s) => (
                <div key={s.label} className="border-l-4 border-[var(--brand-lime)] pl-4">
                  <div className="ticker font-black text-4xl text-white">{s.n}</div>
                  <div className="text-tech mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Live organism showcase, tilted */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative hidden lg:block">
            <TiltCard>
              <div className="aspect-square bg-[var(--bg-paper)] border-4 border-white shadow-[16px_16px_0_rgba(255,255,255,1)] relative p-8 flex flex-col justify-between holo">
                <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-[var(--brand-lime)] uppercase font-bold tracking-widest text-sm">⬢ LIVE ORGANISMS</span>
                  <span className="font-mono text-white uppercase font-bold tracking-widest border-2 border-white/20 px-3 py-1 text-sm ticker">v0.1</span>
                </div>

                <div className="relative z-10 flex flex-col gap-4">
                  {DEMO_ORGS.map((org, i) => (
                    <motion.div
                      key={org.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-4 bg-black border-2 border-white/10 p-4 hover:border-white/40 transition-colors"
                    >
                      <div className="w-10 h-10 border-2 border-white flex items-center justify-center shrink-0" style={{ background: org.color + '20' }}>
                        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} className="w-4 h-4 rounded-full" style={{ background: org.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-sans font-black text-sm text-white uppercase tracking-tight block truncate">{org.name}</span>
                        <span className="font-mono text-[var(--text-tertiary)] text-xs">GEN {org.gen} · {org.mutations} MUT · {org.health}%</span>
                      </div>
                      <div className="w-16 h-1 bg-white/10 relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${org.health}%` }}
                          transition={{ delay: 0.8 + i * 0.2, duration: 1 }}
                          className="absolute inset-y-0 left-0"
                          style={{ background: org.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* progress bar */}
                <div className="relative z-10 h-3 w-full bg-white/10 relative overflow-hidden border border-white/20">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-0 left-0 bottom-0 bg-[var(--brand-lime)]"
                  />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-tech flex flex-col items-center gap-2">
          <span>SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>↓</motion.div>
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="marquee-container border-y-4 border-black">
        <div className="marquee-content">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="marquee-item">
              ⚡ EVOLVE · 🧬 BREED · ✦ DREAM · 🌑 MUTATE · ⚡ EVOLVE · 🧬 BREED · ✦ DREAM · 🌑 MUTATE ·
            </span>
          ))}
        </div>
      </div>

      {/* ═══ FEATURES ═══ */}
      <section className="py-32 px-6 border-b-8 border-white/10 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 max-w-3xl">
            <span className="sticker violet">★ THE GOOD STUFF</span>
            <h2 className="font-sans font-black text-5xl md:text-7xl text-white uppercase tracking-tighter mt-6 mb-4">
              FOUR THINGS<br />THAT MAKE IT <span className="text-[var(--brand-lime)]">FUN</span>.
            </h2>
            <p className="text-xl text-[var(--text-secondary)] font-bold">
              No bloat. Just the moves you'll actually use, polished until they pop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: i * 0.1 }}
              >
                <TiltCard>
                  <div className="bg-[var(--bg-paper)] border-4 border-white/20 p-10 md:p-12 h-full flex flex-col gap-6 transition-all duration-300 hover:border-white hover:shadow-[12px_12px_0_rgba(255,255,255,0.9)] group relative overflow-hidden">
                    {/* big background number */}
                    <div className="absolute -right-4 -bottom-12 text-[14rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">
                      0{i + 1}
                    </div>

                    <div className="relative z-10 flex items-center gap-5">
                      <motion.div
                        whileHover={{ rotate: -8, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                        className="w-16 h-16 border-4 border-white flex items-center justify-center bg-black shrink-0"
                        style={{ color: feat.accent }}
                      >
                        <feat.icon size={30} />
                      </motion.div>
                      <h3 className="font-sans font-black text-2xl md:text-3xl uppercase text-white tracking-tighter leading-tight">
                        {feat.title}
                      </h3>
                    </div>

                    <p className="relative z-10 font-sans text-lg md:text-xl text-[var(--text-secondary)] font-bold leading-snug">
                      {feat.desc}
                    </p>

                    <div className="relative z-10 mt-auto pt-4 border-t-2 border-white/10 flex items-center justify-between text-tech">
                      <span style={{ color: feat.accent }}>● ACTIVE</span>
                      <ArrowRight size={20} className="text-white group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AGENT ROSTER ═══ */}
      <section className="py-32 px-6 border-b-8 border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-40" />
        <div className="max-w-[1400px] mx-auto relative">
          <div className="text-center mb-16">
            <span className="sticker orange">⚒︎ MEET THE CREW</span>
            <h2 className="font-sans font-black text-5xl md:text-7xl text-white uppercase tracking-tighter mt-6">
              FIVE MINDS,<br />ONE <span className="text-[var(--brand-violet)]">SWARM</span>.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {AGENTS.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring' }}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? -2 : 2 }}
                className="bg-[var(--bg-paper)] border-4 border-white p-6 flex flex-col items-center text-center holo"
              >
                <div className="text-5xl mb-3 relative z-10">{agent.emoji}</div>
                <div className="relative z-10 font-sans font-black text-xl text-white uppercase tracking-tight">{agent.name}</div>
                <div className="relative z-10 text-tech mt-1" style={{ color: agent.color }}>{agent.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-32 px-6 bg-[var(--brand-violet)] relative overflow-hidden border-b-8 border-black">
        <div className="absolute inset-0 bg-black mix-blend-overlay opacity-50" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="sticker">▶ THE LOOP</span>
            <h2 className="font-sans font-black text-5xl md:text-7xl text-white uppercase tracking-tighter mt-6">
              FOUR STEPS.<br />THAT'S IT.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-black border-4 border-white p-8 relative flex flex-col h-full"
              >
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[var(--brand-lime)] border-4 border-black flex items-center justify-center font-sans font-black text-3xl text-black ticker transform -rotate-6">
                  {step.n}
                </div>
                <h3 className="font-sans font-black text-2xl uppercase text-white tracking-tighter mt-6 mb-4">{step.t}</h3>
                <p className="font-sans text-base text-[var(--text-secondary)] font-bold flex-1">{step.d}</p>
                <div className="mt-6 border-t-4 border-white/20 pt-4">
                  <ArrowRight size={20} className="text-[var(--brand-lime)]" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <MagneticBtn href="/create" className="!py-7 !text-3xl !bg-black !text-white hover:!bg-[var(--brand-lime)] hover:!text-black shadow-[12px_12px_0_rgba(255,255,255,1)]">
              START FORGING <ArrowRight size={32} />
            </MagneticBtn>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-black py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-4 group mb-4 w-fit">
                <div className="w-14 h-14 bg-[var(--brand-lime)] flex items-center justify-center border-4 border-black shadow-[4px_4px_0_rgba(255,255,255,1)] group-hover:rotate-180 transition-transform duration-500">
                  <Hexagon size={28} className="text-black" fill="#000" />
                </div>
                <span className="font-sans font-black text-5xl text-white uppercase tracking-tighter">NEXUSFORGE</span>
              </Link>
              <p className="font-mono text-[var(--text-tertiary)] uppercase font-bold tracking-widest text-sm max-w-md mt-4">
                A garden for ideas. Built by <Link href="https://github.com/thribhuvan003" className="text-white hover:text-[var(--brand-lime)] transition-colors">thribhuvan003</Link>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-3 font-mono font-bold uppercase tracking-widest text-sm">
              <Link href="/create" className="text-white hover:text-[var(--brand-lime)] transition-colors">Create</Link>
              <Link href="/organisms" className="text-white hover:text-[var(--brand-violet)] transition-colors">Organisms</Link>
              <Link href="/mesh" className="text-white hover:text-[var(--brand-orange)] transition-colors">Mesh</Link>
              <Link href="/breed" className="text-white hover:text-[var(--brand-lime)] transition-colors">Breed</Link>
            </div>
          </div>

          <div className="border-t-2 border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-tech">
            <span>© NEXUSFORGE · {new Date().getFullYear()}</span>
            <span>NEON LIME. CHUNKY BORDERS. NO REGRETS.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
