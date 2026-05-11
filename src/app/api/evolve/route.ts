import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { action, organism } = await req.json();
    if (!action || !organism) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });

    let parsed;
    try {
      if (!API_KEY) throw new Error('No API Key');
      const genAI = new GoogleGenAI({ apiKey: API_KEY });
      const prompt = `You are NexusForge. An Idea Organism is undergoing a lifecycle event.
Event: ${action} (either 'evolve' or 'dream')
Organism Context: ${organism.name} - ${organism.tagline}
DNA: ${organism.dna.map((d: any) => d.label).join(', ')}

If 'evolve', add a structural, logical mutation.
If 'dream', add an abstract, wild, or narrative mutation.

Generate a JSON response with EXACTLY this structure (no markdown, just raw JSON):
{
  "mutation": {
    "label": "Name of the new trait",
    "content": "Description of what this adds to the idea (2-3 sentences)",
    "type": "mutation"
  },
  "summary": "A 1-sentence summary of what happened to the organism"
}`;

      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { temperature: action === 'dream' ? 1.0 : 0.7, maxOutputTokens: 1024 },
      });

      let text = response.text || '';
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(text);
    } catch (apiError) {
      console.warn(`Gemini API failed during ${action}, using fallback mock data:`, apiError);
      parsed = {
        mutation: {
          label: action === 'dream' ? 'Cybernetic Hallucination' : 'Hardened Shell',
          content: action === 'dream' 
            ? 'The organism dreamed of electric sheep, gaining a new abstract perspective.' 
            : 'The organism evolved a resilient shell to protect against API failures.',
          type: action === 'dream' ? 'dream' : 'mutation'
        },
        summary: `Organism underwent a localized offline ${action}.`
      };
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error('Lifecycle error:', error);
    return NextResponse.json({ error: `Failed to ${req.json().then(j => j.action)} organism`, details: String(error) }, { status: 500 });
  }
}
