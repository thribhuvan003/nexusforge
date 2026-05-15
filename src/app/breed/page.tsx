'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import ClientLayout from '@/components/ClientLayout';
import OrganismAvatar from '@/components/OrganismAvatar';
import { AGENT_PROFILES, type NexusCore } from '@/types';
import { GitMerge, Dna, ArrowRight, Plus } from 'lucide-react';

const DEMO_ORGANISMS: NexusCore[] = [
  {
    id: 'demo-1', name: 'EchoBloom', tagline: 'Voice-first note sharing for students',
    seed_type: 'text', seed_content: 'voice notes for students',
    dna: [{ id: 'd1', label: 'Voice Core', content: 'Students record annotated audio notes', type: 'concept', generation: 1, created_at: '' }],
    agents: AGENT_PROFILES, generation: 4, mutations: 7, health: 92, status: 'mature',
    created_at: '', updated_at: '', user_id: 'demo', is_public: true, family_tree: [],
    avatar_color: '#D4FF00', avatar_glow: '#D4FF0080',
  },
  {
    id: 'demo-2', name: 'NeuralNest', tagline: 'AI-powered knowledge management system',
    seed_type: 'text', seed_content: 'knowledge management AI',
    dna: [{ id: 'd2', label: 'Knowledge Graph', content: 'Intelligent self-organising note network', type: 'concept', generation: 1, created_at: '' }],
    agents: AGENT_PROFILES, generation: 3, mutations: 5, health: 78, status: 'mature',
    created_at: '', updated_at: '', user_id: 'demo', is_public: true, family_tree: [],
    avatar_color: '#4300FF', avatar_glow: '#4300FF80',
  },
  {
    id: 'demo-3', name: 'SynthWeave', tagline: 'Collaborative music creation through movement',
    seed_type: 'text', seed_content: 'movement-based music',
    dna: [{ id: 'd3', label: 'Motion Capture', content: 'Body movement translates to instruments', type: 'concept', generation: 1, created_at: '' }],
    agents: AGENT_PROFILES, generation: 6, mutations: 12, health: 95, status: 'mature',
    created_at: '', updated_at: '', user_id: 'demo', is_public: true, family_tree: [],
    avatar_color: '#FF3300', avatar_glow: '#FF330080',
  },
];

export default function BreedIndexPage() {
  const { organisms } = useStore();

  const allAvailable = [
    ...organisms,
    ...DEMO_ORGANISMS.filter(d => !organisms.find(o => o.id === d.id)),
  ];

  return (
    <ClientLayout>
      <div className="min-h-screen pt-[120px] pb-20 px-6 max-w-[1200px] mx-auto bg-[var(--bg-abyss)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          <div className="mb-16 pb-8 border-b-8 border-white/10">
            <div className="bg-[var(--brand-violet)] w-fit px-4 py-2 border-4 border-black mb-6 transform -rotate-1">
              <p className="text-tech text-white font-black flex items-center gap-2 uppercase tracking-widest">
                <GitMerge size={20} /> BREEDING CHAMBER
              </p>
            </div>
            <h1 className="display-massive text-white uppercase tracking-tighter leading-[0.8] mb-6">
              SELECT<br />
              <span className="text-black bg-[var(--brand-lime)] px-4 mt-2 inline-block border-8 border-black shadow-[8px_8px_0_rgba(255,255,255,0.2)] transform rotate-1">PARENT A.</span>
            </h1>
            <p className="text-2xl text-[var(--text-secondary)] font-sans font-bold max-w-xl leading-tight border-l-8 border-[var(--brand-violet)] pl-6">
              Pick the first organism. You choose Parent B on the next screen. The swarm debates which DNA traits survive the merge.
            </p>
          </div>

          <div className="grid gap-5">
            {allAvailable.map((org, i) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/breed/${org.id}`}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[var(--bg-paper)] hover:bg-[var(--brand-violet)] cursor-pointer p-7 border-4 border-white/20 hover:border-[var(--brand-violet)] transition-all hover:shadow-[10px_10px_0_rgba(67,0,255,0.4)] hover:-translate-y-1"
                >
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    <OrganismAvatar organism={org} size={68} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="font-sans font-black text-3xl uppercase tracking-tighter text-white group-hover:text-white truncate">{org.name}</span>
                        {org.user_id === 'demo' && (
                          <span className="text-tech text-xs border border-white/20 group-hover:border-white/40 text-white/40 group-hover:text-white/60 px-2 py-0.5 uppercase">demo</span>
                        )}
                      </div>
                      <p className="text-[var(--text-secondary)] group-hover:text-white/70 font-sans text-lg font-bold truncate">{org.tagline}</p>
                      <span className="font-tech text-xs text-[var(--text-tertiary)] group-hover:text-white/40 mt-1 block">
                        GEN {org.generation} · {org.dna?.length || 0} STRANDS · {org.mutations} MUTATIONS
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white font-sans font-black text-lg uppercase tracking-widest shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                    SELECT <ArrowRight size={20} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {organisms.length === 0 && (
            <div className="mt-8 text-center border-4 border-dashed border-white/10 p-12">
              <Dna size={40} className="mx-auto text-[var(--text-tertiary)] mb-4" />
              <p className="font-sans font-black text-xl text-[var(--text-secondary)] uppercase mb-4">
                Showing 3 demo organisms. Birth your own to breed real ideas.
              </p>
              <Link href="/create" className="btn-brutal inline-flex items-center gap-2 !py-4 !px-8 !text-lg">
                <Plus size={20} /> BIRTH YOUR FIRST
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </ClientLayout>
  );
}
