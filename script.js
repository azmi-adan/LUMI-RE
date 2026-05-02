/* ============================================================
   script.js  —  L'ORÉAL Ad Template
   ① RENDER  — builds every DOM node from AD_CONFIG
   ② PALETTE  — writes CSS variables from config.palette
   ③ ANIMATE  — cursor, particles, tilt, shade picker, etc.
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   ① RENDER FROM CONFIG
   ───────────────────────────────────────────────────────────── */
(function render() {
  const C = AD_CONFIG;

  /* helpers */
  const $  = id => document.getElementById(id);
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls)  e.className   = cls;
    if (html) e.innerHTML   = html;
    return e;
  };

  /* Page title */
  document.title = `${C.brand.name} — ${C.product.titleLine1} ${C.product.titleLine2}`;

  /* ── Topbar ── */
  $('brandTag').textContent = C.brand.name;
  C.nav.forEach(item => {
    $('topNav').appendChild(el('span', '', item));
  });

  /* ── Hero left ── */
  $('productBadge').textContent = C.product.badge;
  $('titleLine1').textContent   = C.product.titleLine1;
  $('titleLine2').textContent   = C.product.titleLine2;
  $('titleLine3').textContent   = C.product.titleLine3;
  $('heroDesc').innerHTML       = C.product.description;
  $('ctaPrimaryText').textContent = C.product.ctaPrimary;
  $('ctaGhostBtn').textContent    = C.product.ctaGhost;

  /* ── Swatches ── */
  C.shades.forEach((shade, i) => {
    const sw = el('div', `swatch${i === 0 ? ' active' : ''}`);
    sw.setAttribute('data-shade', i);
    sw.setAttribute('title', shade.name);
    sw.style.setProperty('--c', shade.hex);
    $('swatchRow').appendChild(sw);
  });

  /* ── Tube label ── */
  $('labelBrand').textContent = C.product.tubeLabel.brand;
  $('labelName').textContent  = C.product.tubeLabel.name;
  $('labelSub').textContent   = C.product.tubeLabel.sub;

  /* ── Stats ── */
  C.stats.forEach((s, i) => {
    const card = el('div', 'stat-card');
    card.style.setProperty('--delay', `${i * 0.15}s`);
    card.innerHTML = `
      <span class="stat-num">${s.value}<em>${s.unit}</em></span>
      <span class="stat-desc">${s.desc}</span>`;
    $('statCards').appendChild(card);
  });

  /* ── Ingredients ── */
  C.ingredients.forEach(ing => {
    $('ingPills').appendChild(el('span', 'pill', ing));
  });

  /* ── Rating ── */
  const stars = '★'.repeat(Math.round(parseFloat(C.rating.score)));
  $('ratingBlock').innerHTML = `
    <div class="stars">${stars}</div>
    <span class="rating-text">${C.rating.score} / ${C.rating.outOf} — ${C.rating.count} reviews</span>`;

  /* ── Ticker ── */
  const tickerText = (C.tickerItems.join(' &nbsp;✦&nbsp; ') + ' &nbsp;✦&nbsp; ').repeat(4);
  $('tickerTrack').innerHTML = `<span>${tickerText}</span>`;

  /* ── Features ── */
  $('featBgText').textContent = C.features.bgWord;
  C.features.items.forEach((f, i) => {
    const item = el('div', 'feat-item');
    item.setAttribute('data-aos', '');
    if (i > 0) item.style.setProperty('--ao', `${i * 0.1}s`);
    item.innerHTML = `
      <div class="feat-icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.body}</p>`;
    $('featGrid').appendChild(item);
  });

  /* ── Shades section ── */
  $('shadesEyebrow').textContent = C.shadesSection.eyebrow;
  $('shadesTitle').innerHTML = `${C.shadesSection.titleLine1}<br/><em>${C.shadesSection.titleLine2}</em>`;

  C.shades.forEach((shade, i) => {
    const card = el('div', 'shade-card');
    card.setAttribute('data-color', shade.hex);
    card.innerHTML = `
      <div class="shade-orb"></div>
      <div class="shade-info">
        <span class="shade-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="shade-name">${shade.name}</span>
      </div>`;
    $('shadesCarousel').appendChild(card);
  });

  // Shade orb colours (can't be set via data-attr alone due to gradient)
  document.querySelectorAll('.shade-card').forEach((card, i) => {
    const hex = C.shades[i].hex;
    const orb = card.querySelector('.shade-orb');
    orb.style.background = buildOrbGradient(hex);
  });

  /* ── Final CTA ── */
  $('finalEyebrow').textContent = C.finalCta.eyebrow;
  $('finalHeadline').innerHTML  = `${C.finalCta.headLine1}<br/><em>${C.finalCta.headLine2}</em>`;
  $('finalBody').innerHTML      = `${C.product.availability} <strong>${C.brand.website}</strong>`;
  $('finalCtaText').textContent = C.product.ctaFinal;

  /* ── Price tag ── */
  $('priceTag').innerHTML = `
    <span class="price-from">${C.product.priceLabel}</span>
    <span class="price-val">${C.product.price}</span>`;

  /* ── Footer ── */
  $('footerBar').innerHTML = `
    <span>© ${C.brand.copyright}</span>
    <span>${C.brand.country}</span>`;

  /* ── Dynamic shades grid columns ── */
  const count = C.shades.length;
  $('shadesCarousel').style.gridTemplateColumns = `repeat(${Math.min(count, 6)}, 1fr)`;

})();


