import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { organismContext, dna } = await req.json();
    if (!API_KEY) return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    const genAI = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `You are the Dream Engine of NexusForge. An idea organism is entering a "dream state" — a speculative, surreal, creative exploration of its future possibilities.

Organism DNA:
${JSON.stringify(dna?.slice(0, 5), null, 2)}

Context: ${organismContext?.substring(0, 500) || ''}

Generate a vivid, creative "dream" — a speculative future scenario for this organism. Include:
1. A dream title (evocative, poetic)
2. A vivid narrative (3-4 paragraphs) describing a surreal future where this idea has evolved beyond recognition
3. Three "dream fragments" — concrete unexpected mutations that could emerge
4. A "wake up insight" — one actionable takeaway from the dream

Format as JSON:
{
  "title": "Dream title",
  "narrative": "The full dream narrative...",
  "fragments": ["Fragment 1", "Fragment 2", "Fragment 3"],
  "insight": "The actionable insight"
}`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash', contents: prompt,
      config: { temperature: 1.2, maxOutputTokens: 1500 },
    });

    let text = response.text?.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim() || '';
    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({
        title: 'Dream Vision',
        narrative: text || 'The organism dreamed of infinite possibility.',
        fragments: ['Fragment of light', 'A whisper of what could be', 'The seed remembers'],
        insight: 'Every idea contains multitudes not yet explored.',
      });
    }
  } catch (error) {
    console.error('Dream error:', error);
    return NextResponse.json({ error: 'Dream generation failed' }, { status: 500 });
  }
}
