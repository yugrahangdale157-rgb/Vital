// ==========================================================================
// VITAL CLOUD — Shared nav & footer markup (kept in one place across pages)
// ==========================================================================
(function(){
  const path = (location.pathname.split('/').pop() || 'index.html');

  function navLink(href, label){
    const active = (path === href) || (path === '' && href === 'index.html');
    return `<a href="${href}" class="nav-link${active ? ' active' : ''}">${label}</a>`;
  }

  const navHTML = `
  <nav class="site-nav">
    <div class="nav-inner">
      <a href="index.html" class="logo">
        <span class="logo-mark">
          <span class="pulse-ring"></span>
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="4" fill="#22D3EE"/>
            <circle cx="6" cy="8" r="2.4" fill="#A855F7"/>
            <circle cx="26" cy="8" r="2.4" fill="#3B82F6"/>
            <circle cx="6" cy="24" r="2.4" fill="#3B82F6"/>
            <circle cx="26" cy="24" r="2.4" fill="#A855F7"/>
            <path d="M16 16L6 8M16 16L26 8M16 16L6 24M16 16L26 24" stroke="#22D3EE" stroke-width="1" opacity="0.5"/>
          </svg>
        </span>
        Vital Cloud
      </a>
      <div class="nav-links">
        ${navLink('index.html', 'Home')}
        ${navLink('minecraft.html', 'Minecraft Hosting')}
        ${navLink('vps.html', 'VPS')}
        <a href="index.html#infrastructure" class="nav-link">Infrastructure</a>
        <a href="index.html#faq" class="nav-link">FAQ</a>
      </div>
      <div class="nav-cta">
        <a href="#" class="btn btn-ghost btn-sm">Log in</a>
        <a href="#" class="btn btn-primary btn-sm">Get started</a>
      </div>
      <button class="nav-toggle" aria-label="Open menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </nav>
  <div class="menu-scrim"></div>
  <div class="mobile-menu">
    <a href="index.html">Home</a>
    <a href="minecraft.html">Minecraft Hosting</a>
    <a href="vps.html">VPS</a>
    <a href="index.html#infrastructure">Infrastructure</a>
    <a href="index.html#faq">FAQ</a>
    <a href="#" class="btn btn-ghost btn-block">Log in</a>
    <a href="#" class="btn btn-primary btn-block">Get started</a>
  </div>
  `;

  const footerHTML = `
  <footer>
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-col">
          <a href="index.html" class="logo" style="font-size:18px;">
            <span class="logo-mark" style="width:26px;height:26px;">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="4" fill="#22D3EE"/>
                <circle cx="6" cy="8" r="2.4" fill="#A855F7"/>
                <circle cx="26" cy="8" r="2.4" fill="#3B82F6"/>
                <circle cx="6" cy="24" r="2.4" fill="#3B82F6"/>
                <circle cx="26" cy="24" r="2.4" fill="#A855F7"/>
              </svg>
            </span>
            Vital Cloud
          </a>
          <p class="footer-brand-desc">Premium Minecraft and VPS hosting on enterprise-grade infrastructure, engineered for speed and uptime.</p>
          <div class="newsletter">
            <input type="email" placeholder="Your email" aria-label="Email for newsletter">
            <button class="btn btn-primary btn-sm">Join</button>
          </div>
          <div class="social-row">
            <a href="#" class="social-icon" aria-label="Discord"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 9c2.5-1 5.5-1 8 0M7 15c3 1.2 7 1.2 10 0M9 12h.01M15 12h.01"/><path d="M6 6l-1.5 3v8L7 19l1-2M18 6l1.5 3v8L17 19l-1-2"/></svg></a>
            <a href="#" class="social-icon" aria-label="Twitter/X"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4l16 16M20 4L4 20"/></svg></a>
            <a href="#" class="social-icon" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Hosting</h5>
          <a href="minecraft.html">Minecraft Hosting</a>
          <a href="vps.html">VPS Hosting</a>
          <a href="index.html#infrastructure">Infrastructure</a>
          <a href="index.html#pricing">Pricing</a>
        </div>
        <div class="footer-col">
          <h5>Support</h5>
          <a href="#">Help Center</a>
          <a href="#">Submit a Ticket</a>
          <a href="index.html#faq">FAQ</a>
          <a href="#">System Status</a>
        </div>
        <div class="footer-col">
          <h5>Resources</h5>
          <a href="#">Knowledge Base</a>
          <a href="#">API Docs</a>
          <a href="#">Server Panel Guide</a>
          <a href="#">Modpack Library</a>
        </div>
        <div class="footer-col">
          <h5>Legal</h5>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Refund Policy</a>
          <a href="#">Acceptable Use</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Vital Cloud. All rights reserved.</span>
        <div class="footer-bottom-links">
          <span>contact@vitalcloud.fun</span>
          <span>14 regions worldwide</span>
        </div>
      </div>
    </div>
  </footer>
  `;

  document.addEventListener('DOMContentLoaded', () => {
    const navMount = document.getElementById('nav-mount');
    const footerMount = document.getElementById('footer-mount');
    if(navMount) navMount.outerHTML = navHTML;
    if(footerMount) footerMount.outerHTML = footerHTML;
  });
})();
