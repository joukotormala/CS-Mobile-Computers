// ========================================
// CS Customer Support — Internationalization
// ========================================

const translations = {
  th: {
    // Navigation
    nav_home: 'หน้าหลัก',
    nav_iphone: 'iPhone',
    nav_android: 'Android',
    nav_mac: 'Mac',
    nav_windows: 'Windows',
    nav_scams: '🚨 ระวังมิจฉาชีพ',

    // Hero
    hero_title_1: 'ศูนย์ช่วยเหลือ',
    hero_title_2: 'เทคโนโลยี',
    hero_subtitle: 'แก้ปัญหา iPhone, Android, Mac และ Windows ง่ายๆ ด้วยตัวเอง พร้อมคำแนะนำป้องกันมิจฉาชีพออนไลน์',
    search_placeholder: '🔍 ค้นหาปัญหาที่ต้องการแก้ไข...',

    // Scam Alert
    scam_alert_title: '⚠️ แจ้งเตือนมิจฉาชีพ',
    scam_alert_text: 'ระวัง! มิจฉาชีพแอบอ้างเป็นเจ้าหน้าที่ตำรวจ หลอกให้โอนเงิน อย่าเชื่อ!',
    scam_alert_cta: 'ดูวิธีป้องกัน →',

    // Categories
    cat_iphone_title: 'iPhone',
    cat_iphone_desc: 'Apple ID, Wi-Fi, พื้นที่เต็ม, iOS',
    cat_android_title: 'Android',
    cat_android_desc: 'Google, แคช, ความเร็ว, แอป',
    cat_mac_title: 'Mac',
    cat_mac_desc: 'macOS, เครื่องช้า, เครื่องร้อน',
    cat_windows_title: 'Windows',
    cat_windows_desc: 'จอฟ้า, ไวรัส, อัปเดต',
    cat_scams_title: 'ระวังมิจฉาชีพ',
    cat_scams_desc: 'แฮก Facebook, LINE, SMS หลอก',

    // Section titles
    popular_articles: '📖 บทความยอดนิยม',
    all_articles: 'ดูทั้งหมด',
    related_articles: '📚 บทความที่เกี่ยวข้อง',
    back: '← กลับ',
    articles_count: 'บทความ',

    // Difficulty
    difficulty_easy: 'ง่าย',
    difficulty_medium: 'ปานกลาง',
    difficulty_hard: 'ยาก',

    // Article detail
    still_need_help: '❓ ยังแก้ไม่ได้?',
    still_need_help_text: 'หากยังมีปัญหา สามารถติดต่อเราผ่าน LINE ได้เลยครับ/ค่ะ',
    contact_line: 'แชทผ่าน LINE',

    // Emergency
    emergency_title: '🚨 เบอร์ฉุกเฉิน — แจ้งความออนไลน์',

    // Footer
    footer_line: 'แชท LINE',
    footer_facebook: 'Facebook',
    footer_privacy: 'นโยบายความเป็นส่วนตัว',
    footer_about: 'เกี่ยวกับเรา',
    footer_contact: 'ติดต่อเรา',
    footer_copy: '© 2026 CS Customer Support — ศูนย์ช่วยเหลือเทคโนโลยี สำหรับคนไทย',

    // Cookie consent
    cookie_text: 'เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)',
    cookie_accept: 'ยอมรับ',
    cookie_decline: 'ปฏิเสธ',

    // Stats
    stat_articles: 'บทความช่วยเหลือ',
    stat_categories: 'หมวดหมู่',
    stat_free: 'ฟรี 100%',

    // Page headers
    page_iphone_title: 'ศูนย์ช่วยเหลือ iPhone',
    page_iphone_desc: 'แก้ปัญหา iPhone ทุกรุ่น ตั้งแต่ Apple ID จนถึงการตั้งค่าเครื่อง',
    page_android_title: 'ศูนย์ช่วยเหลือ Android',
    page_android_desc: 'แก้ปัญหา Samsung, OPPO, Xiaomi และ Android ทุกยี่ห้อ',
    page_mac_title: 'ศูนย์ช่วยเหลือ Mac',
    page_mac_desc: 'แก้ปัญหา MacBook, iMac และ macOS ทุกเวอร์ชัน',
    page_windows_title: 'ศูนย์ช่วยเหลือ Windows',
    page_windows_desc: 'แก้ปัญหา Windows 10, 11 จอฟ้า ไวรัส และอื่นๆ',
    page_scams_title: '🚨 ระวังมิจฉาชีพออนไลน์',
    page_scams_desc: 'วิธีป้องกันและรับมือเมื่อถูกหลอกลวงทางออนไลน์',

    // Search
    search_no_results: 'ไม่พบผลลัพธ์',
    search_try_again: 'ลองค้นหาด้วยคำอื่น',

    // Privacy
    privacy_title: 'นโยบายความเป็นส่วนตัว',
    privacy_intro: 'เว็บไซต์ CS Customer Support ("เรา") ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของท่าน ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)',
    privacy_collect_title: 'ข้อมูลที่เราเก็บรวบรวม',
    privacy_collect_text: 'เราเก็บรวบรวมข้อมูลเท่าที่จำเป็นเพื่อปรับปรุงการให้บริการ:',
    privacy_collect_items: [
      'ข้อมูลการใช้งานเว็บไซต์ (หน้าที่เข้าชม, ระยะเวลาการเข้าชม)',
      'ข้อมูลอุปกรณ์ (ประเภทเบราว์เซอร์, ระบบปฏิบัติการ)',
      'คุกกี้ที่จำเป็นต่อการทำงานของเว็บไซต์',
    ],
    privacy_use_title: 'วัตถุประสงค์ในการใช้ข้อมูล',
    privacy_use_text: 'เราใช้ข้อมูลเพื่อ:',
    privacy_use_items: [
      'ปรับปรุงเนื้อหาและประสบการณ์การใช้งานเว็บไซต์',
      'วิเคราะห์สถิติการเข้าชม',
      'ให้บริการช่วยเหลือด้านเทคนิค',
    ],
    privacy_rights_title: 'สิทธิของท่าน',
    privacy_rights_text: 'ภายใต้ PDPA ท่านมีสิทธิ:',
    privacy_rights_items: [
      'ขอเข้าถึงข้อมูลส่วนบุคคลของท่าน',
      'ขอแก้ไขข้อมูลที่ไม่ถูกต้อง',
      'ขอลบข้อมูลส่วนบุคคล',
      'ถอนความยินยอมในการใช้คุกกี้',
    ],
    privacy_contact_title: 'ติดต่อเรา',
    privacy_contact_text: 'หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อเราผ่าน LINE Official Account',
  },

  en: {
    // Navigation
    nav_home: 'Home',
    nav_iphone: 'iPhone',
    nav_android: 'Android',
    nav_mac: 'Mac',
    nav_windows: 'Windows',
    nav_scams: '🚨 Scam Alert',

    // Hero
    hero_title_1: 'Tech Help',
    hero_title_2: 'Center',
    hero_subtitle: 'Fix iPhone, Android, Mac & Windows issues yourself with easy guides. Stay safe from online scams.',
    search_placeholder: '🔍 Search for a solution...',

    // Scam Alert
    scam_alert_title: '⚠️ Scam Warning',
    scam_alert_text: 'Watch out! Scammers impersonating police officers are tricking people into transferring money!',
    scam_alert_cta: 'Learn how to protect yourself →',

    // Categories
    cat_iphone_title: 'iPhone',
    cat_iphone_desc: 'Apple ID, Wi-Fi, Storage, iOS',
    cat_android_title: 'Android',
    cat_android_desc: 'Google, Cache, Speed, Apps',
    cat_mac_title: 'Mac',
    cat_mac_desc: 'macOS, Slow Mac, Overheating',
    cat_windows_title: 'Windows',
    cat_windows_desc: 'BSOD, Virus, Updates',
    cat_scams_title: 'Scam Alert',
    cat_scams_desc: 'Facebook hacks, LINE, SMS scams',

    // Section titles
    popular_articles: '📖 Popular Articles',
    all_articles: 'View All',
    related_articles: '📚 Related Articles',
    back: '← Back',
    articles_count: 'articles',

    // Difficulty
    difficulty_easy: 'Easy',
    difficulty_medium: 'Medium',
    difficulty_hard: 'Hard',

    // Article detail
    still_need_help: '❓ Still need help?',
    still_need_help_text: 'If you\'re still having issues, contact us on LINE and we\'ll help you out!',
    contact_line: 'Chat on LINE',

    // Emergency
    emergency_title: '🚨 Emergency Contacts — Online Police Report',

    // Footer
    footer_line: 'Chat on LINE',
    footer_facebook: 'Facebook',
    footer_privacy: 'Privacy Policy',
    footer_about: 'About Us',
    footer_contact: 'Contact Us',
    footer_copy: '© 2026 CS Customer Support — Tech Help Center for Thai Users',

    // Cookie consent
    cookie_text: 'This website uses cookies to improve your experience, in compliance with Thailand\'s PDPA (Personal Data Protection Act).',
    cookie_accept: 'Accept',
    cookie_decline: 'Decline',

    // Stats
    stat_articles: 'Help Articles',
    stat_categories: 'Categories',
    stat_free: '100% Free',

    // Page headers
    page_iphone_title: 'iPhone Help Center',
    page_iphone_desc: 'Fix any iPhone issue, from Apple ID to device settings',
    page_android_title: 'Android Help Center',
    page_android_desc: 'Fix Samsung, OPPO, Xiaomi and all Android brands',
    page_mac_title: 'Mac Help Center',
    page_mac_desc: 'Fix MacBook, iMac and all macOS versions',
    page_windows_title: 'Windows Help Center',
    page_windows_desc: 'Fix Windows 10, 11 blue screen, virus and more',
    page_scams_title: '🚨 Online Scam Alert Center',
    page_scams_desc: 'How to protect yourself and what to do if you\'ve been scammed',

    // Search
    search_no_results: 'No results found',
    search_try_again: 'Try searching with different keywords',

    // Privacy
    privacy_title: 'Privacy Policy',
    privacy_intro: 'CS Customer Support ("we") takes the protection of your personal data seriously, in accordance with Thailand\'s Personal Data Protection Act (PDPA).',
    privacy_collect_title: 'Data We Collect',
    privacy_collect_text: 'We collect only the data necessary to improve our services:',
    privacy_collect_items: [
      'Website usage data (pages visited, time spent)',
      'Device information (browser type, operating system)',
      'Essential cookies for website functionality',
    ],
    privacy_use_title: 'Purpose of Data Use',
    privacy_use_text: 'We use data to:',
    privacy_use_items: [
      'Improve website content and user experience',
      'Analyze visitor statistics',
      'Provide technical support services',
    ],
    privacy_rights_title: 'Your Rights',
    privacy_rights_text: 'Under PDPA, you have the right to:',
    privacy_rights_items: [
      'Access your personal data',
      'Request correction of inaccurate data',
      'Request deletion of personal data',
      'Withdraw cookie consent',
    ],
    privacy_contact_title: 'Contact Us',
    privacy_contact_text: 'If you have questions about our privacy policy, please contact us through our LINE Official Account.',
  },
};

let currentLang = localStorage.getItem('cs-lang') || 'th';

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('cs-lang', lang);
}

export function t(key) {
  return translations[currentLang]?.[key] || translations['th']?.[key] || key;
}

export function getArticleText(field, lang) {
  if (!field) return '';
  return field[lang || currentLang] || field['th'] || '';
}
