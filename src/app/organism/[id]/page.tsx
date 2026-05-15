'use client';

import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import ClientLayout from '@/components/ClientLayout';
import AgentChat from '@/components/AgentChat';
import ExportModal from '@/components/ExportModal';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import FamilyTree from '@/components/FamilyTree';
import OrganismAvatar from '@/components/OrganismAvatar';
import { Dna, Brain, GitBranch, Download, BarChart3, Zap, Moon, ArrowLeft, Loader2, ChevronRight, Copy, Check } from 'lucide-react';
import type { DNAStrand, NexusCore } from '@/types';
import { fetchOrganismById, saveOrganism } from '@/lib/supabase';

type Tab = 'dna' | 'agents' | 'tree' | 'analytics';

export default function OrganismPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { organisms, updateOrganism, addOrganism } = useStore();
  const storeOrganism = organisms.find(o => o.id === id);
  const [organism, setOrganism] = useState<NexusCore | null>(storeOrganism || null);
  const [isLoading, setIsLoading] = useState(!storeOrganism);

  useEffect(() => {
    if (!storeOrganism) {
      setIsLoading(true);
      fetchOrganismById(id).then((fetchedOrg) => {
        if (fetchedOrg) {
          setOrganism(fetchedOrg);
          addOrganism(fetchedOrg);
        }
        setIsLoading(false);
      });
    } else {
      setOrganism(storeOrganism);
    }
    // addOrganism is a stable Zustand action — intentionally excluded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, storeOrganism]);

  const [activeTab, setActiveTab] = useState<Tab>('dna');
  const [isEvolving, setIsEvolving] = useState(false);
  const [isDreaming, setIsDreaming] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  if (isLoading) {
    return (
      <ClientLayout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[var(--bg-abyss)] px-6">
          <Loader2 size={48} className="animate-spin text-[var(--brand-lime)]" />
          <h2 className="heading-bold text-[var(--brand-lime)] uppercase tracking-tighter">Accessing Nexus...</h2>
        </div>
      </ClientLayout>
    );
  }

  if (!organism) {
    return (
      <ClientLayout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[var(--bg-abyss)] px-6">
          <h2 className="heading-bold text-[var(--brand-orange)] uppercase tracking-tighter">Organism Void</h2>
          <p className="text-[var(--text-secondary)] font-sans text-xl">The requested organism does not exist or has been deleted.</p>
          <button onClick={() => router.push('/organisms')} className="btn-brutal">
            <ArrowLeft size={16} className="mr-2" /> ALL ORGANISMS
          </button>
        </div>
      </ClientLayout>
    );
  }

  const handleEvolve = async () => {
    if (isEvolving) return;
    setIsEvolving(true);
    try {
      const res = await fetch('/api/evolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organismContext: `${organism.name}: ${organism.tagline}`,
          dna: organism.dna,
          generation: organism.generation,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const now = new Date().toISOString();
      const newDna: DNAStrand[] = [
        ...(organism.dna || []),
        ...(data.mutation ? [{ ...data.mutation, id: `dna-mut-${Date.now()}`, generation: data.new_generation || organism.generation + 1, created_at: now }] : []),
        ...(data.improvement ? [{ ...data.improvement, id: `dna-imp-${Date.now()}`, generation: data.new_generation || organism.generation + 1, created_at: now }] : []),
      ];

      const updatedData = {
        dna: newDna,
        generation: data.new_generation || organism.generation + 1,
        mutations: organism.mutations + 1,
        health: Math.min(100, organism.health + (data.health_delta || 5)),
        updated_at: now,
        family_tree: [...organism.family_tree, {
          id: `ft-${Date.now()}`, nexus_id: id, parent_ids: [], generation: data.new_generation || organism.generation + 1,
          label: data.summary || 'Evolution', type: 'evolution' as const, summary: data.summary || 'Evolved', created_at: now,
        }],
      };
      
      updateOrganism(id, updatedData);
      
      // Persist to Supabase
      const newOrganismState = { ...organism, ...updatedData };
      setOrganism(newOrganismState);
      saveOrganism(newOrganismState).catch(console.error);
    } catch (err) {
      console.error('Evolution failed:', err);
    } finally {
      setIsEvolving(false);
    }
  };

  const handleDream = async () => {
    if (isDreaming) return;
    setIsDreaming(true);
    try {
      const res = await fetch('/api/dream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organismContext: `${organism.name}: ${organism.tagline}`,
          dna: organism.dna,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const now = new Date().toISOString();
      const dreamDna: DNAStrand[] = [
        { id: `dream-${Date.now()}`, label: data.title || 'Dream Vision', content: data.narrative || '', type: 'narrative', generation: organism.generation, created_at: now },
        ...(data.fragments || []).map((f: string, i: number) => ({
          id: `frag-${Date.now()}-${i}`, label: `Dream Fragment ${i + 1}`, content: f, type: 'mutation' as const, generation: organism.generation, created_at: now,
        })),
        ...(data.insight ? [{ id: `insight-${Date.now()}`, label: 'Dream Insight', content: data.insight, type: 'concept' as const, generation: organism.generation, created_at: now }] : []),
      ];

      const updatedDreamData = {
        dna: [...(organism.dna || []), ...dreamDna],
        updated_at: now,
        family_tree: [...organism.family_tree, {
          id: `ft-dream-${Date.now()}`, nexus_id: id, parent_ids: [], generation: organism.generation,
          label: data.title || 'Dream', type: 'dream' as const, summary: data.insight || 'Dreamed', created_at: now,
        }],
      };
      
      updateOrganism(id, updatedDreamData);
      
      // Persist to Supabase
      const newDreamState = { ...organism, ...updatedDreamData };
      setOrganism(newDreamState);
      saveOrganism(newDreamState).catch(console.error);
    } catch (err) {
      console.error('Dream failed:', err);
    } finally {
      setIsDreaming(false);
    }
  };

  const handleAgentActivity = (label: string, summary: string) => {
    if (!organism) return;
    const now = new Date().toISOString();
    const activityNode = {
      id: `ft-agent-${Date.now()}`,
      nexus_id: id,
      parent_ids: [] as string[],
      generation: organism.generation,
      label,
      type: 'evolution' as const,
      summary,
      created_at: now,
    };
    const updatedData = {
      family_tree: [...organism.family_tree, activityNode],
      updated_at: now,
    };
    updateOrganism(id, updatedData);
    const newState = { ...organism, ...updatedData };
    setOrganism(newState);
    saveOrganism(newState).catch(console.error);
  };

  const copyDna = (dna: DNAStrand) => {
    navigator.clipboard.writeText(`${dna.label}: ${dna.content}`);
    setCopied(dna.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const TABS: { key: Tab; label: string; icon: any }[] = [
    { key: 'dna', label: 'DNA CORE', icon: Dna },
    { key: 'agents', label: 'SWARM AGENTS', icon: Brain },
    { key: 'tree', label: 'FAMILY TREE', icon: GitBranch },
    { key: 'analytics', label: 'TELEMETRY', icon: BarChart3 },
  ];

  const typeColor: Record<string, string> = {
    concept: 'var(--brand-lime)',
    prototype: 'var(--brand-violet)',
    code: 'var(--brand-orange)',
    visual: 'var(--brand-lime)',
    narrative: 'var(--brand-orange)',
    mutation: 'var(--brand-violet)',
  };

  return (
    <ClientLayout>
      {showExport && <ExportModal organism={organism} onClose={() => setShowExport(false)} />}

      <div className="min-h-screen pt-[120px] pb-20 px-6 max-w-[1400px] mx-auto bg-[var(--bg-abyss)]">
        
        {/* Back */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => router.push('/organisms')}
          className="flex items-center gap-2 text-tech text-[var(--text-tertiary)] hover:text-white transition-colors mb-10"
        >
          <ArrowLeft size={16} /> ALL ORGANISMS
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col xl:flex-row items-start gap-10 mb-16 border-b border-white/10 pb-12 relative"
        >
          <div className="shrink-0 relative">
            <div className="absolute inset-0 bg-[var(--brand-lime)] blur-3xl opacity-20 pointer-events-none" />
            <OrganismAvatar organism={organism} size={96} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 flex-wrap mb-4">
              <h1 className="heading-bold text-white uppercase tracking-tighter truncate">
                {organism.name}
              </h1>
              <span className="px-3 py-1 border-2 border-[var(--brand-lime)] text-[var(--brand-lime)] font-sans font-bold text-sm uppercase rounded-full bg-[var(--brand-lime)]/10 tracking-widest">
                GEN {organism.generation}
              </span>
            </div>
            
            <p className="text-2xl text-[var(--text-secondary)] font-sans mb-8 max-w-3xl leading-snug">
              {organism.tagline}
            </p>

            {/* Stats Row */}
            <div className="flex gap-8 flex-wrap">
              {[
                { label: 'STRANDS', value: organism.dna?.length || 0, color: 'var(--brand-lime)' },
                { label: 'MUTATIONS', value: organism.mutations, color: 'var(--brand-violet)' },
                { label: 'HEALTH', value: `${organism.health}%`, color: organism.health > 70 ? 'var(--brand-lime)' : 'var(--brand-orange)' },
                { label: 'STATUS', value: organism.status, color: 'white' },
              ].map(stat => (
                <div key={stat.label} className="border-l-4 pl-4" style={{ borderColor: stat.color }}>
                  <span className="text-tech text-[var(--text-tertiary)] block mb-1">{stat.label}</span>
                  <p className="font-sans font-black text-2xl uppercase tracking-tight" style={{ color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 flex-wrap xl:flex-col shrink-0 mt-8 xl:mt-0 w-full xl:w-auto">
            <button onClick={handleEvolve} disabled={isEvolving} className={`btn-brutal !py-3 w-full xl:w-48 ${isEvolving ? 'opacity-50 cursor-not-allowed !bg-[var(--brand-lime)]/20 text-white' : ''}`}>
              {isEvolving ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> EVOLVING...</span> : <span className="flex items-center gap-2"><Zap size={16} /> FORCE EVOLUTION</span>}
            </button>
            <button onClick={handleDream} disabled={isDreaming} className={`btn-brutal !bg-[var(--brand-violet)] !text-white !py-3 w-full xl:w-48 ${isDreaming ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isDreaming ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> DREAMING...</span> : <span className="flex items-center gap-2"><Moon size={16} /> TRIGGER DREAM</span>}
            </button>
            <button onClick={() => setShowExport(true)} className="btn-brutal !bg-transparent !border-2 !border-white/20 !text-white !py-3 w-full xl:w-48 hover:!border-white hover:!bg-white hover:!text-black">
              <span className="flex items-center justify-center gap-2"><Download size={16} /> EXPORT DATA</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {TABS.map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <button key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center justify-center gap-3 px-4 py-6 font-sans font-black text-xl tracking-tighter uppercase transition-transform border-4 ${
                  isActive 
                    ? 'bg-[var(--brand-lime)] text-black border-black shadow-[6px_6px_0_rgba(255,255,255,1)] transform -translate-y-1' 
                    : 'bg-black text-[var(--text-secondary)] border-white/20 hover:border-white hover:text-white'
                }`}
              >
                <tab.icon size={24} /> <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'dna' && (
            <motion.div key="dna" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {(organism.dna || []).map((strand, i) => (
                  <motion.div key={strand.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bento-card border-l-4 group"
                    style={{ borderLeftColor: typeColor[strand.type] || 'var(--text-secondary)' }}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full" style={{ background: typeColor[strand.type] || 'var(--text-secondary)' }} />
                        <span className="font-sans font-bold text-xl uppercase tracking-tighter text-white">{strand.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-tech text-[var(--text-tertiary)]">GEN {strand.generation}</span>
                        <button onClick={() => copyDna(strand)} className="text-[var(--text-tertiary)] hover:text-white transition-colors">
                          {copied === strand.id ? <Check size={16} className="text-[var(--brand-lime)]" /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                    <p className="text-lg text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                      {strand.content}
                    </p>
                    <span className="inline-block border rounded-full px-3 py-1 text-tech font-bold" style={{ borderColor: typeColor[strand.type], color: typeColor[strand.type], backgroundColor: `color-mix(in srgb, ${typeColor[strand.type]} 10%, transparent)` }}>
                      {strand.type}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'agents' && (
            <motion.div key="agents" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bento-card bg-transparent border-white/5 p-0 overflow-hidden">
              <AgentChat organism={organism} onActivity={handleAgentActivity} />
            </motion.div>
          )}

          {activeTab === 'tree' && (
            <motion.div key="tree" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bento-card bg-[var(--bg-surface)] border-white/5">
              <FamilyTree familyTree={organism.family_tree} />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <AnalyticsDashboard organism={organism} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClientLayout>
  );
}
