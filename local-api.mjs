// local-api.mjs — Local development API server
// Mirrors Vercel API functions: /api/chat, /api/solve, /api/save-article
// Run with: node local-api.mjs

import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// ── Load .env ──────────────────────────────────────────────────
try {
  const env = readFileSync('.env', 'utf8');
  env.split('\n').forEach((line) => {
    const [key, ...val] = line.split('=');
    if (key && val.length && !key.startsWith('#')) {
      process.env[key.trim()] = val.join('=').trim();
    }
  });
  console.log('✅ .env loaded');
} catch { console.warn('⚠️  No .env file found'); }

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const SOLVED_PATH = resolve('./src/data/solved-articles.js');

// ── Article Context Builder ─────────────────────────────────────
function buildArticleContext() {
  try {
    // Load base articles
    const articlesRaw = readFileSync('./src/data/articles.js', 'utf8');
    const matches = articlesRaw.matchAll(/id:\s*['"]([^'"]+)['"][^}]+title:\s*\{[^}]*th:\s*['"]([^'"]+)['"]/g);
    const lines = [];
    for (const m of matches) {
      lines.push(`- [${m[1]}] ${m[2]}`);
    }

    // Load solved articles too
    const solvedRaw = readFileSync(SOLVED_PATH, 'utf8');
    const solvedMatches = solvedRaw.matchAll(/id:\s*['"]([^'"]+)['"][^}]+title:\s*\{[^}]*th:\s*['"]([^'"]+)['"]/g);
    for (const m of solvedMatches) {
      lines.push(`- [${m[1]}] ${m[2]} ⭐ (ใหม่)`);
    }

    return lines.length > 0 ? lines.join('\n') : 'ยังไม่มีบทความในฐานข้อมูล';
  } catch (e) {
    return 'ไม่สามารถโหลดบทความได้';
  }
}

// ── NVIDIA API Helper ───────────────────────────────────────────
async function callNvidia(model, messages, extra = {}) {
  const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${NVIDIA_API_KEY}`,
    },
    body: JSON.stringify({ model, messages, stream: false, ...extra }),
  });
  if (!res.ok) throw new Error(`NVIDIA API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}

// ── Save Article to File ────────────────────────────────────────
function saveArticle(article) {
  try {
    // Read existing solved articles
    let existing = [];
    if (existsSync(SOLVED_PATH)) {
      const raw = readFileSync(SOLVED_PATH, 'utf8');
      const match = raw.match(/\[[\s\S]*\]/);
      if (match) {
        try { existing = JSON.parse(match[0]); } catch {}
      }
    }

    // Add new article (avoid duplicates by id)
    if (!existing.find((a) => a.id === article.id)) {
      existing.push(article);
    }

    // Write back as JS module
    const content = `// Auto-generated articles solved by Nemotron Ultra\n// Updated: ${new Date().toISOString()}\nexport const solvedArticles = ${JSON.stringify(existing, null, 2)};\n`;
    writeFileSync(SOLVED_PATH, content, 'utf8');
    console.log(`💾 Saved new article: "${article.title?.th || article.id}"`);
    return true;
  } catch (e) {
    console.error('❌ Failed to save article:', e.message);
    return false;
  }
}

// ── System Prompts ──────────────────────────────────────────────
const SOLVE_SYSTEM = `You are "Nemotron Expert" — a senior IT engineer. Analyze tech problems deeply.

Respond ONLY with valid JSON:
{
  "solution": "Friendly Thai solution for the customer (3-5 steps with emoji)",
  "article": {
    "id": "auto-[topic]-[4 random digits]",
    "icon": "[emoji]",
    "category": "[iphone|android|mac|windows|scams]",
    "difficulty": "[easy|medium|hard]",
    "title": { "th": "Thai title", "en": "English title" },
    "description": { "th": "Thai desc", "en": "English desc" },
    "tags": ["tag1", "tag2"],
    "steps": [
      {
        "title": { "th": "Thai", "en": "English" },
        "content": { "th": "Thai", "en": "English" }
      }
    ]
  }
}`;

