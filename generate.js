const fs = require('fs');
const path = require('path');

const css = `
:root {
  --color-primary: #0F172A;
  --color-secondary: #334155;
  --color-accent: #A3824C;
  --color-accent-hover: #8C6D3A;
  --color-bg: #FFFFFF;
  --color-bg-alt: #F8FAFC;
  --color-border: #E2E8F0;
  --color-text: #1E293B;
  --color-text-muted: #64748B;
  --spacing-section: 120px;
  --layout-max-width: 1200px;
  --transition-standard: all 0.4s ease;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { 
  font-family: 'Noto Sans TC', sans-serif; 
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, .serif { font-family: 'Noto Serif TC', serif; font-weight: 600; }
a { text-decoration: none; color: inherit; transition: var(--transition-standard); }
ul { list-style: none; }
.container { max-width: var(--layout-max-width); margin: 0 auto; padding: 0 40px; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.section-title { font-size: 36px; color: var(--color-primary); margin-bottom: 16px; line-height: 1.3; letter-spacing: 2px; }
.section-subtitle { font-size: 13px; text-transform: uppercase; letter-spacing: 4px; color: var(--color-accent); margin-bottom: 24px; display: block; font-weight: 500; }
.divider { width: 40px; height: 2px; background-color: var(--color-accent); margin-bottom: 40px; }
header { position: fixed; top: 0; left: 0; right: 0; background-color: rgba(255, 255, 255, 0.98); border-bottom: 1px solid var(--color-border); z-index: 1000; height: 80px; display: flex; align-items: center; }
.header-inner { display: flex; justify-content: space-between; align-items: center; width: 100%; }
.brand { display: flex; flex-direction: column; }
.brand-zh { font-size: 22px; color: var(--color-primary); letter-spacing: 4px; line-height: 1.2; }
.brand-en { font-size: 9px; color: var(--color-text-muted); letter-spacing: 2px; text-transform: uppercase; font-family: sans-serif; }
.nav-links { display: flex; gap: 48px; }
.nav-links a { font-size: 13px; letter-spacing: 1px; color: var(--color-secondary); font-weight: 500; position: relative; }
.nav-links a.active { color: var(--color-accent); }
.nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; right: 0; height: 1px; background-color: var(--color-accent); transform: scaleX(0); transform-origin: right; transition: transform 0.4s ease; }
.nav-links a:hover::after, .nav-links a.active::after { transform: scaleX(1); transform-origin: left; }
.page-content { padding-top: 80px; min-height: calc(100vh - 150px); }
.hero { padding-top: 100px; padding-bottom: 120px; background-color: var(--color-bg-alt); border-bottom: 1px solid var(--color-border); }
.hero-content { max-width: 800px; }
.hero-tag { display: inline-block; padding: 6px 16px; border: 1px solid var(--color-accent); color: var(--color-accent); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; }
.hero-title { font-size: 56px; line-height: 1.2; color: var(--color-primary); margin-bottom: 32px; letter-spacing: 2px; }
.hero-desc { font-size: 18px; color: var(--color-text-muted); max-width: 600px; margin-bottom: 56px; font-weight: 300; }
.btn { display: inline-flex; align-items: center; justify-content: center; padding: 18px 40px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; border: none; }
.btn-primary { background-color: var(--color-primary); color: #FFF; }
.btn-primary:hover { background-color: var(--color-accent); }
.btn-outline { background-color: transparent; color: var(--color-primary); border: 1px solid var(--color-primary); }
.btn-outline:hover { background-color: var(--color-primary); color: #FFF; }
.hero-actions { display: flex; gap: 24px; }
.section { padding: var(--spacing-section) 0; border-bottom: 1px solid var(--color-border); }
.brand-content { padding-right: 40px; }
.brand-text p { margin-bottom: 24px; color: var(--color-text-muted); font-size: 15px; }
.brand-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 48px; border-top: 1px solid var(--color-border); padding-top: 40px; }
.stat-item { display: flex; flex-direction: column; }
.stat-num { font-size: 36px; color: var(--color-primary); line-height: 1; margin-bottom: 8px; }
.stat-label { font-size: 12px; color: var(--color-text-muted); letter-spacing: 1px; text-transform: uppercase; }
.brand-image-placeholder { background-color: var(--color-primary); height: 100%; min-height: 500px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #FFF; text-align: center; padding: 40px; }
.sika-logo { font-size: 64px; letter-spacing: 12px; margin-bottom: 16px; font-weight: 700; }
.sika-sub { font-size: 11px; letter-spacing: 4px; opacity: 0.6; font-family: sans-serif; }
.product-card { border: 1px solid var(--color-border); padding: 48px 32px; background-color: var(--color-bg); transition: var(--transition-standard); }
.product-card:hover { border-color: var(--color-accent); box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05); transform: translateY(-4px); }
.product-category { font-size: 10px; color: var(--color-accent); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; display: block; }
.product-title { font-size: 20px; color: var(--color-primary); margin-bottom: 16px; }
.product-card p { font-size: 14px; color: var(--color-text-muted); margin-bottom: 32px; }
.product-link { font-size: 12px; color: var(--color-primary); letter-spacing: 1px; font-weight: 500; text-transform: uppercase; border-bottom: 1px solid var(--color-primary); padding-bottom: 4px; }
.product-link:hover { color: var(--color-accent); border-color: var(--color-accent); }
.contact-wrapper { background-color: var(--color-primary); color: #FFF; padding: 80px; }
.contact-wrapper .section-title { color: #FFF; }
.contact-list { display: flex; flex-direction: column; gap: 32px; }
.contact-item { display: flex; flex-direction: column; gap: 8px; }
.contact-item-label { font-size: 11px; color: var(--color-accent); letter-spacing: 2px; text-transform: uppercase; }
.contact-item-value { font-size: 18px; font-weight: 300; letter-spacing: 1px; line-height: 1.6; }
.contact-item-value a { color: #FFF; }
.contact-item-value a:hover { color: var(--color-accent); }
.map-box { border: 1px solid rgba(255,255,255,0.2); height: 100%; min-height: 400px; display: flex; align-items: center; justify-content: center; background-color: rgba(255,255,255,0.02); }
.map-text { font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.5); text-transform: uppercase; }
footer { padding: 60px 0; background-color: #000000; color: rgba(255,255,255,0.4); font-size: 12px; letter-spacing: 1px; }
.footer-inner { display: flex; justify-content: space-between; align-items: center; }
.footer-links { display: flex; gap: 32px; }
.footer-links a:hover { color: #FFF; }
@media (max-width: 992px) { .grid-2 { grid-template-columns: 1fr; gap: 60px; } .grid-3 { grid-template-columns: 1fr 1fr; gap: 32px; } .contact-wrapper { padding: 40px; } .hero-title { font-size: 40px; } }
@media (max-width: 768px) { .grid-3 { grid-template-columns: 1fr; } .nav-links { display: none; } .footer-inner { flex-direction: column; gap: 24px; text-align: center; } .hero-actions { flex-direction: column; } }
`;

