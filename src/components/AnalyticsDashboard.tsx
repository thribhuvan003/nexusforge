'use client';

import { motion } from 'framer-motion';
import type { NexusCore } from '@/types';
import { BarChart3, Dna, Zap, Heart, Clock, TrendingUp } from 'lucide-react';

export default function AnalyticsDashboard({ organism }: { organism: NexusCore }) {
  const dna = organism.dna || [];
  const familyTree = organism.family_tree || [];

  // DNA type breakdown
  const typeCount: Record<string, number> = {};
  dna.forEach(d => { typeCount[d.type] = (typeCount[d.type] || 0) + 1; });

  // Event breakdown
  const eventCount: Record<string, number> = {};
  familyTree.forEach(n => { eventCount[n.type] = (eventCount[n.type] || 0) + 1; });

  const maxTypeCount = Math.max(...Object.values(typeCount), 1);

  const typeColors: Record<string, string> = {
    concept: 'var(--brand-lime)',
    prototype: 'var(--brand-violet)',
    code: 'white',
    visual: 'var(--brand-orange)',
    narrative: '#FF3300',
    mutation: 'var(--brand-violet)',
  };

  const stats = [
    { icon: Dna, label: 'TOTAL DNA STRANDS', value: dna.length, color: 'var(--brand-lime)' },
    { icon: Zap, label: 'EVOLUTION CYCLES', value: eventCount['evolution'] || 0, color: 'var(--brand-orange)' },
    { icon: TrendingUp, label: 'MUTATIONS', value: organism.mutations, color: 'var(--brand-violet)' },
    { icon: Heart, label: 'HEALTH SCORE', value: `${organism.health}%`, color: organism.health > 70 ? 'var(--brand-lime)' : '#FF3300' },
    { icon: Clock, label: 'GENERATION', value: organism.generation, color: 'white' },
    { icon: BarChart3, label: 'FAMILY EVENTS', value: familyTree.length, color: 'var(--brand-violet)' },
  ];

  return (
    <div className="bg-black p-8 border-4 border-white shadow-[12px_12px_0_rgba(255,255,255,1)]">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {stats.map((stat, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border-4 border-white/20 p-6 bg-[var(--bg-paper)] flex flex-col justify-between hover:border-white transition-colors"
          >
            <div className="flex justify-between items-start mb-6">
              <stat.icon size={28} style={{ color: stat.color }} />
              <span className="font-tech font-bold text-xs text-[var(--text-tertiary)] tracking-widest">{stat.label}</span>
            </div>
            <p className="font-sans font-black text-5xl uppercase tracking-tighter" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* DNA Composition Bar Chart */}
        <div>
          <div className="bg-[var(--brand-orange)] w-fit px-4 py-2 border-4 border-white mb-8 transform -rotate-1">
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-black">DNA COMPOSITION</h3>
          </div>
          
          {Object.keys(typeCount).length === 0 ? (
            <p className="font-tech font-bold text-[var(--text-tertiary)] uppercase tracking-widest">NO DNA STRANDS DETECTED.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {Object.entries(typeCount).sort((a, b) => b[1] - a[1]).map(([type, count], i) => (
                <motion.div key={type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <span className="w-24 text-right font-tech font-black uppercase text-sm tracking-widest text-[var(--text-secondary)]">
                    {type}
                  </span>
                  <div className="flex-1 h-8 bg-[var(--bg-paper)] border-2 border-white/20 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxTypeCount) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      className="absolute top-0 left-0 bottom-0 flex items-center px-4 min-w-[2rem] border-r-4 border-white"
                      style={{ background: typeColors[type] || 'white' }}
                    >
                      <span className="font-sans font-black text-black text-sm">{count}</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Timeline */}
        <div>
          <div className="bg-[var(--brand-violet)] w-fit px-4 py-2 border-4 border-white mb-8 transform rotate-1">
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-white">ACTIVITY TIMELINE</h3>
          </div>

          {familyTree.length === 0 ? (
            <p className="font-tech font-bold text-[var(--text-tertiary)] uppercase tracking-widest">NO ACTIVITY DETECTED.</p>
          ) : (
            <div className="flex items-end gap-2 h-48 border-b-4 border-white/20 pb-4">
              {familyTree.map((event, i) => {
                const eventColors: Record<string, string> = {
                  birth: 'var(--brand-lime)',
                  evolution: 'var(--brand-orange)',
                  mutation: '#FF3300',
                  dream: 'var(--brand-violet)',
                  breed: '#FF3300',
                  merge: 'var(--brand-lime)',
                };
                const height = 20 + Math.random() * 80; // Pseudo-random height for brutalist viz
                return (
                  <motion.div key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
                    title={`${event.type.toUpperCase()}: ${event.label}`}
                    className="flex-1 min-w-[12px] max-w-[40px] border-t-4 border-l-2 border-r-2 border-black hover:opacity-100 opacity-60 transition-opacity cursor-crosshair"
                    style={{ background: eventColors[event.type] || 'white' }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
