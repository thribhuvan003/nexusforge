import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { parent1, parent2 } = await req.json();
    if (!parent1 || !parent2) return NextResponse.json({ error: 'Missing parents' }, { status: 400 });

    let parsed;
    try {
      if (!API_KEY) throw new Error('No API Key');
      const genAI = new GoogleGenAI({ apiKey: API_KEY });
      const prompt = `You are the NexusForge Synthesis Engine. Your job is to breed two Idea Organisms and create a completely novel hybrid child.

Parent 1: ${parent1.name} - ${parent1.tagline}
DNA: ${parent1.dna.map((d: any) => d.label + ': ' + d.content).join(' | ')}

Parent 2: ${parent2.name} - ${parent2.tagline}
DNA: ${parent2.dna.map((d: any) => d.label + ': ' + d.content).join(' | ')}

Combine their traits. Generate a JSON response with EXACTLY this structure (no markdown, just raw JSON):
{
  "name": "A creative hybrid name (1-2 words)",
  "tagline": "A compelling description of the hybrid",
  "dna": [
    {"label": "Hybrid Trait 1", "content": "Combination of parent concepts", "type": "concept"},
    {"label": "Hybrid Trait 2", "content": "New emergent property", "type": "mutation"},
    {"label": "Synthesized Prototype", "content": "How this actually works", "type": "prototype"}
  ],
  "avatar_color": "A hex color mixing the parents (choose from: #D4FF00, #4300FF, #FF3300)"
}`;

      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { temperature: 1.0, maxOutputTokens: 2048 },
      });

      let text = response.text || '';
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(text);
    } catch (apiError) {
      console.warn('Gemini API failed during synthesis, using fallback mock data:', apiError);
      parsed = {
        name: `${parent1.name.slice(0, 4)}-${parent2.name.slice(-4)}`,
        tagline: `A synthesized fusion of ${parent1.name} and ${parent2.name}.`,
        dna: [
          { label: "Hybrid Core", content: "Emergent properties from offline fusion.", type: "concept" },
          { label: "Resilience Trait", content: "Bypassed API restrictions to survive.", type: "mutation" },
          { label: "Offline Prototype", content: "A functional, self-contained organism.", type: "prototype" }
        ],
        avatar_color: "#FF3300"
      };
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error('Synthesis error:', error);
    return NextResponse.json({ error: 'Failed to synthesize', details: String(error) }, { status: 500 });
  }
}
