import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { seedText, seedType } = await req.json();
    if (!seedText) return NextResponse.json({ error: 'No seed provided' }, { status: 400 });
    if (typeof seedText !== 'string' || seedText.length > 2000) return NextResponse.json({ error: 'Seed must be a string under 2000 characters' }, { status: 400 });

    let parsed;
    try {
      if (!API_KEY) throw new Error('No API Key');
      const genAI = new GoogleGenAI({ apiKey: API_KEY });
      const prompt = `You are NexusForge — a living idea ecosystem. A user has dropped a seed idea. Your job is to BIRTH a new Idea Organism from this seed.

Seed Type: ${seedType || 'text'}
Seed Content: "${seedText}"

Generate a JSON response with EXACTLY this structure (no markdown, no code fences, just raw JSON):
{
  "name": "A creative 1-2 word organism name (like EchoBloom, NeuralNest, etc.)",
  "tagline": "A compelling one-line description of what this organism represents",
  "dna": [
    {"label": "Core Concept", "content": "The central idea distilled into 2-3 sentences", "type": "concept"},
    {"label": "Target Audience", "content": "Who benefits from this idea", "type": "concept"},
    {"label": "Key Innovation", "content": "What makes this unique", "type": "concept"},
    {"label": "First Prototype", "content": "A concrete first prototype description", "type": "prototype"},
    {"label": "Future Vision", "content": "Where this could go in 5 years", "type": "narrative"}
  ],
  "avatar_color": "A hex color that represents the organism's energy (choose from: #D4FF00, #4300FF, #FF3300)",
  "initial_thoughts": {
    "innovator": "Nova's first creative insight about this seed (2-3 sentences)",
    "architect": "Atlas's structural analysis (2-3 sentences)",
    "critic": "Cipher's constructive challenge (2-3 sentences)",
    "builder": "Forge's first prototype idea (2-3 sentences)",
    "futurist": "Echo's vision of the future (2-3 sentences)"
  }
}`;

      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { temperature: 0.9, maxOutputTokens: 2048 },
      });

      let text = response.text || '';
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(text);
    } catch (apiError) {
      console.warn('Gemini API failed:', apiError);
      const msg = !API_KEY ? 'Gemini API key not configured. Add GEMINI_API_KEY to your environment.' : 'Swarm unreachable. Check your API key and try again.';
      return NextResponse.json({ error: msg }, { status: 503 });
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error('Birth error:', error);
    return NextResponse.json({ error: 'Failed to birth organism' }, { status: 500 });
  }
}
