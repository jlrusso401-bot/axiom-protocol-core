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

// THE ARSENAL: Curated Audio Intelligence (Expanded 54 Episodes)
const PODCAST_DATABASE = [
  // --- JOCKO PODCAST ---
  { theme: "fear", title: "Deeper Dive with Jocko Willink", host: "Jocko Willink", embedUrl: "https://open.spotify.com/embed/episode/2Q4kuHUotfRhP4TYpNg7jb", rationale: "Confronting the unknown and taking absolute ownership of uncontrollable environments." },
  { theme: "discipline", title: "Deeper Dive with Jocko Willink", host: "Jocko Willink", embedUrl: "https://open.spotify.com/embed/episode/5N3Z69z1DB9kcDX9QEJSJe", rationale: "The fundamental theorem that strict adherence to protocol is the only path to liberation." },
  { theme: "resilience", title: "Deeper Dive with Jocko Willink", host: "Jocko Willink", embedUrl: "https://open.spotify.com/embed/episode/75vL2ZbwkUjvWiRvqSglUq", rationale: "Navigating tragedy, malevolent environments, and the psychological weight of suffering." },
  { theme: "focus", title: "Deeper Dive with Jocko Willink", host: "Jocko Willink", embedUrl: "https://open.spotify.com/embed/episode/5ZjRiRaJWIRctBNTnFbkaU", rationale: "Compartmentalizing extreme stress to operate as a SEAL, doctor, and astronaut." },
  { theme: "ownership", title: "Deeper Dive with Jocko Willink", host: "Jocko Willink", embedUrl: "https://open.spotify.com/embed/episode/0jbR7zLQ8BFpEHd5yvKBJ3", rationale: "Taking on the maximum possible burden of responsibility to create meaning." },
  { theme: "fear", title: "Deeper Dive with Jocko Willink", host: "Jocko Willink", embedUrl: "https://open.spotify.com/embed/episode/5n30KvkwCKQsZFZrPcED14", rationale: "Operating through the paralyzing reality of combat and devastating loss." },
  { theme: "resilience", title: "Deeper Dive with Jocko Willink", host: "Jocko Willink", embedUrl: "https://open.spotify.com/embed/episode/7bB27bwsONww5MtzDHjgAH", rationale: "Surviving a catastrophic ambush and refusing to play the victim." },
  { theme: "discipline", title: "Deeper Dive with Jocko Willink", host: "Jocko Willink", embedUrl: "https://open.spotify.com/embed/episode/1OD2v2BGIf3RhaP8Pj2ppO", rationale: "The neurological and biological mechanisms behind building unyielding discipline." },

  // --- HUBERMAN LAB ---
  { theme: "recovery", title: "Deeper Dive with Andrew Huberman", host: "Andrew Huberman", embedUrl: "https://open.spotify.com/embed/episode/4JIM6biMG5CQDsSMQFwG3O", rationale: "The foundational biological protocol for physical and neurological recovery." },
  { theme: "focus", title: "Deeper Dive with Andrew Huberman", host: "Andrew Huberman", embedUrl: "https://open.spotify.com/embed/episode/0cfMpJd2lk9xtk3hyGy5FT", rationale: "Tactical, science-based protocols to eliminate distraction and sustain attention." },
  { theme: "complacency", title: "Deeper Dive with Andrew Huberman", host: "Andrew Huberman", embedUrl: "https://open.spotify.com/embed/episode/2AMNa7N2mlbOVLTy0bvmXh", rationale: "Understanding how cheap thrills destroy the drive for difficult, meaningful work." },
  { theme: "resilience", title: "Deeper Dive with Andrew Huberman", host: "Andrew Huberman", embedUrl: "https://open.spotify.com/embed/episode/3W4Y9Zb9SEr8E4OKdA3yiC", rationale: "Using physical shock to train the brain's capacity to handle sudden stress." },
  { theme: "recovery", title: "Deeper Dive with Andrew Huberman", host: "Andrew Huberman", embedUrl: "https://open.spotify.com/embed/episode/6hiYGdCKowwM3rtPWvvfbh", rationale: "Structuring the daily timeline to maximize physical endurance and lifespan." },
  { theme: "fear", title: "Deeper Dive with Andrew Huberman", host: "Andrew Huberman", embedUrl: "https://open.spotify.com/embed/episode/0I1kiY8IbFrl36WQjjeGek", rationale: "The biological mechanisms of overwriting panic and fearful responses." },
  { theme: "exhaustion", title: "Deeper Dive with Andrew Huberman", host: "Andrew Huberman", embedUrl: "https://open.spotify.com/embed/episode/587TWR06xtzizU8rsxyjYQ", rationale: "The friction between physical limits and mental surrender during endurance events." },

  // --- JOE ROGAN EXPERIENCE (JRE) ---
  { theme: "exhaustion", title: "Deeper Dive with Joe Rogan", host: "Joe Rogan", embedUrl: "https://open.spotify.com/embed/episode/70ssh8DCCOlwwOEAjLobW3", rationale: "The blueprint for callousing the mind against unimaginable physical pain." },
  { theme: "resilience", title: "Deeper Dive with Joe Rogan", host: "Joe Rogan", embedUrl: "https://open.spotify.com/embed/episode/27QZ8gh5X27R9LRB02hD3n", rationale: "Pushing past the 40% rule and dealing with the physical breakdown of the body." },
  { theme: "discipline", title: "Deeper Dive with Joe Rogan", host: "Joe Rogan", embedUrl: "https://open.spotify.com/embed/episode/6U05omZKtR1ACRSKxZCkgp", rationale: "The daily, unglamorous grind required to become an apex endurance athlete." },
  { theme: "resilience", title: "Deeper Dive with Joe Rogan", host: "Joe Rogan", embedUrl: "https://open.spotify.com/embed/episode/4bpFFLlUJUzqnDX4csB8j6", rationale: "Overcoming catastrophic physical trauma and the mindset required for a grueling rebuild." },
  { theme: "discipline", title: "Deeper Dive with Joe Rogan", host: "Joe Rogan", embedUrl: "https://open.spotify.com/embed/episode/6KIg7ke9TQOPVZLgOSFnZP", rationale: "The philosophy of consistent, sub-maximal training to achieve long-term mastery." },
  { theme: "ownership", title: "Deeper Dive with Joe Rogan", host: "Joe Rogan", embedUrl: "https://open.spotify.com/embed/episode/4LpD0kERg5Oo7YdM7drq5u", rationale: "Taking absolute accountability and maintaining discipline through extreme ownership." },
  { theme: "resilience", title: "Deeper Dive with Jon Bernthal", host: "Jon Bernthal", embedUrl: "https://open.spotify.com/embed/episode/5PQuuviPU7xHqcqZOuCFxM", rationale: "The intersection of authentic storytelling, discipline, and pushing through adversity." },

  // --- THE DAILY STOIC ---
  { theme: "resilience", title: "Deeper Dive with Ryan Holiday", host: "Ryan Holiday", embedUrl: "https://open.spotify.com/embed/show/5qNMWDyMC5VkZRW6lv3owp", rationale: "Reframing friction not as an impediment, but as the exact path forward." },
  { theme: "complacency", title: "Deeper Dive with Ryan Holiday", host: "Ryan Holiday", embedUrl: "https://open.spotify.com/embed/show/3Dc16IrDN7S2V2w6zbytDK", rationale: "Re-calibrating the mind when early success or comfort breeds weakness." },
  { theme: "focus", title: "Deeper Dive with Ryan Holiday", host: "Ryan Holiday", embedUrl: "https://open.spotify.com/embed/episode/16Nep92GxmBFC5yiES7brY", rationale: "Using the certainty of death to brutally clarify present priorities." },
  { theme: "discipline", title: "Deeper Dive with Ryan Holiday", host: "Ryan Holiday", embedUrl: "https://open.spotify.com/embed/episode/7LF5OWJKc89oqmMLfW6o4C", rationale: "Building automation into daily habits to bypass the negotiation phase of the brain." },
  { theme: "exhaustion", title: "Deeper Dive with Ryan Holiday", host: "Ryan Holiday", embedUrl: "https://open.spotify.com/embed/episode/3VbGyix7GOozgg8sry2Tmr", rationale: "The core Epictetus framework: bearing what is difficult and abstaining from what is easy." },
  { theme: "resilience", title: "Deeper Dive with Ryan Holiday", host: "Ryan Holiday", embedUrl: "https://open.spotify.com/embed/episode/4JRMpjW3U4AsGGjjO42UcR", rationale: "Learning to not just accept, but fiercely love, the challenges you are handed." },

  // --- MODERN WISDOM ---
  { theme: "discipline", title: "Deeper Dive with Chris Williamson", host: "Chris Williamson", embedUrl: "https://open.spotify.com/embed/episode/1UdGh0Q8d4llRAqKxfG0M2", rationale: "Tactical breakdown of closing the gap between knowing what to do and actually doing it." },
  { theme: "focus", title: "Deeper Dive with Chris Williamson", host: "Chris Williamson", embedUrl: "https://open.spotify.com/embed/episode/0Aiz21ilntajgctpNPur7D", rationale: "Why the work is supposed to feel terrible, and how to execute anyway." },
  { theme: "exhaustion", title: "Deeper Dive with Chris Williamson", host: "Chris Williamson", embedUrl: "https://open.spotify.com/embed/episode/328DFHU0KBOzgQKfz2Fahb", rationale: "Sustaining momentum when the initial motivation burns out." },
  { theme: "focus", title: "Deeper Dive with Chris Williamson", host: "Chris Williamson", embedUrl: "https://open.spotify.com/embed/show/63QvsrI6cbJ9ahBlPUMogi", rationale: "Eliminating digital noise to execute the mission at a world-class level." },
  { theme: "discipline", title: "Deeper Dive with Chris Williamson", host: "Chris Williamson", embedUrl: "https://open.spotify.com/embed/episode/6T8NVknFvCH3eL3HLapfxf", rationale: "The micro-adjustments required to build an unbreakable system of execution." },
  { theme: "focus", title: "Deeper Dive with Chris Williamson", host: "Chris Williamson", embedUrl: "https://open.spotify.com/embed/episode/5nsaFC6FVO2QPKPmclR7sg", rationale: "Reclaiming cognitive bandwidth in an environment engineered to distract you." },

  // --- ORDER OF MAN ---
  { theme: "discipline", title: "Deeper Dive with Ryan Michler", host: "Ryan Michler", embedUrl: "https://open.spotify.com/embed/episode/3kOK4RT7tKcdQIaL8DeWjz", rationale: "Treating discipline as a physical trait that requires progressive overload." },
  { theme: "resilience", title: "Deeper Dive with Ryan Michler", host: "Ryan Michler", embedUrl: "https://open.spotify.com/embed/episode/6EMP9j3qwgmIOioqvzw397", rationale: "Preparing the mind for inevitable friction before the crisis occurs." },
  { theme: "ownership", title: "Deeper Dive with Ryan Michler", host: "Ryan Michler", embedUrl: "https://open.spotify.com/embed/episode/4geB05vkUY6EpWrgGte1WZ", rationale: "Accepting the weight of leadership and the absolute necessity of self-reliance." },
  { theme: "complacency", title: "Deeper Dive with Ryan Michler", host: "Ryan Michler", embedUrl: "https://open.spotify.com/embed/episode/4m2FnplD7sSlQo4DMX9Wgb", rationale: "Identifying and destroying the subtle comfort zones that halt progress." },
  { theme: "exhaustion", title: "Deeper Dive with Ryan Michler", host: "Ryan Michler", embedUrl: "https://open.spotify.com/embed/episode/6Aq6f3Fb6t5JY7jlSzitfh", rationale: "Aligning physical capability with the demands of protecting and providing." },

  // --- KEEP HAMMERING W/ CAM HANES ---
  { theme: "complacency", title: "Deeper Dive with Cam Hanes", host: "Cam Hanes", embedUrl: "https://open.spotify.com/embed/episode/2lEBkxeKiNw7oJPjhxxUtS", rationale: "Eliminating excuses and realizing that the world does not owe you empathy for your fatigue." },
  { theme: "focus", title: "Deeper Dive with Cam Hanes", host: "Cam Hanes", embedUrl: "https://open.spotify.com/embed/episode/2wm0YdsdOjgB2xmyf6Re1w", rationale: "Locking onto a single target and ignoring all peripheral distractions." },
  { theme: "exhaustion", title: "Deeper Dive with Cam Hanes", host: "Cam Hanes", embedUrl: "https://open.spotify.com/embed/episode/7ihfIKiXc7smG05bHZWZ93", rationale: "Managing catastrophic fatigue when there is no option to quit or call for extraction." },
  { theme: "discipline", title: "Deeper Dive with Cam Hanes", host: "Cam Hanes", embedUrl: "https://open.spotify.com/embed/episode/7fG028wbphmduwS9D4RkQ2", rationale: "The daily requirement of physical preparation regardless of weather, mood, or soreness." },
  { theme: "resilience", title: "Deeper Dive with Cam Hanes", host: "Cam Hanes", embedUrl: "https://open.spotify.com/embed/episode/4JnNCWuXLG1tEqPUWCNf2A", rationale: "Using intense physical exertion to burn off mental weakness and anxiety." },

  // --- REAL ONES W/ JON BERNTHAL ---
  { theme: "exhaustion", title: "Deeper Dive with Jon Bernthal", host: "Jon Bernthal", embedUrl: "https://open.spotify.com/embed/episode/68Mzq7xWDwgswEJa3lA0ra", rationale: "Operating at a world-class physical level while managing devastating pain and injury." },
  { theme: "resilience", title: "Deeper Dive with Jon Bernthal", host: "Jon Bernthal", embedUrl: "https://open.spotify.com/embed/episode/7q4u187Cj9EHiOrEWcwQLA", rationale: "Why genuine character is only forged in environments of severe adversity." },
  { theme: "focus", title: "Deeper Dive with Jon Bernthal", host: "Jon Bernthal", embedUrl: "https://open.spotify.com/embed/episode/7dRLmlsyTtU79c3rj32JqE", rationale: "Maintaining the integrity of the work while ignoring the superficial demands of the industry." },

  // --- THE TIM FERRISS SHOW ---
  { theme: "discipline", title: "Deeper Dive with Tim Ferriss", host: "Tim Ferriss", embedUrl: "https://open.spotify.com/embed/episode/79UVtYGoQGeGkWl4c0O6kP", rationale: "The dichotomy of leadership and the practical application of morning routines." },
  { theme: "recovery", title: "Deeper Dive with Tim Ferriss", host: "Tim Ferriss", embedUrl: "https://open.spotify.com/embed/episode/0bRRLF9cEmroXQ12eO37BP", rationale: "The science of strength, kettlebell training, and the necessity of recovery." },
  { theme: "ownership", title: "Deeper Dive with Tim Ferriss", host: "Tim Ferriss", embedUrl: "https://open.spotify.com/embed/episode/0xS8RxN0jQs5htRe2I0WOS", rationale: "Rebuilding a life from the ground up through radical transparency and accountability." },
  { theme: "focus", title: "Deeper Dive with Tim Ferriss", host: "Tim Ferriss", embedUrl: "https://open.spotify.com/embed/episode/5jJKjhUY37MvTCp4sCXjPj", rationale: "Ignoring the trivial many to focus strictly on the vital few." },

  // --- THE SCHOOL OF GREATNESS ---
  { theme: "focus", title: "Deeper Dive with Lewis Howes", host: "Lewis Howes", embedUrl: "https://open.spotify.com/embed/episode/1VDsHtW6GnId280HXX5dKD", rationale: "The obsessive, unyielding focus required to dismantle the competition." },
  { theme: "exhaustion", title: "Deeper Dive with Lewis Howes", host: "Lewis Howes", embedUrl: "https://open.spotify.com/embed/episode/48xTcvWRXNEbfSljPV5DOc", rationale: "Weaponizing past trauma to fuel impossible physical feats." },
  { theme: "resilience", title: "Deeper Dive with Lewis Howes", host: "Lewis Howes", embedUrl: "https://open.spotify.com/embed/episode/5sRErJsulQx63NkKGiR7DF", rationale: "When a life-altering injury forces a complete reframe of purpose and duty." },
  { theme: "recovery", title: "Deeper Dive with Lewis Howes", host: "Lewis Howes", embedUrl: "https://open.spotify.com/embed/episode/4Zn2v08nrJgjZembK5urxQ", rationale: "Transforming from addiction to ultra-endurance through strict protocol." }
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
1. Intelligently interpret the user's logged friction. You MUST silently auto-correct any spelling, grammatical, or typographical errors in their input. Never echo their mistakes back to them in your response.
2. Identify the underlying flaw in their logic.
3. Select a specific, hard-hitting piece of history or literature exclusively from this domain: **${activeDomain}**. 
4. Provide the tactical analysis, the exact quote, and an expanded context chunk of the original text.
5. Determine a single core theme for the user's friction from this exact list: "exhaustion", "fear", "complacency", "focus", "discipline", "resilience", "recovery", "ownership".

You MUST output ONLY a valid JSON object. Do not include markdown formatting. Use this exact schema:
{
  "themeTag": "[Must be exactly one of: exhaustion, fear, complacency, focus, discipline, resilience, recovery, ownership]",
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

    // Backend Match: Filter the database for the matching theme
    const matchingPodcasts = PODCAST_DATABASE.filter(pod => pod.theme === parsedData.themeTag);
    
    // Select a random podcast from the matched theme, or fallback to the first item if the AI hallucinates
    const matchedPodcast = matchingPodcasts.length > 0 
      ? matchingPodcasts[Math.floor(Math.random() * matchingPodcasts.length)] 
      : PODCAST_DATABASE[0];

    // Inject the podcast payload into the outgoing data
    parsedData.podcast = matchedPodcast;

    return NextResponse.json({ directive: parsedData }, { status: 200 });
  } catch (error: any) {
    console.error("--- AXIOM PROTOCOL ERROR ---", error);
    return NextResponse.json({
      error: 'Protocol connection failed.',
      details: error.message
    }, { status: 500 });
  }
}