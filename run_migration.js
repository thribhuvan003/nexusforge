const { Client } = require('pg');

const run = async () => {
  // Let's try without brackets first, as brackets usually indicate a placeholder
  let client = new Client({
    connectionString: 'postgresql://postgres:Artimus00775448@db.hgstqajqaiqnjssxesmj.supabase.co:5432/postgres'
  });

  try {
    await client.connect();
    console.log('Connected to Supabase without brackets in password.');
  } catch (e) {
    console.log('Failed without brackets, trying with brackets...');
    client = new Client({
      connectionString: 'postgresql://postgres:[Artimus00775448]@db.hgstqajqaiqnjssxesmj.supabase.co:5432/postgres'
    });
    await client.connect();
    console.log('Connected to Supabase with brackets in password.');
  }

  const sql = `
-- Enable the pgvector extension to work with embedding vectors
CREATE EXTENSION IF NOT EXISTS vector;

-- We modify our existing "organisms" table to have a vector representation of their DNA
ALTER TABLE public.organisms 
ADD COLUMN IF NOT EXISTS dna_embedding vector(768); 

-- Create a table for Episodic Memory
CREATE TABLE IF NOT EXISTS public.episodic_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nexus_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding vector(768),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for semantic search on the organisms table 
CREATE INDEX IF NOT EXISTS organisms_dna_embedding_idx ON public.organisms USING hnsw (dna_embedding vector_cosine_ops);

-- Index for memory retrieval
CREATE INDEX IF NOT EXISTS episodic_memory_embedding_idx ON public.episodic_memory USING hnsw (embedding vector_cosine_ops);

-- RLS (Row Level Security) policies
ALTER TABLE public.episodic_memory ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read access for episodic_memory' AND tablename = 'episodic_memory') THEN
        CREATE POLICY "Public read access for episodic_memory" ON public.episodic_memory FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon insert to episodic_memory' AND tablename = 'episodic_memory') THEN
        CREATE POLICY "Allow anon insert to episodic_memory" ON public.episodic_memory FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- Create a stored procedure for matching organisms 
CREATE OR REPLACE FUNCTION match_organisms (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id text,
  name text,
  tagline text,
  avatar_color text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    organisms.id,
    organisms.name,
    organisms.tagline,
    organisms.avatar_color,
    1 - (organisms.dna_embedding <=> query_embedding) AS similarity
  FROM organisms
  WHERE 1 - (organisms.dna_embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
  `;

  console.log('Running migration...');
  await client.query(sql);
  console.log('Migration completed successfully!');
  await client.end();
};

run().catch(console.error);
