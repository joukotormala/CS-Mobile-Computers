// ========================================
// CS Customer Support — Main Application
// ========================================

import { t, getLang, setLang, getArticleText } from './i18n.js';
import { initChat } from './chat.js';

// Will be loaded once articles.js is ready
let articles = [];

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
    const module = await import('../data/articles.js');
    articles = module.articles || [];
  } catch (e) {
    console.warn('Articles not loaded yet:', e);
    articles = [];
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

      // Close mobile menu
      const links = document.getElementById('nav-links');
      const toggle = document.getElementById('mobile-menu-toggle');
      if (links) links.classList.remove('open');
      if (toggle) toggle.classList.remove('open');
    });
  });

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