const getLayout = (title, content, activePage) => `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | 宇禾建材 YU HE BUILDING MATERIALS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700&family=Noto+Sans+TC:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <div class="container header-inner">
      <a href="index.html" class="brand">
        <span class="brand-zh serif">宇禾建材</span>
        <span class="brand-en">Yu He Building Materials</span>
      </a>
      <nav class="nav-links">
        <a href="about.html" class="${activePage === 'about' ? 'active' : ''}">關於我們</a>
        <a href="brand.html" class="${activePage === 'brand' ? 'active' : ''}">代理品牌</a>
        <a href="products.html" class="${activePage === 'products' ? 'active' : ''}">產品項目</a>
        <a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">聯絡資訊</a>
      </nav>
    </div>
  </header>
  <div class="page-content">
    ${content}
  </div>
  <footer>
    <div class="container footer-inner">
      <div class="copyright">&copy; 2024 YU HE BUILDING MATERIALS CO., LTD. ALL RIGHTS RESERVED.</div>
      <div class="footer-links">
        <a href="index.html">OFFICIAL WEBSITE</a>
        <a href="https://www.facebook.com/p/%E5%AE%87%E7%A6%BE%E5%BB%BA%E6%9D%90-61561918858893/" target="_blank">FACEBOOK</a>
      </div>
    </div>
  </footer>
</body>
</html>`;

