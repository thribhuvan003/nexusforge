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

  const FORMATS: { type: ExportType; icon: any; label: string; desc: string }[] = [
    { type: 'markdown', icon: FileText, label: 'Markdown Report', desc: 'Structured documentation of your organism' },
    { type: 'json', icon: FileJson, label: 'JSON Export', desc: 'Raw data for programmatic use' },
    { type: 'readme', icon: Code, label: 'GitHub README', desc: 'Ready to paste into your repo' },
    { type: 'pitch', icon: Presentation, label: 'Pitch Deck', desc: 'AI-generated pitch outline' },
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
      readme: `Create a GitHub README.md for this project:\n\nName: ${organism.name}\nTagline: ${organism.tagline}\n\nDNA:\n${dnaContext}\n\nInclude: project description, features list, getting started, tech stack, architecture diagram (as text), contributing guidelines. Use badges and professional formatting.`,
      pitch: `Create a pitch deck outline for investors:\n\nName: ${organism.name}\nTagline: ${organism.tagline}\nGeneration: ${organism.generation}\n\nDNA:\n${dnaContext}\n\nFormat as Markdown with slides: Title, Problem, Solution, How It Works, Market Size (estimate realistic numbers), Business Model, Traction/Metrics (projected), Team Requirements, Ask.`,
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
      setResult('Export failed. Check your API key.');
    } finally {
      setExporting(null);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: 560, maxHeight: '80vh',
            background: 'var(--void-1)', borderRadius: 'var(--r-lg)',
            border: '1px solid var(--border-subtle)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)',
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>Export {organism.name}</h3>
              <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>Choose a format to export your organism</p>
            </div>
            <button onClick={onClose} style={{
              background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: 4,
            }}>
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
            {!result ? (
              <div style={{ display: 'grid', gap: 8 }}>
                {FORMATS.map(fmt => (
                  <button key={fmt.type}
                    onClick={() => exportAs(fmt.type)}
                    disabled={!!exporting}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px 20px', borderRadius: 'var(--r-md)',
                      border: '1px solid var(--border-subtle)', background: 'var(--void-2)',
                      cursor: exporting ? 'wait' : 'pointer', textAlign: 'left',
                      transition: 'all 0.2s ease', opacity: exporting && exporting !== fmt.type ? 0.4 : 1,
                      width: '100%',
                    }}
                    onMouseEnter={e => { if (!exporting) { e.currentTarget.style.borderColor = 'var(--border-active)'; } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                  >
                    {exporting === fmt.type ? (
                      <Loader2 size={18} style={{ color: 'var(--signal-primary)', animation: 'spin-slow 1s linear infinite' }} />
                    ) : (
                      <fmt.icon size={18} style={{ color: 'var(--text-2)' }} />
                    )}
                    <div>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'var(--text-0)', display: 'block' }}>{fmt.label}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{fmt.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <button onClick={handleCopy} className="btn-ghost" style={{ padding: '6px 14px', fontSize: 11 }}>
                    {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                  </button>
                  <button onClick={handleDownload} className="btn-ghost" style={{ padding: '6px 14px', fontSize: 11 }}>
                    <Download size={12} /> Download
                  </button>
                  <button onClick={() => setResult(null)} className="btn-ghost" style={{ padding: '6px 14px', fontSize: 11, marginLeft: 'auto' }}>
                    Back
                  </button>
                </div>
                <pre style={{
                  padding: 20, borderRadius: 'var(--r-md)',
                  background: 'var(--void-0)', border: '1px solid var(--border-subtle)',
                  fontSize: 12, color: 'var(--text-1)', lineHeight: 1.7,
                  fontFamily: 'var(--font-mono)', overflow: 'auto',
                  maxHeight: 400, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                }}>
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
