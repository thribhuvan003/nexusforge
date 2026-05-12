import { createClient } from '@supabase/supabase-js';
import type { NexusCore, MeshOrganism } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eyfvsukoeqxqrgvdjiar.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5ZnZzdWtvZXF4cXJndmRqaWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MDg3MzcsImV4cCI6MjA3MzA4NDczN30.kN9b6G0GBlZKBkx8xkYLhY1M4_0LJf2UszNtBwkRLjE';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const MOCK_ORGANISMS: NexusCore[] = [
  {
    id: 'org_1',
    name: 'NEURO-PARASITE',
    tagline: 'Cognitive hijacking vector',
    seed_type: 'text',
    seed_content: 'A virus that spreads through ideas instead of biology',
    dna: [
      { id: 'd1', label: 'Memetic Transmission', content: 'Infects host via auditory processing', type: 'concept', generation: 1, created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: 'd2', label: 'Synaptic Override', content: 'Re-routes dopamine pathways for concept retention', type: 'mutation', generation: 1, created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: 'd3', label: 'Host Selection Algorithm', content: 'Targets high-curiosity individuals via semantic resonance patterns', type: 'concept', generation: 2, created_at: new Date(Date.now() - 86400000 * 1).toISOString() },
    ],
    agents: [],
    generation: 2,
    mutations: 3,
    health: 95,
    status: 'mature',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    user_id: 'user_1',
    is_public: true,
    family_tree: [
      { id: 'ft-org1-0', nexus_id: 'org_1', parent_ids: [], generation: 1, label: 'Genesis', type: 'birth', summary: 'Born from text seed: "A virus that spreads through ideas instead of biology"', created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: 'ft-org1-1', nexus_id: 'org_1', parent_ids: [], generation: 2, label: 'First Evolution', type: 'evolution', summary: 'Synaptic override pathway discovered — dopamine re-routing confirmed viable', created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: 'ft-org1-2', nexus_id: 'org_1', parent_ids: [], generation: 2, label: 'Dream Sequence Alpha', type: 'dream', summary: 'Dream vision: memetic payload delivered via music, not speech', created_at: new Date(Date.now() - 86400000 * 1).toISOString() },
    ],
    avatar_color: '#D4FF00',
    avatar_glow: '#D4FF0080'
  },
  {
    id: 'org_2',
    name: 'CHRONO-PHAGE',
    tagline: 'Temporal distortion entity',
    seed_type: 'text',
    seed_content: 'An organism that consumes lost time',
    dna: [
      { id: 'd4', label: 'Temporal Digestion', content: 'Metabolizes regrets into energy at 98.3% efficiency', type: 'concept', generation: 1, created_at: new Date(Date.now() - 86400000 * 7).toISOString() },
      { id: 'd5', label: 'Paradox Buffer', content: 'Prevents timeline collapse during heavy consumption cycles', type: 'prototype', generation: 2, created_at: new Date(Date.now() - 86400000 * 4).toISOString() },
      { id: 'd6', label: 'Entropy Harvester', content: 'Converts entropy into structured temporal fragments for reuse', type: 'mutation', generation: 3, created_at: new Date(Date.now() - 86400000 * 1).toISOString() },
    ],
    agents: [],
    generation: 3,
    mutations: 5,
    health: 80,
    status: 'evolving',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    user_id: 'user_2',
    is_public: true,
    family_tree: [
      { id: 'ft-org2-0', nexus_id: 'org_2', parent_ids: [], generation: 1, label: 'Genesis', type: 'birth', summary: 'Born from text seed: "An organism that consumes lost time"', created_at: new Date(Date.now() - 86400000 * 7).toISOString() },
      { id: 'ft-org2-1', nexus_id: 'org_2', parent_ids: [], generation: 2, label: 'Temporal Mutation', type: 'mutation', summary: 'Paradox buffer gene emerged — prevents recursive loop on paradoxical time events', created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
      { id: 'ft-org2-2', nexus_id: 'org_2', parent_ids: [], generation: 2, label: 'Evolutionary Leap', type: 'evolution', summary: 'Generation 2 reached — temporal digestion efficiency increased by 34%', created_at: new Date(Date.now() - 86400000 * 4).toISOString() },
      { id: 'ft-org2-3', nexus_id: 'org_2', parent_ids: [], generation: 3, label: 'Deep Dream', type: 'dream', summary: 'Dream vision: entropy harvesting unlocked — lost time can now be reprocessed into structured energy', created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: 'ft-org2-4', nexus_id: 'org_2', parent_ids: [], generation: 3, label: 'Second Evolution', type: 'evolution', summary: 'Generation 3 achieved — organism now operates across 3 simultaneous temporal streams', created_at: new Date(Date.now() - 86400000 * 1).toISOString() },
    ],
    avatar_color: '#4300FF',
    avatar_glow: '#4300FF80'
  },
  {
    id: 'org_3',
    name: 'VOID-WEAVER',
    tagline: 'Dark matter silkworm',
    seed_type: 'text',
    seed_content: 'Spins webs out of nothingness',
    dna: [
      { id: 'd7', label: 'Null Silk', content: 'Invisible but unbreakable structural material spun from quantum uncertainty', type: 'visual', generation: 2, created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
      { id: 'd8', label: 'Void Anchor', content: 'Pins web structures to stable dimensional coordinates in null-space', type: 'concept', generation: 2, created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
    ],
    agents: [],
    generation: 2,
    mutations: 1,
    health: 100,
    status: 'mature',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    user_id: 'user_1',
    is_public: true,
    family_tree: [
      { id: 'ft-org3-0', nexus_id: 'org_3', parent_ids: [], generation: 1, label: 'Genesis', type: 'birth', summary: 'Born from text seed: "Spins webs out of nothingness"', created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
      { id: 'ft-org3-1', nexus_id: 'org_3', parent_ids: [], generation: 2, label: 'First Mutation', type: 'mutation', summary: 'Null silk discovered — material properties defy conventional physics', created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: 'ft-org3-2', nexus_id: 'org_3', parent_ids: [], generation: 2, label: 'Void Stabilization', type: 'evolution', summary: 'Void anchor gene evolved — webs now persist indefinitely without energy input', created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
    ],
    avatar_color: '#FF3300',
    avatar_glow: '#FF330080'
  }
];

export async function fetchPublicMesh(): Promise<MeshOrganism[]> {
  try {
    const { data, error } = await supabase
      .from('organisms')
      .select('*')
      .eq('is_public', true)
      .limit(50);
      
    if (error) throw error;
    
    // Map to MeshOrganism format
    return data.map((org: any) => ({
      id: org.id,
      name: org.name,
      tagline: org.tagline,
      avatar_color: org.avatar_color,
      avatar_glow: org.avatar_glow,
      health: org.health,
      generation: org.generation,
      mutations: org.mutations,
      x: Math.random() * 100 - 50, // Assign random 3D coordinates if missing
      y: Math.random() * 100 - 50,
      z: Math.random() * 100 - 50,
    }));
  } catch (e) {
    console.warn("Supabase fetch failed, falling back to mock mesh:", e);
    // Fallback logic
    return MOCK_ORGANISMS.map(org => ({
      id: org.id,
      name: org.name,
      tagline: org.tagline,
      avatar_color: org.avatar_color,
      avatar_glow: org.avatar_glow,
      health: org.health,
      generation: org.generation,
      mutations: org.mutations,
      x: Math.random() * 20 - 10,
      y: Math.random() * 20 - 10,
      z: Math.random() * 20 - 10,
    }));
  }
}

export async function saveOrganism(organism: NexusCore) {
  try {
    const { error } = await supabase
      .from('organisms')
      .upsert(organism);
    if (error) throw error;
    return true;
  } catch (e) {
    console.warn("Supabase save failed, organism only saved locally:", e);
    return false; // Handled by Zustand persistence
  }
}

export async function fetchOrganismById(id: string): Promise<NexusCore | null> {
  try {
    const { data, error } = await supabase
      .from('organisms')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as NexusCore;
  } catch (e) {
    console.warn(`Failed to fetch organism ${id} from Supabase:`, e);
    return MOCK_ORGANISMS.find(o => o.id === id) || null;
  }
}

export async function fetchPublicOrganisms(limit = 10): Promise<NexusCore[]> {
  try {
    const { data, error } = await supabase
      .from('organisms')
      .select('*')
      .eq('is_public', true)
      .limit(limit);
      
    if (error) throw error;
    return data as NexusCore[];
  } catch (e) {
    console.warn("Supabase fetch failed, falling back to mock organisms:", e);
    return MOCK_ORGANISMS.slice(0, limit);
  }
}
