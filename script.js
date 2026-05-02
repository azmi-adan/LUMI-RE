/* ============================================================
   L'ORÉAL — GLOSS INFAILLIBLE  |  script.js
   All interactivity: cursor, particles, 3D tilt, shade picker,
   scroll reveals, magnetic buttons, and more.
   ============================================================ */

/* ===== 1. CURSOR ===== */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth trailing ring
function animateTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor states
document.querySelectorAll('button, .swatch, .shade-card, .topnav span').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width       = '40px';
    cursor.style.height      = '40px';
    cursor.style.background  = 'rgba(232,201,122,0.7)';
    cursorTrail.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width       = '12px';
    cursor.style.height      = '12px';
    cursor.style.background  = '#C94060';
    cursorTrail.style.opacity = '0.7';
  });
});

/* ===== 2. PARTICLE CANVAS ===== */
const canvas  = document.getElementById('particleCanvas');
const ctx     = canvas.getContext('2d');

let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

const SHADES = ['#C94060','#E87C8A','#E8C97A','#F4A9B8','#9B2250','#F5E09A'];

class Particle {
  constructor() { this.reset(true); }

  reset(init = false) {
    this.x   = Math.random() * W;
    this.y   = init ? Math.random() * H : H + 20;
    this.r   = Math.random() * 2.5 + 0.5;
    this.vx  = (Math.random() - 0.5) * 0.4;
    this.vy  = -(Math.random() * 0.6 + 0.2);
    this.col = SHADES[Math.floor(Math.random() * SHADES.length)];
    this.lif = 0;
    this.maxLife = Math.random() * 200 + 150;
    this.twinkleSpeed = Math.random() * 0.04 + 0.02;
    this.twinkleOffset = Math.random() * Math.PI * 2;
  }

  update() {
    this.x   += this.vx;
    this.y   += this.vy;
    this.lif++;
    if (this.y < -20 || this.lif > this.maxLife) this.reset();
  }

