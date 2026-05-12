'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ClientLayout from '@/components/ClientLayout';
import OrganismAvatar from '@/components/OrganismAvatar';
import { useStore } from '@/store/useStore';
import { AGENT_PROFILES, type NexusCore } from '@/types';
import { ChevronLeft } from 'lucide-react';

export default function BreedIndex() {
  const router = useRouter();
  const { organisms } = useStore();

  const demoOrganisms: NexusCore[] = [
    {
      id: 'demo-1', name: 'EchoBloom', tagline: 'Voice-first note sharing for students',
      seed_type: 'text', seed_content: 'voice notes for students', dna: [], agents: AGENT_PROFILES, generation: 4, mutations: 7, health: 92, status: 'mature',
      created_at: '', updated_at: '', user_id: 'demo', is_public: true, family_tree: [],
      avatar_color: '#D4FF00', avatar_glow: '#D4FF00',
    },
    {
      id: 'demo-2', name: 'NeuralNest', tagline: 'AI-powered knowledge management system',
      seed_type: 'text', seed_content: 'knowledge management AI', dna: [], agents: AGENT_PROFILES, generation: 3, mutations: 5, health: 78, status: 'mature',
      created_at: '', updated_at: '', user_id: 'demo', is_public: true, family_tree: [],
      avatar_color: '#4300FF', avatar_glow: '#4300FF',
    },
    {
      id: 'demo-3', name: 'SynthWeave', tagline: 'Collaborative music creation through movement',
      seed_type: 'text', seed_content: 'movement-based music', dna: [], agents: AGENT_PROFILES, generation: 6, mutations: 12, health: 95, status: 'mature',
      created_at: '', updated_at: '', user_id: 'demo', is_public: true, family_tree: [],
      avatar_color: '#FF3300', avatar_glow: '#FF3300',
    },
  ];

  const allAvailable = [...organisms, ...demoOrganisms];

  return (
    <ClientLayout>
      <div className="min-h-screen bg-[var(--bg-abyss)] pt-[120px] pb-20 relative overflow-hidden px-6">
        <div className="max-w-[1200px] mx-auto z-10 relative">
          <div className="flex items-center gap-4 mb-12">
            <button onClick={() => router.back()} className="text-[var(--text-tertiary)] hover:text-white transition-colors p-2 bg-white/5 rounded-full border-2 border-white/10 hover:border-white">
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="heading-bold text-white uppercase tracking-tighter text-4xl">
                BREEDING <span className="text-[var(--brand-violet)]">RITUAL</span>
              </h1>
              <p className="text-xl text-[var(--text-secondary)] font-sans">
                Select an organism to initiate the breeding ritual
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAvailable.map(org => (
              <motion.div key={org.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/breed/${org.id}`)}
                className="bento-card cursor-pointer transition-all duration-300 flex items-center gap-4 border-white/10 hover:border-white/30"
              >
                <OrganismAvatar organism={org as NexusCore} size={56} animate={false} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-black text-xl uppercase tracking-tighter text-white truncate">{org.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] font-sans truncate">{org.tagline}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
