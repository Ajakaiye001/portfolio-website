// ==================================================
// WASTEBAZAAR — CASE STUDY
// Vanilla only: IntersectionObserver + CSS transitions.
// No animation libraries on this page.
// ==================================================

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  // ------------------------------------------------
  // CUSTOM CURSOR (shared site behaviour)
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
  // NAV — dark over the ink hero, scrolled state, burger
  // ------------------------------------------------
  (function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const hero = document.querySelector('.wb-hero');

    const applyTheme = () => {
      const heroHeight = hero?.offsetHeight || window.innerHeight;
      nav.classList.toggle('nav--dark', window.scrollY < heroHeight - 90);
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
  // 7. SCROLL PROGRESS BAR
  // ------------------------------------------------
  (function initProgress() {
    const bar = document.getElementById('wbProgress');
    if (!bar || reduceMotion) return;
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  })();

  // ------------------------------------------------
  // 3. HERO ENTRY STAGGER (title → imagery → meta chips)
  //    CSS transitions keyed off body.wb-loaded
  // ------------------------------------------------
  window.addEventListener('load', () => {
    requestAnimationFrame(() => document.body.classList.add('wb-loaded'));
  });
  // Fallback if load already fired or hangs on a slow asset
  setTimeout(() => document.body.classList.add('wb-loaded'), 1200);

  // ------------------------------------------------
  // 1+4. SCROLL REVEALS (threshold 0.15, 80ms stagger)
  //      + section label clip wipes
  // ------------------------------------------------
  (function initReveals() {
    const revealEls = document.querySelectorAll('.wb-reveal');
    const labels = document.querySelectorAll('.wb-label');
    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add('in-view'));
      labels.forEach((el) => el.classList.add('in-view'));
      return;
    }

    // Labels are fully clipped by their wipe, so they never "intersect".
    // Watch the parent section and reveal the label when it enters.
    const labelIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(':scope > .wb-label').forEach((l) => l.classList.add('in-view'));
        labelIo.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -140px 0px' });
    labels.forEach((l) => { if (l.parentElement) labelIo.observe(l.parentElement); });

    // Stagger siblings that enter together: group by parent
    const io = new IntersectionObserver((entries) => {
      const entering = entries.filter((e) => e.isIntersecting);
      // group per parent so columns stagger relative to each other
      const groups = new Map();
      entering.forEach((e) => {
        const key = e.target.parentElement;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(e.target);
      });
      groups.forEach((els) => {
        els.forEach((el, i) => {
          el.style.setProperty('--d', `${i * 80}ms`);
          el.classList.add('in-view');
        });
      });
      entering.forEach((e) => io.unobserve(e.target));
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => io.observe(el));
  })();

  // ------------------------------------------------
  // 2. METRIC COUNTERS (1.2s, easeOutExpo) + theme bars
  // ------------------------------------------------
  (function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    if (reduceMotion) {
      counters.forEach((el) => { el.textContent = el.dataset.count; });
      document.querySelectorAll('.wb-theme').forEach((t) =>
        t.style.setProperty('--p', Number(t.dataset.pct) / 100));
      return;
    }

    const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const run = (el) => {
      const target = Number(el.dataset.count);
      const start = performance.now();
      const DURATION = 1200;
      const tick = (now) => {
        const t = Math.min((now - start) / DURATION, 1);
        el.textContent = Math.round(easeOutExpo(t) * target);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('[data-count]').forEach(run);
        if (entry.target.classList.contains('wb-theme')) {
          entry.target.style.setProperty('--p', Number(entry.target.dataset.pct) / 100);
        }
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    // Observe the nearest meaningful container so a row's numbers start together
    const containers = new Set();
    counters.forEach((el) => {
      containers.add(el.closest('.wb-finding, .wb-theme, .wb-outcome') || el.parentElement);
    });
    containers.forEach((c) => io.observe(c));
  })();

  // ------------------------------------------------
  // 5. PARALLAX on large galleries (disabled on mobile)
  // ------------------------------------------------
  (function initParallax() {
    const els = document.querySelectorAll('.wb-parallax');
    if (!els.length || reduceMotion) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      if (isMobile()) return;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        // -1 … 1 as the element crosses the viewport
        const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        el.querySelector('img')?.style.setProperty('--py', `${(-progress * 26).toFixed(1)}px`);
      });
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  // ------------------------------------------------
  // LIGHTBOX (anchors marked data-lightbox)
  // ------------------------------------------------
  (function initLightbox() {
    const triggers = document.querySelectorAll('[data-lightbox]');
    if (!triggers.length) return;

    const box = document.createElement('div');
    box.className = 'wb-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Image viewer');
    box.innerHTML = `
      <img src="" alt="" />
      <button class="wb-lightbox-close" aria-label="Close image">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>`;
    document.body.appendChild(box);

    const img = box.querySelector('img');
    const close = () => {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    triggers.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        img.src = a.getAttribute('href');
        img.alt = a.querySelector('img')?.alt || '';
        box.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    box.querySelector('.wb-lightbox-close').addEventListener('click', close);
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  })();

})();