// ── HTTP Server ─────────────────────────────────────────────────
const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  if (req.method !== 'POST') { res.writeHead(405); res.end(JSON.stringify({ error: 'Method not allowed' })); return; }

  let body = '';
  req.on('data', (chunk) => body += chunk);
  req.on('end', async () => {
    try {
      const data = JSON.parse(body);

      // ── POST /api/chat — Llama RAG ──────────────────────────
      if (req.url === '/api/chat') {
        const { messages } = data;
        const articleContext = buildArticleContext();

        console.log(`\n🤖 [Llama] "${messages.at(-1)?.content?.slice(0, 70)}"`);
        console.log(`   Articles loaded: ${articleContext.split('\n').length} items`);

        const systemPrompt = `คุณคือ "น้องไอที" ผู้ช่วย AI ด้านเทคโนโลยีของ CS Help
คุณมีฐานความรู้บทความดังนี้:
${articleContext}

กฎ:
1. ถ้าคำถามตรงกับบทความ → ตอบเป็นภาษาไทย กระชับ เป็นมิตร (ไม่เกิน 5 ขั้นตอน)
2. ถ้าไม่มีบทความที่ตรง → ตอบ: ESCALATE: [ข้อความสุภาพว่ากำลังส่งให้ช่างผู้เชี่ยวชาญ]
3. เรื่องมิจฉาชีพฉุกเฉิน → โทร 1441 ทันที
4. ถ้าลูกค้าถามภาษาอังกฤษ → ตอบภาษาอังกฤษ`;

        const rawReply = await callNvidia('meta/llama-3.3-70b-instruct', [
          { role: 'system', content: systemPrompt },
          ...messages,
        ], { temperature: 0.6, max_tokens: 700 });

        const needsSolve = rawReply.trim().toUpperCase().startsWith('ESCALATE:');
        const reply = needsSolve ? rawReply.replace(/^ESCALATE:\s*/i, '').trim() : rawReply;

        console.log(`   → ${needsSolve ? '🔺 ESCALATE triggered' : '✅ Answered from articles'}`);
        res.writeHead(200);
        res.end(JSON.stringify({ reply, needsSolve }));
      }

      // ── POST /api/solve — Nemotron Deep Analysis ────────────
      else if (req.url === '/api/solve') {
        const { problem, context = [] } = data;
        console.log(`\n🧠 [Nemotron] Solving: "${problem?.slice(0, 70)}"`);

        const rawContent = await callNvidia('nvidia/nemotron-3-ultra-550b-a55b', [
          { role: 'system', content: SOLVE_SYSTEM },
          ...context.slice(-4),
          { role: 'user', content: `Solve this problem and create knowledge base article:\n"${problem}"\n\nJSON only.` },
        ], {
          temperature: 0.2,
          max_tokens: 3000,
          chat_template_kwargs: { enable_thinking: true },
          reasoning_budget: 6144,
        });

        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        let solution = rawContent;
        let article = null;

        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]);
            solution = parsed.solution || rawContent;
            article = parsed.article || null;
            console.log(`   ✅ Nemotron solved. Article: "${article?.title?.th || 'no article'}"`);
          } catch { console.warn('   ⚠️ JSON parse failed'); }
        }

        res.writeHead(200);
        res.end(JSON.stringify({ solution, article }));
      }

      // ── POST /api/save-article — Save to Knowledge Base ─────
      else if (req.url === '/api/save-article') {
        const { article } = data;
        if (!article || !article.id) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid article' }));
          return;
        }

        const saved = saveArticle(article);
        res.writeHead(200);
        res.end(JSON.stringify({ success: saved, id: article.id }));
      }

      else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
      }

    } catch (err) {
      console.error('❌ Server error:', err.message);
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  });
});

server.listen(3001, () => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 CS Help Local API — http://localhost:3001');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  /api/chat         → 🤖 Llama 3.3 70B (RAG)');
  console.log('  /api/solve        → 🧠 Nemotron Ultra 550B');
  console.log('  /api/save-article → 💾 Save to knowledge base');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\nFrontend: npm run dev → http://localhost:5173\n');
});
