'use client';

import { motion } from 'framer-motion';
import type { FamilyNode } from '@/types';
import { GitBranch, Sparkles, Zap, Moon, Heart, Dna } from 'lucide-react';

const typeConfig: Record<string, { icon: any; color: string; label: string; bg: string }> = {
  birth: { icon: Sparkles, color: 'text-black', bg: 'bg-[var(--brand-lime)]', label: 'GENESIS' },
  evolution: { icon: Zap, color: 'text-black', bg: 'bg-[var(--brand-orange)]', label: 'EVOLUTION' },
  mutation: { icon: GitBranch, color: 'text-white', bg: 'bg-[#FF3300]', label: 'MUTATION' },
  dream: { icon: Moon, color: 'text-white', bg: 'bg-[var(--brand-violet)]', label: 'DREAM' },
  breed: { icon: Heart, color: 'text-white', bg: 'bg-[#FF3300]', label: 'BREED' },
  merge: { icon: Dna, color: 'text-black', bg: 'bg-[#FF3300]', label: 'SYNTHESIS' },
};

export default function FamilyTree({ familyTree }: { familyTree: FamilyNode[] }) {
  if (!familyTree?.length) {
    return (
      <div className="text-center py-20 border-8 border-dashed border-white/20 bg-black">
        <GitBranch size={64} className="text-white/20 mx-auto mb-6" />
        <p className="font-sans font-black text-2xl uppercase tracking-tighter text-white/50">NO HISTORY DETECTED</p>
      </div>
    );
  }

  return (
    <div className="relative pl-12">
      {/* Heavy Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-2 bg-white/20" />

      {familyTree.map((node, i) => {
        const config = typeConfig[node.type] || typeConfig.birth;
        const Icon = config.icon;
        
        return (
          <motion.div key={node.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
            className="flex items-start gap-8 mb-12 relative group"
          >
            {/* Brutalist Node Dot */}
            <div className={`w-14 h-14 shrink-0 flex items-center justify-center border-4 border-white shadow-[6px_6px_0_rgba(0,0,0,1)] z-10 -ml-[27px] transition-transform group-hover:scale-110 group-hover:rotate-6 ${config.bg} ${config.color}`}>
              <Icon size={24} />
            </div>

            {/* Content Block */}
            <div className="flex-1 bg-[var(--bg-paper)] border-4 border-white/20 p-6 hover:border-white transition-colors hover:shadow-[12px_12px_0_rgba(0,0,0,1)]">
              <div className="flex flex-wrap items-center gap-4 mb-4 border-b-4 border-white/10 pb-4">
                <span className={`px-3 py-1 font-sans font-black text-xl uppercase tracking-widest border-2 border-black ${config.bg} ${config.color}`}>
                  {node.label || config.label}
                </span>
                <span className="font-tech font-bold text-white bg-white/10 px-3 py-1 border-2 border-white/20 uppercase tracking-widest">
                  GEN {node.generation}
                </span>
              </div>
              
              <p className="font-sans font-bold text-xl text-[var(--text-secondary)] leading-snug mb-4 group-hover:text-white transition-colors">
                {node.summary}
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-tech text-[var(--text-tertiary)] font-bold uppercase tracking-widest">
                  {new Date(node.created_at).toLocaleString()}
                </span>
                
                {node.parent_ids && node.parent_ids.length > 0 && (
                  <span className="text-tech text-[var(--brand-lime)] font-bold uppercase tracking-widest">
                    PARENTS: {node.parent_ids.length}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
