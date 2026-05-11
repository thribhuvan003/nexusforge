# NexusForge

NexusForge is a living workspace where your ideas don't just sit in a text file—they evolve. By turning raw thoughts into structured "DNA," maintaining a persistent vector memory, and utilizing a multi-agent swarm, NexusForge acts as a brutal, highly efficient engine for creative synthesis.

Built by **Thribhuvan**.

## Features

- **Persistent Vector Memory**: Your ideas are saved permanently using Supabase `pgvector`. The system never forgets the context of your projects.
- **Stateful Swarm Execution**: A 5-agent LangGraph-style swarm debates, critiques, and refines your seeds. It doesn't just chat; it executes real workflows.
- **Semantic Breeding**: Fork public ideas from the 3D Mesh and fuse them with your own. The Synthesis engine intelligently merges concepts to force mutations.
- **Dopamine Brutalist UI**: Stripped down, high-impact design that removes all fluff and focuses purely on utility and output.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React, Tailwind CSS v4, Framer Motion
- **3D Visualization**: React Three Fiber, Drei
- **State Management**: Zustand
- **Backend & Database**: Supabase (PostgreSQL, `pgvector`, Row Level Security)
- **AI Integration**: Google Gemini API (`@google/genai`)

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/thribhuvan003/nexusforge.git
   cd nexusforge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the `.env.example` file to `.env.local` or create a new `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_key_here
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
   
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Database Migration:**
   Run the SQL script provided in `supabase/migrations/001_pgvector_schema.sql` (if you saved it locally) or copy the setup query into your Supabase SQL Editor to initialize the `organisms` table and `pgvector` memory structure.

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

This project is fully optimized for deployment on Vercel. 
1. Push your code to GitHub.
2. Log into Vercel and import the repository.
3. Add your environment variables in the Vercel dashboard.
4. Deploy!

## License

MIT License.
