'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NexusCore } from '@/types';
import { X, Download, FileText, Code, Presentation, FileJson, Loader2, Copy, Check } from 'lucide-react';

type ExportType = 'markdown' | 'json' | 'readme' | 'pitch';

interface Props {
  organism: NexusCore;
  onClose: () => void;
}

export default function ExportModal({ organism, onClose }: Props) {
  const [exporting, setExporting] = useState<ExportType | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const FORMATS: { type: ExportType; icon: React.ComponentType<{ size?: number; className?: string }>; label: string; desc: string; color: string }[] = [
    { type: 'markdown', icon: FileText, label: 'Markdown Report', desc: 'Structured documentation', color: 'var(--brand-lime)' },
    { type: 'json', icon: FileJson, label: 'JSON Export', desc: 'Raw data for devs', color: 'var(--brand-violet)' },
    { type: 'readme', icon: Code, label: 'GitHub README', desc: 'Paste-ready for your repo', color: 'var(--brand-orange)' },
    { type: 'pitch', icon: Presentation, label: 'Pitch Deck', desc: 'AI investor outline', color: 'var(--brand-lime)' },
  ];

  const exportAs = async (type: ExportType) => {
    if (exporting) return;
    setExporting(type);
    setResult(null);

    if (type === 'json') {
      setResult(JSON.stringify(organism, null, 2));
      setExporting(null);
      return;
    }

    const dnaContext = organism.dna?.map(d => `- ${d.label} (${d.type}): ${d.content}`).join('\n') || '';
    const prompts: Record<string, string> = {
      markdown: `Create a professional structured document for this idea:\n\nName: ${organism.name}\nTagline: ${organism.tagline}\nGeneration: ${organism.generation}\n\nDNA:\n${dnaContext}\n\nFormat as clean Markdown with sections: Executive Summary, Core Concept, Key DNA Strands, Technical Architecture, Next Steps, Risks & Mitigations.`,
      readme: `Create a GitHub README.md for this project:\n\nName: ${organism.name}\nTagline: ${organism.tagline}\n\nDNA:\n${dnaContext}\n\nInclude: project description, features list, getting started, tech stack, contributing guidelines.`,
      pitch: `Create a pitch deck outline for investors:\n\nName: ${organism.name}\nTagline: ${organism.tagline}\nGeneration: ${organism.generation}\n\nDNA:\n${dnaContext}\n\nFormat as Markdown with slides: Title, Problem, Solution, How It Works, Market Size, Business Model, Ask.`,
    };

    try {
      const res = await fetch('/api/agents/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompts[type],
          organismContext: `${organism.name}: ${organism.tagline}`,
          history: [],
        }),
      });
      const data = await res.json();
      const combined = data.responses?.map((r: { role: string; content: string }) => r.content).join('\n\n---\n\n') || 'Export failed.';
      setResult(combined);
    } catch {
      setResult('Export failed. Check your API key and try again.');
    } finally {
      setExporting(null);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const ext = exporting === 'json' ? 'json' : 'md';
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${organism.name.toLowerCase().replace(/\s+/g, '-')}-export.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-modal-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-lg bg-[var(--bg-paper)] border-4 border-white shadow-[12px_12px_0_rgba(212,255,0,1)] flex flex-col overflow-hidden max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b-4 border-white/20 bg-black shrink-0">
            <div>
              <h3 id="export-modal-title" className="font-sans font-black text-2xl uppercase tracking-tighter text-white">
                EXPORT <span className="text-[var(--brand-lime)]">{organism.name}</span>
              </h3>
              <p className="text-tech text-[var(--text-tertiary)] mt-1">SELECT FORMAT TO EXTRACT DATA</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close export modal"
              className="w-10 h-10 border-4 border-white/20 bg-black text-white hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {!result ? (
              <div className="grid gap-3">
                {FORMATS.map(fmt => (
                  <button
                    key={fmt.type}
                    onClick={() => exportAs(fmt.type)}
                    disabled={!!exporting}
                    className={`flex items-center gap-4 p-5 border-4 bg-black text-left transition-all w-full ${
                      exporting === fmt.type
                        ? 'border-[var(--brand-lime)] shadow-[4px_4px_0_rgba(212,255,0,1)]'
                        : exporting
                        ? 'border-white/10 opacity-40 cursor-wait'
                        : 'border-white/20 hover:border-white hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(255,255,255,1)] cursor-pointer'
                    }`}
                  >
                    <div
                      className="w-10 h-10 border-4 border-white flex items-center justify-center shrink-0"
                      style={{ color: fmt.color }}
                    >
                      {exporting === fmt.type ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <fmt.icon size={18} />
                      )}
                    </div>
                    <div>
                      <span className="font-sans font-black text-lg uppercase tracking-tighter text-white block">
                        {fmt.label}
                      </span>
                      <span className="text-tech text-[var(--text-tertiary)] text-xs">{fmt.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 border-4 border-white/20 bg-black text-white font-sans font-black text-sm uppercase hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)] transition-colors"
                  >
                    {copied ? <><Check size={14} /> COPIED</> : <><Copy size={14} /> COPY</>}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 border-4 border-white/20 bg-black text-white font-sans font-black text-sm uppercase hover:border-[var(--brand-violet)] hover:text-[var(--brand-violet)] transition-colors"
                  >
                    <Download size={14} /> DOWNLOAD
                  </button>
                  <button
                    onClick={() => setResult(null)}
                    className="ml-auto flex items-center gap-2 px-4 py-2 border-4 border-white/10 bg-black text-[var(--text-tertiary)] font-sans font-black text-sm uppercase hover:border-white hover:text-white transition-colors"
                  >
                    ← BACK
                  </button>
                </div>
                <pre className="p-4 bg-black border-4 border-white/20 text-sm text-[var(--brand-lime)] font-mono leading-relaxed overflow-auto max-h-[380px] whitespace-pre-wrap break-words">
                  {result}
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
