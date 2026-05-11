'use client';

import { motion } from 'framer-motion';
import type { NexusCore } from '@/types';

interface Props {
  organism: NexusCore | Partial<NexusCore>;
  size?: number;
  animate?: boolean;
  className?: string;
}

export default function OrganismAvatar({ organism, size = 48, animate = true, className = '' }: Props) {
  const color = organism.avatar_color || '#D4FF00';
  const initial = organism.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <motion.div
      className={className}
      whileHover={animate ? { scale: 1.1, rotate: -5 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      style={{
        width: size,
        height: size,
        borderRadius: '24%',
        background: color,
        border: `3px solid #000`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
        fontWeight: 900,
        fontSize: size * 0.5,
        color: '#000',
        flexShrink: 0,
        position: 'relative',
        boxShadow: `4px 4px 0 rgba(255, 255, 255, 0.2)`,
        overflow: 'hidden',
      }}
    >
      <span style={{ position: 'relative', zIndex: 10, marginTop: '2px' }}>{initial}</span>
      {/* Brutalist squishy glitch overlay */}
      {animate && (
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '50%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            transform: 'skewX(-20deg)',
            zIndex: 1,
          }}
        />
      )}
    </motion.div>
  );
}
