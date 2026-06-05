// ========================================
// api/chat.js — Llama 3.3 70B
// Role: Article-aware RAG + Escalation Router
// 1. Search existing articles for a match
// 2. If match → answer customer in Thai
// 3. If no match → ESCALATE (trigger Nemotron)
// ========================================

export const config = { runtime: 'edge' };

// Llama's system prompt — knows to escalate when no article matches
const buildSystemPrompt = (articleContext) => `คุณคือ "น้องไอที" ผู้ช่วย AI ด้านเทคโนโลยีของ CS Help
คุณมีฐานความรู้บทความเทคนิคดังต่อไปนี้:

${articleContext}

กฎการตอบ:
1. ค้นหาในบทความด้านบนก่อน ถ้าเจอบทความที่ตรงกับปัญหา → ตอบโดยอ้างอิงความรู้จากบทความนั้น ตอบเป็นภาษาไทย กระชับ เป็นมิตร
2. ถ้าไม่มีบทความที่ตรงกับปัญหาเลย → ตอบด้วยข้อความ ESCALATE: ตามด้วยข้อความแจ้งลูกค้าว่ากำลังส่งให้ช่างผู้เชี่ยวชาญ
   ตัวอย่าง: ESCALATE: ขออภัยครับ ปัญหานี้ยังไม่มีในฐานความรู้ของเรา กำลังส่งให้ช่างผู้เชี่ยวชาญวิเคราะห์ให้ครับ รอสักครู่นะครับ...
3. ถ้าเป็นเรื่องมิจฉาชีพฉุกเฉิน → โทร 1441 ทันที แม้ว่าจะไม่มีบทความ
4. ตอบสั้น กระชับ ไม่เกิน 5 ขั้นตอน ถ้าซับซ้อนให้ escalate
5. ใช้ภาษาไทยเป็นหลัก ยกเว้นลูกค้าถามภาษาอังกฤษ`;

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

  const { messages, articleContext = '' } = body;
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'Invalid messages' }), { status: 400, headers });
  }

  const systemPrompt = buildSystemPrompt(articleContext);

  try {
    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.3-70b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.6,
        top_p: 0.95,
        max_tokens: 800,
        stream: false,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: 'Llama API error', detail: err }), { status: 502, headers });
    }

    const data = await res.json();
    const rawReply = data?.choices?.[0]?.message?.content || 'ESCALATE: ขออภัยครับ ไม่สามารถตอบได้ในขณะนี้ กำลังส่งให้ช่างผู้เชี่ยวชาญครับ';

    // Detect escalation signal
    const needsSolve = rawReply.trim().startsWith('ESCALATE:');
    const reply = needsSolve
      ? rawReply.replace(/^ESCALATE:\s*/i, '').trim()
      : rawReply;

    return new Response(JSON.stringify({ reply, needsSolve }), { status: 200, headers });
  } catch (err) {
    console.error('Chat error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
