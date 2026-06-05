// ========================================
// CS Customer Support — Placeholder Articles
// Will be replaced by full content
// ========================================

export const articles = [
  // ----- iPhone -----
  {
    id: 'forgot-apple-id',
    category: 'iphone',
    title: { th: 'ลืมรหัสผ่าน Apple ID — ทำอย่างไร?', en: 'Forgot Apple ID Password — What to Do?' },
    description: { th: 'วิธีรีเซ็ตรหัสผ่าน Apple ID เมื่อลืม ทำได้ง่ายๆ ด้วยตัวเอง', en: 'How to reset your Apple ID password when you forget it' },
    difficulty: 'easy',
    icon: '🔑',
    tags: ['apple-id', 'password', 'รหัสผ่าน', 'iphone', 'ลืม'],
    steps: [
      {
        title: { th: 'เปิดหน้าจัดการ Apple ID', en: 'Open Apple ID Management' },
        content: { th: 'ไปที่ Settings (การตั้งค่า) แล้วกดที่ชื่อของคุณด้านบนสุดของหน้าจอ หรือเปิดเว็บ iforgot.apple.com บนเบราว์เซอร์ครับ', en: 'Go to Settings and tap your name at the top of the screen, or open iforgot.apple.com in a browser.' },
        tip: { th: 'หากใช้ iPhone ของคนอื่น สามารถใช้เว็บไซต์ iforgot.apple.com ได้เลยครับ', en: 'If using someone else\'s iPhone, you can use iforgot.apple.com' }
      },
      {
        title: { th: 'กด "ลืมรหัสผ่าน" หรือ "Forgot Password"', en: 'Tap "Forgot Password"' },
        content: { th: 'กดที่ "Sign-In & Security" แล้วเลือก "Change Password" หากอยู่ในเครื่องที่ล็อกอินอยู่ หรือกด "Forgot Apple ID or Password" ในหน้า Sign In ครับ', en: 'Tap "Sign-In & Security" then "Change Password" if already signed in, or tap "Forgot Apple ID or Password" on the Sign In screen.' },
        tip: null
      },
      {
        title: { th: 'ยืนยันตัวตน', en: 'Verify Your Identity' },
        content: { th: 'Apple จะส่งรหัสยืนยันไปที่เบอร์โทรศัพท์หรืออีเมลสำรองที่คุณเคยลงทะเบียนไว้ ให้กรอกรหัสที่ได้รับครับ หากไม่ได้รับรหัส ให้ลองกด "Didn\'t get a code?" เพื่อส่งซ้ำ', en: 'Apple will send a verification code to your registered phone number or backup email. Enter the code you receive.' },
        tip: { th: 'ตรวจสอบทั้งกล่องข้อความ SMS และอีเมลนะครับ บางทีรหัสอาจเข้าไปอยู่ใน Spam', en: 'Check both SMS and email — the code might end up in your spam folder' }
      },
      {
        title: { th: 'ตั้งรหัสผ่านใหม่', en: 'Set a New Password' },
        content: { th: 'ตั้งรหัสผ่านใหม่ที่มีความปลอดภัย ควรมีอย่างน้อย 8 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลข อย่าใช้รหัสซ้ำกับที่อื่นนะครับ', en: 'Set a new secure password with at least 8 characters, including uppercase, lowercase, and numbers. Don\'t reuse passwords.' },
        tip: { th: 'แนะนำให้เปิด 2FA (การยืนยันตัวตนสองขั้นตอน) ด้วยนะครับ เพื่อความปลอดภัย', en: 'We recommend enabling 2FA (two-factor authentication) for added security' }
      }
    ],
    warning: null,
    relatedArticles: ['enable-2fa', 'iphone-wifi-issues'],
    emergencyContacts: null
  },

  {
    id: 'iphone-storage-full',
    category: 'iphone',
    title: { th: 'iPhone พื้นที่เต็ม — วิธีเพิ่มพื้นที่ว่าง', en: 'iPhone Storage Full — How to Free Up Space' },
    description: { th: 'เครื่องเต็ม แอปเปิดไม่ได้? มาดูวิธีลบไฟล์ไม่จำเป็นกัน', en: 'Phone full and apps won\'t open? Learn how to delete unnecessary files' },
    difficulty: 'easy',
    icon: '💾',
    tags: ['storage', 'พื้นที่', 'เต็ม', 'iphone', 'ลบ'],
    steps: [
      {
        title: { th: 'ตรวจสอบพื้นที่จัดเก็บ', en: 'Check Storage Usage' },
        content: { th: 'ไปที่ Settings > General > iPhone Storage จะเห็นว่าแอปไหนกินพื้นที่มากที่สุด โดยจะแสดงเป็นแถบสีให้ดูง่ายๆ ครับ', en: 'Go to Settings > General > iPhone Storage to see which apps use the most space.' },
        tip: { th: 'รอสักครู่ให้โหลดข้อมูลเสร็จ จะได้เห็นรายละเอียดครบถ้วนครับ', en: 'Wait a moment for the data to load fully' }
      },
      {
        title: { th: 'ลบรูปภาพและวิดีโอซ้ำ', en: 'Delete Duplicate Photos & Videos' },
        content: { th: 'เปิดแอป Photos > Albums > เลื่อนลงหา "Duplicates" กดรวมรูปซ้ำเพื่อลบได้ทันที วิดีโอเป็นตัวกินพื้นที่มากที่สุด ลองย้ายไป Google Photos หรือ iCloud ก่อนลบครับ', en: 'Open Photos > Albums > scroll to "Duplicates" and merge them. Videos take the most space — try moving to Google Photos or iCloud before deleting.' },
        tip: { th: 'เปิด iCloud Photos เพื่อสำรองรูปอัตโนมัติ แล้วเลือก "Optimize iPhone Storage" จะช่วยประหยัดพื้นที่มากครับ', en: 'Enable iCloud Photos with "Optimize iPhone Storage" to save significant space' }
      },
      {
        title: { th: 'ลบแอปที่ไม่ใช้', en: 'Delete Unused Apps' },
        content: { th: 'ในหน้า iPhone Storage จะมีคำแนะนำ "Offload Unused Apps" กดเปิดเพื่อลบแอปที่ไม่ค่อยใช้โดยอัตโนมัติ (ข้อมูลในแอปจะยังเก็บไว้) หรือกดที่แอปแต่ละตัวแล้วเลือก "Delete App" ครับ', en: 'On the iPhone Storage page, enable "Offload Unused Apps" to automatically remove rarely used apps (data is preserved).' },
        tip: null
      },
      {
        title: { th: 'ล้างแคชแอปโซเชียล', en: 'Clear Social App Caches' },
        content: { th: 'แอป LINE, Facebook, TikTok มักเก็บแคชจำนวนมาก วิธีล้าง: LINE > Settings > Chats > Delete data, Facebook ให้ลบแอปแล้วลงใหม่ครับ เพราะ iOS ไม่มีปุ่มล้างแคชโดยตรง', en: 'LINE, Facebook, TikTok store lots of cache. For LINE: Settings > Chats > Delete data. For Facebook: delete and reinstall the app.' },
        tip: { th: 'LINE เก็บแคชได้หลาย GB เลยนะครับ ล้างแล้วจะได้พื้นที่คืนเยอะมาก', en: 'LINE can store several GB of cache — clearing it frees up a lot of space' }
      },
      {
        title: { th: 'ล้างประวัติ Safari', en: 'Clear Safari History' },
        content: { th: 'ไปที่ Settings > Safari > Clear History and Website Data กดยืนยัน จะช่วยลบข้อมูลเว็บไซต์ที่เก็บไว้ได้ครับ', en: 'Go to Settings > Safari > Clear History and Website Data to remove cached website data.' },
        tip: null
      }
    ],
    warning: null,
    relatedArticles: ['forgot-apple-id', 'iphone-wifi-issues'],
    emergencyContacts: null
  },

  {
    id: 'iphone-wifi-issues',
    category: 'iphone',
    title: { th: 'iPhone เชื่อมต่อ Wi-Fi ไม่ได้ — วิธีแก้ไข', en: 'iPhone Can\'t Connect to Wi-Fi — How to Fix' },
    description: { th: 'Wi-Fi เชื่อมไม่ได้ หลุดบ่อย? มาดูวิธีแก้ปัญหาทีละขั้นตอน', en: 'Wi-Fi won\'t connect or keeps dropping? Step-by-step fixes' },
    difficulty: 'easy',
    icon: '📶',
    tags: ['wifi', 'ไวไฟ', 'เชื่อมต่อ', 'internet', 'iphone'],
    steps: [
      {
        title: { th: 'เปิด-ปิด Wi-Fi', en: 'Toggle Wi-Fi Off and On' },
        content: { th: 'ไปที่ Settings > Wi-Fi แล้วปิดสวิตช์ รอ 10 วินาที แล้วเปิดใหม่ครับ วิธีนี้แก้ปัญหาได้บ่อยมาก เพราะเป็นการ refresh การเชื่อมต่อ', en: 'Go to Settings > Wi-Fi, turn the switch off, wait 10 seconds, then turn it back on.' },
        tip: { th: 'อย่าใช้ปุ่มใน Control Center นะครับ เพราะจะแค่ยกเลิกการเชื่อมต่อชั่วคราว ไม่ได้ปิด Wi-Fi จริง', en: 'Don\'t use the Control Center toggle — it only disconnects temporarily, not actually turning off Wi-Fi' }
      },
      {
        title: { th: 'ลืมเครือข่าย Wi-Fi แล้วเชื่อมใหม่', en: 'Forget Network and Reconnect' },
        content: { th: 'ไปที่ Settings > Wi-Fi > กดที่ (i) ข้างชื่อ Wi-Fi > กด "Forget This Network" > ยืนยัน แล้วเชื่อมต่อใหม่โดยเลือก Wi-Fi นั้นและใส่รหัสผ่านอีกครั้งครับ', en: 'Go to Settings > Wi-Fi > tap (i) next to the Wi-Fi name > tap "Forget This Network" > confirm, then reconnect by selecting the network and entering the password again.' },
        tip: { th: 'จดรหัส Wi-Fi ไว้ก่อนนะครับ เพราะลืมเครือข่ายแล้วจะต้องใส่รหัสใหม่', en: 'Write down the Wi-Fi password first — you\'ll need to re-enter it' }
      },
      {
        title: { th: 'รีสตาร์ทเครื่อง', en: 'Restart Your iPhone' },
        content: { th: 'กดปุ่มเปิด-ปิด ค้างไว้ (iPhone X ขึ้นไป กดปุ่มด้านข้าง + ปุ่มเพิ่มเสียง) แล้วสไลด์เพื่อปิดเครื่อง รอ 30 วินาที แล้วเปิดเครื่องใหม่ครับ', en: 'Press and hold the power button (iPhone X+: side button + volume up), slide to power off, wait 30 seconds, then turn back on.' },
        tip: null
      },
      {
        title: { th: 'รีเซ็ตการตั้งค่าเครือข่าย', en: 'Reset Network Settings' },
        content: { th: 'ไปที่ Settings > General > Transfer or Reset iPhone > Reset > Reset Network Settings จะลบ Wi-Fi ที่เคยเชื่อมต่อทั้งหมด แต่จะแก้ปัญหาเครือข่ายได้เกือบทุกกรณีครับ', en: 'Go to Settings > General > Transfer or Reset iPhone > Reset > Reset Network Settings. This erases all saved Wi-Fi networks but fixes most network issues.' },
        tip: { th: 'วิธีนี้จะลบ Wi-Fi ที่เซฟไว้ทั้งหมด และรีเซ็ต VPN, APN ด้วย ใช้เป็นทางเลือกสุดท้ายนะครับ', en: 'This will erase all saved Wi-Fi passwords, VPN, and APN settings — use as a last resort' }
      },
      {
        title: { th: 'รีสตาร์ทเราเตอร์', en: 'Restart Your Router' },
        content: { th: 'ถอดปลั๊กเราเตอร์ Wi-Fi ออก รอ 30 วินาที แล้วเสียบกลับ รอประมาณ 2 นาทีให้เราเตอร์เริ่มทำงานเต็มที่ แล้วลองเชื่อม Wi-Fi ใหม่ครับ ปัญหาส่วนใหญ่แก้ได้ด้วยวิธีนี้', en: 'Unplug your Wi-Fi router, wait 30 seconds, plug it back in, wait 2 minutes for full startup, then try connecting again.' },
        tip: { th: 'หากอุปกรณ์อื่นก็เชื่อม Wi-Fi ไม่ได้เหมือนกัน ปัญหาอยู่ที่เราเตอร์ไม่ใช่ iPhone ครับ', en: 'If other devices also can\'t connect, the problem is with the router, not your iPhone' }
      }
    ],
    warning: null,
    relatedArticles: ['forgot-apple-id', 'iphone-storage-full'],
    emergencyContacts: null
  },

  // ----- Android -----
  {
    id: 'forgot-google-password',
    category: 'android',
    title: { th: 'ลืมรหัสผ่าน Google Account — วิธีกู้คืน', en: 'Forgot Google Account Password — How to Recover' },
    description: { th: 'ลืมรหัส Gmail เข้าแอปไม่ได้? วิธีรีเซ็ตง่ายๆ ทำเองได้', en: 'Forgot Gmail password and can\'t access apps? Easy reset steps' },
    difficulty: 'easy',
    icon: '🔐',
    tags: ['google', 'gmail', 'password', 'รหัสผ่าน', 'android', 'กู้คืน'],
    steps: [
      {
        title: { th: 'เปิดหน้ากู้คืนบัญชี Google', en: 'Open Google Account Recovery' },
        content: { th: 'เปิดเบราว์เซอร์แล้วเข้าไปที่ accounts.google.com/signin/recovery ใส่อีเมล Gmail ของคุณแล้วกด "Next" ครับ', en: 'Open a browser and go to accounts.google.com/signin/recovery. Enter your Gmail address and click "Next".' },
        tip: { th: 'สามารถทำบนมือถือหรือคอมพิวเตอร์ก็ได้ครับ', en: 'You can do this on either your phone or computer' }
      },
      {
        title: { th: 'ลอง "Try another way"', en: 'Try Another Verification Method' },
        content: { th: 'Google จะเสนอวิธียืนยันตัวตนหลายแบบ หากวิธีแรกไม่ได้ ให้กด "Try another way" เพื่อดูตัวเลือกอื่น เช่น ส่ง SMS, อีเมลสำรอง, หรือตอบคำถามความปลอดภัย', en: 'Google offers multiple verification methods. If the first doesn\'t work, click "Try another way" for alternatives like SMS, backup email, or security questions.' },
        tip: null
      },
      {
        title: { th: 'รับรหัสยืนยันและกรอก', en: 'Enter the Verification Code' },
        content: { th: 'เมื่อเลือกวิธียืนยันแล้ว Google จะส่งรหัสมาให้ ให้กรอกรหัสที่ได้รับภายใน 30 นาที หากไม่ได้รับ ลองกด "Resend" หรือเช็คใน SMS / อีเมล Spam ครับ', en: 'After choosing a verification method, Google will send a code. Enter it within 30 minutes. If not received, try "Resend" or check SMS/spam folder.' },
        tip: { th: 'หากไม่ได้รับรหัสทุกช่องทาง อาจต้องรอ 24-48 ชั่วโมงเพื่อยืนยันตัวตนแบบอื่นครับ', en: 'If you can\'t receive codes through any method, you may need to wait 24-48 hours for alternative verification' }
      },
      {
        title: { th: 'ตั้งรหัสผ่านใหม่', en: 'Set a New Password' },
        content: { th: 'ตั้งรหัสผ่านใหม่ที่แข็งแรง ควรมี 8 ตัวอักษรขึ้นไป ผสมตัวเลข ตัวอักษรใหญ่-เล็ก และสัญลักษณ์พิเศษ อย่าใช้ชื่อ วันเกิด หรือเบอร์โทร เพราะเดาง่ายครับ', en: 'Create a strong new password with 8+ characters mixing numbers, upper/lowercase letters, and special characters. Avoid names, birthdays, or phone numbers.' },
        tip: { th: 'แนะนำให้เปิด Google 2-Step Verification ด้วยนะครับ ไปที่ myaccount.google.com/security', en: 'We recommend enabling Google 2-Step Verification at myaccount.google.com/security' }
      }
    ],
    warning: null,
    relatedArticles: ['enable-2fa', 'android-slow-phone'],
    emergencyContacts: null
  },

  {
    id: 'android-slow-phone',
    category: 'android',
    title: { th: 'มือถือช้า — วิธีเร่งความเร็ว Android', en: 'Slow Phone — How to Speed Up Android' },
    description: { th: 'มือถือเริ่มช้า กระตุก ค้าง? มาดูวิธีทำให้เร็วขึ้น', en: 'Phone getting slow, laggy and freezing? Tips to speed it up' },
    difficulty: 'easy',
    icon: '🚀',
    tags: ['slow', 'ช้า', 'speed', 'android', 'lag', 'กระตุก'],
    steps: [
      {
        title: { th: 'รีสตาร์ทเครื่อง', en: 'Restart Your Phone' },
        content: { th: 'กดปุ่มเปิด-ปิดค้างไว้ แล้วเลือก "Restart" หรือ "รีสตาร์ท" สิ่งนี้ช่วยล้าง RAM และปิดแอปที่ค้างอยู่เบื้องหลัง แนะนำให้รีสตาร์ทอย่างน้อยสัปดาห์ละครั้งครับ', en: 'Press and hold the power button, then select "Restart". This clears RAM and closes background apps. Restart at least once a week.' },
        tip: null
      },
      {
        title: { th: 'ลบแอปที่ไม่ใช้', en: 'Remove Unused Apps' },
        content: { th: 'ไปที่ Settings > Apps แล้วเรียงตามขนาด ลบแอปที่ไม่ได้ใช้งาน โดยเฉพาะเกมเก่าและแอปที่ลืมไปแล้ว แต่ละแอปอาจกินพื้นที่หลายร้อย MB ครับ', en: 'Go to Settings > Apps and sort by size. Delete unused apps, especially old games. Each app can take up hundreds of MB.' },
        tip: { th: 'หากไม่กล้าลบ ลอง "Disable" แอปที่ติดมากับเครื่องก่อนได้ครับ', en: 'If unsure about deleting, try "Disable" for pre-installed apps first' }
      },
      {
        title: { th: 'ล้างแคชแอป', en: 'Clear App Cache' },
        content: { th: 'ไปที่ Settings > Apps > เลือกแอปที่ต้องการ > Storage > Clear Cache ทำกับแอปที่ใช้บ่อย เช่น LINE, Facebook, TikTok, Chrome เพราะแอปเหล่านี้เก็บแคชจำนวนมากครับ', en: 'Go to Settings > Apps > select an app > Storage > Clear Cache. Do this for frequently used apps like LINE, Facebook, TikTok, Chrome.' },
        tip: { th: 'Clear Cache ไม่ลบข้อมูลส่วนตัว แต่ Clear Data จะลบทุกอย่างรวมถึงการล็อกอิน ระวังนะครับ', en: 'Clear Cache doesn\'t delete personal data, but Clear Data deletes everything including login — be careful' }
      },
      {
        title: { th: 'ปิด Animation (เทคนิคลับ!)', en: 'Disable Animations (Secret Trick!)' },
        content: { th: 'ไปที่ Settings > About Phone > กด "Build Number" 7 ครั้ง เพื่อเปิด Developer Options จากนั้นไปที่ Settings > Developer Options แล้วตั้ง Window Animation Scale, Transition Animation Scale, Animator Duration Scale เป็น 0.5x หรือ Off เครื่องจะรู้สึกเร็วขึ้นทันทีครับ!', en: 'Go to Settings > About Phone > tap "Build Number" 7 times to unlock Developer Options. Then set all Animation Scales to 0.5x or Off for instant speed boost!' },
        tip: { th: 'นี่คือเทคนิคที่ช่างซ่อมมือถือใช้กัน จะทำให้เครื่องรู้สึกเร็วขึ้นทันทีเลยครับ', en: 'This is a trick phone repair technicians use — makes your phone feel instantly faster' }
      },
      {
        title: { th: 'ตรวจสอบพื้นที่จัดเก็บ', en: 'Check Storage Space' },
        content: { th: 'ไปที่ Settings > Storage ดูว่าเหลือพื้นที่เท่าไร หากเหลือน้อยกว่า 10% เครื่องจะช้าลงมาก ให้ลบไฟล์ที่ไม่จำเป็น ย้ายรูปไป Google Photos หรือใช้ "Free Up Space" ในแอป Files ครับ', en: 'Go to Settings > Storage to check remaining space. If less than 10% is free, the phone will slow down significantly.' },
        tip: { th: 'Google Photos ให้พื้นที่ฟรี 15 GB สำรองรูปแล้วลบออกจากเครื่องได้ครับ', en: 'Google Photos offers 15 GB free — back up photos then delete from device' }
      }
    ],
    warning: null,
    relatedArticles: ['android-clear-cache', 'forgot-google-password'],
    emergencyContacts: null
  },

  {
    id: 'android-clear-cache',
    category: 'android',
    title: { th: 'วิธีล้างแคชแอป Android ละเอียดทุกขั้นตอน', en: 'How to Clear App Cache on Android — Complete Guide' },
    description: { th: 'ล้างแคชแอปช่วยให้เครื่องเร็วขึ้นและแก้ปัญหาแอปค้าง', en: 'Clearing app cache speeds up your phone and fixes app crashes' },
    difficulty: 'easy',
    icon: '🧹',
    tags: ['cache', 'แคช', 'ล้าง', 'android', 'เร็ว'],
    steps: [
      {
        title: { th: 'เปิดการตั้งค่าแอป', en: 'Open App Settings' },
        content: { th: 'ไปที่ Settings > Apps (หรือ Application Manager ในบางยี่ห้อ) จะเห็นรายชื่อแอปทั้งหมดที่ติดตั้งอยู่ในเครื่องครับ', en: 'Go to Settings > Apps (or Application Manager on some brands) to see all installed apps.' },
        tip: null
      },
      {
        title: { th: 'เลือกแอปที่ต้องการล้างแคช', en: 'Select the App to Clear' },
        content: { th: 'กดที่แอปที่ต้องการ แนะนำให้เริ่มจากแอปที่ใช้บ่อยก่อน เช่น LINE, Facebook, Chrome, TikTok เพราะแอปเหล่านี้เก็บแคชมากที่สุดครับ', en: 'Tap the app you want to clear. Start with frequently used apps like LINE, Facebook, Chrome, TikTok — they store the most cache.' },
        tip: { th: 'ดูตัวเลข "Cache" ในหน้า Storage ของแอปจะรู้ว่าแอปไหนกินพื้นที่มากครับ', en: 'Check the "Cache" size in the app\'s Storage section to see which apps use the most space' }
      },
      {
        title: { th: 'กด Storage แล้วกด Clear Cache', en: 'Tap Storage then Clear Cache' },
        content: { th: 'กดที่ "Storage & cache" (หรือ "Storage" ในบางเครื่อง) แล้วกด "Clear Cache" สังเกตว่าตัวเลข Cache จะลดลงเหลือ 0 ครับ ข้อมูลส่วนตัว แชท รูปภาพ จะไม่ถูกลบ', en: 'Tap "Storage & cache" then "Clear Cache". The cache number will drop to 0. Personal data, chats, and photos will NOT be deleted.' },
        tip: { th: '⚠️ ระวัง! อย่ากด "Clear Data" (ล้างข้อมูล) นะครับ จะลบทุกอย่างรวมถึงการล็อกอิน', en: '⚠️ Warning! Don\'t tap "Clear Data" — it deletes everything including your login' }
      },
      {
        title: { th: 'ล้างแคชครั้งเดียว (Samsung)', en: 'Clear All Cache at Once (Samsung)' },
        content: { th: 'สำหรับ Samsung: ไปที่ Settings > Device Care > Storage > กดที่ "Temporary files" แล้วกด "Delete" จะล้างแคชทุกแอปในครั้งเดียว สะดวกมากครับ', en: 'For Samsung: Go to Settings > Device Care > Storage > tap "Temporary files" then "Delete" to clear all app caches at once.' },
        tip: { th: 'แนะนำให้ล้างแคชทุก 2-4 สัปดาห์ เพื่อให้เครื่องทำงานเร็วตลอดครับ', en: 'We recommend clearing cache every 2-4 weeks to keep your phone running fast' }
      }
    ],
    warning: null,
    relatedArticles: ['android-slow-phone', 'forgot-google-password'],
    emergencyContacts: null
  },

  // ----- Mac -----
  {
    id: 'slow-mac-fix',
    category: 'mac',
    title: { th: 'Mac ช้า — 10 วิธีแก้ปัญหาให้เร็วขึ้น', en: 'Slow Mac — 10 Fixes to Speed It Up' },
    description: { th: 'Mac เริ่มช้า เปิดแอปนาน? มาดูวิธีทำให้กลับมาเร็วเหมือนใหม่', en: 'Mac getting slow and apps take long to open? Get it running like new' },
    difficulty: 'medium',
    icon: '⚡',
    tags: ['mac', 'slow', 'ช้า', 'speed', 'macbook', 'imac'],
    steps: [
      {
        title: { th: 'รีสตาร์ท Mac', en: 'Restart Your Mac' },
        content: { th: 'กดที่ Apple menu (🍎) ด้านบนซ้าย > Restart หลายคนไม่เคยปิดเครื่อง Mac เลย ปล่อยให้ sleep อย่างเดียว การรีสตาร์ทจะช่วยล้าง RAM และแก้ปัญหาหลายอย่างครับ', en: 'Click Apple menu (🍎) top-left > Restart. Many people never restart their Mac — restarting clears RAM and fixes many issues.' },
        tip: { th: 'แนะนำรีสตาร์ทอย่างน้อยสัปดาห์ละครั้งครับ', en: 'Restart at least once a week' }
      },
      {
        title: { th: 'ปิดแอปที่ไม่ใช้', en: 'Close Unused Apps' },
        content: { th: 'ดูที่ Dock ด้านล่าง แอปที่มีจุดอยู่ด้านล่างคือแอปที่เปิดอยู่ คลิกขวาแล้วเลือก "Quit" หรือกด Command+Q เพื่อปิดแอปที่ไม่ใช้ แต่ละแอปกิน RAM ครับ', en: 'Check the Dock — apps with a dot below are running. Right-click and "Quit" or press Command+Q to close unused apps.' },
        tip: { th: 'เปิด Activity Monitor (Spotlight > Activity Monitor) เพื่อดูว่าแอปไหนกิน RAM/CPU มากที่สุด', en: 'Open Activity Monitor to see which apps use the most RAM/CPU' }
      },
      {
        title: { th: 'ลบ Login Items ที่ไม่จำเป็น', en: 'Remove Unnecessary Login Items' },
        content: { th: 'ไปที่ System Settings > General > Login Items ลบแอปที่ไม่จำเป็นต้องเปิดตอน startup ยิ่งมี Login Items น้อย เครื่องจะเปิดเร็วขึ้นครับ', en: 'Go to System Settings > General > Login Items and remove apps that don\'t need to launch at startup.' },
        tip: null
      },
      {
        title: { th: 'ล้าง Desktop', en: 'Clean Your Desktop' },
        content: { th: 'ไฟล์บน Desktop แต่ละไฟล์ต้องใช้ RAM ในการแสดง thumbnail ยิ่งไฟล์เยอะ ยิ่งช้า ย้ายไฟล์เข้า folder หรือใช้ Desktop Stacks (คลิกขวาบน Desktop > Use Stacks) ครับ', en: 'Each file on the Desktop uses RAM for thumbnails. Move files to folders or enable Desktop Stacks (right-click Desktop > Use Stacks).' },
        tip: { th: 'Desktop ที่สะอาดไม่ใช่แค่สวย แต่ทำให้ Mac เร็วขึ้นจริงๆ ครับ', en: 'A clean Desktop doesn\'t just look nice — it actually makes your Mac faster' }
      },
      {
        title: { th: 'อัปเดต macOS', en: 'Update macOS' },
        content: { th: 'ไปที่ System Settings > General > Software Update ตรวจสอบว่ามีอัปเดตใหม่หรือไม่ อัปเดตมักแก้ bug และปรับปรุงประสิทธิภาพครับ', en: 'Go to System Settings > General > Software Update. Updates often fix bugs and improve performance.' },
        tip: { th: 'สำรองข้อมูลด้วย Time Machine ก่อนอัปเดตเสมอนะครับ', en: 'Always back up with Time Machine before updating' }
      }
    ],
    warning: null,
    relatedArticles: ['mac-overheating', 'mac-update'],
    emergencyContacts: null
  },

  {
    id: 'mac-overheating',
    category: 'mac',
    title: { th: 'Mac ร้อนมาก — สาเหตุและวิธีแก้ไข', en: 'Mac Overheating — Causes and Fixes' },
    description: { th: 'Mac ร้อนจนวางตักไม่ได้? พัดลมดังมาก? มาดูวิธีแก้', en: 'Mac too hot to use on your lap? Fans running loud? Solutions here' },
    difficulty: 'medium',
    icon: '🌡️',
    tags: ['mac', 'ร้อน', 'overheating', 'พัดลม', 'fan', 'hot'],
    steps: [
      {
        title: { th: 'ตรวจสอบแอปที่กิน CPU มาก', en: 'Check CPU-Heavy Apps' },
        content: { th: 'เปิด Activity Monitor (กด Command+Space พิมพ์ Activity Monitor) แล้วดูแท็บ CPU เรียงตาม % CPU แอปที่กิน CPU สูง (เช่น Chrome, Zoom) ทำให้เครื่องร้อนมากครับ ลองปิดแอปที่ไม่จำเป็น', en: 'Open Activity Monitor (Command+Space, type Activity Monitor), check CPU tab sorted by % CPU. High CPU apps (Chrome, Zoom) cause overheating. Close unnecessary apps.' },
        tip: { th: 'Chrome กินทรัพยากรมากกว่า Safari เยอะ ลองเปลี่ยนมาใช้ Safari ดูครับ', en: 'Chrome uses significantly more resources than Safari — try switching' }
      },
      {
        title: { th: 'ทำความสะอาดช่องระบายอากาศ', en: 'Clean the Air Vents' },
        content: { th: 'ในสภาพอากาศร้อนชื้นของเมืองไทย ฝุ่นสะสมในช่องระบายอากาศเร็วมาก ใช้ลมเป่า (air duster) เป่าช่องระบายอากาศที่ด้านหลังและด้านข้างของ Mac ครับ', en: 'In Thailand\'s hot and humid climate, dust builds up quickly in air vents. Use compressed air to blow out the vents on the back and sides of your Mac.' },
        tip: { th: 'ทำทุก 2-3 เดือน โดยเฉพาะถ้าอยู่ในห้องที่มีฝุ่นมากครับ', en: 'Do this every 2-3 months, especially in dusty environments' }
      },
      {
        title: { th: 'ใช้บนพื้นผิวแข็งและเรียบ', en: 'Use on a Hard, Flat Surface' },
        content: { th: 'อย่าวาง MacBook บนเตียง หมอน หรือผ้าห่ม เพราะจะปิดช่องระบายอากาศ ใช้โต๊ะหรือขาตั้ง laptop stand เพื่อให้อากาศถ่ายเทได้ดีครับ', en: 'Never place your MacBook on beds, pillows, or blankets — they block air vents. Use a desk or laptop stand for proper airflow.' },
        tip: { th: 'Laptop stand ช่วยลดอุณหภูมิได้ 5-10 องศา คุ้มค่ามากครับ', en: 'A laptop stand can reduce temperature by 5-10 degrees — very worth it' }
      },
      {
        title: { th: 'ลดแท็บ Chrome', en: 'Reduce Chrome Tabs' },
        content: { th: 'แต่ละแท็บ Chrome ใช้ RAM 100-500 MB หากเปิดหลายสิบแท็บ จะทำให้เครื่องร้อนและช้ามาก ลองปิดแท็บที่ไม่ใช้ หรือใช้ extension "The Great Suspender" เพื่อ suspend แท็บที่ไม่ได้ดูครับ', en: 'Each Chrome tab uses 100-500 MB RAM. Many tabs cause overheating and slowness. Close unused tabs or use "The Great Suspender" extension.' },
        tip: null
      },
      {
        title: { th: 'รีเซ็ต SMC (Intel Mac)', en: 'Reset SMC (Intel Mac)' },
        content: { th: 'สำหรับ Mac ที่ใช้ Intel: ปิดเครื่อง > กด Shift+Control+Option+ปุ่มเปิดเครื่อง ค้างไว้ 10 วินาที > ปล่อย > เปิดเครื่องใหม่ สำหรับ Mac M1/M2/M3: รีสตาร์ทเครื่องก็เพียงพอครับ', en: 'For Intel Mac: Shut down > press Shift+Control+Option+Power for 10 seconds > release > restart. For M1/M2/M3 Mac: a simple restart is sufficient.' },
        tip: { th: 'ตรวจดูรุ่น Mac ที่ Apple menu > About This Mac ว่าเป็น Intel หรือ Apple Silicon ครับ', en: 'Check your Mac model at Apple menu > About This Mac to see if it\'s Intel or Apple Silicon' }
      }
    ],
    warning: { th: 'หาก Mac ร้อนจนปิดเครื่องเอง หรือมีกลิ่นไหม้ ให้หยุดใช้ทันทีและนำไปเช็คที่ศูนย์บริการ Apple ครับ', en: 'If your Mac shuts down from overheating or you smell burning, stop using it immediately and take it to an Apple service center.' },
    relatedArticles: ['slow-mac-fix', 'mac-update'],
    emergencyContacts: null
  },

  {
    id: 'mac-update',
    category: 'mac',
    title: { th: 'วิธีอัปเดต macOS อย่างปลอดภัย', en: 'How to Update macOS Safely' },
    description: { th: 'อัปเดต macOS ใหม่ออกแล้ว ควรอัปหรือยัง? มาดูวิธีทำอย่างปลอดภัย', en: 'New macOS update available — should you update? Here\'s how to do it safely' },
    difficulty: 'easy',
    icon: '🔄',
    tags: ['mac', 'update', 'อัปเดต', 'macos', 'software'],
    steps: [
      {
        title: { th: 'สำรองข้อมูลด้วย Time Machine', en: 'Back Up with Time Machine' },
        content: { th: 'ก่อนอัปเดตเสมอ ให้สำรองข้อมูลก่อน! เสียบ External Hard Drive แล้วไปที่ System Settings > General > Time Machine > Select Backup Disk รอจนสำรองเสร็จครับ', en: 'Always back up before updating! Connect an External Hard Drive, go to System Settings > General > Time Machine > Select Backup Disk.' },
        tip: { th: 'หากไม่มี External Drive สำรองไฟล์สำคัญไป iCloud หรือ Google Drive ก็ได้ครับ', en: 'If you don\'t have an External Drive, back up important files to iCloud or Google Drive' }
      },
      {
        title: { th: 'ตรวจสอบความเข้ากันได้', en: 'Check Compatibility' },
        content: { th: 'ไปที่ System Settings > General > Software Update ถ้าขึ้นว่ามีอัปเดต แสดงว่าเครื่องรองรับ แต่ให้ตรวจสอบว่าแอปที่ใช้ประจำรองรับ macOS เวอร์ชันใหม่ด้วยนะครับ', en: 'Go to System Settings > General > Software Update. If an update appears, your Mac supports it. But check that your essential apps support the new macOS version too.' },
        tip: null
      },
      {
        title: { th: 'เชื่อมต่อ Wi-Fi และเสียบปลั๊ก', en: 'Connect to Wi-Fi and Power' },
        content: { th: 'ตรวจสอบว่าเชื่อมต่อ Wi-Fi ที่เสถียร และเสียบปลั๊กชาร์จไว้ อัปเดต macOS มีขนาดใหญ่ (หลาย GB) และใช้เวลานาน ห้ามถอดปลั๊กระหว่างอัปเดตครับ!', en: 'Make sure you\'re connected to stable Wi-Fi and plugged in. macOS updates are large (several GB) and take a long time. Never unplug during update!' },
        tip: { th: 'ใช้เวลาดาวน์โหลดและติดตั้งรวมประมาณ 30 นาที - 2 ชั่วโมง ขึ้นอยู่กับความเร็วเน็ตครับ', en: 'Download and install takes about 30 minutes to 2 hours depending on internet speed' }
      },
      {
        title: { th: 'กด "Update Now" และรอ', en: 'Click "Update Now" and Wait' },
        content: { th: 'กด "Update Now" หรือ "Upgrade Now" เครื่องจะดาวน์โหลดและรีสตาร์ทเอง อย่าปิดเครื่องหรือปิดฝา MacBook ระหว่างอัปเดต รอจนเสร็จสมบูรณ์ จะเห็นหน้า login ตามปกติครับ', en: 'Click "Update Now". Your Mac will download and restart automatically. Don\'t shut down or close your MacBook lid during the update.' },
        tip: { th: 'ถ้าเห็น progress bar ค้างนานๆ อย่ากังวลครับ เป็นเรื่องปกติ ระบบกำลังทำงานอยู่', en: 'If the progress bar seems stuck, don\'t worry — this is normal, the system is working' }
      }
    ],
    warning: { th: 'ห้ามปิดเครื่องระหว่างอัปเดต! อาจทำให้ระบบเสียหายและเปิดเครื่องไม่ได้', en: 'Never shut down during an update! This can corrupt the system and prevent startup.' },
    relatedArticles: ['slow-mac-fix', 'mac-overheating'],
    emergencyContacts: null
  },

  // ----- Windows -----
  {
    id: 'windows-bsod',
    category: 'windows',
    title: { th: 'จอฟ้า BSOD — วิธีแก้ปัญหาเบื้องต้น', en: 'Blue Screen (BSOD) — Basic Troubleshooting' },
    description: { th: 'เจอจอฟ้าบ่อยๆ? มาดูวิธีวินิจฉัยและแก้ปัญหา', en: 'Getting blue screens frequently? Learn how to diagnose and fix them' },
    difficulty: 'medium',
    icon: '💀',
    tags: ['windows', 'bsod', 'จอฟ้า', 'blue screen', 'crash', 'ค้าง'],
    steps: [
      {
        title: { th: 'จดรหัสข้อผิดพลาด (Error Code)', en: 'Note the Error Code' },
        content: { th: 'เมื่อเจอจอฟ้า จะมี error code แสดง เช่น IRQL_NOT_LESS_OR_EQUAL หรือ CRITICAL_PROCESS_DIED ให้จดไว้หรือถ่ายรูปหน้าจอ (ถ้าทันครับ) รหัสนี้จะช่วยระบุสาเหตุของปัญหา', en: 'When you see a blue screen, note the error code (e.g., IRQL_NOT_LESS_OR_EQUAL or CRITICAL_PROCESS_DIED). Take a photo if you can — this helps identify the cause.' },
        tip: { th: 'สามารถดูประวัติจอฟ้าย้อนหลังได้ที่ Event Viewer > Windows Logs > System แล้วมองหา "BugCheck" ครับ', en: 'View past blue screen history at Event Viewer > Windows Logs > System, look for "BugCheck"' }
      },
      {
        title: { th: 'อัปเดต Windows', en: 'Update Windows' },
        content: { th: 'ไปที่ Settings > Windows Update > Check for updates จอฟ้ามักเกิดจาก bug ที่ Microsoft แก้ไขแล้วในอัปเดตใหม่ ติดตั้งอัปเดตทั้งหมดแล้วรีสตาร์ทครับ', en: 'Go to Settings > Windows Update > Check for updates. Blue screens are often caused by bugs fixed in newer updates. Install all updates and restart.' },
        tip: null
      },
      {
        title: { th: 'อัปเดต Driver', en: 'Update Drivers' },
        content: { th: 'คลิกขวาที่ปุ่ม Start > Device Manager ดูว่ามีอุปกรณ์ไหนแสดงเครื่องหมาย ⚠️ หรือไม่ คลิกขวา > Update driver > "Search automatically" โดยเฉพาะ driver กราฟิก (Display Adapters) มักเป็นสาเหตุหลักของจอฟ้าครับ', en: 'Right-click Start > Device Manager. Check for ⚠️ icons. Right-click > Update driver > "Search automatically". Graphics drivers (Display Adapters) are often the main cause.' },
        tip: { th: 'สำหรับการ์ดจอ NVIDIA ใช้ GeForce Experience, AMD ใช้ Radeon Software เพื่ออัปเดต driver ครับ', en: 'For NVIDIA use GeForce Experience, for AMD use Radeon Software to update drivers' }
      },
      {
        title: { th: 'เช็คหน่วยความจำ (RAM)', en: 'Check Memory (RAM)' },
        content: { th: 'กด Windows+R พิมพ์ "mdsched.exe" แล้ว Enter เลือก "Restart now and check for problems" คอมจะรีสตาร์ทและทดสอบ RAM ถ้าพบปัญหา อาจต้องเปลี่ยน RAM ครับ', en: 'Press Windows+R, type "mdsched.exe" and Enter. Select "Restart now and check for problems". If issues are found, you may need to replace RAM.' },
        tip: null
      },
      {
        title: { th: 'เช็คฮาร์ดดิสก์', en: 'Check Hard Drive' },
        content: { th: 'เปิด Command Prompt ในฐานะ Administrator แล้วพิมพ์ "chkdsk C: /f /r" กด Enter ยอมรับให้ตรวจสอบตอนรีสตาร์ท จะช่วยซ่อมแซม disk error ที่อาจเป็นสาเหตุจอฟ้าครับ', en: 'Open Command Prompt as Administrator and type "chkdsk C: /f /r". Accept to check on restart — this repairs disk errors that may cause blue screens.' },
        tip: { th: 'หากจอฟ้าเกิดขึ้นบ่อยมากหลังจากทำทุกขั้นตอนแล้ว อาจต้องติดตั้ง Windows ใหม่ หรือนำไปเช็คที่ร้านซ่อมครับ', en: 'If blue screens persist after all steps, you may need to reinstall Windows or take it to a repair shop' }
      }
    ],
    warning: { th: 'หากจอฟ้าเกิดขึ้นทันทีหลังติดตั้งโปรแกรมหรือ driver ใหม่ ให้ลอง uninstall โปรแกรมนั้นก่อน หรือ boot เข้า Safe Mode ครับ', en: 'If blue screens started after installing new software or drivers, try uninstalling them first, or boot into Safe Mode.' },
    relatedArticles: ['windows-slow-fix', 'windows-virus-removal'],
    emergencyContacts: null
  },

  {
    id: 'windows-slow-fix',
    category: 'windows',
    title: { th: 'คอมช้า — วิธีเร่งความเร็ว Windows', en: 'Slow PC — How to Speed Up Windows' },
    description: { th: 'คอมพิวเตอร์เริ่มช้า เปิดเครื่องนาน? มาดูวิธีแก้ให้เร็วขึ้น', en: 'Computer getting slow and takes long to boot? Tips to speed it up' },
    difficulty: 'easy',
    icon: '🐌',
    tags: ['windows', 'slow', 'ช้า', 'speed', 'เร่ง', 'ความเร็ว'],
    steps: [
      {
        title: { th: 'ปิดโปรแกรม Startup ที่ไม่จำเป็น', en: 'Disable Unnecessary Startup Programs' },
        content: { th: 'กด Ctrl+Shift+Esc เปิด Task Manager > Startup tab ดูรายการโปรแกรมที่เปิดอัตโนมัติ คลิกขวาแล้วเลือก "Disable" กับโปรแกรมที่ไม่จำเป็น เหลือไว้แค่ antivirus ก็พอครับ', en: 'Press Ctrl+Shift+Esc to open Task Manager > Startup tab. Right-click and "Disable" unnecessary programs. Keep only antivirus.' },
        tip: { th: 'ยิ่ง Startup programs น้อย เครื่องจะเปิดเร็วขึ้นมากครับ', en: 'Fewer startup programs = much faster boot time' }
      },
      {
        title: { th: 'Disk Cleanup', en: 'Run Disk Cleanup' },
        content: { th: 'พิมพ์ "Disk Cleanup" ใน Start Menu เลือก drive C: ติ๊กทุกช่องแล้วกด OK หรือกด "Clean up system files" เพื่อลบไฟล์อัปเดตเก่าด้วย อาจได้พื้นที่คืนหลาย GB ครับ', en: 'Type "Disk Cleanup" in Start Menu, select drive C:, check all boxes and click OK. Click "Clean up system files" to delete old update files too.' },
        tip: null
      },
      {
        title: { th: 'ปิด Visual Effects', en: 'Disable Visual Effects' },
        content: { th: 'คลิกขวาที่ This PC > Properties > Advanced system settings > Performance Settings > เลือก "Adjust for best performance" จะปิด animation ทั้งหมด ทำให้เครื่องตอบสนองเร็วขึ้นทันทีครับ', en: 'Right-click This PC > Properties > Advanced system settings > Performance Settings > "Adjust for best performance" to disable all animations.' },
        tip: { th: 'ถ้าไม่อยากปิดทั้งหมด ให้เลือก "Custom" แล้วติ๊กแค่ "Smooth edges of screen fonts" ไว้ก็พอครับ', en: 'If you don\'t want to disable all, choose "Custom" and keep only "Smooth edges of screen fonts"' }
      },
      {
        title: { th: 'ตรวจสอบไวรัสและมัลแวร์', en: 'Scan for Viruses and Malware' },
        content: { th: 'เปิด Windows Security > Virus & threat protection > Quick scan กดสแกน รอจนเสร็จ หากพบสิ่งน่าสงสัย ให้กด "Remove" ทันที มัลแวร์เป็นสาเหตุหลักที่ทำให้เครื่องช้าครับ', en: 'Open Windows Security > Virus & threat protection > Quick scan. If threats are found, click "Remove" immediately. Malware is a major cause of slowness.' },
        tip: null
      },
      {
        title: { th: 'พิจารณาเปลี่ยนเป็น SSD', en: 'Consider Upgrading to SSD' },
        content: { th: 'หากยังใช้ HDD (ฮาร์ดดิสก์แบบเก่า) การเปลี่ยนเป็น SSD จะทำให้เครื่องเร็วขึ้น 5-10 เท่า ตั้งแต่เปิดเครื่องจนถึงเปิดแอป SSD 256 GB ราคาเริ่มต้นประมาณ 700-1,000 บาท ในไทยครับ', en: 'If you\'re still using an HDD, upgrading to SSD makes your PC 5-10x faster. A 256 GB SSD starts at about 700-1,000 THB in Thailand.' },
        tip: { th: 'นี่คือการอัปเกรดที่คุ้มค่าที่สุดสำหรับคอมเครื่องเก่า ดีกว่าเพิ่ม RAM เสียอีกครับ', en: 'This is the most cost-effective upgrade for an old PC — even better than adding more RAM' }
      }
    ],
    warning: null,
    relatedArticles: ['windows-bsod', 'windows-virus-removal'],
    emergencyContacts: null
  },

  {
    id: 'windows-virus-removal',
    category: 'windows',
    title: { th: 'วิธีกำจัดไวรัสและมัลแวร์ Windows', en: 'How to Remove Viruses and Malware from Windows' },
    description: { th: 'สงสัยว่าติดไวรัส? มาดูวิธีสแกนและกำจัดให้หมด', en: 'Suspect a virus? Learn how to scan and remove all malware' },
    difficulty: 'medium',
    icon: '🦠',
    tags: ['windows', 'virus', 'ไวรัส', 'malware', 'มัลแวร์', 'security'],
    steps: [
      {
        title: { th: 'สังเกตอาการผิดปกติ', en: 'Recognize the Symptoms' },
        content: { th: 'อาการของเครื่องที่ติดไวรัส: แอปแปลกๆ เปิดเอง, โฆษณา pop-up ขึ้นบ่อย, เครื่องช้าผิดปกติ, เบราว์เซอร์เปลี่ยนหน้าแรก, โปรแกรมที่ไม่ได้ลงถูกติดตั้ง, ไฟล์ถูกเข้ารหัส (ransomware) ครับ', en: 'Virus symptoms: strange apps opening, frequent pop-ups, unusual slowness, browser homepage changed, unknown programs installed, files encrypted (ransomware).' },
        tip: null
      },
      {
        title: { th: 'สแกนด้วย Windows Security', en: 'Scan with Windows Security' },
        content: { th: 'เปิด Windows Security > Virus & threat protection > Scan options > เลือก "Full scan" แล้วกด "Scan now" Full scan จะใช้เวลานาน (30 นาที - 2 ชั่วโมง) แต่จะตรวจสอบไฟล์ทุกไฟล์ในเครื่องครับ', en: 'Open Windows Security > Virus & threat protection > Scan options > select "Full scan" then "Scan now". Takes 30 min - 2 hours but checks every file.' },
        tip: { th: 'ระหว่างสแกน ใช้เครื่องได้ปกติ แต่อาจช้ากว่าปกตินิดหน่อยครับ', en: 'You can use your PC during the scan, but it may be slightly slower' }
      },
      {
        title: { th: 'ลบโปรแกรมน่าสงสัย', en: 'Remove Suspicious Programs' },
        content: { th: 'ไปที่ Settings > Apps > Installed apps เรียงตามวันที่ติดตั้ง ลบโปรแกรมที่ไม่รู้จักหรือติดตั้งตอนที่เริ่มมีปัญหา คลิกขวาแล้วเลือก "Uninstall" ครับ', en: 'Go to Settings > Apps > Installed apps, sort by install date. Remove unfamiliar programs or those installed when problems started.' },
        tip: { th: 'หากไม่แน่ใจว่าโปรแกรมไหนอันตราย ลอง Google ชื่อโปรแกรมก่อน + "is it safe" ครับ', en: 'If unsure about a program, Google its name + "is it safe" first' }
      },
      {
        title: { th: 'สแกนด้วย Offline Scan', en: 'Run Microsoft Defender Offline Scan' },
        content: { th: 'ไปที่ Windows Security > Scan options > "Microsoft Defender Offline scan" > Scan now เครื่องจะรีสตาร์ทและสแกนก่อนที่ Windows จะโหลด ทำให้จับมัลแวร์ที่ซ่อนตัวได้ดีกว่าครับ', en: 'Go to Windows Security > Scan options > "Microsoft Defender Offline scan" > Scan now. Your PC restarts and scans before Windows loads, catching hidden malware.' },
        tip: { th: 'วิธีนี้จะรีสตาร์ทเครื่องอัตโนมัติ บันทึกงานให้เรียบร้อยก่อนนะครับ', en: 'This will automatically restart your PC — save your work first' }
      },
      {
        title: { th: 'ป้องกันการติดไวรัสในอนาคต', en: 'Prevent Future Infections' },
        content: { th: 'เปิด Real-time protection ใน Windows Security ให้ตลอด, อย่าดาวน์โหลดโปรแกรมจากเว็บไม่รู้จัก, ระวัง email แนบไฟล์จากคนไม่รู้จัก, อัปเดต Windows สม่ำเสมอ, และอย่าใช้ crack/keygen เด็ดขาดครับ', en: 'Keep Real-time protection on, don\'t download from unknown sites, beware of email attachments, update Windows regularly, and never use crack/keygen programs.' },
        tip: { th: 'Windows Defender (ที่มากับเครื่อง) ดีเพียงพอแล้วครับ ไม่จำเป็นต้องซื้อ antivirus เพิ่ม', en: 'Windows Defender (built-in) is good enough — you don\'t need to buy additional antivirus' }
      }
    ],
    warning: { th: 'หากไฟล์ถูกเข้ารหัส (ransomware) อย่าจ่ายค่าไถ่! ติดต่อผู้เชี่ยวชาญด้านความปลอดภัยหรือตำรวจไซเบอร์ 1441 ครับ', en: 'If files are encrypted (ransomware), DO NOT pay the ransom! Contact security experts or cyber police at 1441.' },
    relatedArticles: ['windows-bsod', 'windows-slow-fix'],
    emergencyContacts: null
  },

  // ----- Scams -----
  {
    id: 'facebook-hacked',
    category: 'scams',
    title: { th: 'Facebook ถูกแฮก — ทำอย่างไร? ขั้นตอนกู้คืนบัญชี', en: 'Facebook Hacked — What to Do? Account Recovery Steps' },
    description: { th: 'บัญชี Facebook ถูกแฮก? มาดูวิธีกู้คืนและป้องกันทันที', en: 'Facebook account hacked? Learn how to recover and protect it immediately' },
    difficulty: 'medium',
    icon: '👤',
    tags: ['facebook', 'แฮก', 'hacked', 'กู้คืน', 'บัญชี', 'scam'],
    steps: [
      {
        title: { th: 'เปลี่ยนรหัสผ่านทันที (ถ้ายังเข้าได้)', en: 'Change Password Immediately (If You Can Still Access)' },
        content: { th: 'หากยังเข้าบัญชีได้ ให้เปลี่ยนรหัสผ่านทันที! ไปที่ Settings > Security and Login > Change Password ใช้รหัสที่ซับซ้อนและไม่เคยใช้ที่อื่น เปลี่ยนรหัสอีเมลที่ผูกกับ Facebook ด้วยครับ', en: 'If you can still access your account, change the password immediately! Go to Settings > Security and Login > Change Password.' },
        tip: { th: 'เปลี่ยนรหัสผ่านอีเมลที่ผูกกับ Facebook ด้วยนะครับ เพราะแฮกเกอร์อาจเข้าถึงอีเมลด้วย', en: 'Also change the password of the email linked to Facebook — hackers may have access to that too' }
      },
      {
        title: { th: 'ใช้หน้า Facebook Recovery (ถ้าเข้าไม่ได้)', en: 'Use Facebook Recovery Page (If Locked Out)' },
        content: { th: 'ไปที่ facebook.com/hacked กด "My account is compromised" ใส่อีเมลหรือเบอร์โทรที่เคยผูกไว้ ทำตามขั้นตอนที่ Facebook แนะนำ อาจต้องยืนยันตัวตนด้วยบัตรประชาชนครับ', en: 'Go to facebook.com/hacked, click "My account is compromised", enter your email or phone number, and follow Facebook\'s recovery steps.' },
        tip: null
      },
      {
        title: { th: 'ตรวจสอบอุปกรณ์ที่ล็อกอินอยู่', en: 'Check Logged-In Devices' },
        content: { th: 'ไปที่ Settings > Security and Login > "Where you\'re logged in" ดูรายการอุปกรณ์ที่ล็อกอิน หากเห็นอุปกรณ์ที่ไม่รู้จัก ให้กด "..." แล้วเลือก "Log out" ทำกับทุกอุปกรณ์ที่ไม่ใช่ของคุณครับ', en: 'Go to Settings > Security and Login > "Where you\'re logged in". If you see unknown devices, click "..." and "Log out" for each one.' },
        tip: { th: 'กด "Log Out Of All Sessions" เพื่อ logout ทุกอุปกรณ์ในครั้งเดียวก็ได้ครับ', en: 'Click "Log Out Of All Sessions" to log out all devices at once' }
      },
      {
        title: { th: 'เปิด Two-Factor Authentication (2FA)', en: 'Enable Two-Factor Authentication (2FA)' },
        content: { th: 'ไปที่ Settings > Security and Login > Two-Factor Authentication เปิดใช้งาน แนะนำใช้แอป Authenticator (เช่น Google Authenticator) แทน SMS เพราะปลอดภัยกว่าครับ', en: 'Go to Settings > Security and Login > Two-Factor Authentication. We recommend using an Authenticator app (e.g., Google Authenticator) instead of SMS.' },
        tip: { th: 'เปิด 2FA แล้วถึงแฮกเกอร์มีรหัสผ่าน ก็เข้าบัญชีไม่ได้ เพราะต้องมีรหัสจากมือถือคุณด้วยครับ', en: 'With 2FA enabled, even if hackers have your password, they can\'t access your account without the code from your phone' }
      },
      {
        title: { th: 'แจ้งเพื่อนและครอบครัว', en: 'Warn Friends and Family' },
        content: { th: 'แจ้งเพื่อนในช่องทางอื่น (LINE, โทรศัพท์) ว่าบัญชีถูกแฮก อย่าเชื่อข้อความจากบัญชีที่ถูกแฮก โดยเฉพาะที่ขอยืมเงินหรือให้กดลิงก์ มิจฉาชีพมักแอบอ้างเป็นเราเพื่อหลอกเพื่อนครับ', en: 'Notify friends through other channels (LINE, phone) that your account was hacked. Don\'t trust messages from the hacked account, especially asking for money or links.' },
        tip: { th: 'โพสต์บน Facebook (หลังกู้คืนได้แล้ว) เตือนเพื่อนทุกคนด้วยนะครับ', en: 'Post on Facebook (after recovery) to warn all friends' }
      }
    ],
    warning: { th: '⚠️ อย่าคลิกลิงก์ที่ได้รับทางข้อความหรืออีเมลที่อ้างว่ามาจาก Facebook! Facebook จะไม่ขอรหัสผ่านผ่านข้อความ ให้เข้า facebook.com โดยตรงเสมอครับ', en: '⚠️ Never click links in messages or emails claiming to be from Facebook! Facebook will never ask for your password via message. Always go directly to facebook.com.' },
    relatedArticles: ['enable-2fa', 'line-scams', 'phishing-sms'],
    emergencyContacts: [
      { name: 'ศูนย์ AOC 1441', number: '1441', description: { th: 'ศูนย์ปฏิบัติการแก้ไขปัญหาอาชญากรรมออนไลน์', en: 'Anti-Online Scam Operation Center' } },
      { name: 'Tourist Police', number: '1155', description: { th: 'ตำรวจท่องเที่ยว', en: 'Tourist Police' } },
      { name: 'Thai Police Online', number: 'thaipoliceonline.go.th', description: { th: 'แจ้งความออนไลน์', en: 'Online Police Report' } }
    ]
  },

  {
    id: 'enable-2fa',
    category: 'scams',
    title: { th: 'วิธีเปิด 2FA ป้องกันบัญชีทุกแอป', en: 'How to Enable 2FA to Protect All Your Accounts' },
    description: { th: '2FA คืออะไร? ทำไมต้องเปิด? มาดูวิธีตั้งค่าทีละขั้นตอน', en: 'What is 2FA? Why enable it? Step-by-step setup guide' },
    difficulty: 'easy',
    icon: '🔒',
    tags: ['2fa', 'security', 'ความปลอดภัย', 'ป้องกัน', 'authenticator'],
    steps: [
      {
        title: { th: '2FA คืออะไร?', en: 'What is 2FA?' },
        content: { th: '2FA (Two-Factor Authentication) คือการยืนยันตัวตน 2 ขั้นตอน นอกจากรหัสผ่าน ยังต้องใช้รหัสจากมือถือด้วย แม้คนอื่นรู้รหัสผ่าน ก็เข้าบัญชีไม่ได้ เหมือนบ้านมีกุญแจ 2 ดอกครับ', en: '2FA requires two steps to log in — your password plus a code from your phone. Even if someone knows your password, they can\'t access your account. Like having two locks on your door.' },
        tip: null
      },
      {
        title: { th: 'ดาวน์โหลดแอป Authenticator', en: 'Download an Authenticator App' },
        content: { th: 'ดาวน์โหลดแอป Google Authenticator หรือ Microsoft Authenticator จาก App Store (iPhone) หรือ Play Store (Android) ฟรี! แอปนี้จะสร้างรหัสตัวเลข 6 หลักที่เปลี่ยนทุก 30 วินาทีครับ', en: 'Download Google Authenticator or Microsoft Authenticator from App Store (iPhone) or Play Store (Android). Free! The app generates 6-digit codes that change every 30 seconds.' },
        tip: { th: 'แนะนำ Google Authenticator เพราะใช้ง่ายที่สุดครับ', en: 'We recommend Google Authenticator — it\'s the easiest to use' }
      },
      {
        title: { th: 'เปิด 2FA บน Facebook', en: 'Enable 2FA on Facebook' },
        content: { th: 'เปิด Facebook > Settings > Security and Login > Two-Factor Authentication > กดเริ่ม > เลือก "Authentication app" > สแกน QR Code ด้วยแอป Authenticator > กรอกรหัส 6 หลักที่ได้ > เสร็จ! ครับ', en: 'Open Facebook > Settings > Security and Login > Two-Factor Authentication > Get Started > Choose "Authentication app" > Scan QR Code > Enter 6-digit code > Done!' },
        tip: null
      },
      {
        title: { th: 'เปิด 2FA บน Google/Gmail', en: 'Enable 2FA on Google/Gmail' },
        content: { th: 'ไปที่ myaccount.google.com > Security > 2-Step Verification > Get started ทำตามขั้นตอน เลือก Google Authenticator app หรือจะใช้ Google Prompts (แจ้งเตือนบนมือถือ) ก็สะดวกดีครับ', en: 'Go to myaccount.google.com > Security > 2-Step Verification > Get started. Choose Google Authenticator app or Google Prompts (phone notification).' },
        tip: null
      },
      {
        title: { th: 'เปิด 2FA บน LINE', en: 'Enable 2FA on LINE' },
        content: { th: 'เปิด LINE > Settings (เฟือง) > Account > เปิด "Login verification" หรือ "Login permitted" ตั้งรหัสผ่าน LINE ให้ซับซ้อน และลิงก์อีเมลกับ LINE เพื่อกู้คืนได้ในกรณีเปลี่ยนเครื่องครับ', en: 'Open LINE > Settings (gear) > Account > Enable "Login verification". Set a complex LINE password and link your email for recovery.' },
        tip: { th: 'LINE จะส่งรหัสยืนยันเมื่อมีคนพยายาม login จากอุปกรณ์ใหม่ครับ', en: 'LINE will send a verification code when someone tries to login from a new device' }
      },
      {
        title: { th: 'บันทึก Recovery Codes', en: 'Save Recovery Codes' },
        content: { th: 'เมื่อเปิด 2FA แต่ละบริการจะให้ recovery codes (รหัสสำรอง) ให้บันทึกไว้ในที่ปลอดภัย เช่น จดใส่กระดาษเก็บไว้ เพราะหากทำมือถือหาย จะต้องใช้รหัสนี้ในการเข้าบัญชีครับ', en: 'When enabling 2FA, each service provides recovery codes. Save them somewhere safe (e.g., write on paper). You\'ll need these if you lose your phone.' },
        tip: { th: 'อย่าเก็บ recovery codes ไว้ในมือถือเครื่องเดียวกันนะครับ เพราะถ้าเครื่องหายก็จะเข้าไม่ได้', en: 'Don\'t save recovery codes only on your phone — if you lose it, you won\'t be able to access them' }
      }
    ],
    warning: null,
    relatedArticles: ['facebook-hacked', 'line-scams'],
    emergencyContacts: null
  },

  {
    id: 'line-scams',
    category: 'scams',
    title: { th: 'มิจฉาชีพทาง LINE — วิธีสังเกตและป้องกัน', en: 'LINE Scams — How to Spot and Prevent Them' },
    description: { th: 'ระวัง! มิจฉาชีพใช้ LINE หลอกลวงมากขึ้น มาดูวิธีป้องกัน', en: 'Watch out! Scammers increasingly use LINE to deceive people' },
    difficulty: 'easy',
    icon: '💬',
    tags: ['line', 'scam', 'มิจฉาชีพ', 'หลอกลวง', 'ระวัง'],
    steps: [
      {
        title: { th: 'รู้จักมิจฉาชีพทาง LINE แบบต่างๆ', en: 'Know the Types of LINE Scams' },
        content: { th: '1) แอบอ้างเป็นเพื่อน/ญาติ ขอยืมเงิน 2) บัญชีปลอมแอบอ้างเป็นหน่วยงานราชการ 3) ชวนลงทุน/ทำงานออนไลน์ที่ได้เงินง่าย 4) ส่งลิงก์ปลอมให้กดเพื่อขโมยข้อมูล 5) กลุ่มลงทุนที่ดูน่าเชื่อถือแต่เป็นของปลอมครับ', en: '1) Impersonating friends/relatives asking for money 2) Fake government accounts 3) Investment/easy money job offers 4) Phishing links 5) Fake investment groups' },
        tip: null
      },
      {
        title: { th: 'วิธีตรวจสอบบัญชี LINE ว่าของจริงหรือปลอม', en: 'How to Verify if a LINE Account is Real or Fake' },
        content: { th: 'บัญชีทางการของ LINE จะมีเครื่องหมาย shield (โล่) สีเขียว (ฟรี) หรือสีน้ำเงิน (ยืนยันตัวตนแล้ว) ข้างชื่อ หากไม่มีโล่ ให้ระวังว่าอาจเป็นบัญชีปลอม หน่วยงานราชการจริงจะมีโล่สีน้ำเงินเสมอครับ', en: 'Official LINE accounts have a green (free) or blue (verified) shield icon next to the name. No shield = potentially fake. Real government agencies always have blue shields.' },
        tip: { th: 'กดที่ชื่อบัญชีเพื่อดูรายละเอียด ถ้าเป็นบัญชีจริงจะมีข้อมูลครบถ้วนครับ', en: 'Tap the account name for details — real accounts have complete information' }
      },
      {
        title: { th: 'อย่าเชื่อข้อความขอเงินทันที', en: 'Don\'t Trust Money Requests Immediately' },
        content: { th: 'หากเพื่อนหรือญาติส่งข้อความขอยืมเงินทาง LINE ให้โทรหาคนนั้นโดยตรง (อย่าใช้ LINE) เพื่อยืนยัน เพราะบัญชีอาจถูกแฮก มิจฉาชีพชอบใช้วิธีนี้เพราะเราจะเชื่อเพื่อนง่ายครับ', en: 'If a friend/relative asks for money on LINE, call them directly (not on LINE) to verify. Their account may be hacked. Scammers exploit trust between friends.' },
        tip: { th: 'ถามคำถามส่วนตัวที่คนอื่นตอบไม่ได้ เช่น "เราเจอกันล่าสุดที่ไหน?" เพื่อยืนยันตัวตน', en: 'Ask personal questions only the real person would know, like "Where did we last meet?"' }
      },
      {
        title: { th: 'อย่ากดลิงก์ที่ไม่รู้จัก', en: 'Never Click Unknown Links' },
        content: { th: 'ลิงก์จาก LINE ที่ดูน่าสงสัย (เช่น bit.ly/xxxx, tinyurl/xxxx หรือ URL ที่ดูแปลก) อย่ากดเด็ดขาด! อาจเป็นเว็บปลอมที่ขโมยรหัสผ่านธนาคาร หรือติดตั้งมัลแวร์ในเครื่องครับ', en: 'Never click suspicious links on LINE (e.g., bit.ly/xxxx, tinyurl/xxxx, or strange URLs). They may steal your banking password or install malware.' },
        tip: null
      },
      {
        title: { th: 'วิธีแจ้งบัญชี LINE ปลอม', en: 'How to Report Fake LINE Accounts' },
        content: { th: 'เปิดห้องแชทของบัญชีที่สงสัย > กดชื่อบัญชีด้านบน > เลื่อนลงกด "Report" > เลือกเหตุผล (Fraud/Scam) > ส่ง นอกจากนี้ยังแจ้งที่ สายด่วน 1441 หรือ thaipoliceonline.go.th ได้ครับ', en: 'Open the suspicious chat > tap the account name > scroll down and tap "Report" > select reason (Fraud/Scam) > submit. Also report at hotline 1441 or thaipoliceonline.go.th.' },
        tip: { th: 'การแจ้ง Report จะช่วยให้ LINE ระงับบัญชีปลอมเร็วขึ้น ช่วยคนอื่นไม่ให้ถูกหลอกครับ', en: 'Reporting helps LINE suspend fake accounts faster, protecting others from being scammed' }
      }
    ],
    warning: { th: '⚠️ หน่วยงานราชการจริง จะไม่ขอเงินหรือข้อมูลธนาคารผ่าน LINE เด็ดขาด! หากใครอ้างเป็นตำรวจ/ศาล/ธนาคาร แล้วขอเงิน ให้มั่นใจได้ว่าเป็นมิจฉาชีพครับ', en: '⚠️ Real government agencies will NEVER ask for money or banking info through LINE! If anyone claims to be police/court/bank and asks for money, it\'s definitely a scam.' },
    relatedArticles: ['facebook-hacked', 'enable-2fa', 'phishing-sms'],
    emergencyContacts: [
      { name: 'ศูนย์ AOC 1441', number: '1441', description: { th: 'ศูนย์ปฏิบัติการแก้ไขปัญหาอาชญากรรมออนไลน์', en: 'Anti-Online Scam Operation Center' } },
      { name: 'Tourist Police', number: '1155', description: { th: 'ตำรวจท่องเที่ยว', en: 'Tourist Police' } },
      { name: 'Thai Police Online', number: 'thaipoliceonline.go.th', description: { th: 'แจ้งความออนไลน์', en: 'Online Police Report' } }
    ]
  },

  {
    id: 'phishing-sms',
    category: 'scams',
    title: { th: 'SMS หลอกลวง — อย่าคลิกลิงก์!', en: 'Phishing SMS — Don\'t Click That Link!' },
    description: { th: 'ได้ SMS จากธนาคารหรือขนส่ง ให้กดลิงก์? ระวัง! อาจเป็นมิจฉาชีพ', en: 'Got SMS from a "bank" or delivery service with a link? It might be a scam!' },
    difficulty: 'easy',
    icon: '📩',
    tags: ['sms', 'phishing', 'หลอก', 'ลิงก์', 'ธนาคาร', 'scam'],
    steps: [
      {
        title: { th: 'รู้จัก SMS ปลอมแบบต่างๆ', en: 'Recognize Types of Fake SMS' },
        content: { th: '1) "ธนาคาร XXX: บัญชีถูกระงับ กดลิงก์เพื่อยืนยัน" 2) "คุณมีพัสดุรอรับ กดลิงก์เพื่อนัดส่ง" 3) "คุณได้รับเงินคืนภาษี กดลิงก์เพื่อรับ" 4) "บัตรเครดิตถูกใช้ผิดปกติ กดลิงก์ตรวจสอบ" ทั้งหมดนี้เป็นของปลอมครับ!', en: '1) "Bank XXX: Account suspended, click link to verify" 2) "You have a package, click link to schedule" 3) "Tax refund available, click to claim" 4) "Credit card suspicious activity, click to check" — ALL FAKE!' },
        tip: { th: 'ธนาคารจริงจะไม่ส่ง SMS ให้กดลิงก์เพื่อยืนยันข้อมูล จะส่งแจ้งเตือนในแอปธนาคารแทนครับ', en: 'Real banks don\'t send SMS with verification links — they notify you through the banking app' }
      },
      {
        title: { th: 'วิธีตรวจสอบว่า SMS เป็นของจริงหรือปลอม', en: 'How to Check if SMS is Real or Fake' },
        content: { th: 'ดูที่ URL ในข้อความ ถ้าไม่ใช่เว็บทางการ (เช่น ไม่ใช่ .go.th, ไม่ใช่เว็บธนาคารจริง) ให้ถือว่าเป็นของปลอม SMS จริงจากธนาคารมักไม่มี URL ที่ย่อ (bit.ly) และจะไม่ขอข้อมูลส่วนตัวครับ', en: 'Check the URL in the message. If it\'s not an official website (.go.th, real bank domain), treat it as fake. Real bank SMS rarely have shortened URLs (bit.ly) and don\'t ask for personal data.' },
        tip: { th: 'เวลาสงสัย ให้โทรหาธนาคารโดยตรงที่เบอร์ที่อยู่หลังบัตร อย่าโทรเบอร์ที่อยู่ใน SMS ครับ', en: 'When in doubt, call the bank directly at the number on the back of your card — never call numbers in the SMS' }
      },
      {
        title: { th: 'กดลิงก์ไปแล้ว ทำอย่างไร?', en: 'Already Clicked the Link — What to Do?' },
        content: { th: 'หากกดลิงก์ไปแล้ว: 1) อย่ากรอกข้อมูลใดๆ ปิดหน้าเว็บทันที 2) หากกรอกข้อมูลธนาคารไปแล้ว โทรแจ้งธนาคารทันทีเพื่อระงับบัตร/บัญชี 3) เปลี่ยนรหัสผ่านทุกบัญชีที่ใช้รหัสเดียวกัน 4) สแกนมือถือหาไวรัสครับ', en: 'If you clicked: 1) Don\'t enter any data, close the page immediately 2) If you entered banking info, call your bank immediately to freeze your card/account 3) Change passwords on all accounts using the same password 4) Scan your phone for viruses.' },
        tip: null
      },
      {
        title: { th: 'วิธีบล็อกเบอร์ SMS spam', en: 'How to Block Spam SMS Numbers' },
        content: { th: 'iPhone: เปิดข้อความ > กดเบอร์ด้านบน > กด "i" > "Block this Caller" Android: เปิดข้อความ > กดค้างที่ข้อความ > เลือก "Block" หรือ "Report spam" ทำทุกครั้งที่ได้รับ SMS ปลอมครับ', en: 'iPhone: Open Messages > tap number > "i" > "Block this Caller". Android: Open Messages > long press message > "Block" or "Report spam".' },
        tip: { th: 'iPhone ยังมีฟีเจอร์ "Filter Unknown Senders" ใน Settings > Messages เปิดไว้ช่วยกรอง SMS จากเบอร์ที่ไม่รู้จักครับ', en: 'iPhone also has "Filter Unknown Senders" in Settings > Messages — enable it to filter SMS from unknown numbers' }
      }
    ],
    warning: { th: '⚠️ หากโอนเงินให้มิจฉาชีพไปแล้ว ให้โทรแจ้งธนาคารทันที แล้วแจ้งความที่ สายด่วน 1441 ภายใน 24 ชั่วโมง อาจยังกันเงินไว้ได้ทันครับ', en: '⚠️ If you\'ve already transferred money to scammers, call your bank immediately, then report at hotline 1441 within 24 hours — they may still be able to freeze the funds.' },
    relatedArticles: ['facebook-hacked', 'line-scams', 'scam-money-report'],
    emergencyContacts: [
      { name: 'ศูนย์ AOC 1441', number: '1441', description: { th: 'ศูนย์ปฏิบัติการแก้ไขปัญหาอาชญากรรมออนไลน์', en: 'Anti-Online Scam Operation Center' } },
      { name: 'Tourist Police', number: '1155', description: { th: 'ตำรวจท่องเที่ยว', en: 'Tourist Police' } },
      { name: 'Thai Police Online', number: 'thaipoliceonline.go.th', description: { th: 'แจ้งความออนไลน์', en: 'Online Police Report' } }
    ]
  },

  {
    id: 'scam-money-report',
    category: 'scams',
    title: { th: 'ถูกหลอกโอนเงิน — ขั้นตอนแจ้งความและขอเงินคืน', en: 'Scammed Money Transfer — How to Report and Get Money Back' },
    description: { th: 'โอนเงินให้มิจฉาชีพไปแล้ว? ทำตามขั้นตอนนี้ด่วน!', en: 'Already transferred money to scammers? Follow these urgent steps!' },
    difficulty: 'hard',
    icon: '🆘',
    tags: ['scam', 'โอนเงิน', 'แจ้งความ', 'มิจฉาชีพ', 'กู้เงิน', 'ฉุกเฉิน'],
    steps: [
      {
        title: { th: 'โทรแจ้งธนาคารทันที!', en: 'Call Your Bank Immediately!' },
        content: { th: 'โทรหาธนาคารที่โอนเงินออกทันที แจ้งว่าถูกหลอกลวง ขอให้ระงับการโอน/อายัดบัญชีปลายทาง ธนาคารสามารถกันเงินไว้ได้หากแจ้งเร็วพอ (ภายใน 1-2 ชั่วโมงมีโอกาสสูง) ครับ', en: 'Call the bank you transferred from immediately. Request to freeze the receiving account. Banks can hold funds if reported quickly (within 1-2 hours has the best chance).' },
        tip: { th: 'เวลาสำคัญมาก! ยิ่งแจ้งเร็ว ยิ่งมีโอกาสได้เงินคืนสูงครับ', en: 'Time is critical! The sooner you report, the higher the chance of getting money back' }
      },
      {
        title: { th: 'โทร 1441 ศูนย์ AOC', en: 'Call 1441 Anti-Scam Center' },
        content: { th: 'โทร 1441 (ศูนย์ปฏิบัติการแก้ไขปัญหาอาชญากรรมออนไลน์) เปิดให้บริการ 24 ชั่วโมง แจ้งรายละเอียดการถูกหลอก จำนวนเงิน เลขบัญชีปลายทาง และวิธีที่ถูกหลอก เจ้าหน้าที่จะช่วยประสานกับธนาคารเพื่ออายัดเงินครับ', en: 'Call 1441 (Anti-Online Scam Operation Center), open 24 hours. Report details: amount, receiving account number, and how you were scammed. Officers will coordinate with banks to freeze funds.' },
        tip: null
      },
      {
        title: { th: 'แจ้งความออนไลน์ที่ thaipoliceonline.go.th', en: 'File Online Police Report at thaipoliceonline.go.th' },
        content: { th: 'ไปที่เว็บ thaipoliceonline.go.th ลงทะเบียน แล้วกรอกรายละเอียดแจ้งความ แนบหลักฐานทั้งหมด: สกรีนแคปข้อความ, สลิปโอนเงิน, เลขบัญชีมิจฉาชีพ จะได้เลขที่รับแจ้งความเพื่อติดตามเรื่องครับ', en: 'Go to thaipoliceonline.go.th, register, and file a report. Attach all evidence: screenshots of messages, transfer slips, scammer\'s account number.' },
        tip: { th: 'เก็บหลักฐานทั้งหมดไว้! อย่าลบแชท อย่าลบ SMS ถ่ายสกรีนแคปไว้ให้มากที่สุดครับ', en: 'Keep ALL evidence! Don\'t delete chats or SMS. Take as many screenshots as possible' }
      },
      {
        title: { th: 'เก็บหลักฐานทั้งหมด', en: 'Gather All Evidence' },
        content: { th: 'เก็บ: 1) สกรีนแคปข้อความ/แชท LINE/Facebook ทั้งหมด 2) สลิปการโอนเงิน 3) เลขบัญชีที่โอนไป 4) เบอร์โทร/บัญชีของมิจฉาชีพ 5) ลิงก์เว็บไซต์ที่เกี่ยวข้อง ส่งให้ตำรวจและธนาคารครับ', en: 'Save: 1) All chat screenshots (LINE/Facebook) 2) Transfer slips 3) Receiving account number 4) Scammer\'s phone/account 5) Related website links. Submit to police and bank.' },
        tip: null
      },
      {
        title: { th: 'ติดตามเรื่องและระวังตัว', en: 'Follow Up and Stay Vigilant' },
        content: { th: 'ติดตามเรื่องกับตำรวจทุก 1-2 สัปดาห์ ระวัง! มิจฉาชีพอาจติดต่อกลับมาอ้างว่าเป็น "เจ้าหน้าที่ช่วยเอาเงินคืน" แล้วหลอกซ้ำ อย่าเชื่อ! เจ้าหน้าที่จริงจะไม่ขอเงินเพิ่มเด็ดขาดครับ', en: 'Follow up with police every 1-2 weeks. Warning: Scammers may contact you again claiming to be "officials helping recover your money" — this is a SECOND SCAM. Real officials never ask for more money.' },
        tip: { th: 'แจ้งเตือนเพื่อนและครอบครัวเกี่ยวกับวิธีที่คุณถูกหลอก เพื่อป้องกันไม่ให้คนอื่นตกเป็นเหยื่อครับ', en: 'Warn friends and family about how you were scammed to prevent others from becoming victims' }
      }
    ],
    warning: { th: '🚨 เวลาคือเงิน! หากเพิ่งโอนเงินไป ให้โทรแจ้งธนาคารทันทีก่อนทำอย่างอื่น ยิ่งเร็วยิ่งมีโอกาสกันเงินไว้ได้ครับ', en: '🚨 Time is money! If you just transferred, call your bank IMMEDIATELY before anything else. The faster you act, the better chance of freezing the funds.' },
    relatedArticles: ['facebook-hacked', 'line-scams', 'phishing-sms'],
    emergencyContacts: [
      { name: 'ศูนย์ AOC 1441', number: '1441', description: { th: 'ศูนย์ปฏิบัติการแก้ไขปัญหาอาชญากรรมออนไลน์ (24 ชม.)', en: 'Anti-Online Scam Operation Center (24 hours)' } },
      { name: 'Tourist Police', number: '1155', description: { th: 'ตำรวจท่องเที่ยว', en: 'Tourist Police' } },
      { name: 'Thai Police Online', number: 'thaipoliceonline.go.th', description: { th: 'แจ้งความออนไลน์', en: 'Online Police Report' } }
    ]
  }
];
