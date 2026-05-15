'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import ClientLayout from '@/components/ClientLayout';
import OrganismAvatar from '@/components/OrganismAvatar';
import { NexusCore, DNAStrand, AGENT_PROFILES } from '@/types';
import { Dna, Plus, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { saveOrganism } from '@/lib/supabase';

export default function SynthesizePage() {
  const router = useRouter();
  const { organisms, addOrganism } = useStore();
  const [parentA, setParentA] = useState<NexusCore | null>(null);
  const [parentB, setParentB] = useState<NexusCore | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [phase, setPhase] = useState('');
  const [error, setError] = useState('');
  const [showSelector, setShowSelector] = useState<'A' | 'B' | null>(null);

  const handleSynthesize = async () => {
    if (!parentA || !parentB || isSynthesizing) return;
    setError('');
    setIsSynthesizing(true);
    setPhase('EXTRACTING DNA...');

    const phases = [
      'EXTRACTING DNA...',
      'CROSSING GENOMES...',
      'MUTATING TRAITS...',
      'BIRTHING HYBRID...',
    ];

    let phaseIdx = 0;
    const phaseInterval = setInterval(() => {
      phaseIdx = Math.min(phaseIdx + 1, phases.length - 1);
      setPhase(phases[phaseIdx]);
    }, 2000);

    try {
      const res = await fetch('/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parentA, parentB }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const now = new Date().toISOString();
      const id = `nexus-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const generation = Math.max(parentA.generation, parentB.generation) + 1;

      const organism: NexusCore = {
        id,
        name: data.name || 'Unnamed Hybrid',
        tagline: data.tagline || '',
        seed_type: 'text',
        seed_content: `Hybrid of ${parentA.name} & ${parentB.name}`,
        dna: (data.dna || []).map((d: Partial<DNAStrand>, i: number) => ({
          ...d,
          id: `dna-${id}-${i}`,
          generation,
          created_at: now,
        })),
        agents: AGENT_PROFILES,
        generation,
        mutations: parentA.mutations + parentB.mutations + 1,
        health: 100,
        status: 'growing',
        created_at: now,
        updated_at: now,
        user_id: 'local',
        is_public: false,
        family_tree: [{
          id: `ft-${id}-0`,
          nexus_id: id,
          parent_ids: [parentA.id, parentB.id],
          generation,
          label: 'Synthesis',
          type: 'breed',
          summary: `Synthesized from ${parentA.name} & ${parentB.name}`,
          created_at: now,
        }],
        avatar_color: data.avatar_color || '#D4FF00',
        avatar_glow: `${data.avatar_color || '#D4FF00'}80`,
      };

      addOrganism(organism);
      await saveOrganism(organism);
      clearInterval(phaseInterval);
      router.push(`/organism/${id}`);
    } catch (err) {
      clearInterval(phaseInterval);
      setError(err instanceof Error ? err.message : 'Synthesis failed.');
      setIsSynthesizing(false);
    }
  };

  const SelectorModal = () => {
    if (!showSelector) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
        <div className="bg-[var(--bg-paper)] w-full max-w-4xl max-h-[80vh] flex flex-col border-8 border-white shadow-[16px_16px_0_rgba(212,255,0,1)]">
          <div className="p-6 border-b-8 border-white/20 flex justify-between items-center bg-[var(--brand-violet)] text-white">
            <h2 className="text-4xl font-black uppercase tracking-tighter">SELECT PARENT {showSelector}</h2>
            <button onClick={() => setShowSelector(null)} className="text-2xl font-black px-4 py-2 bg-black hover:bg-white hover:text-black">X</button>
          </div>
          <div className="p-6 overflow-y-auto grid gap-4 grid-cols-1 md:grid-cols-2">
            {organisms.map(org => {
              const isSelected = parentA?.id === org.id || parentB?.id === org.id;
              if (isSelected) return null;
              return (
                <button key={org.id}
                  onClick={() => {
                    if (showSelector === 'A') setParentA(org);
                    if (showSelector === 'B') setParentB(org);
                    setShowSelector(null);
                  }}
                  className="flex items-center gap-4 bg-black p-4 border-4 border-white/20 hover:border-[var(--brand-lime)] hover:shadow-[8px_8px_0_rgba(212,255,0,1)] hover:-translate-y-1 transition-all text-left"
                >
                  <OrganismAvatar organism={org} size={60} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-white truncate">{org.name}</h3>
                    <p className="text-[var(--text-secondary)] font-bold text-sm truncate">{org.tagline}</p>
                  </div>
                </button>
              );
            })}
            {organisms.length <= (parentA ? 1 : 0) + (parentB ? 1 : 0) && (
              <div className="col-span-full py-12 text-center text-[var(--text-secondary)] font-black text-2xl uppercase">
                NO AVAILABLE ORGANISMS
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <ClientLayout>
      <div className="min-h-screen pt-[120px] pb-20 px-6 max-w-[1200px] mx-auto relative overflow-hidden">
        {/* Background Decorative Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#FF3300] rounded-full mix-blend-screen blur-[200px] opacity-10 pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <div className="mb-16 border-b-8 border-white/10 pb-8 text-center">
            <div className="bg-[#FF3300] w-fit mx-auto px-4 py-2 border-4 border-black mb-6 transform rotate-1">
              <p className="text-tech text-black font-black flex items-center gap-2">
                <Dna size={20} className="animate-pulse" /> BREEDING ENGINE
              </p>
            </div>
            <h1 className="display-massive text-white uppercase tracking-tighter leading-[0.8]">
              SYNTHESIZE <br/>
              <span className="text-black bg-[var(--brand-lime)] px-4 mt-2 inline-block border-8 border-black shadow-[8px_8px_0_rgba(255,255,255,0.2)] transform -rotate-2">NEW LIFE.</span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16">
            {/* PARENT A */}
            <div className="w-full md:w-1/3">
              {parentA ? (
                <div className="relative group">
                  <div className="bg-[var(--bg-paper)] p-8 border-4 border-white shadow-[12px_12px_0_rgba(0,0,0,1)] text-center relative z-10">
                    <OrganismAvatar organism={parentA} size={120} className="mx-auto mb-6" />
                    <h3 className="font-sans font-black text-3xl uppercase tracking-tighter text-white mb-2">{parentA.name}</h3>
                    <p className="text-[var(--text-secondary)] font-bold mb-4">GEN {parentA.generation}</p>
                    <button onClick={() => setParentA(null)} className="text-[#FF3300] font-black uppercase text-sm border-2 border-[#FF3300] px-4 py-1 hover:bg-[#FF3300] hover:text-white">REMOVE</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowSelector('A')} className="w-full aspect-square border-8 border-dashed border-white/20 bg-black/50 hover:bg-[var(--brand-violet)]/10 hover:border-[var(--brand-violet)] flex flex-col items-center justify-center gap-4 transition-all group">
                  <div className="w-20 h-20 bg-[var(--brand-violet)] flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                    <Plus size={40} className="text-black" />
                  </div>
                  <span className="font-sans font-black text-2xl uppercase tracking-widest text-white/50 group-hover:text-white">SELECT PARENT A</span>
                </button>
              )}
            </div>

            {/* PLUS SIGN */}
            <div className="text-8xl font-black text-white/20">+</div>

            {/* PARENT B */}
            <div className="w-full md:w-1/3">
              {parentB ? (
                <div className="relative group">
                  <div className="bg-[var(--bg-paper)] p-8 border-4 border-white shadow-[12px_12px_0_rgba(0,0,0,1)] text-center relative z-10">
                    <OrganismAvatar organism={parentB} size={120} className="mx-auto mb-6" />
                    <h3 className="font-sans font-black text-3xl uppercase tracking-tighter text-white mb-2">{parentB.name}</h3>
                    <p className="text-[var(--text-secondary)] font-bold mb-4">GEN {parentB.generation}</p>
                    <button onClick={() => setParentB(null)} className="text-[#FF3300] font-black uppercase text-sm border-2 border-[#FF3300] px-4 py-1 hover:bg-[#FF3300] hover:text-white">REMOVE</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowSelector('B')} className="w-full aspect-square border-8 border-dashed border-white/20 bg-black/50 hover:bg-[var(--brand-orange)]/10 hover:border-[var(--brand-orange)] flex flex-col items-center justify-center gap-4 transition-all group">
                  <div className="w-20 h-20 bg-[var(--brand-orange)] flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                    <Plus size={40} className="text-black" />
                  </div>
                  <span className="font-sans font-black text-2xl uppercase tracking-widest text-white/50 group-hover:text-white">SELECT PARENT B</span>
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto mb-8 bg-[#FF3300] border-4 border-white p-4 flex items-center gap-4 text-white font-sans font-black uppercase shadow-[8px_8px_0_rgba(0,0,0,1)]"
              >
                <AlertCircle size={28} className="shrink-0" /> 
                <span className="text-xl tracking-wide">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="max-w-2xl mx-auto">
            <motion.button
              onClick={handleSynthesize}
              disabled={!parentA || !parentB || isSynthesizing}
              className={`btn-brutal w-full !text-4xl !py-10 !border-4 !rounded-none ${(!parentA || !parentB || isSynthesizing) ? '!bg-black !text-white/30 !border-white/20 !shadow-none opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSynthesizing ? (
                <span className="flex items-center justify-center gap-4 text-[#FF3300]"><Loader2 size={40} className="animate-spin" /> {phase}</span>
              ) : (
                <span className="flex items-center justify-center gap-4"><Sparkles size={40} /> INITIATE SYNTHESIS</span>
              )}
            </motion.button>
          </div>

        </motion.div>

        <SelectorModal />
      </div>
    </ClientLayout>
  );
}
