import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { message, organismContext, history } = await req.json();
    if (!message) return NextResponse.json({ error: 'No message provided' }, { status: 400 });

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

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to communicate with Swarm', details: String(error) }, { status: 500 });
  }
}