/* ─────────────────────────────────────────────────────────────
   ② APPLY PALETTE FROM CONFIG
   ───────────────────────────────────────────────────────────── */
(function applyPalette() {
  const root = document.documentElement;
  const p    = AD_CONFIG.palette;
  root.style.setProperty('--rose',        p.rose);
  root.style.setProperty('--rose-light',  p.roseLight);
  root.style.setProperty('--rose-pale',   p.rosePale);
  root.style.setProperty('--crimson',     p.crimson);
  root.style.setProperty('--gold',        p.gold);
  root.style.setProperty('--gold-light',  p.goldLight);
  root.style.setProperty('--ink',         p.ink);
  root.style.setProperty('--ink-mid',     p.inkMid);
  root.style.setProperty('--ink-soft',    p.inkSoft);
  root.style.setProperty('--shade-color', AD_CONFIG.shades[0].hex);
})();


/* ─────────────────────────────────────────────────────────────
   UTILITY — colour helpers
   ───────────────────────────────────────────────────────────── */
function hexToRgb(hex) {
  const c = parseInt(hex.replace('#', ''), 16);
  return { r: (c >> 16) & 0xff, g: (c >> 8) & 0xff, b: c & 0xff };
}

function shiftHex(hex, amt) {
  const { r, g, b } = hexToRgb(hex);
  const clamp = v => Math.max(0, Math.min(255, v + amt));
  return '#' + [clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, '0')).join('');
}

function buildOrbGradient(hex) {
  return `radial-gradient(circle at 35% 35%, ${shiftHex(hex, 50)} 0%, ${hex} 50%, ${shiftHex(hex, -40)} 100%)`;
}


/* ─────────────────────────────────────────────────────────────
   ③ ANIMATIONS & INTERACTIONS
   ───────────────────────────────────────────────────────────── */

/* === CURSOR === */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function trailLoop() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(trailLoop);
})();

document.querySelectorAll('button, .swatch, .shade-card, .topnav span').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width      = '40px';
    cursor.style.height     = '40px';
    cursor.style.background = 'rgba(232,201,122,0.8)';
    cursorTrail.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width      = '12px';
    cursor.style.height     = '12px';
    cursor.style.background = AD_CONFIG.palette.rose;
    cursorTrail.style.opacity = '0.7';
  });
});


/* === PARTICLE CANVAS === */
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

// Build particle colour list from config shades + gold
const PARTICLE_COLORS = [
  ...AD_CONFIG.shades.map(s => s.hex),
  AD_CONFIG.palette.gold,
  AD_CONFIG.palette.goldLight,
];

