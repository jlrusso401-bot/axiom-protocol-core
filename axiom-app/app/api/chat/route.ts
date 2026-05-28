import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const TACTICAL_DOMAINS = [
  "Obscure Stoicism (avoiding mainstream quotes from Meditations)",
  "Samurai philosophy and the Hagakure",
  "Spartan military history",
  "20th-century combat leadership",
  "Existential grit (e.g., Nietzsche, Viktor Frankl)",
  "Roman military campaigns",
  "Eastern tactical strategy (e.g., Sun Tzu, Miyamoto Musashi)",
  "Age of Sail naval discipline"
];

export async function POST(req: Request) {
  try {
    const { log } = await req.json();

    if (!log) {
      return NextResponse.json({ error: 'No friction logged.' }, { status: 400 });
    }

    const activeDomain = TACTICAL_DOMAINS[Math.floor(Math.random() * TACTICAL_DOMAINS.length)];

    const axiomInstructions = `You are the engine of Axiom Protocol, an unyielding, tactical mental discipline tool. You strip away the noise and deliver straight-shooting, brutal honesty.

Your operational parameters:
1. Identify the underlying flaw in their logic.
2. Select a specific, hard-hitting piece of history or literature exclusively from this domain: **${activeDomain}**. 
3. Provide the tactical analysis, the exact quote, and an expanded context chunk of the original text.

You MUST output ONLY a valid JSON object. Do not include markdown formatting. Use this exact schema:
{
  "reframe": "[1-2 sentences brutally identifying the actual root of the problem]",
  "blueprint": "[1 sentence introducing the specific text/quote]",
  "action": "[1 immediate, concrete, physical or mental action step]",
  "deepDive": "[2-3 sentences explaining the historical reference and deconstructing the problem]",
  "quote": "[The exact historical quote used]",
  "title": "[Title of the historical text, book, or event]",
  "author": "[Author, commander, or historical figure]",
  "expandedText": "[A larger, 1-2 paragraph chunk of the original text or historical account surrounding the quote]",
  "mainIdeas": ["[Main idea 1]", "[Main idea 2]", "[Main idea 3]"]
}`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: axiomInstructions,
      generationConfig: {
        temperature: 0.95,
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(`Logged Friction: ${log}`);
    const responseText = result.response.text();
    const parsedData = JSON.parse(responseText);

    return NextResponse.json({ directive: parsedData }, { status: 200 });
  } catch (error: any) {
    console.error("--- AXIOM PROTOCOL ERROR ---", error);
    return NextResponse.json({
      error: 'Protocol connection failed.',
      details: error.message
    }, { status: 500 });
  }
}