  draw() {
    const alpha = Math.sin((this.lif / this.maxLife) * Math.PI) * 0.8;
    const twinkle = 0.5 + 0.5 * Math.sin(this.lif * this.twinkleSpeed + this.twinkleOffset);
    ctx.save();
    ctx.globalAlpha = alpha * twinkle;
    ctx.fillStyle = this.col;
    ctx.shadowBlur  = 8;
    ctx.shadowColor = this.col;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Larger glowing orbs
class GlowOrb {
  constructor() { this.reset(true); }

  reset(init = false) {
    this.x   = Math.random() * W;
    this.y   = init ? Math.random() * H : H + 100;
    this.r   = Math.random() * 30 + 15;
    this.vx  = (Math.random() - 0.5) * 0.15;
    this.vy  = -(Math.random() * 0.15 + 0.05);
    this.col = SHADES[Math.floor(Math.random() * SHADES.length)];
    this.lif = 0;
    this.maxLife = Math.random() * 400 + 300;
  }

  update() {
    this.x  += this.vx;
    this.y  += this.vy;
    this.lif++;
    if (this.y < -this.r * 2 || this.lif > this.maxLife) this.reset();
  }

  draw() {
    const alpha = Math.sin((this.lif / this.maxLife) * Math.PI) * 0.12;
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    grad.addColorStop(0, this.col + 'aa');
    grad.addColorStop(1, this.col + '00');
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const particles = Array.from({ length: 120 }, () => new Particle());
const orbs      = Array.from({ length: 8 },   () => new GlowOrb());

function particleLoop() {
  ctx.clearRect(0, 0, W, H);
  orbs.forEach(o => { o.update(); o.draw(); });
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(particleLoop);
}
particleLoop();

/* ===== 3. 3D TILT ON PRODUCT ===== */
const productScene   = document.getElementById('productScene');
const productWrapper = document.getElementById('productWrapper');
const heroCenter     = document.getElementById('heroCenter');

let tiltX = 0, tiltY = 0;
let targetTiltX = 0, targetTiltY = 0;

if (heroCenter) {
  heroCenter.addEventListener('mousemove', e => {
    const rect   = heroCenter.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    targetTiltX  = -dy * 18;
    targetTiltY  = dx * 18;
  });

  heroCenter.addEventListener('mouseleave', () => {
    targetTiltX = 0;
    targetTiltY = 0;
  });
}

function tiltLoop() {
  tiltX += (targetTiltX - tiltX) * 0.08;
  tiltY += (targetTiltY - tiltY) * 0.08;
  if (productScene) {
    productScene.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }
  requestAnimationFrame(tiltLoop);
}
tiltLoop();

/* ===== 4. SHADE PICKER ===== */
const shadeColors = ['#C94060','#E87C8A','#9B2250','#F4A9B8','#7D1B3C','#E84E78'];
const swatches    = document.querySelectorAll('.swatch');
const tubeBody    = document.querySelector('.tube-body');
const shadeCards  = document.querySelectorAll('.shade-card');

// Assign shade orb colors from data-color
shadeCards.forEach(card => {
  const col = card.getAttribute('data-color');
  const orb = card.querySelector('.shade-orb');
  if (orb) {
    orb.style.background = `radial-gradient(circle at 35% 35%, ${lighten(col, 40)} 0%, ${col} 50%, ${darken(col, 30)} 100%)`;
    orb.style.boxShadow  = `0 8px 24px rgba(0,0,0,.4), inset 4px 4px 12px rgba(255,255,255,.25), inset -4px -4px 12px rgba(0,0,0,.3)`;
  }
});

function lighten(hex, amt) {
  let c = parseInt(hex.slice(1), 16);
  let r = Math.min(255, (c >> 16) + amt);
  let g = Math.min(255, ((c >> 8) & 0xff) + amt);
  let b = Math.min(255, (c & 0xff) + amt);
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6,'0');
}

function darken(hex, amt) {
  return lighten(hex, -amt);
}

function setShade(index) {
  const col = shadeColors[index];
  // Update tube
  if (tubeBody) {
    const dark  = darken(col, 50);
    const mid   = darken(col, 20);
    tubeBody.style.background = `linear-gradient(
      160deg,
      ${darken(col,60)} 0%,
      ${col} 18%,
      ${mid} 50%,
      ${darken(col,30)} 75%,
      ${dark} 100%
    )`;
    tubeBody.style.transition = 'background 0.6s ease';
  }

  // Update tube glow
  const tube = document.querySelector('.tube');
  if (tube) {
    tube.style.filter = `drop-shadow(0 30px 60px ${col}99) drop-shadow(0 0 40px ${col}44)`;
  }

  // Update CSS variable
  document.documentElement.style.setProperty('--shade-color', col);

  // Update particle colors (next spawn will use new color)
  const shadowPlane = document.querySelector('.shadow-plane');
  if (shadowPlane) {
    shadowPlane.style.background = `radial-gradient(ellipse, ${col}80 0%, transparent 70%)`;
  }

  // Update swatch active state
  swatches.forEach((sw, i) => {
    sw.classList.toggle('active', i === index);
  });

  // Ripple burst on tube
  triggerTubeRipple(col);
}

function triggerTubeRipple(col) {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    top: 50%; left: 50%;
    width: 10px; height: 10px;
    margin: -5px;
    border-radius: 50%;
    background: ${col};
    opacity: 0.8;
    pointer-events: none;
    z-index: 100;
    animation: rippleOut 0.7s ease-out forwards;
  `;

  if (!document.getElementById('rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = `
      @keyframes rippleOut {
        0%   { transform: scale(1); opacity: .8; }
        100% { transform: scale(18); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  const tubeContainer = document.getElementById('tubeContainer');
  if (tubeContainer) {
    tubeContainer.style.position = 'relative';
    tubeContainer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }
}

swatches.forEach((sw, i) => {
  sw.addEventListener('click', () => setShade(i));
});

shadeCards.forEach((card, i) => {
  card.addEventListener('click', () => setShade(i));
});

/* ===== 5. SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-aos]').forEach(el => {
  revealObserver.observe(el);
});

/* ===== 6. MAGNETIC BUTTONS ===== */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx   = e.clientX - (rect.left + rect.width  / 2);
    const dy   = e.clientY - (rect.top  + rect.height / 2);
    btn.style.transform = `translateY(-3px) translate(${dx * 0.25}px, ${dy * 0.3}px) scale(1.04)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ===== 7. PARALLAX ON SCROLL ===== */
let scrollY = 0;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;

  // Blob parallax
  const blobs = document.querySelectorAll('.blob');
  blobs.forEach((blob, i) => {
    const speed = (i + 1) * 0.08;
    blob.style.transform = `translateY(${scrollY * speed}px)`;
  });

  // Hero content subtle parallax
  const heroLeft  = document.getElementById('heroLeft');
  const heroRight = document.getElementById('heroRight');
  if (heroLeft)  heroLeft.style.transform  = `translateY(${scrollY * 0.12}px)`;
  if (heroRight) heroRight.style.transform = `translateY(${scrollY * 0.08}px)`;
});

/* ===== 8. SHADE CARD STAGGER ANIMATION ===== */
const shadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.shade-card');
      cards.forEach((card, i) => {
        card.style.setProperty('--i', i);
        card.style.animationDelay = `${i * 0.08}s`;
        card.style.animationFillMode = 'both';
        card.style.animationName = 'shadeCardIn';
      });
    }
  });
}, { threshold: 0.2 });

const shadesCarousel = document.getElementById('shadesCarousel');
if (shadesCarousel) shadeObserver.observe(shadesCarousel);

/* ===== 9. TICKER DUPLICATE FOR INFINITE SCROLL ===== */
// Already duplicated in HTML, ensure smooth loop
const tickerTrack = document.getElementById('tickerTrack');
if (tickerTrack) {
  // Clone content for seamless loop
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

/* ===== 10. CTA BUTTON CLICK EFFECT ===== */
function attachClickRipple(btn) {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const circle = document.createElement('span');
    circle.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0; height: 0;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: btnRipple 0.6s ease-out forwards;
      pointer-events: none;
    `;

    if (!document.getElementById('btnRippleStyle')) {
      const style = document.createElement('style');
      style.id = 'btnRippleStyle';
      style.textContent = `
        @keyframes btnRipple {
          to { width: 300px; height: 300px; opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
}

document.querySelectorAll('.btn-primary').forEach(btn => attachClickRipple(btn));

/* ===== 11. HERO ENTRANCE SEQUENCE ===== */
window.addEventListener('load', () => {
  // Stagger in the stat cards on first view
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(40px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(.16,1,.3,1)';
      card.style.opacity = '1';
      card.style.transform = 'translateX(0)';
    }, 800 + i * 160);
  });
});

/* ===== 12. DYNAMIC GLOW FOLLOW on product ===== */
const tubeContainer = document.getElementById('tubeContainer');

document.addEventListener('mousemove', e => {
  if (!tubeContainer) return;
  const rect = tubeContainer.getBoundingClientRect();
  const cx   = rect.left + rect.width / 2;
  const cy   = rect.top  + rect.height / 2;
  const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
  const glow = Math.max(0, 1 - dist / 500);

  const tube = document.querySelector('.tube');
  if (tube && glow > 0) {
    const col = getComputedStyle(document.documentElement).getPropertyValue('--shade-color').trim() || '#C94060';
    const intensity = Math.round(glow * 80);
    tube.style.filter = `
      drop-shadow(0 30px 60px ${col}99)
      drop-shadow(0 0 ${intensity}px ${col}66)
    `;
  }
});

/* ===== 13. FINAL CTA SECTION ENTRANCE ===== */
const finalCtaObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const headline = entry.target.querySelector('.final-headline');
      const eyebrow  = entry.target.querySelector('.final-eyebrow');
      const body     = entry.target.querySelector('.final-body');
      const btn      = entry.target.querySelector('.btn-large');
      const price    = entry.target.querySelector('.final-price-tag');

      [eyebrow, headline, body, btn, price].forEach((el, i) => {
        if (!el) return;
        el.style.opacity   = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(.16,1,.3,1)';
          el.style.opacity    = '1';
          el.style.transform  = 'translateY(0)';
        }, i * 150);
      });

      finalCtaObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const finalCta = document.getElementById('finalCta');
if (finalCta) finalCtaObserver.observe(finalCta);

/* ===== 14. FEATURES COUNTER ANIMATION ===== */
const featuresObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate stat numbers in hero with a count-up feel (visual pulse)
      document.querySelectorAll('.stat-num').forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // reflow
        el.style.animation = 'statPop 0.5s cubic-bezier(.16,1,.3,1)';
      });

      if (!document.getElementById('statPopStyle')) {
        const style = document.createElement('style');
        style.id = 'statPopStyle';
        style.textContent = `
          @keyframes statPop {
            0%   { transform: scale(.8); opacity: .5; }
            60%  { transform: scale(1.08); }
            100% { transform: scale(1); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }

      featuresObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const featSection = document.getElementById('features');
if (featSection) featuresObserver.observe(featSection);

/* ===== 15. MOBILE: Touch tilt on product ===== */
let touchStartX = 0, touchStartY = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', e => {
  if (!productScene) return;
  const dx = (e.touches[0].clientX - touchStartX) / window.innerWidth;
  const dy = (e.touches[0].clientY - touchStartY) / window.innerHeight;
  targetTiltX = -dy * 12;
  targetTiltY = dx * 12;
});

document.addEventListener('touchend', () => {
  targetTiltX = 0;
  targetTiltY = 0;
});

console.log('%c L\'ORÉAL — Gloss Infaillible ✦', 'color:#C94060;font-size:18px;font-weight:bold;font-family:Georgia');
console.log('%c Because you\'re worth it.', 'color:#E8C97A;font-size:12px;font-family:Georgia;font-style:italic');