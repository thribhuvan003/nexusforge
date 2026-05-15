'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import ClientLayout from '@/components/ClientLayout';
import OrganismAvatar from '@/components/OrganismAvatar';
import { Plus, Dna, ChevronRight } from 'lucide-react';
import { fetchPublicOrganisms, MOCK_ORGANISMS } from '@/lib/supabase';

export default function OrganismsPage() {
  const { organisms, addOrganism } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Immediately seed mock organisms if store is empty (sync fallback)
    if (organisms.length === 0) {
      MOCK_ORGANISMS.forEach(org => addOrganism(org));
    }
    // Then try to enrich with live Supabase data
    if (!loading) {
      setLoading(true);
      fetchPublicOrganisms(10).then(publicOrgs => {
        if (publicOrgs && publicOrgs.length > 0) {
          const current = useStore.getState().organisms;
          publicOrgs.forEach(org => {
            if (!current.find(o => o.id === org.id)) {
              addOrganism(org);
            }
          });
        }
      }).catch(console.error).finally(() => setLoading(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ClientLayout>
      <div className="min-h-screen pt-[120px] pb-20 px-6 max-w-[1400px] mx-auto bg-black">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16 border-b-8 border-white/20 pb-12">
            <div>
              <div className="bg-[var(--brand-orange)] w-fit px-4 py-2 border-4 border-white mb-6 transform rotate-1 shadow-[4px_4px_0_rgba(255,255,255,1)]">
                <p className="text-tech text-black font-black flex items-center gap-2 uppercase tracking-widest">
                  <Dna size={20} /> YOUR BIO-STORAGE
                </p>
              </div>
              <h1 className="display-massive uppercase tracking-tighter leading-[0.8] text-white">
                {organisms.length} <span className="text-black bg-[var(--brand-lime)] px-4 mt-2 inline-block border-8 border-white shadow-[8px_8px_0_rgba(255,255,255,0.2)] transform -rotate-2">ORGS.</span>
              </h1>
            </div>
            <div className="flex gap-4">
              <Link href="/synthesize" className="btn-brutal !py-4 !px-8 !text-xl whitespace-nowrap !border-4 !rounded-none !bg-[var(--brand-violet)] !text-white hover:!bg-white hover:!text-[var(--brand-violet)]">
                <Dna size={24} className="inline-block mr-2" /> SYNTHESIZE
              </Link>
              <Link href="/create" className="btn-brutal !py-4 !px-8 !text-xl whitespace-nowrap !border-4 !rounded-none">
                <Plus size={24} className="inline-block mr-2" /> NEW SEED
              </Link>
            </div>
          </div>
        </motion.div>

        {organisms.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-center py-40 border-8 border-dashed border-white/10 bg-black mt-12"
          >
            <Dna size={80} className="mx-auto text-[var(--text-tertiary)] mb-8" />
            <h3 className="font-sans text-5xl font-black uppercase text-[var(--brand-violet)] mb-4 tracking-tighter">STORAGE EMPTY</h3>
            <p className="text-2xl text-[var(--text-secondary)] font-sans font-bold max-w-xl mx-auto mb-10">
              The void awaits. Drop your first seed to birth a living idea organism.
            </p>
            <Link href="/create" className="btn-brutal inline-block !py-6 !px-12 !text-2xl !border-4 !rounded-none">
              BIRTH FIRST ORGANISM
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {organisms.map((org, i) => (
              <motion.div key={org.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
              >
                <Link href={`/organism/${org.id}`} className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[var(--bg-paper)] hover:bg-white cursor-pointer p-8 border-4 border-white/20 hover:border-black transition-all hover:shadow-[12px_12px_0_rgba(212,255,0,1)] hover:-translate-y-2 hover:-translate-x-2">
                  
                  <div className="flex items-center gap-8 flex-1 min-w-0">
                    <OrganismAvatar organism={org} size={80} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-sans font-black text-4xl uppercase tracking-tighter text-white group-hover:text-black truncate">{org.name}</span>
                        <span className="px-4 py-1 border-2 border-white/20 group-hover:border-black text-tech bg-black text-white font-bold tracking-widest uppercase">
                          GEN {org.generation}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] group-hover:text-black/70 font-sans text-xl font-bold truncate">
                        {org.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end border-t-4 md:border-t-0 border-white/10 group-hover:border-black/10 pt-6 md:pt-0 mt-6 md:mt-0">
                    <div className="text-left md:text-right">
                      <span className="block text-tech text-[var(--text-tertiary)] group-hover:text-black/50 mb-1 font-bold">DNA STRANDS</span>
                      <p className="font-sans font-black text-3xl text-white group-hover:text-black">{org.dna?.length || 0}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="block text-tech text-[var(--text-tertiary)] group-hover:text-black/50 mb-1 font-bold">HEALTH</span>
                      <p className="font-sans font-black text-3xl text-[var(--brand-lime)] group-hover:text-[var(--brand-orange)]">{org.health}%</p>
                    </div>
                    <div className="w-16 h-16 bg-black border-4 border-white/20 flex items-center justify-center group-hover:bg-[var(--brand-lime)] group-hover:border-black group-hover:text-black transition-colors text-white">
                      <ChevronRight size={32} />
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
