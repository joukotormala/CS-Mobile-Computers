// ========================================
// CS Customer Support — Main Application
// ========================================

import { t, getLang, setLang, getArticleText } from './i18n.js';
import { initChat } from './chat.js';

// Will be loaded once articles.js is ready
let articles = [];
let solvedArticles = [];

// ---- State ----
let currentPage = 'home';
let currentCategory = null;
let currentArticle = null;

// ---- Config ----
const LINE_URL = 'https://line.me/ti/p/~@your-line-id'; // Replace with real LINE ID
const FB_URL = 'https://facebook.com/your-page'; // Replace with real FB page

// ---- Category Config ----
const categories = [
  { id: 'iphone', icon: '📱', colorClass: 'iphone' },
  { id: 'android', icon: '🤖', colorClass: 'android' },
  { id: 'mac', icon: '💻', colorClass: 'mac' },
  { id: 'windows', icon: '🖥️', colorClass: 'windows' },
  { id: 'scams', icon: '🚨', colorClass: 'scams' },
];

// ---- Initialize ----
export async function initApp() {
  try {
    const [baseModule, solvedModule] = await Promise.allSettled([
      import('../data/articles.js'),
      import('../data/solved-articles.js'),
    ]);
    articles = baseModule.status === 'fulfilled' ? (baseModule.value.articles || []) : [];
    solvedArticles = solvedModule.status === 'fulfilled' ? (solvedModule.value.solvedArticles || []) : [];
  } catch (e) {
    console.warn('Articles not loaded:', e);
    articles = [];
    solvedArticles = [];
  }

  setupTheme();
  setupCookieConsent();
  render();
  setupScrollAnimations();
  initChat();

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state) {
      currentPage = e.state.page || 'home';
      currentCategory = e.state.category || null;
      currentArticle = e.state.article || null;
    } else {
      currentPage = 'home';
      currentCategory = null;
      currentArticle = null;
    }
    render();
  });
}

// ---- Theme ----
function setupTheme() {
  const saved = localStorage.getItem('cs-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('cs-theme', next);
  render();
}

// ---- Language Toggle ----
function toggleLang() {
  const next = getLang() === 'th' ? 'en' : 'th';
  setLang(next);
  render();
  initChat(); // Re-init chat so quick replies update language
}

// ---- Cookie Consent ----
function setupCookieConsent() {
  const consent = localStorage.getItem('cs-cookie-consent');
  if (!consent) {
    setTimeout(() => {
      const banner = document.getElementById('cookie-banner');
      if (banner) banner.classList.add('visible');
    }, 1500);
  }
}

function acceptCookies() {
  localStorage.setItem('cs-cookie-consent', 'accepted');
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.classList.remove('visible');
}

function declineCookies() {
  localStorage.setItem('cs-cookie-consent', 'declined');
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.classList.remove('visible');
}

// ---- Navigation ----
function navigate(page, category = null, articleId = null) {
  currentPage = page;
  currentCategory = category;
  currentArticle = articleId;

  const state = { page, category, article: articleId };
  const title = page === 'home' ? 'Home' : page;
  history.pushState(state, title, '#');

  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Search ----
function handleSearch(query) {
  const resultsEl = document.getElementById('search-results');
  if (!resultsEl) return;

  if (!query || query.length < 2) {
    resultsEl.classList.remove('active');
    return;
  }

  const lang = getLang();
  const q = query.toLowerCase();
  const results = articles.filter((a) => {
    const title = (a.title[lang] || a.title.th || '').toLowerCase();
    const desc = (a.description[lang] || a.description.th || '').toLowerCase();
    const tags = (a.tags || []).join(' ').toLowerCase();
    return title.includes(q) || desc.includes(q) || tags.includes(q);
  }).slice(0, 8);

  if (results.length === 0) {
    resultsEl.innerHTML = `
      <div style="padding: var(--space-lg); text-align: center; color: var(--text-muted);">
        ${t('search_no_results')}<br><small>${t('search_try_again')}</small>
      </div>`;
    resultsEl.classList.add('active');
    return;
  }

  resultsEl.innerHTML = results.map((a) => `
    <div class="search-result-item" data-article="${a.id}">
      <span class="result-icon">${a.icon}</span>
      <div class="result-info">
        <div class="result-title">${getArticleText(a.title)}</div>
        <div class="result-category">${getCategoryLabel(a.category)}</div>
      </div>
    </div>
  `).join('');

  resultsEl.querySelectorAll('.search-result-item').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.dataset.article;
      const article = articles.find((a) => a.id === id);
      if (article) {
        navigate('article', article.category, article.id);
        resultsEl.classList.remove('active');
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
      }
    });
  });

  resultsEl.classList.add('active');
}

