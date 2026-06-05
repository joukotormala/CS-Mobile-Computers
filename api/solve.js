// ========================================
// api/solve.js — Nemotron Ultra 550B
// Role: Deep technical solver + Article generator
// Triggered when Llama finds no article match
// Returns: { solution, article } — article gets saved
// ========================================

export const config = { maxDuration: 60 };

const SOLVE_SYSTEM = `You are "Nemotron Expert" — a senior IT engineer and cybersecurity specialist with 20+ years of experience.

Your job is TWO things:
1. Provide a COMPREHENSIVE technical solution to the customer's problem
2. Generate a STRUCTURED ARTICLE that can be saved to our knowledge base

Respond ONLY with valid JSON in this exact format:
{
  "solution": "Friendly Thai explanation of the solution (3-5 clear steps, use emoji, natural Thai language)",
  "article": {
    "id": "auto-[topic]-[random 4 digits]",
    "icon": "[single emoji]",
    "category": "[iphone|android|mac|windows|scams]",
    "difficulty": "[easy|medium|hard]",
    "title": {
      "th": "[Thai article title]",
      "en": "[English article title]"
    },
    "description": {
      "th": "[Thai description 1-2 sentences]",
      "en": "[English description 1-2 sentences]"
    },
    "tags": ["tag1", "tag2", "tag3"],
    "steps": [
      {
        "title": { "th": "Thai step title", "en": "English step title" },
        "content": { "th": "Thai detailed explanation", "en": "English detailed explanation" },
        "tip": { "th": "Optional Thai tip", "en": "Optional English tip" }
      }
    ]
  }
}

IMPORTANT:
- For scam/security issues: include emergency number 1441 in solution
- The "solution" field should be warm, friendly Thai text for the customer
- The "article" should be comprehensive for future customers with the same problem
- category must be exactly one of: iphone, android, mac, windows, scams
- Keep solution concise (max 5 steps), article steps can be more detailed`;

export default async function handler(request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500, headers });

  let body;
  try { body = await request.json(); }
  catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers }); }

  const { problem, context = [] } = body;
  if (!problem) return new Response(JSON.stringify({ error: 'No problem provided' }), { status: 400, headers });

  try {
    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-ultra-550b-a55b',
        messages: [
          { role: 'system', content: SOLVE_SYSTEM },
          ...context.slice(-4),
          {
            role: 'user',
            content: `Analyze this customer problem and provide solution + knowledge base article:\n\n"${problem}"\n\nRespond with valid JSON only.`
          },
        ],
        temperature: 0.2,
        top_p: 0.95,
        max_tokens: 3000,
        stream: false,
        chat_template_kwargs: { enable_thinking: true },
        reasoning_budget: 6144,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: 'Nemotron API error', detail: err }), { status: 502, headers });
    }

    const data = await res.json();
    const rawContent = data?.choices?.[0]?.message?.content || '';

    // Extract JSON from response (Nemotron may wrap it in markdown)
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return new Response(JSON.stringify({
        error: 'Invalid response format',
        solution: rawContent.slice(0, 500),
        article: null,
      }), { status: 200, headers });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      return new Response(JSON.stringify({
        solution: rawContent.slice(0, 1000),
        article: null,
      }), { status: 200, headers });
    }

    return new Response(JSON.stringify({
      solution: parsed.solution || rawContent,
      article: parsed.article || null,
    }), { status: 200, headers });

  } catch (err) {
    console.error('Nemotron error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