class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x   = Math.random() * W;
    this.y   = init ? Math.random() * H : H + 10;
    this.r   = Math.random() * 2.5 + 0.5;
    this.vx  = (Math.random() - 0.5) * 0.4;
    this.vy  = -(Math.random() * 0.6 + 0.2);
    this.col = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    this.lif = 0;
    this.maxLife    = Math.random() * 200 + 150;
    this.twSpeed    = Math.random() * 0.04 + 0.02;
    this.twOffset   = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.lif++;
    if (this.y < -20 || this.lif > this.maxLife) this.reset();
  }
  draw() {
    const a = Math.sin((this.lif / this.maxLife) * Math.PI) * 0.8;
    const t = 0.5 + 0.5 * Math.sin(this.lif * this.twSpeed + this.twOffset);
    ctx.save();
    ctx.globalAlpha = a * t;
    ctx.fillStyle   = this.col;
    ctx.shadowBlur  = 8;
    ctx.shadowColor = this.col;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class GlowOrb {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x   = Math.random() * W;
    this.y   = init ? Math.random() * H : H + 100;
    this.r   = Math.random() * 30 + 15;
    this.vx  = (Math.random() - 0.5) * 0.15;
    this.vy  = -(Math.random() * 0.15 + 0.05);
    this.col = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    this.lif = 0;
    this.maxLife = Math.random() * 400 + 300;
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.lif++;
    if (this.y < -this.r * 2 || this.lif > this.maxLife) this.reset();
  }
  draw() {
    const a    = Math.sin((this.lif / this.maxLife) * Math.PI) * 0.12;
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    grad.addColorStop(0, this.col + 'aa');
    grad.addColorStop(1, this.col + '00');
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle   = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const particles = Array.from({ length: 120 }, () => new Particle());
const orbs      = Array.from({ length: 8 },   () => new GlowOrb());

(function particleLoop() {
  ctx.clearRect(0, 0, W, H);
  orbs.forEach(o => { o.update(); o.draw(); });
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(particleLoop);
})();


/* === 3D TILT === */
const productScene = document.getElementById('productScene');
const heroCenter   = document.getElementById('heroCenter');
let tiltX = 0, tiltY = 0, targetTiltX = 0, targetTiltY = 0;

if (heroCenter) {
  heroCenter.addEventListener('mousemove', e => {
    const rect = heroCenter.getBoundingClientRect();
    const dx   = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    const dy   = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
    targetTiltX = -dy * 18;
    targetTiltY =  dx * 18;
  });
  heroCenter.addEventListener('mouseleave', () => { targetTiltX = 0; targetTiltY = 0; });
}

(function tiltLoop() {
  tiltX += (targetTiltX - tiltX) * 0.08;
  tiltY += (targetTiltY - tiltY) * 0.08;
  if (productScene) productScene.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  requestAnimationFrame(tiltLoop);
})();


/* === SHADE PICKER === */
let currentShadeIndex = 0;

function setShade(index) {
  if (index < 0 || index >= AD_CONFIG.shades.length) return;
  currentShadeIndex = index;
  const hex  = AD_CONFIG.shades[index].hex;
  const dark = shiftHex(hex, -50);
  const mid  = shiftHex(hex, -20);

  // Tube body gradient
  const tubeBody = document.getElementById('tubeBody');
  if (tubeBody) {
    tubeBody.style.background = `linear-gradient(
      160deg,
      ${shiftHex(hex,-60)} 0%,
      ${hex} 18%,
      ${mid} 50%,
      ${shiftHex(hex,-30)} 75%,
      ${dark} 100%)`;
    tubeBody.style.transition = 'background 0.6s ease';
  }

  // Tube glow
  const tube = document.querySelector('.tube');
  if (tube) tube.style.filter = `drop-shadow(0 30px 60px ${hex}99) drop-shadow(0 0 40px ${hex}44)`;

  // Shadow plane
  const shadow = document.querySelector('.shadow-plane');
  if (shadow) shadow.style.background = `radial-gradient(ellipse, ${hex}80 0%, transparent 70%)`;

  // CSS variable (affects blobs, halos, etc.)
  document.documentElement.style.setProperty('--shade-color', hex);
  document.documentElement.style.setProperty('--rose', hex);

  // Active swatch
  document.querySelectorAll('.swatch').forEach((sw, i) => {
    sw.classList.toggle('active', i === index);
  });

  // Active shade card
  document.querySelectorAll('.shade-card').forEach((card, i) => {
    card.classList.toggle('shade-active', i === index);
  });

  // Ripple burst
  spawnRipple(hex);
}

function spawnRipple(hex) {
  injectStyle('rippleStyle', `
    @keyframes rippleOut {
      0%   { transform: scale(1); opacity: .7; }
      100% { transform: scale(20); opacity: 0; }
    }`);

  const r = document.createElement('div');
  r.style.cssText = `
    position:absolute; top:50%; left:50%;
    width:12px; height:12px; margin:-6px;
    border-radius:50%; background:${hex};
    pointer-events:none; z-index:100;
    animation: rippleOut .75s ease-out forwards;`;

  const tc = document.getElementById('tubeContainer');
  if (tc) { tc.style.position = 'relative'; tc.appendChild(r); setTimeout(() => r.remove(), 750); }
}

// Wire up swatches (re-query after render)
document.querySelectorAll('.swatch').forEach((sw, i) => {
  sw.addEventListener('click', () => setShade(i));
});

document.querySelectorAll('.shade-card').forEach((card, i) => {
  card.addEventListener('click', () => setShade(i));
});

// Apply first shade immediately
setShade(0);


/* === SCROLL REVEALS === */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });

