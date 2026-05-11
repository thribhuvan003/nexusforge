// ═══ NexusForge — Core Type Definitions ═══

export interface NexusCore {
  id: string;
  name: string;
  tagline: string;
  seed_type: 'text' | 'voice' | 'image' | 'video';
  seed_content: string;
  dna: DNAStrand[];
  agents: AgentProfile[];
  generation: number;
  mutations: number;
  health: number; // 0-100
  status: 'embryo' | 'growing' | 'mature' | 'evolving' | 'dreaming' | 'breeding';
  created_at: string;
  updated_at: string;
  user_id: string;
  is_public: boolean;
  embedding?: number[];
  family_tree: FamilyNode[];
  avatar_color: string;
  avatar_glow: string;
}

export interface DNAStrand {
  id: string;
  label: string;
  content: string;
  type: 'concept' | 'prototype' | 'code' | 'visual' | 'narrative' | 'mutation';
  generation: number;
  parent_id?: string;
  created_at: string;
}

export interface AgentProfile {
  id: string;
  name: string;
  role: 'innovator' | 'architect' | 'critic' | 'builder' | 'futurist';
  avatar: string;
  color: string;
  description: string;
  isActive: boolean;
}

export interface AgentMessage {
  id: string;
  agent_id: string;
  agent_name: string;
  agent_role: AgentProfile['role'];
  agent_color: string;
  content: string;
  type: 'text' | 'code' | 'image' | 'system' | 'mutation';
  timestamp: string;
  isStreaming?: boolean;
}

export interface FamilyNode {
  id: string;
  nexus_id: string;
  parent_ids: string[];
  generation: number;
  label: string;
  type: 'birth' | 'mutation' | 'evolution' | 'dream' | 'breed';
  summary: string;
  created_at: string;
}

export interface BreedingProposal {
  id: string;
  organism_a: NexusCore;
  organism_b: NexusCore;
  compatibility: number; // 0-1
  proposed_traits: string[];
  status: 'proposed' | 'accepted' | 'breeding' | 'born' | 'rejected';
  child_id?: string;
}

export interface MeshOrganism {
  id: string;
  name: string;
  tagline: string;
  avatar_color: string;
  avatar_glow: string;
  health: number;
  generation: number;
  mutations: number;
  x: number;
  y: number;
  z: number;
  compatibility?: number;
}

export interface EvolutionCycle {
  id: string;
  nexus_id: string;
  generation: number;
  changes: string[];
  new_dna: DNAStrand[];
  triggered_by: 'auto' | 'manual' | 'breeding';
  created_at: string;
}

export type ThemeMode = 'dark' | 'light';

export const AGENT_PROFILES: AgentProfile[] = [
  {
    id: 'innovator',
    name: 'Nova',
    role: 'innovator',
    avatar: '✦',
    color: '#00FF9F',
    description: 'Generates wild new concepts and connections',
    isActive: true,
  },
  {
    id: 'architect',
    name: 'Atlas',
    role: 'architect',
    avatar: '◈',
    color: '#00E5FF',
    description: 'Structures and organizes the organism\'s DNA',
    isActive: true,
  },
  {
    id: 'critic',
    name: 'Cipher',
    role: 'critic',
    avatar: '⊘',
    color: '#FFB800',
    description: 'Verifies, challenges, and stress-tests ideas',
    isActive: true,
  },
  {
    id: 'builder',
    name: 'Forge',
    role: 'builder',
    avatar: '⚡',
    color: '#A855F7',
    description: 'Creates prototypes, code, and tangible outputs',
    isActive: true,
  },
  {
    id: 'futurist',
    name: 'Echo',
    role: 'futurist',
    avatar: '◎',
    color: '#FF006E',
    description: 'Envisions future possibilities and speculative paths',
    isActive: true,
  },
];