function getCategoryLabel(catId) {
  return t(`cat_${catId}_title`);
}

function getCategoryIcon(catId) {
  const cat = categories.find((c) => c.id === catId);
  return cat ? cat.icon : '📄';
}

// ---- Render Engine ----
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderNav()}
    <main id="main-content" class="page-content">
      ${renderPage()}
    </main>
    ${renderFooter()}
    ${renderCookieBanner()}
  `;

  bindEvents();
  setupScrollAnimations();
}

// ---- Render: Navigation ----
function renderNav() {
  const lang = getLang();
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const themeIcon = theme === 'dark' ? '☀️' : '🌙';

  return `
    <nav class="nav" role="navigation">
      <div class="nav-inner">
        <a class="nav-logo" data-nav="home" id="nav-logo">
          <span class="nav-logo-icon">🛡️</span>
          <span>CS Help</span>
        </a>

        <ul class="nav-links" id="nav-links">
          <li><button class="nav-link ${currentPage === 'home' ? 'active' : ''}" data-nav="home">${t('nav_home')}</button></li>
          <li><button class="nav-link ${currentCategory === 'iphone' ? 'active' : ''}" data-nav="category" data-cat="iphone">📱 ${t('nav_iphone')}</button></li>
          <li><button class="nav-link ${currentCategory === 'android' ? 'active' : ''}" data-nav="category" data-cat="android">🤖 ${t('nav_android')}</button></li>
          <li><button class="nav-link ${currentCategory === 'mac' ? 'active' : ''}" data-nav="category" data-cat="mac">💻 ${t('nav_mac')}</button></li>
          <li><button class="nav-link ${currentCategory === 'windows' ? 'active' : ''}" data-nav="category" data-cat="windows">🖥️ ${t('nav_windows')}</button></li>
          <li><button class="nav-link scam-link ${currentCategory === 'scams' ? 'active' : ''}" data-nav="category" data-cat="scams">${t('nav_scams')}</button></li>
          <li><button class="nav-link chat-nav-link ${currentPage === 'chat' ? 'active' : ''}" data-nav="chat">💬 ${getLang() === 'th' ? 'ถามน้องไอที' : 'Ask AI'}</button></li>
        </ul>

        <div class="nav-controls">
          <button class="lang-toggle" id="lang-toggle" title="Switch Language">${lang === 'th' ? 'EN' : 'ไทย'}</button>
          <button class="theme-toggle" id="theme-toggle" title="Toggle Theme">${themeIcon}</button>
          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  `;
}

// ---- Render: Pages ----
function renderPage() {
  switch (currentPage) {
    case 'home':
      return renderHomePage();
    case 'category':
      return renderCategoryPage();
    case 'article':
      return renderArticlePage();
    case 'privacy':
      return renderPrivacyPage();
    case 'chat':
      return renderChatPage();
    default:
      return renderHomePage();
  }
}

// ---- Home Page ----
function renderHomePage() {
  const lang = getLang();
  const popularArticles = articles.slice(0, 6);
  const articlesByCategory = {};
  articles.forEach((a) => {
    articlesByCategory[a.category] = (articlesByCategory[a.category] || 0) + 1;
  });

  return `
    <section class="hero">
      <div class="container">
        <h1 class="hero-title reveal">
          ${t('hero_title_1')} <span class="gradient-text">${t('hero_title_2')}</span>
        </h1>
        <p class="hero-subtitle reveal reveal-delay-1">${t('hero_subtitle')}</p>

        <div class="search-container reveal reveal-delay-2">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            class="search-bar"
            id="search-input"
            placeholder="${t('search_placeholder')}"
            autocomplete="off"
          />
          <div class="search-results" id="search-results"></div>
        </div>
      </div>
    </section>

    <div class="container">
      <!-- Scam Alert Banner -->
      <div class="scam-alert-banner reveal" id="scam-alert-banner">
        <span class="scam-alert-icon">🚨</span>
        <div class="scam-alert-content">
          <div class="scam-alert-title">${t('scam_alert_title')}</div>
          <div class="scam-alert-text">${t('scam_alert_text')}</div>
        </div>
        <span class="scam-alert-arrow">${t('scam_alert_cta')}</span>
      </div>

      <!-- Stats -->
      <div class="stats-bar reveal">
        <div class="stat-item">
          <div class="stat-number">${articles.length}+</div>
          <div class="stat-label">${t('stat_articles')}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">5</div>
          <div class="stat-label">${t('stat_categories')}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">✓</div>
          <div class="stat-label">${t('stat_free')}</div>
        </div>
      </div>

      <!-- Category Cards -->
      <div class="category-grid">
        ${categories.map((cat, i) => `
          <div class="category-card ${cat.colorClass} ripple reveal reveal-delay-${i + 1}" data-nav="category" data-cat="${cat.id}">
            <span class="category-icon">${cat.icon}</span>
            <div class="category-title">${t(`cat_${cat.id}_title`)}</div>
            <div class="category-desc">${t(`cat_${cat.id}_desc`)}</div>
            <span class="category-count">${articlesByCategory[cat.id] || 0} ${t('articles_count')}</span>
          </div>
        `).join('')}
      </div>

      <!-- Popular Articles -->
      ${popularArticles.length > 0 ? `
        <section class="articles-section">
          <div class="section-header reveal">
            <h2 class="section-title">${t('popular_articles')}</h2>
          </div>
          <div class="articles-grid">
            ${popularArticles.map((a, i) => renderArticleCard(a, i)).join('')}
          </div>
        </section>
      ` : ''}
    </div>
  `;
}

// ---- Category Page ----
function renderCategoryPage() {
  const cat = categories.find((c) => c.id === currentCategory);
  if (!cat) return renderHomePage();

  const catArticles = articles.filter((a) => a.category === currentCategory);

  return `
    <section class="page-header">
      <div class="container">
        <button class="back-btn" data-nav="home">${t('back')}</button>
        <span class="page-header-icon reveal">${cat.icon}</span>
        <h1 class="reveal reveal-delay-1">${t(`page_${currentCategory}_title`)}</h1>
        <p class="reveal reveal-delay-2">${t(`page_${currentCategory}_desc`)}</p>
      </div>
    </section>

    <div class="container">
      <div class="articles-grid" style="margin-bottom: var(--space-4xl);">
        ${catArticles.length > 0
          ? catArticles.map((a, i) => renderArticleCard(a, i)).join('')
          : `<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1; padding: var(--space-2xl);">
               ${getLang() === 'th' ? 'กำลังเพิ่มบทความ... กรุณากลับมาใหม่ภายหลังครับ/ค่ะ' : 'Articles coming soon...'}
             </p>`
        }
      </div>
    </div>
  `;
}

// ---- Article Card ----
function renderArticleCard(article, index) {
  const diffLabels = { easy: t('difficulty_easy'), medium: t('difficulty_medium'), hard: t('difficulty_hard') };

  return `
    <div class="article-card ripple reveal reveal-delay-${(index % 3) + 1}" data-nav="article" data-article="${article.id}">
      <div class="article-card-icon">${article.icon}</div>
      <div class="article-card-content">
        <div class="article-card-title">${getArticleText(article.title)}</div>
        <div class="article-card-desc">${getArticleText(article.description)}</div>
        <div class="article-card-meta">
          <span class="difficulty-badge ${article.difficulty}">${diffLabels[article.difficulty] || article.difficulty}</span>
          <span style="font-size: var(--text-xs); color: var(--text-muted);">${getCategoryLabel(article.category)}</span>
        </div>
      </div>
    </div>
  `;
}

// ---- Article Detail Page ----
function renderArticlePage() {
  const article = articles.find((a) => a.id === currentArticle);
  if (!article) return renderHomePage();

  const lang = getLang();
  const diffLabels = { easy: t('difficulty_easy'), medium: t('difficulty_medium'), hard: t('difficulty_hard') };

  // Related articles
  const related = (article.relatedArticles || [])
    .map((id) => articles.find((a) => a.id === id))
    .filter(Boolean);

  return `
    <div class="article-detail">
      <div class="container" style="max-width: 800px;">
        <button class="back-btn" data-nav="category" data-cat="${article.category}">${t('back')}</button>

        <!-- Breadcrumb -->
        <div class="article-breadcrumb reveal">
          <a data-nav="home">${t('nav_home')}</a>
          <span>›</span>
          <a data-nav="category" data-cat="${article.category}">${getCategoryLabel(article.category)}</a>
          <span>›</span>
          <span style="color: var(--text-secondary);">${getArticleText(article.title)}</span>
        </div>

        <!-- Header -->
        <div class="article-header reveal reveal-delay-1">
          <h1>${article.icon} ${getArticleText(article.title)}</h1>
          <div class="article-header-meta">
            <span class="difficulty-badge ${article.difficulty}">${diffLabels[article.difficulty]}</span>
            <span style="font-size: var(--text-sm); color: var(--text-muted);">${article.steps ? article.steps.length : 0} ${lang === 'th' ? 'ขั้นตอน' : 'steps'}</span>
          </div>
        </div>

        <!-- Warning -->
        ${article.warning ? `
          <div class="article-warning reveal reveal-delay-2">
            <span class="article-warning-icon">⚠️</span>
            <div class="article-warning-text">${getArticleText(article.warning)}</div>
          </div>
        ` : ''}

        <!-- Steps -->
        <div class="steps-container">
          ${(article.steps || []).map((step, i) => `
            <div class="step-card reveal" style="transition-delay: ${0.1 * (i + 1)}s;">
              <div class="step-number">${i + 1}</div>
              <h3 class="step-title">${getArticleText(step.title)}</h3>
              <div class="step-content">${getArticleText(step.content)}</div>
              ${step.tip ? `<div class="step-tip">${getArticleText(step.tip)}</div>` : ''}
            </div>
          `).join('')}
        </div>

        <!-- Emergency Contacts -->
        ${article.emergencyContacts ? `
          <div class="emergency-contacts reveal">
            <div class="emergency-title">📞 ${t('emergency_title')}</div>
            <div class="emergency-list">
              ${article.emergencyContacts.map((c) => `
                <div class="emergency-item">
                  <div class="emergency-number">${c.number}</div>
                  <div class="emergency-info">
                    <div class="emergency-name">${c.name}</div>
                    <div class="emergency-desc">${getArticleText(c.description)}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Still need help -->
        <div class="step-card reveal" style="margin-top: var(--space-2xl); text-align: center;">
          <h3 class="step-title">${t('still_need_help')}</h3>
          <p class="step-content" style="margin-bottom: var(--space-lg);">${t('still_need_help_text')}</p>
          <a href="${LINE_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: var(--text-base);">
            💬 ${t('contact_line')}
          </a>
        </div>

        <!-- Related Articles -->
        ${related.length > 0 ? `
          <div class="related-articles reveal">
            <h3>${t('related_articles')}</h3>
            <div class="articles-grid" style="grid-template-columns: 1fr;">
              ${related.map((a, i) => renderArticleCard(a, i)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ---- In-App Chat Page ----
function renderChatPage() {
  const lang = getLang();
  const isth = lang === 'th';

  const suggestions = isth ? [
    { icon: '📱', text: 'iPhone ของฉันช้ามาก จะแก้ยังไง?' },
    { icon: '🔑', text: 'ลืมรหัสผ่าน Apple ID ทำยังไงดี?' },
    { icon: '🤖', text: 'Android ค้าง รีสตาร์ทไม่ได้' },
    { icon: '💻', text: 'Mac เครื่องร้อนมาก ใช้พัดลมดังมาก' },
    { icon: '🖥️', text: 'Windows ขึ้นจอฟ้า BSOD แก้ยังไง?' },
    { icon: '🚨', text: 'Facebook ถูกแฮก เข้าไม่ได้แล้ว!' },
    { icon: '📩', text: 'ได้รับ SMS แปลกๆ มีลิงก์น่าสงสัย' },
    { icon: '💸', text: 'โดนหลอกโอนเงิน ต้องทำอะไรก่อน?' },
  ] : [
    { icon: '📱', text: 'My iPhone is very slow, how to fix?' },
    { icon: '🔑', text: 'Forgot Apple ID password, what to do?' },
    { icon: '🤖', text: 'Android is frozen, cannot restart' },
    { icon: '💻', text: 'Mac is overheating and fan is very loud' },
    { icon: '🖥️', text: 'Windows blue screen BSOD, how to fix?' },
    { icon: '🚨', text: 'Facebook got hacked, cannot log in!' },
    { icon: '📩', text: 'Got suspicious SMS with strange link' },
    { icon: '💸', text: 'I got scammed into sending money, what first?' },
  ];

  return `
    <div class="chat-page">
      <!-- Page Header -->
      <div class="chat-page-header">
        <div class="container">
          <div class="chat-page-hero reveal">
            <div class="chat-page-avatar">🤖</div>
            <div class="chat-page-info">
              <h1 class="chat-page-name">น้องไอที</h1>
              <p class="chat-page-desc">
                ${isth
                  ? 'ผู้ช่วย AI ด้านเทคโนโลยี · ตอบทันที ตลอด 24 ชั่วโมง · ขับเคลื่อนด้วย Llama 3.3 70B'
                  : 'AI Tech Support Assistant · Instant answers 24/7 · Powered by Llama 3.3 70B'}
              </p>
              <div class="chat-page-status">
                <span class="chat-status-dot"></span>
                ${isth ? 'ออนไลน์และพร้อมช่วยเหลือ' : 'Online and ready to help'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Container -->
      <div class="container" style="max-width: 860px;">
        <div class="chat-page-container reveal reveal-delay-1">

          <!-- Messages -->
          <div class="chat-page-messages" id="chat-page-messages">
            <!-- Welcome message -->
            <div class="chat-page-msg assistant">
              <div class="chat-page-bubble">
                <span class="chat-page-bubble-icon">🤖</span>
                <div class="chat-page-bubble-text">
                  ${isth
                    ? 'สวัสดีครับ! ผมน้องไอที 🤖<br><br>ผมช่วยแก้ปัญหาด้านเทคโนโลยีได้ทุกอย่าง ไม่ว่าจะเป็น iPhone, Android, Mac, Windows หรือปัญหามิจฉาชีพออนไลน์ครับ<br><br>ถามได้เลยครับ ไม่มีคำถามไหนที่โง่เกินไป! 😊'
                    : 'Hello! I\'m น้องไอที 🤖<br><br>I can help you solve any tech problem — iPhone, Android, Mac, Windows, or online scam issues.<br><br>Ask me anything! No question is too simple. 😊'}
                </div>
              </div>
            </div>

            <!-- Suggestion chips -->
            <div class="chat-page-suggestions" id="chat-page-suggestions">
              <div class="suggestions-label">${isth ? '💡 คำถามยอดนิยม:' : '💡 Popular questions:'}</div>
              <div class="suggestions-grid">
                ${suggestions.map((s) => `
                  <button class="suggestion-chip" data-text="${s.text}">
                    <span>${s.icon}</span>
                    <span>${s.text}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="chat-page-input-area">
            <div class="chat-page-input-row">
              <textarea
                id="chat-page-input"
                class="chat-page-input"
                placeholder="${isth ? 'พิมพ์คำถามของคุณที่นี่... (Enter เพื่อส่ง, Shift+Enter เพื่อขึ้นบรรทัด)' : 'Type your question here... (Enter to send, Shift+Enter for new line)'}"
                rows="1"
                maxlength="2000"
              ></textarea>
              <button class="chat-page-send-btn" id="chat-page-send-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <div class="chat-page-footer">
              <span>🔒 ${isth ? 'ข้อความไม่ถูกบันทึก' : 'Messages not stored'}</span>
              <span>⚡ Llama 3.3 70B · NVIDIA</span>
              <span>🆘 ${isth ? 'ฉุกเฉิน: โทร 1441' : 'Emergency: call 1441'}</span>
            </div>
          </div>
        </div>

        <!-- Disclaimer -->
        <div class="chat-page-disclaimer reveal">
          ⚠️ ${isth
            ? 'น้องไอทีเป็น AI ที่ให้คำแนะนำเบื้องต้น หากปัญหารุนแรงควรติดต่อช่างผู้เชี่ยวชาญ สำหรับเรื่องมิจฉาชีพโทร <strong>1441</strong> ทันที'
            : 'น้องไอที is an AI assistant providing general guidance. For serious issues please contact a professional. For scams call <strong>1441</strong> immediately.'}
        </div>
      </div>
    </div>
  `;
}

// ---- Privacy Page ----
function renderPrivacyPage() {
  return `
    <div class="privacy-page">
      <div class="container" style="max-width: 800px;">
        <button class="back-btn" data-nav="home">${t('back')}</button>
        <h1 class="reveal">${t('privacy_title')}</h1>
        <p class="reveal reveal-delay-1">${t('privacy_intro')}</p>

        <h2 class="reveal">${t('privacy_collect_title')}</h2>
        <p class="reveal">${t('privacy_collect_text')}</p>
        <ul class="reveal">
          ${(t('privacy_collect_items') || []).map((item) => `<li>${item}</li>`).join('')}
        </ul>

        <h2 class="reveal">${t('privacy_use_title')}</h2>
        <p class="reveal">${t('privacy_use_text')}</p>
        <ul class="reveal">
          ${(t('privacy_use_items') || []).map((item) => `<li>${item}</li>`).join('')}
        </ul>

        <h2 class="reveal">${t('privacy_rights_title')}</h2>
        <p class="reveal">${t('privacy_rights_text')}</p>
        <ul class="reveal">
          ${(t('privacy_rights_items') || []).map((item) => `<li>${item}</li>`).join('')}
        </ul>

        <h2 class="reveal">${t('privacy_contact_title')}</h2>
        <p class="reveal">${t('privacy_contact_text')}</p>
      </div>
    </div>
  `;
}

// ---- Footer ----
function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-social">
          <a href="${LINE_URL}" target="_blank" rel="noopener noreferrer" class="footer-social-btn line">
            💬 ${t('footer_line')}
          </a>
          <a href="${FB_URL}" target="_blank" rel="noopener noreferrer" class="footer-social-btn facebook">
            📘 ${t('footer_facebook')}
          </a>
        </div>
        <div class="footer-links">
          <button class="footer-link" data-nav="privacy">${t('footer_privacy')}</button>
          <button class="footer-link" data-nav="home">${t('footer_about')}</button>
        </div>
        <p class="footer-copy">${t('footer_copy')}</p>
      </div>
    </footer>
  `;
}

// ---- Cookie Banner ----
function renderCookieBanner() {
  return `
    <div class="cookie-banner" id="cookie-banner">
      <div class="cookie-inner">
        <p class="cookie-text">🍪 ${t('cookie_text')}</p>
        <div class="cookie-buttons">
          <button class="btn btn-primary" id="cookie-accept">${t('cookie_accept')}</button>
          <button class="btn btn-secondary" id="cookie-decline">${t('cookie_decline')}</button>
        </div>
      </div>
    </div>
  `;
}

// ---- Event Binding ----
function bindEvents() {
  // Navigation links
  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const nav = el.dataset.nav;
      const cat = el.dataset.cat || null;
      const articleId = el.dataset.article || null;

      if (nav === 'home') navigate('home');
      else if (nav === 'category') navigate('category', cat);
      else if (nav === 'article') navigate('article', cat || currentCategory, articleId);
      else if (nav === 'privacy') navigate('privacy');
      else if (nav === 'chat') navigate('chat');

      // Close mobile menu
      const links = document.getElementById('nav-links');
      const toggle = document.getElementById('mobile-menu-toggle');
      if (links) links.classList.remove('open');
      if (toggle) toggle.classList.remove('open');
    });
  });

  // In-page chat
  bindChatPageEvents();

  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.length >= 2) handleSearch(searchInput.value);
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        const results = document.getElementById('search-results');
        if (results) results.classList.remove('active');
      }
    });
  }

  // Scam alert banner
  const scamBanner = document.getElementById('scam-alert-banner');
  if (scamBanner) {
    scamBanner.addEventListener('click', () => navigate('category', 'scams'));
  }

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Lang toggle
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.addEventListener('click', toggleLang);

  // Mobile menu
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // Cookie buttons
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieDecline = document.getElementById('cookie-decline');
  if (cookieAccept) cookieAccept.addEventListener('click', acceptCookies);
  if (cookieDecline) cookieDecline.addEventListener('click', declineCookies);

  // Ripple effect
  document.querySelectorAll('.ripple').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--ripple-x', `${x}%`);
      el.style.setProperty('--ripple-y', `${y}%`);
    });
  });

  // Setup cookie consent again if needed
  setupCookieConsent();

  // Hide floating FAB on chat page (redundant there)
  const fab = document.getElementById('chat-fab');
  const panel = document.getElementById('chat-panel');
  if (currentPage === 'chat') {
    if (fab) fab.style.display = 'none';
    if (panel) panel.style.display = 'none';
  } else {
    if (fab) fab.style.display = 'flex';
    if (panel) panel.style.display = 'flex';
  }
}

// ---- In-App Chat Events & Logic ----
let chatPageMessages = [];
let chatPageTyping = false;

function bindChatPageEvents() {
  const input = document.getElementById('chat-page-input');
  const sendBtn = document.getElementById('chat-page-send-btn');
  if (!input || !sendBtn) return;

  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 160) + 'px';
  });

  // Send on Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatPageMessage();
    }
  });

  sendBtn.addEventListener('click', sendChatPageMessage);

  // Suggestion chips
  document.querySelectorAll('.suggestion-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const text = chip.dataset.text;
      if (text && input) {
        input.value = text;
        input.dispatchEvent(new Event('input'));
        sendChatPageMessage();
        // hide suggestions
        const sugg = document.getElementById('chat-page-suggestions');
        if (sugg) sugg.style.display = 'none';
      }
    });
  });
}

// ── Build article context for Llama's RAG prompt ─────────────
function buildArticleContext() {
  const all = [...articles, ...solvedArticles];
  if (all.length === 0) return 'ยังไม่มีบทความในฐานข้อมูล';
  return all.map((a) => {
    const title = getArticleText(a.title);
    const tags = (a.tags || []).join(', ');
    return `- [${a.id}] ${title} (${a.category}) | ${tags}`;
  }).join('\n');
}

async function sendChatPageMessage() {
  const input = document.getElementById('chat-page-input');
  const text = input?.value.trim();
  if (!text || chatPageTyping) return;

  input.value = '';
  input.style.height = 'auto';

  const sugg = document.getElementById('chat-page-suggestions');
  if (sugg) sugg.style.display = 'none';

  chatPageMessages.push({ role: 'user', content: text });
  appendChatPageMessage('user', text);

  chatPageTyping = true;
  const sendBtn = document.getElementById('chat-page-send-btn');
  if (sendBtn) { sendBtn.disabled = true; sendBtn.style.opacity = '0.5'; }

  const lang = getLang();
  const isth = lang === 'th';

  // ━━ PHASE 1: Llama searches articles ━━━━━━━━━━━━━━━━━━━━━━
  showChatPageTyping('llama-typing',
    isth ? '🤖 น้องไอที กำลังค้นหาในฐานความรู้...' : '🤖 น้องไอที searching knowledge base...');

  let llamaReply = '';
  let needsSolve = false;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: chatPageMessages,
        articleContext: buildArticleContext(),
      }),
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || 'API error');
    llamaReply = data.reply;
    needsSolve = data.needsSolve === true;
  } catch (err) {
    hideChatPageTyping('llama-typing');
    appendChatPageMessage('assistant',
      isth ? 'ขออภัยครับ น้องไอทีตอบไม่ได้ในขณะนี้ กรุณาลองใหม่ครับ' : 'Sorry, could not respond. Please try again.',
      true
    );
    chatPageTyping = false;
    if (sendBtn) { sendBtn.disabled = false; sendBtn.style.opacity = '1'; }
    return;
  }

  hideChatPageTyping('llama-typing');
  chatPageMessages.push({ role: 'assistant', content: llamaReply });
  appendChatPageMessage('assistant', llamaReply);

  // Article found — done! ✅
  if (!needsSolve) {
    chatPageTyping = false;
    if (sendBtn) { sendBtn.disabled = false; sendBtn.style.opacity = '1'; }
    document.getElementById('chat-page-input')?.focus();
    return;
  }

  // ━━ PHASE 2: Nemotron solves the unknown problem ━━━━━━━━━━━
  showChatPageTyping('nemotron-typing',
    isth ? '🧠 Nemotron Ultra กำลังวิเคราะห์เชิงลึก...' : '🧠 Nemotron Ultra analyzing deeply...');

  try {
    const res = await fetch('/api/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problem: text,
        context: chatPageMessages.slice(-6),
      }),
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || 'Solve error');

    hideChatPageTyping('nemotron-typing');

    // Show Nemotron's deep analysis card
    if (data.solution) {
      appendNemotronCard(data.solution, isth);
      chatPageMessages.push({ role: 'assistant', content: data.solution });
    }

    // ━━ PHASE 3: Save new article to knowledge base ━━━━━━━━━━
    if (data.article) {
      // Save to server (writes to solved-articles.js)
      fetch('/api/save-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: data.article }),
      }).then(() => {
        // Add to in-memory solved articles list immediately
        if (!solvedArticles.find((a) => a.id === data.article.id)) {
          solvedArticles.push(data.article);
          console.log(`💾 New article added: "${data.article.title?.th || data.article.id}"`);
          // Show subtle notification
          showArticleSavedBadge(data.article, isth);
        }
      }).catch((e) => console.warn('Save article failed:', e));
    }

  } catch (err) {
    hideChatPageTyping('nemotron-typing');
    console.warn('Nemotron failed:', err);
    // Don't show error — Llama already gave the escalation message
  }

  chatPageTyping = false;
  if (sendBtn) { sendBtn.disabled = false; sendBtn.style.opacity = '1'; }
  document.getElementById('chat-page-input')?.focus();
}

// Show a subtle "New article saved" badge
function showArticleSavedBadge(article, isth) {
  const container = document.getElementById('chat-page-messages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'article-saved-badge';
  div.innerHTML = `
    💾 ${isth
      ? `บทความใหม่ถูกบันทึกแล้ว: <strong>"${article.title?.th || ''}"</strong>`
      : `New article saved: <strong>"${article.title?.en || ''}"</strong>`}
  `;
  div.style.opacity = '0';
  container.appendChild(div);
  requestAnimationFrame(() => {
    div.style.transition = 'opacity 0.5s ease';
    div.style.opacity = '1';
  });
  setTimeout(() => {
    div.style.opacity = '0';
    setTimeout(() => div.remove(), 500);
  }, 4000);
  setTimeout(() => container.scrollTop = container.scrollHeight, 60);
}


function appendChatPageMessage(role, text, isError = false) {
  const container = document.getElementById('chat-page-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = `chat-page-msg ${role}`;

  const formatted = formatChatText(text);

  div.innerHTML = role === 'assistant' ? `
    <div class="chat-page-bubble ${isError ? 'error' : ''}">
      <span class="chat-page-bubble-icon">🤖</span>
      <div class="chat-page-bubble-text">${formatted}</div>
    </div>
  ` : `
    <div class="chat-page-bubble user">
      <div class="chat-page-bubble-text">${escapeHtmlInline(text)}</div>
    </div>
  `;

  div.style.opacity = '0';
  div.style.transform = 'translateY(12px)';
  container.appendChild(div);
  requestAnimationFrame(() => {
    div.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    div.style.opacity = '1';
    div.style.transform = 'translateY(0)';
  });

  setTimeout(() => container.scrollTop = container.scrollHeight, 60);
}

function showChatPageTyping(id = 'chat-page-typing', label = '') {
  const container = document.getElementById('chat-page-messages');
  if (!container) return;
  // Remove existing if any
  document.getElementById(id)?.remove();
  const div = document.createElement('div');
  div.className = 'chat-page-msg assistant';
  div.id = id;
  div.innerHTML = `
    <div class="chat-page-bubble">
      <span class="chat-page-bubble-icon">🤖</span>
      <div class="chat-typing-wrap">
        <div class="chat-typing"><span></span><span></span><span></span></div>
        ${label ? `<div class="chat-typing-label">${label}</div>` : ''}
      </div>
    </div>`;
  container.appendChild(div);
  setTimeout(() => container.scrollTop = container.scrollHeight, 60);
}

function hideChatPageTyping(id = 'chat-page-typing') {
  document.getElementById(id)?.remove();
}

function formatChatText(text) {
  return escapeHtmlInline(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^(\d+)\.\s(.+)$/gm, '<div class="chat-list-item"><span class="chat-list-num">$1.</span><span>$2</span></div>')
    .replace(/^[-•]\s(.+)$/gm, '<div class="chat-list-item"><span class="chat-list-num">•</span><span>$1</span></div>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

function escapeHtmlInline(text) {
  return String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Nemotron Deep Analysis Card ──────────────────────────
function appendNemotronCard(solution, isth) {
  const container = document.getElementById('chat-page-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'nemotron-card';

  div.innerHTML = `
    <div class="nemotron-card-header">
      <div class="nemotron-card-title">
        <span class="nemotron-icon">🧠</span>
        <div>
          <div class="nemotron-name">Nemotron Ultra 550B</div>
          <div class="nemotron-subtitle">${isth ? 'การวิเคราะห์เชิงลึก · Chain-of-Thought Reasoning' : 'Deep Analysis · Chain-of-Thought Reasoning'}</div>
        </div>
      </div>
      <span class="nemotron-badge">${isth ? 'เชี่ยวชาญ' : 'Expert'}</span>
    </div>
    <div class="nemotron-card-body">${formatChatText(solution)}</div>
    <div class="nemotron-card-footer">
      ⚡ ${isth ? 'ขับเคลื่อนโดย NVIDIA Nemotron Ultra 550B • ใช้ควบคู่กับคำแนะนำจากน้องไอทีด้านบน' : 'Powered by NVIDIA Nemotron Ultra 550B • Use alongside น้องไอที\'s answer above'}
    </div>
  `;

  // Animate in
  div.style.opacity = '0';
  div.style.transform = 'translateY(16px)';
  container.appendChild(div);
  requestAnimationFrame(() => {
    div.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    div.style.opacity = '1';
    div.style.transform = 'translateY(0)';
  });

  setTimeout(() => container.scrollTop = container.scrollHeight, 80);
}

// ---- Scroll Animations ----
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
