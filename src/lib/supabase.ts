import { createClient } from '@supabase/supabase-js';
import type { NexusCore, MeshOrganism } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eyfvsukoeqxqrgvdjiar.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5ZnZzdWtvZXF4cXJndmRqaWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MDg3MzcsImV4cCI6MjA3MzA4NDczN30.kN9b6G0GBlZKBkx8xkYLhY1M4_0LJf2UszNtBwkRLjE';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fallback Mock Data for when Supabase is unreachable/paused
export const MOCK_ORGANISMS: NexusCore[] = [
  {
    id: 'org_1',
    name: 'NEURO-PARASITE',
    tagline: 'Cognitive hijacking vector',
    seed_type: 'text',
    seed_content: 'A virus that spreads through ideas instead of biology',
    dna: [
      { id: 'd1', label: 'Memetic Transmission', content: 'Infects host via auditory processing', type: 'concept', generation: 1, created_at: new Date().toISOString() },
      { id: 'd2', label: 'Synaptic Override', content: 'Re-routes dopamine pathways', type: 'mutation', generation: 1, created_at: new Date().toISOString() }
    ],
    agents: [],
    generation: 1,
    mutations: 2,
    health: 95,
    status: 'mature',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: 'user_1',
    is_public: true,
    family_tree: [],
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
      { id: 'd3', label: 'Temporal Digestion', content: 'Metabolizes regrets into energy', type: 'concept', generation: 1, created_at: new Date().toISOString() }
    ],
    agents: [],
    generation: 3,
    mutations: 5,
    health: 80,
    status: 'evolving',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: 'user_2',
    is_public: true,
    family_tree: [],
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
      { id: 'd4', label: 'Null Silk', content: 'Invisible but unbreakable structural material', type: 'visual', generation: 2, created_at: new Date().toISOString() }
    ],
    agents: [],
    generation: 2,
    mutations: 1,
    health: 100,
    status: 'mature',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: 'user_1',
    is_public: true,
    family_tree: [],
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
