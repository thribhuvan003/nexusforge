'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import ClientLayout from '@/components/ClientLayout';
import { AGENT_PROFILES, type NexusCore, type DNAStrand } from '@/types';
import { Sparkles, ArrowRight, Loader2, Mic, Image as ImageIcon, Video, Type, AlertCircle } from 'lucide-react';
import { saveOrganism } from '@/lib/supabase';

type SeedType = 'text' | 'voice' | 'image' | 'video';

const SEED_TYPES: { type: SeedType; icon: any; label: string; desc: string }[] = [
  { type: 'text', icon: Type, label: 'Text', desc: 'Describe your idea' },
  { type: 'voice', icon: Mic, label: 'Voice', desc: 'Coming soon' },
  { type: 'image', icon: ImageIcon, label: 'Image', desc: 'Coming soon' },
  { type: 'video', icon: Video, label: 'Video', desc: 'Coming soon' },
];

const EXAMPLE_SEEDS = [
  'An app that turns your daily walks into collaborative city maps',
  'AI-powered recipe generator that uses only what\'s in your fridge',
  'A browser extension that converts any article into a podcast',
  'Peer-to-peer tutoring marketplace for niche skills',
];

export default function CreatePage() {
  const router = useRouter();
  const { addOrganism } = useStore();
  const [seedType, setSeedType] = useState<SeedType>('text');
  const [seedText, setSeedText] = useState('');
  const [isBirthing, setIsBirthing] = useState(false);
  const [birthPhase, setBirthPhase] = useState('');
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleBirth = async () => {
    if (!seedText.trim() || isBirthing) return;
    setError('');
    setIsBirthing(true);

    const phases = [
      'ANALYZING SEED DNA...',
      'ASSEMBLING AGENT SWARM...',
      'GENERATING ORGANISM GENOME...',
      'BIRTHING NEW LIFE FORM...',
    ];

    let phaseIdx = 0;
    setBirthPhase(phases[0]);
    const phaseInterval = setInterval(() => {
      phaseIdx = Math.min(phaseIdx + 1, phases.length - 1);
      setBirthPhase(phases[phaseIdx]);
    }, 2500);

    try {
      const res = await fetch('/api/birth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seedText, seedType }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const now = new Date().toISOString();
      const id = `nexus-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const organism: NexusCore = {
        id,
        name: data.name || 'Unnamed Organism',
        tagline: data.tagline || '',
        seed_type: seedType,
        seed_content: seedText,
        dna: (data.dna || []).map((d: Partial<DNAStrand>, i: number) => ({
          ...d,
          id: `dna-${id}-${i}`,
          generation: 1,
          created_at: now,
        })),
        agents: AGENT_PROFILES,
        generation: 1,
        mutations: 0,
        health: 85,
        status: 'growing',
        created_at: now,
        updated_at: now,
        user_id: 'local',
        is_public: false,
        family_tree: [{
          id: `ft-${id}-0`,
          nexus_id: id,
          parent_ids: [],
          generation: 1,
          label: 'Genesis',
          type: 'birth',
          summary: `Born from ${seedType} seed: "${seedText.slice(0, 60)}..."`,
          created_at: now,
        }],
        avatar_color: data.avatar_color || '#D4FF00',
        avatar_glow: data.avatar_color || '#D4FF00',
      };

      addOrganism(organism);
      await saveOrganism(organism);
      clearInterval(phaseInterval);
      router.push(`/organism/${id}`);
    } catch (err) {
      clearInterval(phaseInterval);
      setError(err instanceof Error ? err.message : 'Birth failed. Check your API key.');
      setIsBirthing(false);
    }
  };

  return (
    <ClientLayout>
      <div className="min-h-screen flex items-center justify-center pt-[120px] pb-20 px-6 relative overflow-hidden bg-[var(--bg-abyss)]">
        
        {/* Background Decorative Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[var(--brand-violet)] rounded-full mix-blend-screen blur-[180px] opacity-20 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl relative z-10"
        >
          {/* Header */}
          <div className="mb-12 border-b-8 border-white/10 pb-8">
            <div className="bg-[var(--brand-lime)] w-fit px-4 py-2 border-4 border-black mb-6 transform -rotate-2">
              <p className="text-tech text-black font-black flex items-center gap-2">
                <Sparkles size={20} className="animate-pulse" /> NEW ORGANISM
              </p>
            </div>
            <h1 className="display-massive text-white uppercase tracking-tighter leading-[0.8]">
              DROP YOUR <br/>
              <span className="text-black bg-[var(--brand-lime)] px-4 mt-2 inline-block border-8 border-black shadow-[8px_8px_0_rgba(255,255,255,0.2)] transform rotate-1">SEED.</span>
            </h1>
            <p className="text-2xl text-[var(--text-secondary)] font-sans font-bold mt-10 max-w-xl leading-tight border-l-8 border-[var(--brand-violet)] pl-6">
              Any idea, any format. Gemini analyzes it, builds its DNA, and deploys a 5-agent swarm to grow it into reality.
            </p>
          </div>

          <div className="bg-[var(--bg-paper)] border-4 border-white/20 p-8 shadow-[12px_12px_0_rgba(0,0,0,1)] relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--brand-violet)] border-b-4 border-l-4 border-black hidden md:block"></div>
            
            {/* Seed Type Selector */}
            <div className="flex flex-wrap gap-4 mb-8">
              {SEED_TYPES.map(st => {
                const isActive = seedType === st.type;
                const isDisabled = st.type !== 'text';
                return (
                  <button key={st.type}
                    onClick={() => !isDisabled && setSeedType(st.type)}
                    disabled={isDisabled}
                    className={`flex items-center gap-2 px-6 py-4 font-sans font-black text-lg tracking-wider uppercase transition-transform border-4 ${
                      isActive 
                        ? 'bg-[var(--brand-lime)] text-black border-black shadow-[4px_4px_0_rgba(255,255,255,1)] transform -translate-y-1' 
                        : 'bg-black text-[var(--text-secondary)] border-white/20 hover:border-white hover:text-white'
                    } ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-crosshair'}`}
                  >
                    <st.icon size={20} /> {st.label}
                  </button>
                );
              })}
            </div>

            {/* Text Input */}
            <div className="relative mb-8">
              <textarea
                ref={textareaRef}
                value={seedText}
                onChange={e => setSeedText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleBirth(); }}
                placeholder="DESCRIBE YOUR IDEA IN RAW DETAIL..."
                disabled={isBirthing}
                rows={6}
                className={`w-full bg-black border-4 font-sans font-bold text-2xl text-[var(--brand-lime)] placeholder-white/20 p-8 outline-none transition-all resize-y min-h-[250px] shadow-inner ${
                  isBirthing ? 'opacity-50 border-white/10' : 'border-white focus:border-[var(--brand-lime)] focus:shadow-[0_0_0_8px_rgba(212,255,0,0.2)]'
                }`}
              />
              <div className="absolute bottom-6 right-6 flex items-center gap-6 text-tech text-white/50 bg-black px-4 py-2 border-2 border-white/10">
                <span className="font-bold">{seedText.length} CHARS</span>
                <span className="text-[var(--brand-orange)] font-black">⌘+ENTER</span>
              </div>
            </div>

            {/* Example Seeds */}
            <div className="flex flex-wrap gap-3 mb-12 items-center bg-black/50 p-4 border-2 border-white/10">
              <span className="text-tech text-[var(--brand-violet)] font-black bg-[var(--brand-violet)]/20 px-2 py-1">TRY SEEDS:</span>
              {EXAMPLE_SEEDS.map((seed, i) => (
                <button key={i}
                  onClick={() => { setSeedText(seed); textareaRef.current?.focus(); }}
                  className="px-4 py-2 border-2 border-white/10 bg-black font-sans font-bold text-sm text-[var(--text-secondary)] hover:text-black hover:bg-[var(--brand-lime)] hover:border-[var(--brand-lime)] transition-colors max-w-[200px] truncate"
                >
                  {seed}
                </button>
              ))}
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="mb-8 bg-[#FF3300] border-4 border-white p-4 flex items-center gap-4 text-white font-sans font-black uppercase shadow-[8px_8px_0_rgba(0,0,0,1)]"
                >
                  <AlertCircle size={28} className="shrink-0" /> 
                  <span className="text-xl tracking-wide">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Birth Button */}
            <motion.button
              onClick={handleBirth}
              disabled={!seedText.trim() || isBirthing}
              className={`btn-brutal w-full !text-3xl !py-8 !border-4 !rounded-none ${(!seedText.trim() || isBirthing) ? '!bg-black !text-white/30 !border-white/20 !shadow-none opacity-50 cursor-not-allowed' : ''}`}
            >
              {isBirthing ? (
                <span className="flex items-center gap-4 text-[var(--brand-lime)]"><Loader2 size={36} className="animate-spin" /> {birthPhase}</span>
              ) : (
                <span className="flex items-center gap-4"><Sparkles size={36} /> BIRTH ORGANISM <ArrowRight size={36} /></span>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </ClientLayout>
  );
}
