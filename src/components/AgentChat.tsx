'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AGENT_PROFILES, type NexusCore } from '@/types';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: string;
  agentName: string;
  agentColor: string;
  agentAvatar: string;
  content: string;
  isUser?: boolean;
  timestamp: string;
}

export default function AgentChat({ organism }: { organism: NexusCore }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const PROMPTS = [
    'WHAT IS THE MVP?',
    'WRITE A LANDING PAGE',
    'DEFINE TARGET USER',
    'IDENTIFY BIGGEST RISK',
    'CREATE TECH ARCHITECTURE',
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim() || isThinking) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      agentName: 'YOU',
      agentColor: '#FFFFFF',
      agentAvatar: '→',
      content: text,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/agents/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          organismContext: `${organism.name}: ${organism.tagline}. DNA: ${organism.dna?.map(d => d.label).join(', ')}`,
          history: messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const agentMessages: Message[] = (data.responses || []).map((r: { role: string; content: string }, i: number) => {
        const agent = AGENT_PROFILES.find(a => a.role === r.role) || AGENT_PROFILES[0];
        return {
          id: `agent-${Date.now()}-${i}`,
          role: r.role,
          agentName: agent.name.toUpperCase(),
          agentColor: agent.color,
          agentAvatar: agent.avatar,
          content: r.content,
          timestamp: new Date().toISOString(),
        };
      });

      setMessages(prev => [...prev, ...agentMessages]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: 'system',
        agentName: 'SYSTEM FAULT',
        agentColor: '#FF3300',
        agentAvatar: '⚠',
        content: 'CONNECTION TO SWARM FAILED. CHECK API LINK.',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-350px)] min-h-[500px] border-4 border-white bg-black relative">
      {/* Agent roster */}
      <div className="flex overflow-x-auto border-b-4 border-white shrink-0 hide-scrollbar bg-[var(--bg-paper)]">
        {AGENT_PROFILES.map(agent => (
          <div key={agent.id} className="flex-1 min-w-[140px] p-4 border-r-4 border-white flex items-center gap-3">
            <span className="text-2xl">{agent.avatar}</span>
            <div>
              <span className="font-sans font-black text-sm uppercase tracking-tighter block" style={{ color: agent.color }}>{agent.name}</span>
              <span className="text-tech text-[var(--text-tertiary)] font-bold text-xs uppercase">{agent.role}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-6 bg-black relative">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="font-sans font-bold text-xl text-[var(--text-secondary)] uppercase mb-8">
              INITIATE COMMAND PROMPT TO <span className="text-[var(--brand-lime)]">{organism.name}</span> SWARM.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {PROMPTS.map((p, i) => (
                <button key={i}
                  onClick={() => sendMessage(p)}
                  className="px-4 py-2 border-2 border-white/20 text-white/50 font-tech font-bold uppercase text-xs hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)] hover:bg-[var(--brand-lime)]/10 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map(msg => (
            <motion.div key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 mb-6 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {!msg.isUser && (
                <div className="w-12 h-12 border-4 border-white bg-black shrink-0 flex items-center justify-center text-2xl shadow-[4px_4px_0_rgba(255,255,255,1)]">
                  {msg.agentAvatar}
                </div>
              )}
              <div className="max-w-[80%]">
                {!msg.isUser && (
                  <span className="font-tech font-black text-xs block mb-2 tracking-widest uppercase" style={{ color: msg.agentColor }}>
                    {msg.agentName}
                  </span>
                )}
                <div 
                  className={`p-4 border-4 border-white font-sans font-bold text-lg leading-relaxed ${msg.isUser ? 'bg-[var(--brand-lime)] text-black shadow-[-6px_6px_0_rgba(255,255,255,1)]' : 'bg-[var(--bg-paper)] text-white shadow-[6px_6px_0_rgba(255,255,255,1)]'}`}
                >
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isThinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-[var(--brand-lime)] font-tech font-bold uppercase tracking-widest text-sm py-4">
            <Loader2 size={16} className="animate-spin" />
            SWARM IS PROCESSING...
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t-4 border-white bg-[var(--bg-paper)]">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-4">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="EXECUTE COMMAND..."
            className="flex-1 bg-black border-4 border-white p-4 font-sans font-bold text-xl text-[var(--brand-lime)] placeholder-white/20 outline-none focus:border-[var(--brand-lime)] uppercase transition-colors"
            disabled={isThinking}
          />
          <button type="submit" disabled={!input.trim() || isThinking} className={`w-16 flex items-center justify-center border-4 border-white ${!input.trim() || isThinking ? 'bg-black text-white/20 cursor-not-allowed' : 'bg-[var(--brand-lime)] text-black hover:shadow-[4px_4px_0_rgba(255,255,255,1)] hover:-translate-y-1 transition-all'}`}>
            <Send size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
