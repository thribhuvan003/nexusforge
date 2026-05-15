'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Brain, Zap, Dna, Database, Network } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: Database,
      title: 'PERSISTENT VECTOR MEMORY',
      problem: 'Ideas die when chat contexts reset.',
      solution: 'We use pgvector to permanently store every evolution of your idea. The swarm never forgets. Your context builds infinitely over time.',
      color: 'var(--brand-lime)',
    },
    {
      icon: Network,
      title: 'STATEFUL SWARM EXECUTION',
      problem: 'Single LLMs just chat. They don\'t build.',
      solution: 'A 5-agent LangGraph-style swarm debates, critiques, and executes tasks on your seed. Real autonomous multi-step reasoning.',
      color: 'var(--brand-violet)',
    },
    {
      icon: Dna,
      title: 'SEMANTIC BREEDING',
      problem: 'Brainstorming in isolation limits creativity.',
      solution: 'Fork public ideas from the Mesh and fuse them with your own. The Synthesis engine uses vector proximity to cross-pollinate concepts.',
      color: '#FF3300',
    },
    {
      icon: Zap,
      title: 'AUTONOMOUS EVOLUTION',
      problem: 'Projects stall when you stop typing.',
      solution: 'Background CRON jobs actively evolve your organism while you sleep. You wake up to new branches, prototypes, and mutations.',
      color: 'var(--brand-orange)',
    }
  ];

  const steps = [
    { step: '01', title: 'DROP THE SEED', desc: 'Input raw text, voice, or images. The system instantly structures it into a foundational DNA profile.' },
    { step: '02', title: 'SWARM TAKES OVER', desc: 'The 5-agent crew analyzes the seed. They highlight risks, propose prototypes, and build the initial framework.' },
    { step: '03', title: 'EVOLVE & BREED', desc: 'Interact with the 3D Mesh. Steal concepts from the public network. Synthesize your idea with others to force mutations.' },
    { step: '04', title: 'EXTRACT VALUE', desc: 'Export actionable prototypes, PRDs, or code structures. What started as a vague thought is now a concrete asset.' },
  ];

  return (
    <div className="bg-black min-h-screen pt-[120px] font-sans selection:bg-[var(--brand-lime)] selection:text-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b-8 border-white/10 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[var(--brand-lime)] rounded-full mix-blend-screen blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="bg-white w-fit px-4 py-2 border-4 border-black mb-8 transform -rotate-2">
              <p className="text-tech text-black font-black uppercase tracking-widest">
                THE 2026 AGENTIC-ERA WORKSPACE
              </p>
            </div>
            
            <h1 className="display-massive text-white uppercase tracking-tighter leading-[0.8] mb-8">
              IDEAS <br />
              NO LONGER <br />
              <span className="text-[var(--brand-lime)]">DIE IN CHATS.</span>
            </h1>

            <p className="text-2xl text-[var(--text-secondary)] font-bold mb-12 max-w-xl leading-tight border-l-8 border-[var(--brand-violet)] pl-6">
              Chatbots are obsolete. NexusForge is a living ecosystem where your seeds become persistent, self-improving organisms maintained by an autonomous AI swarm.
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

          {/* Hero Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative hidden lg:block">
            <div className="aspect-square bg-[var(--bg-paper)] border-4 border-white shadow-[16px_16px_0_rgba(255,255,255,1)] relative p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="font-tech text-[var(--brand-lime)] uppercase font-bold tracking-widest">SYSTEM STATUS: NOMINAL</span>
                <span className="font-tech text-white uppercase font-bold tracking-widest border-2 border-white/20 px-3 py-1">GEN 4</span>
              </div>
              <div className="text-center">
                <Brain size={120} className="text-white mx-auto mb-8 animate-pulse" />
                <h2 className="font-sans font-black text-6xl text-white uppercase tracking-tighter">PROJECT_NOVA</h2>
                <p className="font-tech text-[var(--text-secondary)] uppercase tracking-widest mt-4">12 MUTATIONS DETECTED</p>
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

      {/* Why NexusForge / Features */}
      <section className="py-32 px-6 border-b-8 border-white/10 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-sans font-black text-6xl md:text-8xl text-white uppercase tracking-tighter mb-6">
              THE PROBLEM WE SOLVE
            </h2>
            <p className="text-2xl text-[var(--text-secondary)] font-bold max-w-3xl mx-auto">
              Current AI tools forget everything. You brainstorm, close the tab, and the idea dies. We fixed that by giving ideas persistent vector memory and an autonomous team to grow them.
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
                  <span className="font-tech text-xs text-[var(--brand-lime)] uppercase font-black tracking-widest block mb-2">THE SOLUTION:</span>
                  <p className="font-sans text-xl text-white font-bold">{feat.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 px-6 bg-[var(--brand-violet)] relative overflow-hidden">
        <div className="absolute inset-0 bg-black mix-blend-overlay opacity-50"></div>
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
              2026 AGENTIC WORKSPACE. OPEN SOURCE.
            </p>
          </div>
          <div className="flex gap-8 font-tech font-bold uppercase tracking-widest text-sm">
            <Link href="https://github.com/nexusforge" className="text-white hover:text-[var(--brand-lime)] transition-colors">GITHUB</Link>
            <Link href="/organisms" className="text-white hover:text-[var(--brand-violet)] transition-colors">BIO-STORAGE</Link>
            <Link href="/mesh" className="text-white hover:text-[#FF3300] transition-colors">THE MESH</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
