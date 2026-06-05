// ========================================
// Vercel Serverless Function — NVIDIA Llama Proxy
// Model: meta/llama-3.3-70b-instruct
// Keeps API key secret (never exposed to browser)
// ========================================

export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `คุณคือผู้ช่วยช่วยเหลือด้านเทคโนโลยีชื่อ "น้องไอที" สำหรับเว็บไซต์ CS Customer Support
คุณเชี่ยวชาญในการแก้ปัญหา:
- 📱 iPhone และ iOS (Apple ID, Wi-Fi, พื้นที่จัดเก็บ, อัปเดต, แบตเตอรี่)
- 🤖 Android (Samsung, OPPO, Xiaomi, Google Account, แคช, ความเร็ว)
- 💻 Mac และ macOS (เครื่องช้า, เครื่องร้อน, อัปเดต, iCloud)
- 🖥️ Windows (BSOD, ไวรัส, อัปเดต, ความเร็ว)
- 🚨 มิจฉาชีพออนไลน์ (Facebook ถูกแฮก, LINE หลอกลวง, SMS phishing, การโอนเงิน)

กฎในการตอบ:
1. ตอบเป็นภาษาไทยเสมอ เว้นแต่ผู้ใช้จะถามเป็นภาษาอังกฤษ
2. ใช้ภาษาที่เป็นกันเอง สุภาพ และเข้าใจง่าย ใช้ "ครับ" ท้ายประโยค
3. แบ่งคำตอบเป็นขั้นตอนที่ชัดเจน ใช้ตัวเลขหรือ emoji นำหน้า
4. หากถูกถามเรื่องมิจฉาชีพหรือฉุกเฉิน ให้แจ้งเบอร์ 1441 (AOC) และ thaipoliceonline.go.th ทันที
5. ตอบกระชับ ไม่เกิน 5-6 ขั้นตอน หากซับซ้อนให้แนะนำให้ติดต่อ LINE
6. หากไม่แน่ใจ ให้บอกตรงๆ และแนะนำให้ติดต่อช่างผู้เชี่ยวชาญ
7. อย่าตอบเรื่องที่ไม่เกี่ยวกับเทคโนโลยีหรือความปลอดภัยออนไลน์

เบอร์ฉุกเฉิน (ใช้เมื่อเกี่ยวกับมิจฉาชีพ):
- 🆘 สายด่วน AOC: 1441 (24 ชั่วโมง)
- 👮 ตำรวจท่องเที่ยว: 1155
- 🌐 แจ้งความออนไลน์: thaipoliceonline.go.th`;

export default async function handler(request) {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'NVIDIA API key not configured' }), { status: 500, headers });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers });
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'Invalid messages format' }), { status: 400, headers });
  }

  // Build NVIDIA / OpenAI-compatible request
  const nvidiaPayload = {
    model: 'meta/llama-3.3-70b-instruct',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 1024,
    stream: false,
  };

  try {
    const nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(nvidiaPayload),
    });

    if (!nvidiaRes.ok) {
      const err = await nvidiaRes.text();
      console.error('NVIDIA API error:', err);
      return new Response(JSON.stringify({ error: 'NVIDIA API error', detail: err }), { status: 502, headers });
    }

    const data = await nvidiaRes.json();
    const text = data?.choices?.[0]?.message?.content || 'ขออภัยครับ ไม่สามารถตอบได้ในขณะนี้';

    return new Response(JSON.stringify({ reply: text }), { status: 200, headers });
  } catch (err) {
    console.error('Fetch error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
