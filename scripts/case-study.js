// =============================================
// CUSTOM CURSOR
// =============================================
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  })();

  document.querySelectorAll('a, button, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });
})();

// =============================================
// NAVIGATION — Scroll-aware + always dark
// (Hero is always dark so nav starts dark)
// =============================================
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Nav starts dark because the hero bg is always dark
  nav.classList.add('nav--dark');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.padding       = '16px 48px';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.borderBottom  = '1px solid rgba(255,255,255,0.06)';
      nav.style.transition    = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

      // Switch to light nav once past the dark hero
      const heroHeight = document.querySelector('.csp-hero')?.offsetHeight || window.innerHeight;
      if (window.scrollY > heroHeight - 100) {
        nav.classList.remove('nav--dark');
        nav.style.background = 'rgba(244,241,236,0.9)';
        nav.style.borderBottom = '1px solid rgba(10,10,10,0.06)';
      } else {
        nav.classList.add('nav--dark');
        nav.style.background = 'rgba(6,14,9,0.88)';
      }
    } else {
      nav.style.padding        = '28px 48px';
      nav.style.background     = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.borderBottom   = 'none';
      nav.classList.add('nav--dark');
    }
  }, { passive: true });
})();

// =============================================
// LIGHTBOX
// =============================================
(function initLightbox() {
  // Build lightbox DOM
  const lightbox = document.createElement('div');
  lightbox.className = 'csp-lightbox';
  lightbox.innerHTML = `
    <img class="csp-lightbox-img" src="" alt="" />
    <button class="csp-lightbox-close" aria-label="Close image">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  `;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('.csp-lightbox-img');
  const lbClose = lightbox.querySelector('.csp-lightbox-close');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Click on any image inside a slot opens the lightbox
  document.querySelectorAll('.csp-img-slot img').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  // Close on button, backdrop click, or Escape
  lbClose.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// =============================================
// FADE-UP ON SCROLL
// =============================================
(function initFadeUps() {
  const els = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(el => observer.observe(el));
})();
