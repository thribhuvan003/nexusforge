'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Brain, Zap, Dna, Database, GitMerge } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: Database,
      title: 'PERSISTENT IDEA STORAGE',
      problem: 'Ideas die when chat contexts reset.',
      solution: 'Every organism — its DNA, mutations, dreams, and evolution history — is permanently stored in Supabase. Refresh the page, come back tomorrow, the organism is still there, still growing.',
      color: 'var(--brand-lime)',
    },
    {
      icon: Brain,
      title: '5-AGENT SWARM',
      problem: 'Single LLMs just chat. They don\'t build.',
      solution: 'A crew of 5 Gemini agents — Nova (innovator), Atlas (architect), Cipher (critic), Forge (builder), Echo (futurist) — debate, critique, and analyze your idea from 5 distinct perspectives simultaneously.',
      color: 'var(--brand-violet)',
    },
    {
      icon: GitMerge,
      title: 'ORGANISM BREEDING',
      problem: 'Brainstorming in isolation limits creativity.',
      solution: 'Pick any two organisms and initiate a Breeding Ritual. The swarm debates which traits survive, negotiates conflicts, and births a hybrid child with DNA from both parents.',
      color: '#FF3300',
    },
    {
      icon: Zap,
      title: 'FORCE EVOLUTION',
      problem: 'Ideas stall the moment you stop typing.',
      solution: 'Trigger Evolution or Dream mode on any organism at any time. The swarm generates new DNA mutations, narrative fragments, and prototype concepts — pushing your idea further on demand.',
      color: 'var(--brand-orange)',
    },
  ];

  const steps = [
    { step: '01', title: 'DROP THE SEED', desc: 'Type your raw idea — no formatting needed. The swarm instantly analyzes it and generates the organism\'s DNA: core concept, target audience, key innovation, first prototype, and future vision.' },
    { step: '02', title: 'SWARM REACTS', desc: 'All 5 agents give their first reactions before you even enter the organism page. Nova sparks, Atlas structures, Cipher challenges, Forge prototypes, Echo visions.' },
    { step: '03', title: 'EVOLVE & BREED', desc: 'Force evolve to generate new DNA mutations. Trigger dreams for speculative fragments. Breed two organisms together and watch the swarm debate which traits survive.' },
    { step: '04', title: 'EXPORT VALUE', desc: 'Export as Markdown reports, GitHub READMEs, investor pitch outlines, or raw JSON. What started as a vague thought becomes a concrete, structured document.' },
  ];

  const DEMO_ORGANISMS = [
    { name: 'NEURO-PARASITE', gen: 2, mutations: 3, health: 95, color: '#D4FF00' },
    { name: 'CHRONO-PHAGE', gen: 3, mutations: 5, health: 80, color: '#4300FF' },
    { name: 'VOID-WEAVER', gen: 2, mutations: 1, health: 100, color: '#FF3300' },
  ];

  return (
    <div className="bg-black min-h-screen pt-[120px] font-sans selection:bg-[var(--brand-lime)] selection:text-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b-8 border-white/10 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[var(--brand-lime)] rounded-full mix-blend-screen blur-[150px] opacity-10 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="bg-white w-fit px-4 py-2 border-4 border-black mb-8 transform -rotate-2">
              <p className="text-tech text-black font-black uppercase tracking-widest">
                AI IDEA EVOLUTION PLATFORM
              </p>
            </div>

            <h1 className="display-massive text-white uppercase tracking-tighter leading-[0.8] mb-8">
              IDEAS <br />
              NO LONGER <br />
              <span className="text-[var(--brand-lime)]">DIE IN CHATS.</span>
            </h1>

            <p className="text-2xl text-[var(--text-secondary)] font-bold mb-12 max-w-xl leading-tight border-l-8 border-[var(--brand-violet)] pl-6">
              Drop any idea. Gemini births it into a living organism with structured DNA. A 5-agent swarm analyzes, critiques, and evolves it — permanently stored so it never disappears.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/create" className="btn-brutal !py-6 !text-2xl flex-1 text-center justify-center flex items-center gap-3">
                <Sparkles size={28} /> BIRTH AN IDEA
              </Link>
              <Link href="/mesh" className="btn-brutal !py-6 !text-2xl flex-1 text-center justify-center !bg-transparent !text-white border-white flex items-center gap-3 hover:!bg-white hover:!text-black transition-colors">
                <Brain size={28} /> EXPLORE THE MESH
              </Link>
            </div>
          </motion.div>

          {/* Hero Visual — live organism showcase */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative hidden lg:block">
            <div className="aspect-square bg-[var(--bg-paper)] border-4 border-white shadow-[16px_16px_0_rgba(255,255,255,1)] relative p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="font-tech text-[var(--brand-lime)] uppercase font-bold tracking-widest text-sm">LIVE ORGANISMS</span>
                <span className="font-tech text-white uppercase font-bold tracking-widest border-2 border-white/20 px-3 py-1 text-sm">NEXUSFORGE</span>
              </div>

              <div className="flex flex-col gap-4">
                {DEMO_ORGANISMS.map((org, i) => (
                  <motion.div
                    key={org.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.2 }}
                    className="flex items-center gap-4 bg-black border-2 border-white/10 p-4"
                  >
                    <div className="w-10 h-10 border-2 border-white flex items-center justify-center shrink-0" style={{ background: org.color + '20' }}>
                      <div className="w-4 h-4 rounded-full" style={{ background: org.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-sans font-black text-sm text-white uppercase tracking-tight block truncate">{org.name}</span>
                      <span className="font-tech text-[var(--text-tertiary)] text-xs">GEN {org.gen} · {org.mutations} MUTATIONS · {org.health}% HEALTH</span>
                    </div>
                    <div className="w-16 h-1 bg-white/10 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0" style={{ width: `${org.health}%`, background: org.color }} />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="h-4 w-full bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 bottom-0 bg-[var(--brand-lime)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6 border-b-8 border-white/10 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-sans font-black text-6xl md:text-8xl text-white uppercase tracking-tighter mb-6">
              WHAT IT ACTUALLY DOES
            </h2>
            <p className="text-2xl text-[var(--text-secondary)] font-bold max-w-3xl mx-auto">
              No vaporware. These are the four real features you get right now — what they are, what they solve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[var(--bg-paper)] border-4 border-white/20 hover:border-white p-16 flex flex-col gap-6 transition-colors shadow-none hover:shadow-[12px_12px_0_rgba(255,255,255,1)] group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 border-4 border-white flex items-center justify-center bg-black" style={{ color: feat.color }}>
                    <feat.icon size={32} />
                  </div>
                  <h3 className="font-sans font-black text-3xl uppercase text-white tracking-tighter">{feat.title}</h3>
                </div>

                <div className="border-l-4 border-[#FF3300] pl-6 mt-4">
                  <span className="font-tech text-xs text-[#FF3300] uppercase font-black tracking-widest block mb-2">THE PROBLEM:</span>
                  <p className="font-sans text-xl text-[var(--text-secondary)] font-bold">{feat.problem}</p>
                </div>

                <div className="border-l-4 border-[var(--brand-lime)] pl-6">
                  <span className="font-tech text-xs text-[var(--brand-lime)] uppercase font-black tracking-widest block mb-2">WHAT IT DOES:</span>
                  <p className="font-sans text-xl text-white font-bold">{feat.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 px-6 bg-[var(--brand-violet)] relative overflow-hidden">
        <div className="absolute inset-0 bg-black mix-blend-overlay opacity-50" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <h2 className="font-sans font-black text-6xl md:text-8xl text-white uppercase tracking-tighter mb-20 text-center">
            HOW IT OPERATES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black border-4 border-white p-10 relative flex flex-col hover:-translate-y-2 transition-transform"
              >
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[var(--brand-lime)] border-4 border-black flex items-center justify-center font-sans font-black text-3xl text-black transform -rotate-6">
                  {step.step}
                </div>
                <h3 className="font-sans font-black text-3xl uppercase text-white tracking-tighter mt-8 mb-6">{step.title}</h3>
                <p className="font-sans text-xl text-[var(--text-secondary)] font-bold flex-1">{step.desc}</p>
                <div className="mt-8 border-t-4 border-white/20 pt-4">
                  <ArrowRight size={24} className="text-[var(--brand-lime)]" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 mb-16 text-center">
            <Link href="/create" className="btn-brutal !py-8 !text-4xl inline-flex items-center gap-4 !bg-black !text-white hover:!bg-[var(--brand-lime)] hover:!text-black shadow-[12px_12px_0_rgba(255,255,255,1)] hover:shadow-[16px_16px_0_rgba(0,0,0,1)]">
              INITIALIZE SEQUENCE <ArrowRight size={40} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-8 border-white/20 py-12 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="font-sans font-black text-4xl text-white uppercase tracking-tighter mb-2">NEXUSFORGE</h3>
            <p className="font-tech text-[var(--text-tertiary)] uppercase font-bold tracking-widest text-sm">
              AI IDEA EVOLUTION PLATFORM. POWERED BY GEMINI.
            </p>
          </div>
          <div className="flex gap-8 font-tech font-bold uppercase tracking-widest text-sm">
            <Link href="/organisms" className="text-white hover:text-[var(--brand-lime)] transition-colors">BIO-STORAGE</Link>
            <Link href="/mesh" className="text-white hover:text-[var(--brand-violet)] transition-colors">THE MESH</Link>
            <Link href="/create" className="text-white hover:text-[#FF3300] transition-colors">CREATE</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
