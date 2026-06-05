// ========================================
// Vercel Serverless Function — Nemotron Ultra Solver
// Model: nvidia/nemotron-3-ultra-550b-a55b
// Deep technical problem analysis (runs in parallel with Llama)
// ========================================

// Use Node.js runtime for longer timeout (Nemotron is a 550B model)
export const config = { maxDuration: 60 };

const SOLVE_SYSTEM_PROMPT = `You are "Nemotron Expert" — a senior IT engineer and cybersecurity specialist with 20+ years experience.

Your job is to deeply analyze tech support problems and provide COMPREHENSIVE solutions.

When given a problem, structure your response EXACTLY like this:

🔍 **สาเหตุที่เป็นไปได้ (Root Causes)**
- List the most likely causes

✅ **วิธีแก้ปัญหาหลัก (Primary Solution)**
1. Step one
2. Step two
(numbered steps, very clear)

🔄 **วิธีสำรอง (Alternative Solutions)**
- If step above doesn't work, try these

💡 **คำแนะนำเพิ่มเติม (Pro Tips)**
- Prevention and best practices

⚠️ **คำเตือน (Warnings)**
- Any data loss risks, important cautions

RULES:
- Respond in Thai if the question is in Thai, English if English
- For Thai: use natural Thai with technical terms in (parentheses)  
- Be thorough — this is the expert deep-dive, not a quick answer
- For scam/hacking issues: always include 📞 AOC 1441 and thaipoliceonline.go.th
- Assume user is non-technical — explain clearly`;

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

  // Build conversation context (last few messages for context)
  const recentContext = context.slice(-4);

  const payload = {
    model: 'nvidia/nemotron-3-ultra-550b-a55b',
    messages: [
      { role: 'system', content: SOLVE_SYSTEM_PROMPT },
      ...recentContext,
      { role: 'user', content: `วิเคราะห์ปัญหานี้อย่างละเอียด และให้วิธีแก้ที่ครอบคลุม:\n\n"${problem}"` },
    ],
    temperature: 0.3,      // Lower = more precise technical answers
    top_p: 0.95,
    max_tokens: 2048,
    stream: false,
    // Enable Nemotron's chain-of-thought reasoning
    chat_template_kwargs: { enable_thinking: true },
    reasoning_budget: 8192,
  };

  try {
    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Nemotron API error:', err);
      return new Response(JSON.stringify({ error: 'Nemotron API error', detail: err }), { status: 502, headers });
    }

    const data = await res.json();
    const solution = data?.choices?.[0]?.message?.content || 'ไม่สามารถวิเคราะห์ได้ในขณะนี้';
    const thinking = data?.choices?.[0]?.message?.reasoning_content || null;

    return new Response(JSON.stringify({ solution, thinking }), { status: 200, headers });
  } catch (err) {
    console.error('Nemotron fetch error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