const pages = {
  index: {
    title: '首頁',
    active: 'index',
    content: `
      <section class="hero">
        <div class="container grid-2" style="align-items: center; gap: 60px;">
          <div class="hero-content" style="max-width: 100%;">
            <span class="hero-tag">SIKA 台灣總代理</span>
            <h1 class="hero-title" style="font-size: 48px;">您專業建築工程的<br>頂尖合作夥伴</h1>
            <p class="hero-desc" style="font-size: 16px; margin-bottom: 40px;">在速成主義盛行的時代，我們以精準為犁，深耕每寸工地。<br>提供高品質、低揮發的綠建築建材，讓每一次選擇都成為時間帶不走的建築詩篇。</p>
            <div class="hero-actions">
              <a href="products.html" class="btn btn-primary">瀏覽產品目錄</a>
              <a href="contact.html" class="btn btn-outline">與我們聯繫</a>
            </div>
          </div>
          <div class="hero-image">
            <img src="hero.png" alt="High-end modern architecture" style="width: 100%; height: auto; display: block; border: 1px solid var(--color-border); box-shadow: 0 20px 60px rgba(15,23,42,0.1);">
          </div>
        </div>
      </section>
    `
  },
  about: {
    title: '關於我們',
    active: 'about',
    content: `
      <section class="section">
        <div class="container">
          <span class="section-subtitle">About Us</span>
          <h2 class="section-title">關於宇禾建材</h2>
          <div class="divider"></div>
          <div class="grid-2">
            <div>
              <p style="margin-bottom: 24px; color: var(--color-text-muted); font-size: 15px;">宇禾建材秉持專業與嚴謹的態度，為建築、土木工程提供最完整的材料解決方案。我們深知每一磚一瓦、每一寸填縫，都關乎建築的百年大計。</p>
              <p style="margin-bottom: 24px; color: var(--color-text-muted); font-size: 15px;">在追求效率與成本的現代，我們堅持引進國際頂級建材，以瑞士百年品牌 SIKA 西卡為核心，提供防水、黏著、填縫等專業產品。我們的目標不僅是材料供應，更是您的工程技術顧問。</p>
              <div class="brand-stats" style="border-top: none; padding-top: 20px;">
                <div class="stat-item"><span class="stat-num serif">ISO</span><span class="stat-label">Quality Certification</span></div>
                <div class="stat-item"><span class="stat-num serif">Green</span><span class="stat-label">Sustainable Materials</span></div>
              </div>
            </div>
            <div style="background-color: var(--color-bg-alt); padding: 40px; border: 1px solid var(--color-border);">
              <h3 style="margin-bottom: 20px; color: var(--color-primary);">核心價值</h3>
              <ul style="display: flex; flex-direction: column; gap: 16px; color: var(--color-text-muted); font-size: 14px;">
                <li style="border-bottom: 1px solid var(--color-border); padding-bottom: 16px;"><strong>精準專業：</strong> 依據不同工程需求，提供最適合的材料配方建議。</li>
                <li style="border-bottom: 1px solid var(--color-border); padding-bottom: 16px;"><strong>永續綠能：</strong> 推廣低揮發 (VOC) 環保建材，對施工者與環境友善。</li>
                <li><strong>品質堅持：</strong> 總代理原廠正品，確保工程長效耐用，抵抗歲月侵蝕。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `
  },
  brand: {
    title: '代理品牌',
    active: 'brand',
    content: `
      <section class="section">
        <div class="container grid-2">
          <div class="brand-content">
            <span class="section-subtitle">Official Partner</span>
            <h2 class="section-title">瑞士百年企業<br>SIKA 合作夥伴</h2>
            <div class="divider"></div>
            <div class="brand-text">
              <p>SIKA（西卡）創立於 1910 年瑞士，為全球建材化學品領域之領導企業。旗下產品嚴格遵循高規格標準，廣泛應用於防水、黏著、密封、補強及保護工程。</p>
              <p>宇禾建材作為 SIKA 台灣區總代理商，秉持專業與嚴謹的態度，為建築、土木工程提供最完整的材料解決方案。我們不僅提供材料，更提供專業的選材諮詢與技術支援，確保工程品質與永續性。</p>
            </div>
            <div class="brand-stats">
              <div class="stat-item"><span class="stat-num serif">100+</span><span class="stat-label">Years of History</span></div>
              <div class="stat-item"><span class="stat-num serif">Global</span><span class="stat-label">Worldwide Presence</span></div>
            </div>
          </div>
          <div class="brand-visual">
            <div class="brand-image-placeholder">
              <div class="sika-logo serif">SIKA</div>
              <div class="sika-sub">SWITZERLAND · SINCE 1910</div>
            </div>
          </div>
        </div>
      </section>
    `
  },
  products: {
    title: '產品項目',
    active: 'products',
    content: `
      <section class="section bg-light">
        <div class="container">
          <span class="section-subtitle">Product Categories</span>
          <h2 class="section-title">專業建材系列</h2>
          <div class="divider"></div>
          <div class="grid-3">
            <div class="product-card">
              <span class="product-category">Waterproofing</span>
              <h3 class="product-title">防水工程黏著劑</h3>
              <p>高效能防水系列，適用於屋頂、浴室、地下室等各種嚴苛環境之防水工程需求，具備卓越耐久性與耐候性。</p>
              <a href="contact.html" class="product-link">Request Details</a>
            </div>
            <div class="product-card">
              <span class="product-category">Mortar Additives</span>
              <h3 class="product-title">砂漿添加劑</h3>
              <p>顯著改善砂漿工作性與物理強度，增加結構黏著力與柔韌度，為各類土木與建築工程提升整體施工品質。</p>
              <a href="contact.html" class="product-link">Request Details</a>
            </div>
            <div class="product-card">
              <span class="product-category">Tile Grouts</span>
              <h3 class="product-title">磁磚填縫劑</h3>
              <p>高硬度、防水防霉之專業填縫材料，提供多樣化色彩選擇，確保磁磚工程之視覺精緻度與長效耐久性。</p>
              <a href="contact.html" class="product-link">Request Details</a>
            </div>
            <div class="product-card">
              <span class="product-category">Adhesives</span>
              <h3 class="product-title">磁磚黏著劑</h3>
              <p>高強黏著力之磁磚專用接著劑，適用於高低落差環境、牆面及地面鋪設，確保長期穩固不脫落。</p>
              <a href="contact.html" class="product-link">Request Details</a>
            </div>
            <div class="product-card">
              <span class="product-category">Structural</span>
              <h3 class="product-title">結構補強材料</h3>
              <p>專業混凝土修補與結構補強產品，有效提升建築體耐久性，抵抗外在環境侵蝕與風化作用。</p>
              <a href="contact.html" class="product-link">Request Details</a>
            </div>
            <div class="product-card">
              <span class="product-category">Green Materials</span>
              <h3 class="product-title">低揮發環保建材</h3>
              <p>符合嚴格綠建材認證標準，極低 VOC 揮發量，友善施工人員健康及自然環境，為現代永續建築首選。</p>
              <a href="contact.html" class="product-link">Request Details</a>
            </div>
          </div>
        </div>
      </section>
    `
  },
  contact: {
    title: '聯絡資訊',
    active: 'contact',
    content: `
      <section class="section" style="border-bottom: none; padding-bottom: 80px;">
        <div class="container">
          <div class="contact-wrapper">
            <div class="grid-2">
              <div>
                <span class="section-subtitle" style="color:#FFF;">Corporate Information</span>
                <h2 class="section-title">聯絡資訊</h2>
                <div class="divider" style="background-color:#FFF;"></div>
                <div class="contact-list">
                  <div class="contact-item"><span class="contact-item-label">Address</span><span class="contact-item-value">302 新竹縣竹北市自強五路 253 號</span></div>
                  <div class="contact-item"><span class="contact-item-label">Telephone</span><span class="contact-item-value"><a href="tel:036670386">03-6670386</a></span></div>
                  <div class="contact-item"><span class="contact-item-label">Mobile</span><span class="contact-item-value"><a href="tel:0963380315">0963-380-315</a></span></div>
                  <div class="contact-item"><span class="contact-item-label">Facsimile</span><span class="contact-item-value">03-6673910</span></div>
                  <div class="contact-item"><span class="contact-item-label">Email Address</span><span class="contact-item-value"><a href="mailto:line0963@gmail.com">line0963@gmail.com</a></span></div>
                </div>
              </div>
              <div>
                <div class="map-box"><span class="map-text">Location Map</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }
};

const outputDir = '/Users/zhuangzijin/.gemini/antigravity-ide/scratch/yuhe-website';

fs.writeFileSync(path.join(outputDir, 'style.css'), css);
for (const [key, data] of Object.entries(pages)) {
  fs.writeFileSync(path.join(outputDir, key + '.html'), getLayout(data.title, data.content, data.active));
}
console.log('Pages generated successfully!');