document.querySelectorAll('[data-aos]').forEach(el => revealObs.observe(el));


/* === MAGNETIC BUTTONS === */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx   = e.clientX - rect.left  - rect.width  / 2;
    const dy   = e.clientY - rect.top   - rect.height / 2;
    btn.style.transform = `translateY(-3px) translate(${dx * 0.25}px, ${dy * 0.3}px) scale(1.04)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});


/* === CLICK RIPPLE ON BUTTONS === */
injectStyle('btnRippleStyle', `
  @keyframes btnRipple { to { width:300px; height:300px; opacity:0; } }`);

document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect   = this.getBoundingClientRect();
    const circle = document.createElement('span');
    circle.style.cssText = `
      position:absolute; left:${e.clientX - rect.left}px; top:${e.clientY - rect.top}px;
      width:0; height:0; border-radius:50%; background:rgba(255,255,255,0.3);
      transform:translate(-50%,-50%); pointer-events:none;
      animation:btnRipple .6s ease-out forwards;`;
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});


/* === SCROLL PARALLAX === */
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  document.querySelectorAll('.blob').forEach((b, i) => {
    b.style.transform = `translateY(${sy * (i + 1) * 0.07}px)`;
  });
  const hl = document.getElementById('heroLeft');
  const hr = document.getElementById('heroRight');
  if (hl) hl.style.transform = `translateY(${sy * 0.12}px)`;
  if (hr) hr.style.transform = `translateY(${sy * 0.08}px)`;
}, { passive: true });


/* === DYNAMIC GLOW FOLLOW === */
document.addEventListener('mousemove', e => {
  const tc = document.getElementById('tubeContainer');
  if (!tc) return;
  const rect = tc.getBoundingClientRect();
  const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
  const glow = Math.max(0, 1 - dist / 500);
  if (glow > 0) {
    const hex = AD_CONFIG.shades[currentShadeIndex].hex;
    document.querySelector('.tube').style.filter =
      `drop-shadow(0 30px 60px ${hex}99) drop-shadow(0 0 ${Math.round(glow * 80)}px ${hex}66)`;
  }
});


/* === FINAL CTA ENTRANCE === */
const finalCtaObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    ['#finalEyebrow','#finalHeadline','#finalBody','#finalCtaBtn','#priceTag'].forEach((sel, i) => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.style.cssText = 'opacity:0; transform:translateY(30px)';
      setTimeout(() => {
        el.style.cssText = 'transition:opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1); opacity:1; transform:translateY(0)';
      }, i * 150);
    });
    finalCtaObs.unobserve(entry.target);
  });
}, { threshold: 0.3 });

const finalCta = document.getElementById('finalCta');
if (finalCta) finalCtaObs.observe(finalCta);


/* === STAT CARDS ENTRANCE === */
window.addEventListener('load', () => {
  document.querySelectorAll('.stat-card').forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateX(40px)';
    setTimeout(() => {
      card.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1)';
      card.style.opacity    = '1';
      card.style.transform  = 'translateX(0)';
    }, 800 + i * 160);
  });
});


/* === SHADE CARD HOVER GLOW (dynamic per shade colour) === */
document.querySelectorAll('.shade-card').forEach((card, i) => {
  const hex = AD_CONFIG.shades[i]?.hex || '#C94060';
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = `0 24px 60px rgba(0,0,0,.4), 0 0 30px ${hex}66, 0 0 0 1px ${hex}44`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});


/* === TOUCH TILT (mobile) === */
let touchSX = 0, touchSY = 0;
document.addEventListener('touchstart',  e => { touchSX = e.touches[0].clientX; touchSY = e.touches[0].clientY; }, { passive: true });
document.addEventListener('touchmove',   e => {
  if (!productScene) return;
  targetTiltX = -((e.touches[0].clientY - touchSY) / window.innerHeight) * 12;
  targetTiltY =  ((e.touches[0].clientX - touchSX) / window.innerWidth)  * 12;
}, { passive: true });
document.addEventListener('touchend',    () => { targetTiltX = 0; targetTiltY = 0; });


/* === INJECT STYLE HELPER (avoids duplicates) === */
function injectStyle(id, css) {
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id   = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}


/* === GHOST BUTTON → SCROLL TO SHADES === */
document.getElementById('ctaGhostBtn')?.addEventListener('click', () => {
  document.getElementById('shadesSection')?.scrollIntoView({ behavior: 'smooth' });
});

/* === "EXPLORE" NAV LINKS → SMOOTH SCROLL === */
document.querySelectorAll('.topnav span').forEach((span, i) => {
  const targets = ['#shadesSection', '#shadesSection', '#features'];
  span.addEventListener('click', () => {
    document.querySelector(targets[i] || '#hero')?.scrollIntoView({ behavior: 'smooth' });
  });
});


/* === USE TEMPLATE MODAL === */
const modalOverlay   = document.getElementById('modalOverlay');
const useTemplateBtn = document.getElementById('useTemplateBtn');
const modalClose     = document.getElementById('modalClose');

function openModal() {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

useTemplateBtn?.addEventListener('click', openModal);
modalClose?.addEventListener('click', closeModal);

// Close on backdrop click
modalOverlay?.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOverlay?.classList.contains('open')) closeModal();
});

// Add modal buttons to cursor hover effect
document.querySelectorAll('.promo-btn, .modal-close').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width      = '40px';
    cursor.style.height     = '40px';
    cursor.style.background = 'rgba(232,201,122,0.8)';
    cursorTrail.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width      = '12px';
    cursor.style.height     = '12px';
    cursor.style.background = AD_CONFIG.palette.rose;
    cursorTrail.style.opacity = '0.7';
  });
});

// Scroll to promo section on page load if #use-template hash present
if (window.location.hash === '#use-template') {
  setTimeout(() => {
    document.getElementById('promoCta')?.scrollIntoView({ behavior: 'smooth' });
    openModal();
  }, 800);
}


/* === CONSOLE EASTER EGG (brand-aware) === */
const C = AD_CONFIG;
console.log(`%c ${C.brand.name} ✦`, 'color:' + C.palette.rose + ';font-size:18px;font-weight:bold;font-family:Georgia');
console.log(`%c ${C.product.titleLine1} ${C.product.titleLine2} — ${C.brand.tagline}`,
  'color:' + C.palette.gold + ';font-size:12px;font-family:Georgia;font-style:italic');