import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { supabase } from '@/lib/supabase';

const API_KEY = process.env.GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { message, nexusId, organismContext, history } = await req.json();
    if (!message) return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    if (typeof message !== 'string' || message.length > 2000) return NextResponse.json({ error: 'Message must be a string under 2000 characters' }, { status: 400 });

    let parsed;
    try {
      if (!API_KEY) throw new Error('No API Key');
      const genAI = new GoogleGenAI({ apiKey: API_KEY });
      const prompt = `You are a Swarm of 5 AI Agents collaborating on an Idea Organism.
Organism Context: ${organismContext}
User Command: "${message}"

Recent Chat History:
${history.map((m: any) => `${m.role}: ${m.content}`).join('\n')}

Generate 2-3 responses from different agents reacting to the user command.
Roles: innovator, architect, critic, builder, futurist.

Generate a JSON response with EXACTLY this structure (no markdown, just raw JSON):
{
  "responses": [
    {
      "role": "choose one of the 5 roles",
      "content": "The agent's response in their unique voice (2-3 sentences max)"
    }
  ]
}`;

      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { temperature: 0.8, maxOutputTokens: 2048 },
      });

      let text = response.text || '';
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(text);
    } catch (apiError) {
      console.warn('Gemini API failed during chat, using fallback mock data:', apiError);
      parsed = {
        responses: [
          {
            role: "innovator",
            content: `The Swarm is currently operating in offline resilience mode due to network restrictions. But we received your command: "${message}".`
          },
          {
            role: "architect",
            content: "Structurally, we can still hold the organism's state perfectly. Standby for reconnection."
          }
        ]
      };
    }

    // Write conversation to episodic_memory (non-blocking — failures are silent)
    if (nexusId && parsed.responses?.length) {
      const memoryRows = [
        { nexus_id: nexusId, role: 'user', content: message },
        ...parsed.responses.map((r: { role: string; content: string }) => ({
          nexus_id: nexusId,
          role: r.role,
          content: r.content,
        })),
      ];
      supabase.from('episodic_memory').insert(memoryRows).then(({ error }) => {
        if (error) console.warn('episodic_memory write failed:', error.message);
      });
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to communicate with Swarm' }, { status: 500 });
  }
}
