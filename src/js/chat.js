// ========================================
// CS Customer Support — AI Chat Widget
// น้องไอที — Powered by Gemini 2.0 Flash
// ========================================

import { getLang, t } from './i18n.js';

// ---- State ----
let isOpen = false;
let isTyping = false;
let messages = []; // { role: 'user'|'assistant', content: string }

// Quick reply suggestions by language
const quickReplies = {
  th: [
    '📱 iPhone ของฉันช้ามาก',
    '🔑 ลืมรหัส Apple ID',
    '🚨 Facebook ถูกแฮก',
    '💻 Mac เครื่องร้อน',
    '📩 ได้รับ SMS ต้องสงสัย',
    '🖥️ Windows จอฟ้า (BSOD)',
  ],
  en: [
    '📱 My iPhone is very slow',
    '🔑 Forgot Apple ID password',
    '🚨 Facebook account hacked',
    '💻 Mac is overheating',
    '📩 Got suspicious SMS',
    '🖥️ Windows blue screen (BSOD)',
  ],
};

// ---- Initialize ----
export function initChat() {
  const existingWidget = document.getElementById('chat-widget');
  if (existingWidget) existingWidget.remove();

  const widget = document.createElement('div');
  widget.id = 'chat-widget';
  widget.innerHTML = renderWidget();
  document.body.appendChild(widget);
  bindChatEvents();
}

// ---- Render Widget HTML ----
function renderWidget() {
  const lang = getLang();
  const welcomeMsg = lang === 'th'
    ? 'สวัสดีครับ! ผมน้องไอที 🤖 ช่วยแก้ปัญหา iPhone, Android, Mac, Windows และมิจฉาชีพออนไลน์ครับ ถามได้เลย!'
    : 'Hello! I\'m น้องไอที 🤖 I can help with iPhone, Android, Mac, Windows problems and online scams. Ask away!';

  return `
    <!-- Floating Button -->
    <button class="chat-fab" id="chat-fab" aria-label="Open chat">
      <span class="chat-fab-icon chat-fab-open">💬</span>
      <span class="chat-fab-icon chat-fab-close" style="display:none;">✕</span>
      <span class="chat-fab-badge" id="chat-badge" style="display:none;">1</span>
    </button>

    <!-- Chat Panel -->
    <div class="chat-panel" id="chat-panel" aria-hidden="true">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar">🤖</div>
          <div>
            <div class="chat-name">น้องไอที</div>
            <div class="chat-status">
              <span class="chat-status-dot"></span>
              ${lang === 'th' ? 'ออนไลน์ · Gemini 2.0 Flash' : 'Online · Gemini 2.0 Flash'}
            </div>
          </div>
        </div>
        <button class="chat-close-btn" id="chat-close-btn" aria-label="Close chat">✕</button>
      </div>

      <!-- Messages -->
      <div class="chat-messages" id="chat-messages">
        <div class="chat-msg assistant">
          <div class="chat-bubble">
            <span class="chat-bubble-icon">🤖</span>
            <div class="chat-bubble-text">${welcomeMsg}</div>
          </div>
        </div>

        <!-- Quick Replies -->
        <div class="quick-replies" id="quick-replies">
          ${quickReplies[lang].map((r) => `
            <button class="quick-reply-btn" data-text="${r}">${r}</button>
          `).join('')}
        </div>
      </div>

      <!-- Input Area -->
      <div class="chat-input-area">
        <div class="chat-input-row">
          <textarea
            class="chat-input"
            id="chat-input"
            placeholder="${lang === 'th' ? 'พิมพ์คำถามที่นี่...' : 'Type your question here...'}"
            rows="1"
            maxlength="1000"
          ></textarea>
          <button class="chat-send-btn" id="chat-send-btn" aria-label="Send">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <div class="chat-footer-note">
          ${lang === 'th' ? '🔒 ข้อความของคุณจะไม่ถูกบันทึก · ขับเคลื่อนด้วย Gemini 2.0' : '🔒 Messages not stored · Powered by Gemini 2.0'}
        </div>
      </div>
    </div>
  `;
}

// ---- Bind Events ----
function bindChatEvents() {
  const fab = document.getElementById('chat-fab');
  const closeBtn = document.getElementById('chat-close-btn');
  const sendBtn = document.getElementById('chat-send-btn');
  const input = document.getElementById('chat-input');

  fab?.addEventListener('click', toggleChat);
  closeBtn?.addEventListener('click', closeChat);
  sendBtn?.addEventListener('click', sendMessage);

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  input?.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  // Quick replies
  document.querySelectorAll('.quick-reply-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.text;
      if (text) {
        const input = document.getElementById('chat-input');
        if (input) input.value = text;
        sendMessage();
        // Hide quick replies after first use
        const qr = document.getElementById('quick-replies');
        if (qr) qr.style.display = 'none';
      }
    });
  });
}

