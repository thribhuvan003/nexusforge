import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { organismA, organismB } = await req.json();
    if (!API_KEY) return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    const genAI = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `You are the Breeding Engine of NexusForge. Two idea organisms are about to breed and create a hybrid child.

PARENT A — "${organismA.name}":
${organismA.tagline}
DNA: ${JSON.stringify(organismA.dna?.slice(0, 3))}

PARENT B — "${organismB.name}":
${organismB.tagline}
DNA: ${JSON.stringify(organismB.dna?.slice(0, 3))}

Perform the breeding ritual:
1. Find the BEST synergies between both organisms
2. Identify any DNA conflicts and resolve them creatively
3. Birth a brand-new hybrid child organism

Return JSON:
{
  "debate": [
    {"agent": "Nova", "side": "A", "argument": "Why Parent A's trait is valuable"},
    {"agent": "Atlas", "side": "B", "argument": "Why Parent B's structure works better"},
    {"agent": "Cipher", "argument": "The synthesis resolution"}
  ],
  "child": {
    "name": "Hybrid child name",
    "tagline": "Child's unique identity",
    "dna": [
      {"label": "Inherited Concept", "content": "...", "type": "concept"},
      {"label": "Hybrid Innovation", "content": "...", "type": "concept"},
      {"label": "Emergent Trait", "content": "New trait neither parent had", "type": "mutation"}
    ],
    "avatar_color": "#hex (use only #D4FF00, #4300FF, or #FF3300)"
  },
  "synergies": ["Synergy 1", "Synergy 2"],
  "conflicts_resolved": ["Conflict and resolution"]
}`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash', contents: prompt,
      config: { temperature: 1.0, maxOutputTokens: 2048 },
    });
    let text = response.text?.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim() || '';
    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error('Breed error:', error);
    return NextResponse.json({ error: 'Breeding failed' }, { status: 500 });
  }
}
