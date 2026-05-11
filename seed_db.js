const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const MOCK_ORGANISMS = [
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

async function seed() {
  console.log('Seeding Supabase with Demo Organisms...');
  for (const org of MOCK_ORGANISMS) {
    const { error } = await supabase.from('organisms').upsert(org);
    if (error) {
      console.error(`Error inserting ${org.name}:`, error);
    } else {
      console.log(`Successfully seeded ${org.name}`);
    }
  }
  console.log('Seeding complete.');
}

seed();
