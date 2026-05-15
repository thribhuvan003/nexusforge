'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ClientLayout from '@/components/ClientLayout';
import OrganismAvatar from '@/components/OrganismAvatar';
import { useStore } from '@/store/useStore';
import type { NexusCore, DNAStrand, FamilyNode } from '@/types';
import { AGENT_PROFILES } from '@/types';
import { Heart, Dna, ArrowRight, Loader2, Sparkles, ChevronLeft, AlertCircle } from 'lucide-react';
import { saveOrganism } from '@/lib/supabase';

interface DebateEntry {
  agent: string;
  side?: string;
  argument: string;
}

interface BreedResult {
  debate: DebateEntry[];
  child: {
    name: string;
    tagline: string;
    dna: { label: string; content: string; type: string }[];
    avatar_color: string;
  };
  synergies: string[];
  conflicts_resolved: string[];
}

export default function BreedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { organisms, addOrganism, setCurrentOrganism, clearMessages } = useStore();
  const [phase, setPhase] = useState<'select' | 'ritual' | 'debating' | 'merging' | 'born'>('select');
  const [breedError, setBreedError] = useState('');
  const [parentA, setParentA] = useState<NexusCore | null>(null);
  const [parentB, setParentB] = useState<NexusCore | null>(null);
  const [breedResult, setBreedResult] = useState<BreedResult | null>(null);
  const [visibleDebates, setVisibleDebates] = useState<DebateEntry[]>([]);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [childOrganism, setChildOrganism] = useState<NexusCore | null>(null);
  const debateRef = useRef<HTMLDivElement>(null);

  // Demo organisms for breeding if user doesn't have enough
  const demoOrganisms: NexusCore[] = [
    {
      id: 'demo-1', name: 'EchoBloom', tagline: 'Voice-first note sharing for students',
      seed_type: 'text', seed_content: 'voice notes for students', dna: [
        { id: 'd1', label: 'Core Concept', content: 'A platform where students share voice-annotated notes', type: 'concept', generation: 1, created_at: '' },
        { id: 'd2', label: 'AI Transcription', content: 'Real-time voice to text with smart formatting', type: 'prototype', generation: 1, created_at: '' },
      ], agents: AGENT_PROFILES, generation: 4, mutations: 7, health: 92, status: 'mature',
      created_at: '', updated_at: '', user_id: 'demo', is_public: true, family_tree: [],
      avatar_color: '#D4FF00', avatar_glow: '#D4FF00',
    },
    {
      id: 'demo-2', name: 'NeuralNest', tagline: 'AI-powered knowledge management system',
      seed_type: 'text', seed_content: 'knowledge management AI', dna: [
        { id: 'd3', label: 'Core Concept', content: 'Intelligent knowledge graphs that self-organize', type: 'concept', generation: 1, created_at: '' },
        { id: 'd4', label: 'Smart Search', content: 'Semantic search across all personal knowledge', type: 'prototype', generation: 1, created_at: '' },
      ], agents: AGENT_PROFILES, generation: 3, mutations: 5, health: 78, status: 'mature',
      created_at: '', updated_at: '', user_id: 'demo', is_public: true, family_tree: [],
      avatar_color: '#4300FF', avatar_glow: '#4300FF',
    },
    {
      id: 'demo-3', name: 'SynthWeave', tagline: 'Collaborative music creation through movement',
      seed_type: 'text', seed_content: 'movement-based music', dna: [
        { id: 'd5', label: 'Motion Capture', content: 'Body movement translates to musical instruments', type: 'concept', generation: 1, created_at: '' },
        { id: 'd6', label: 'Group Sync', content: 'Multiple dancers create harmonies together', type: 'prototype', generation: 1, created_at: '' },
      ], agents: AGENT_PROFILES, generation: 6, mutations: 12, health: 95, status: 'mature',
      created_at: '', updated_at: '', user_id: 'demo', is_public: true, family_tree: [],
      avatar_color: '#FF3300', avatar_glow: '#FF3300',
    },
  ];

  // Find parent A from URL
  useEffect(() => {
    const found = organisms.find(o => o.id === id) || demoOrganisms.find(o => o.id === id);
    if (found) setParentA(found);
  }, [id, organisms]);

  const availablePartners = [...organisms.filter(o => o.id !== id), ...demoOrganisms.filter(d => d.id !== id)];

  const startBreeding = async () => {
    if (!parentA || !parentB) return;
    setPhase('ritual');

    await new Promise(r => setTimeout(r, 1500));
    setPhase('debating');

    try {
      const res = await fetch('/api/breed', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organismA: parentA, organismB: parentB }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setBreedResult(data);

      if (data.debate) {
        for (let i = 0; i < data.debate.length; i++) {
          await new Promise(r => setTimeout(r, 1200));
          setVisibleDebates(prev => [...prev, data.debate[i]]);
        }
      }

      await new Promise(r => setTimeout(r, 800));
      setPhase('merging');

      for (let p = 0; p <= 100; p += 2) {
        await new Promise(r => setTimeout(r, 40));
        setMergeProgress(p);
      }

      await new Promise(r => setTimeout(r, 500));

      if (data.child) {
        const now = new Date().toISOString();
        const childId = `nexus-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const childDna: DNAStrand[] = (data.child.dna || []).map((d: { label: string; content: string; type: string }, i: number) => ({
          id: `dna-${childId}-${i}`, label: d.label, content: d.content,
          type: d.type || 'concept', generation: 1, created_at: now,
        }));
        const birthNode: FamilyNode = {
          id: `fn-${childId}-0`, nexus_id: childId, parent_ids: [parentA.id, parentB.id],
          generation: 1, label: 'Bred', type: 'breed',
          summary: `Born from breeding ${parentA.name} × ${parentB.name}`, created_at: now,
        };
        const child: NexusCore = {
          id: childId, name: data.child.name, tagline: data.child.tagline,
          seed_type: 'text', seed_content: `Hybrid of ${parentA.name} and ${parentB.name}`,
          dna: childDna, agents: AGENT_PROFILES, generation: 1, mutations: 0, health: 90,
          status: 'growing', created_at: now, updated_at: now, user_id: 'local',
          is_public: false, family_tree: [birthNode],
          avatar_color: data.child.avatar_color || '#D4FF00',
          avatar_glow: data.child.avatar_color || '#D4FF00',
        };
        setChildOrganism(child);
        addOrganism(child);
        saveOrganism(child).catch(console.error);
      }

      setPhase('born');
    } catch (err) {
      console.error('Breeding failed:', err);
      setBreedError(err instanceof Error ? err.message : 'Breeding ritual failed. The Swarm could not merge these organisms.');
      setPhase('select');
    }
  };

  const agentColors: Record<string, string> = {
    Nova: '#D4FF00', Atlas: '#4300FF', Cipher: '#FF3300', Forge: '#A855F7', Echo: '#FF006E',
  };

  return (
    <ClientLayout>
      <div className="min-h-screen bg-[var(--bg-abyss)] pt-[100px] pb-20 relative overflow-hidden px-6">
        {/* Background Noise overlay inherited from globals */}

        <AnimatePresence mode="wait">
          {/* === SELECT PARTNER PHASE === */}
          {phase === 'select' && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="max-w-[1200px] mx-auto z-10 relative">
              <div className="flex items-center gap-4 mb-12">
                <button onClick={() => router.back()} className="text-[var(--text-tertiary)] hover:text-white transition-colors p-2 bg-white/5 rounded-full border-2 border-white/10 hover:border-white">
                  <ChevronLeft size={24} />
                </button>
                <div>
                  <h1 className="heading-bold text-white uppercase tracking-tighter">
                    BREEDING <span className="text-[var(--brand-violet)]">RITUAL</span>
                  </h1>
                  <p className="text-xl text-[var(--text-secondary)] font-sans">
                    Select a partner organism to breed with {parentA?.name || 'your organism'}
                  </p>
                </div>
              </div>

              {/* Parent A preview */}
              {parentA && (
                <div className="bento-card border-[var(--brand-lime)] bg-[var(--brand-lime)]/5 mb-12 flex items-center gap-6">
                  <OrganismAvatar organism={parentA} size={80} />
                  <div className="flex-1">
                    <h3 className="heading-bold text-white uppercase text-4xl">{parentA.name}</h3>
                    <p className="text-lg text-[var(--text-secondary)] font-sans">{parentA.tagline}</p>
                  </div>
                  <Heart size={32} className="text-[var(--brand-lime)] animate-pulse" />
                </div>
              )}

              {/* Partner selection */}
              <h2 className="heading-bold text-white uppercase tracking-tighter text-3xl mb-8">
                CHOOSE A PARTNER
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availablePartners.map(org => (
                  <motion.div key={org.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setParentB(org)}
                    className={`bento-card cursor-pointer transition-all duration-300 flex items-center gap-4 ${parentB?.id === org.id ? 'border-[var(--brand-violet)] bg-[var(--brand-violet)]/10 ring-4 ring-[var(--brand-violet)]/20' : 'border-white/10 hover:border-white/30'}`}
                  >
                    <OrganismAvatar organism={org} size={56} animate={false} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans font-black text-xl uppercase tracking-tighter text-white truncate">{org.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)] font-sans truncate">{org.tagline}</p>
                      <span className="text-tech text-[var(--text-tertiary)] text-xs mt-1 block">GEN {org.generation} • {org.mutations} MUTATIONS</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {breedError && (
                  <motion.div
                    key="breed-error"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-8 bg-[var(--brand-orange)] border-4 border-white p-4 flex items-center gap-4 text-white font-sans font-black uppercase shadow-[8px_8px_0_rgba(0,0,0,1)]"
                  >
                    <AlertCircle size={28} className="shrink-0" />
                    <span className="text-xl tracking-wide">{breedError}</span>
                    <button onClick={() => setBreedError('')} className="ml-auto text-white/70 hover:text-white text-2xl font-black">×</button>
                  </motion.div>
                )}
              </AnimatePresence>

              {parentB && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-16 text-center">
                  <button onClick={startBreeding} className="btn-brutal !bg-[var(--brand-lime)] !text-black !py-4 !px-8 text-xl">
                    <span className="flex items-center gap-3"><Heart size={24} /> INITIATE BREEDING RITUAL <ArrowRight size={24} /></span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* === RITUAL INITIATION === */}
          {phase === 'ritual' && (
            <motion.div key="ritual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[var(--bg-abyss)] gap-8">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-32 h-32 rounded-full border-4 border-dashed border-[var(--brand-violet)] flex items-center justify-center">
                <Dna size={48} className="text-[var(--brand-violet)]" />
              </motion.div>
              <motion.h2 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="heading-bold text-[var(--brand-violet)] uppercase text-5xl">
                SYNCING DNA...
              </motion.h2>
              <p className="text-2xl text-[var(--text-secondary)] font-sans font-bold">
                {parentA?.name} <span className="text-[var(--brand-lime)]">×</span> {parentB?.name}
              </p>
            </motion.div>
          )}

          {/* === DEBATING === */}
          {phase === 'debating' && (
            <motion.div key="debating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 z-20 bg-[var(--bg-abyss)] pt-[100px] pb-[400px]">
              {/* Parent A */}
              <div className="flex flex-col items-center justify-center p-8 border-r-4 border-white/5" style={{ background: `linear-gradient(180deg, ${parentA?.avatar_color}11, transparent)` }}>
                <OrganismAvatar organism={parentA || {}} size={120} />
                <h2 className="heading-bold text-white text-5xl mt-6 uppercase">{parentA?.name}</h2>
              </div>
              {/* Parent B */}
              <div className="flex flex-col items-center justify-center p-8" style={{ background: `linear-gradient(180deg, ${parentB?.avatar_color}11, transparent)` }}>
                <OrganismAvatar organism={parentB || {}} size={120} />
                <h2 className="heading-bold text-white text-5xl mt-6 uppercase">{parentB?.name}</h2>
              </div>
              {/* Debate overlay */}
              <div ref={debateRef} className="absolute bottom-0 left-0 right-0 h-[400px] overflow-y-auto p-8 bg-[var(--bg-surface)] border-t-4 border-white/10 hide-scrollbar">
                <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-[var(--brand-lime)] mb-6 flex items-center gap-3">
                  <Loader2 size={24} className="animate-spin" /> SWARM AGENTS DEBATING TRAITS
                </h3>
                <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                  <AnimatePresence>
                    {visibleDebates.map((d, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                        className="bento-card border-l-4 p-4" style={{ borderLeftColor: agentColors[d.agent] || 'var(--brand-lime)' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-none" style={{ background: agentColors[d.agent] || '#D4FF00' }} />
                          <span className="font-sans font-bold text-sm uppercase tracking-wider" style={{ color: agentColors[d.agent] || '#D4FF00' }}>
                            {d.agent} {d.side ? `(DEFENDING ${d.side === 'A' ? parentA?.name : parentB?.name})` : '(SYNTHESIZING)'}
                          </span>
                        </div>
                        <p className="text-lg text-[var(--text-secondary)] font-sans leading-relaxed">{d.argument}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* === MERGING === */}
          {phase === 'merging' && (
            <motion.div key="merging" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[var(--bg-abyss)] gap-12">
              {/* DNA merge visualization */}
              <div className="w-64 h-64 relative">
                <motion.div animate={{ x: [(100 - mergeProgress), 0], opacity: [1, mergeProgress > 90 ? 0 : 1] }}
                  className="absolute left-0 top-1/2 -translate-y-1/2">
                  <OrganismAvatar organism={parentA || {}} size={80} />
                </motion.div>
                <motion.div animate={{ x: [-(100 - mergeProgress), 0], opacity: [1, mergeProgress > 90 ? 0 : 1] }}
                  className="absolute right-0 top-1/2 -translate-y-1/2">
                  <OrganismAvatar organism={parentB || {}} size={80} />
                </motion.div>
                {mergeProgress > 90 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Sparkles size={100} className="text-[var(--brand-lime)]" />
                  </motion.div>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md">
                <div className="h-8 bg-black border-4 border-white/20 p-1 relative overflow-hidden">
                  <motion.div className="h-full bg-[var(--brand-lime)]" style={{ width: `${mergeProgress}%` }} />
                </div>
                <p className="text-tech text-[var(--brand-lime)] text-center mt-4 text-xl">
                  MERGING DNA... {mergeProgress}%
                </p>
              </div>
            </motion.div>
          )}

          {/* === CHILD BORN === */}
          {phase === 'born' && childOrganism && (
            <motion.div key="born" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="max-w-[800px] mx-auto z-10 relative flex flex-col items-center justify-center min-h-[70vh] text-center pt-20">

              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} className="mb-8">
                <OrganismAvatar organism={childOrganism} size={160} />
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="heading-bold text-white text-6xl xl:text-8xl uppercase tracking-tighter mb-4">
                {childOrganism.name}
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="text-2xl text-[var(--brand-lime)] font-sans font-bold uppercase tracking-wide mb-2">
                IS BORN
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="text-xl text-[var(--text-secondary)] font-sans mb-12 max-w-2xl">
                {childOrganism.tagline}
              </motion.p>

              {/* Synergies */}
              {breedResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                  className="bento-card border-[var(--brand-violet)] text-left w-full mb-12">
                  <h3 className="font-sans font-black text-xl uppercase tracking-tighter text-[var(--brand-violet)] mb-4">DNA SYNERGIES</h3>
                  <div className="space-y-2">
                    {breedResult.synergies?.map((s, i) => (
                      <p key={i} className="text-lg text-white font-sans border-b border-white/5 pb-2">
                        <span className="text-[var(--brand-violet)] mr-2">✦</span> {s}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
                <button onClick={() => { setCurrentOrganism(childOrganism); clearMessages(); router.push(`/organism/${childOrganism.id}`); }}
                  className="btn-brutal flex-1 !bg-[var(--brand-lime)] !text-black !py-4 text-xl">
                  <span className="flex items-center justify-center gap-2"><Sparkles size={20} /> VIEW ORGANISM</span>
                </button>
                <button onClick={() => router.push('/organisms')} className="btn-brutal flex-1 !bg-transparent !text-white !border-4 !border-white/20 hover:!border-white hover:!bg-white hover:!text-black !py-4 text-xl">
                  ALL ORGANISMS
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClientLayout>
  );
}