// ---- Toggle / Open / Close ----
function toggleChat() {
  if (isOpen) closeChat();
  else openChat();
}

function openChat() {
  isOpen = true;
  const panel = document.getElementById('chat-panel');
  const fabOpen = document.querySelector('.chat-fab-open');
  const fabClose = document.querySelector('.chat-fab-close');
  const badge = document.getElementById('chat-badge');

  panel?.classList.add('open');
  panel?.setAttribute('aria-hidden', 'false');
  if (fabOpen) fabOpen.style.display = 'none';
  if (fabClose) fabClose.style.display = 'flex';
  if (badge) badge.style.display = 'none';

  // Focus input
  setTimeout(() => document.getElementById('chat-input')?.focus(), 300);
  scrollToBottom();
}

function closeChat() {
  isOpen = false;
  const panel = document.getElementById('chat-panel');
  const fabOpen = document.querySelector('.chat-fab-open');
  const fabClose = document.querySelector('.chat-fab-close');

  panel?.classList.remove('open');
  panel?.setAttribute('aria-hidden', 'true');
  if (fabOpen) fabOpen.style.display = 'flex';
  if (fabClose) fabClose.style.display = 'none';
}

// ---- Send Message ----
async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input?.value.trim();
  if (!text || isTyping) return;

  // Clear input
  if (input) {
    input.value = '';
    input.style.height = 'auto';
  }

  // Hide quick replies
  const qr = document.getElementById('quick-replies');
  if (qr) qr.style.display = 'none';

  // Add user message to state + UI
  messages.push({ role: 'user', content: text });
  appendMessage('user', text);

  // Show typing indicator
  isTyping = true;
  showTyping();
  updateSendBtn(true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || 'API error');
    }

    const reply = data.reply;
    messages.push({ role: 'assistant', content: reply });

    hideTyping();
    appendMessage('assistant', reply);

    // Show badge if chat is closed
    if (!isOpen) {
      const badge = document.getElementById('chat-badge');
      if (badge) badge.style.display = 'flex';
    }
  } catch (err) {
    console.error('Chat error:', err);
    hideTyping();
    const lang = getLang();
    const errMsg = lang === 'th'
      ? 'ขออภัยครับ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง หรือติดต่อเราผ่าน LINE ครับ'
      : 'Sorry, an error occurred. Please try again or contact us via LINE.';
    appendMessage('assistant', errMsg, true);
  } finally {
    isTyping = false;
    updateSendBtn(false);
  }
}

// ---- UI Helpers ----
function appendMessage(role, text, isError = false) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;

  const formattedText = formatMessageText(text);

  if (role === 'assistant') {
    div.innerHTML = `
      <div class="chat-bubble ${isError ? 'error' : ''}">
        <span class="chat-bubble-icon">🤖</span>
        <div class="chat-bubble-text">${formattedText}</div>
      </div>
    `;
  } else {
    div.innerHTML = `
      <div class="chat-bubble user">
        <div class="chat-bubble-text">${escapeHtml(text)}</div>
      </div>
    `;
  }

  // Animate in
  div.style.opacity = '0';
  div.style.transform = 'translateY(10px)';
  container.appendChild(div);

  requestAnimationFrame(() => {
    div.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    div.style.opacity = '1';
    div.style.transform = 'translateY(0)';
  });

  scrollToBottom();
}

function showTyping() {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'chat-msg assistant';
  div.id = 'typing-indicator';
  div.innerHTML = `
    <div class="chat-bubble">
      <span class="chat-bubble-icon">🤖</span>
      <div class="chat-typing">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  container.appendChild(div);
  scrollToBottom();
}

function hideTyping() {
  document.getElementById('typing-indicator')?.remove();
}

function updateSendBtn(loading) {
  const btn = document.getElementById('chat-send-btn');
  if (!btn) return;
  btn.disabled = loading;
  btn.style.opacity = loading ? '0.5' : '1';
}

function scrollToBottom() {
  const container = document.getElementById('chat-messages');
  if (container) {
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 50);
  }
}

// Format assistant message: convert markdown-lite to HTML
function formatMessageText(text) {
  return escapeHtml(text)
    // Bold **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Numbered lists
    .replace(/^(\d+)\.\s(.+)$/gm, '<div class="chat-list-item"><span class="chat-list-num">$1.</span><span>$2</span></div>')
    // Bullet points
    .replace(/^[-•]\s(.+)$/gm, '<div class="chat-list-item"><span class="chat-list-num">•</span><span>$1</span></div>')
    // Line breaks
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
