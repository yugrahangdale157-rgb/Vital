// ==========================================================================
// VITAL CLOUD — Shared interactions
// ==========================================================================
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- NAV SCROLL STATE ---------------- */
  const nav = document.querySelector('.site-nav');
  if(nav){
    const onScroll = () => {
      if(window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }

  /* ---------------- MOBILE MENU ---------------- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const scrim = document.querySelector('.menu-scrim');
  function closeMenu(){
    mobileMenu?.classList.remove('open');
    scrim?.classList.remove('open');
  }
  toggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('open');
    scrim?.classList.toggle('open');
  });
  scrim?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------------- SCROLL REVEAL ---------------- */
  const reveals = document.querySelectorAll('.reveal, .reveal-scale');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));

  /* ---------------- CURSOR GLOW ---------------- */
  if(!prefersReduced && window.matchMedia('(pointer:fine)').matches){
    const glow = document.querySelector('.cursor-glow');
    if(glow){
      window.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      }, { passive:true });
    }
  }

  /* ---------------- BUTTON RIPPLE ---------------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------------- ANIMATED COUNTERS ---------------- */
  const counters = document.querySelectorAll('[data-counter]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.counter);
      const decimals = (el.dataset.counter.split('.')[1] || '').length;
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = val.toFixed(decimals) + suffix;
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterIO.observe(el));

  /* ---------------- LIVE HERO TICKER ---------------- */
  const tickEl = document.getElementById('stat-live');
  if(tickEl){
    function jitter(){
      const val = 240 + Math.floor(Math.random()*90);
      tickEl.innerHTML = val.toLocaleString() + '<span class="unit">/min</span>';
    }
    jitter();
    setInterval(jitter, 2600);
  }

  /* ---------------- FAQ ACCORDION ---------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if(other !== item){
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if(isOpen){
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------------- PRICING TABS ---------------- */
  const tabs = document.querySelectorAll('.pricing-tab');
  const panels = document.querySelectorAll('[data-pricing-panel]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.dataset.tab;
      panels.forEach(p => {
        p.style.display = (p.dataset.pricingPanel === key) ? 'grid' : 'none';
      });
    });
  });

  /* ---------------- PARTICLE / AURORA HERO CANVAS ---------------- */
  const canvas = document.getElementById('particle-canvas');
  if(canvas){
    const ctx = canvas.getContext('2d');
    let W, H, DPR, particles = [];

    function resize(){
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    function initParticles(){
      const count = W < 700 ? 26 : 50;
      particles = Array.from({length: count}, () => ({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*1.6 + 0.6,
        vx: (Math.random()-0.5)*0.15,
        vy: (Math.random()-0.5)*0.15,
        hue: Math.random() > 0.5 ? '34,211,238' : '168,85,247',
        alpha: Math.random()*0.5 + 0.2
      }));
    }
    window.addEventListener('resize', () => { resize(); initParticles(); });
    resize(); initParticles();

    function drawParticles(){
      ctx.clearRect(0,0,W,H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > W) p.vx *= -1;
        if(p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
        ctx.shadowColor = `rgba(${p.hue},0.6)`;
        ctx.shadowBlur = 4;
        ctx.fill();
      });
      // subtle connecting lines for nearby particles
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a = particles[i], b = particles[j];
          const dx = a.x-b.x, dy = a.y-b.y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if(d < 120){
            ctx.beginPath();
            ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.strokeStyle = `rgba(150,180,255,${0.06 * (1 - d/120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      if(!prefersReduced) requestAnimationFrame(drawParticles);
    }
    if(prefersReduced){ drawParticles(); } else { requestAnimationFrame(drawParticles); }
  }

  /* ---------------- DASHBOARD MOCK LIVE BARS ---------------- */
  document.querySelectorAll('.dash-bar-fill[data-live]').forEach(bar => {
    setInterval(() => {
      const val = 30 + Math.random()*55;
      bar.style.width = val + '%';
      const valueEl = bar.closest('.dash-stat')?.querySelector('.value');
      if(valueEl && valueEl.dataset.livePercent !== undefined){
        valueEl.textContent = Math.round(val) + '%';
      }
    }, 2200);
  });

  document.querySelectorAll('.chart-bar').forEach((bar, i) => {
    bar.style.height = (20 + Math.random()*80) + '%';
    setInterval(() => {
      bar.style.transition = 'height 1.2s ease';
      bar.style.height = (20 + Math.random()*80) + '%';
    }, 2400 + i*80);
  });

})();
