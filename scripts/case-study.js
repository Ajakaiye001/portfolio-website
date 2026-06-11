// ==================================================
// CASE STUDY PAGES — shared interactions
// Cursor · nav · burger menu · lightbox · fade-ups
// ==================================================

(function () {
  'use strict';

  const finePointer = window.matchMedia('(pointer: fine)').matches;

  // ------------------------------------------------
  // CUSTOM CURSOR
  // ------------------------------------------------
  (function initCursor() {
    if (!finePointer) return;
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;

    document.body.classList.add('has-cursor');
    let mx = -100, my = -100, fx = -100, fy = -100;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    (function follow() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      requestAnimationFrame(follow);
    })();

    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
    });
  })();

  // ------------------------------------------------
  // NAV — dark over dark heroes, scrolled state, burger
  // ------------------------------------------------
  (function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const hero = document.querySelector('.csp-hero');
    const heroIsDark = true; // every case hero uses a deep brand background

    const applyTheme = () => {
      const heroHeight = hero?.offsetHeight || window.innerHeight;
      nav.classList.toggle('nav--dark', heroIsDark && window.scrollY < heroHeight - 90);
      nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    };

    let lastY = 0;
    window.addEventListener('scroll', () => {
      applyTheme();
      const y = window.scrollY;
      if (y > 400 && y > lastY && !document.body.classList.contains('menu-open')) {
        nav.classList.add('nav--hidden');
      } else {
        nav.classList.remove('nav--hidden');
      }
      lastY = y;
    }, { passive: true });
    applyTheme();

    const links = nav.querySelector('.nav-links');
    if (links) {
      const burger = document.createElement('button');
      burger.className = 'nav-burger';
      burger.setAttribute('aria-label', 'Toggle menu');
      burger.innerHTML = '<span></span><span></span>';
      burger.addEventListener('click', () => document.body.classList.toggle('menu-open'));
      nav.appendChild(burger);
      links.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => document.body.classList.remove('menu-open'))
      );
    }
  })();

  // ------------------------------------------------
  // LIGHTBOX
  // ------------------------------------------------
  (function initLightbox() {
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

    document.querySelectorAll('.csp-img-slot img').forEach((img) => {
      img.addEventListener('click', () => open(img.src, img.alt));
    });

    lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  })();

  // ------------------------------------------------
  // FADE-UP ON SCROLL
  // ------------------------------------------------
  (function initFadeUps() {
    const els = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => observer.observe(el));
  })();

})();
