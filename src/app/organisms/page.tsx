'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import ClientLayout from '@/components/ClientLayout';
import OrganismAvatar from '@/components/OrganismAvatar';
import { Plus, Dna, ChevronRight, GitMerge, Trash2, X } from 'lucide-react';
import { fetchPublicOrganisms } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

export default function OrganismsPage() {
  const { organisms, addOrganism, removeOrganism } = useStore();
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetchPublicOrganisms(20).then(publicOrgs => {
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

  const handleDelete = async (id: string) => {
    removeOrganism(id);
    setDeleteTarget(null);
    supabase.from('organisms').delete().eq('id', id).then(({ error }) => {
      if (error) console.warn('Supabase delete failed:', error.message);
    });
  };

  const orgToDelete = deleteTarget ? organisms.find(o => o.id === deleteTarget) : null;

  return (
    <ClientLayout>
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && orgToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-[var(--bg-paper)] border-4 border-white shadow-[12px_12px_0_rgba(255,51,0,1)] w-full max-w-md p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-[var(--brand-orange)] border-4 border-black flex items-center justify-center">
                  <Trash2 size={24} className="text-black" />
                </div>
                <button onClick={() => setDeleteTarget(null)} aria-label="Cancel deletion" className="w-10 h-10 border-2 border-white/20 flex items-center justify-center text-white hover:border-white transition-colors">
                  <X size={18} />
                </button>
              </div>
              <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tighter mb-2">
                TERMINATE ORGANISM?
              </h3>
              <p className="font-sans font-bold text-[var(--text-secondary)] text-lg mb-2">
                <span className="text-white">{orgToDelete.name}</span> will be permanently deleted from your bio-storage and the database.
              </p>
              <p className="font-tech text-[var(--brand-orange)] text-xs uppercase tracking-widest mb-8">THIS CANNOT BE UNDONE.</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(deleteTarget)}
                  className="flex-1 bg-[var(--brand-orange)] border-4 border-black text-black font-sans font-black text-lg uppercase py-4 px-6 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                >
                  TERMINATE
                </button>
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 bg-black border-4 border-white/20 text-white font-sans font-black text-lg uppercase py-4 px-6 hover:border-white transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <Link href="/create" className="btn-brutal !py-4 !px-8 !text-xl whitespace-nowrap !border-4 !rounded-none">
                <Plus size={24} className="inline-block mr-2" /> NEW SEED
              </Link>
            </div>
          </div>
        </motion.div>

        {organisms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
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
              <motion.div
                key={org.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
                className="relative group"
              >
                <Link
                  href={`/organism/${org.id}`}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[var(--bg-paper)] hover:bg-white cursor-pointer p-8 border-4 border-white/20 hover:border-black transition-all hover:shadow-[12px_12px_0_rgba(212,255,0,1)] hover:-translate-y-2 hover:-translate-x-2"
                >
                  <div className="flex items-center gap-8 flex-1 min-w-0">
                    <OrganismAvatar organism={org} size={80} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-2 flex-wrap">
                        <span className="font-sans font-black text-4xl uppercase tracking-tighter text-white group-hover:text-black truncate">{org.name}</span>
                        <span className="px-4 py-1 border-2 border-white/20 group-hover:border-black text-tech bg-black text-white group-hover:bg-black/10 font-bold tracking-widest uppercase">
                          GEN {org.generation}
                        </span>
                        <span className={`px-3 py-1 text-tech font-bold text-xs uppercase border-2 ${
                          org.status === 'mature' ? 'border-[var(--brand-lime)] text-[var(--brand-lime)] group-hover:border-black group-hover:text-black' :
                          org.status === 'evolving' ? 'border-[var(--brand-violet)] text-[var(--brand-violet)] group-hover:border-black/40 group-hover:text-black/60' :
                          'border-white/20 text-white/50 group-hover:border-black/20 group-hover:text-black/40'
                        }`}>
                          {org.status}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] group-hover:text-black/70 font-sans text-xl font-bold truncate">
                        {org.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t-4 md:border-t-0 border-white/10 group-hover:border-black/10 pt-6 md:pt-0 mt-6 md:mt-0">
                    <div className="text-left md:text-right">
                      <span className="block text-tech text-[var(--text-tertiary)] group-hover:text-black/50 mb-1 font-bold">STRANDS</span>
                      <p className="font-sans font-black text-3xl text-white group-hover:text-black">{org.dna?.length || 0}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="block text-tech text-[var(--text-tertiary)] group-hover:text-black/50 mb-1 font-bold">HEALTH</span>
                      <p className="font-sans font-black text-3xl text-[var(--brand-lime)] group-hover:text-[var(--brand-orange)]">{org.health}%</p>
                    </div>
                    <ChevronRight size={32} className="text-white group-hover:text-black transition-colors shrink-0" />
                  </div>
                </Link>

                {/* Action buttons — outside the link */}
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Link
                    href={`/breed/${org.id}`}
                    onClick={e => e.stopPropagation()}
                    className="w-10 h-10 bg-[var(--brand-violet)] border-2 border-black flex items-center justify-center text-white hover:shadow-[3px_3px_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
                    title="Breed this organism"
                    aria-label={`Breed ${org.name}`}
                  >
                    <GitMerge size={16} />
                  </Link>
                  <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setDeleteTarget(org.id); }}
                    className="w-10 h-10 bg-[var(--brand-orange)] border-2 border-black flex items-center justify-center text-black hover:shadow-[3px_3px_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
                    title="Delete this organism"
                    aria-label={`Delete ${org.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
