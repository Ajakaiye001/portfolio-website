// ==================================================
// TIMMY AJAKAIYE — PORTFOLIO
// Loader choreography · Lenis · GSAP · canvas dot field
// ==================================================

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const hasGsap = typeof gsap !== 'undefined';

  if (hasGsap && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  // ------------------------------------------------
  // SMOOTH SCROLL (Lenis)
  // ------------------------------------------------
  let lenis = null;
  if (!reducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 0.75, smoothWheel: true });
    lenis.on('scroll', () => { if (hasGsap) ScrollTrigger.update(); });
    if (hasGsap) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  function scrollToTarget(target) {
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else (typeof target === 'string' ? document.querySelector(target) : target)
      ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  // Anchor links route through Lenis
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        document.body.classList.remove('menu-open');
        scrollToTarget(id);
      }
    });
  });

  // ------------------------------------------------
  // CUSTOM CURSOR
  // ------------------------------------------------
  (function initCursor() {
    if (!finePointer) return;
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    const label = document.getElementById('cursorLabel');
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
      el.addEventListener('mouseenter', () => {
        const text = el.closest('[data-cursor]')?.dataset.cursor || el.dataset.cursor;
        if (text && label) {
          label.textContent = text;
          cursor.classList.add('cursor--label');
        } else {
          cursor.classList.add('cursor--hover');
        }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor--hover', 'cursor--label');
      });
    });
  })();

  // ------------------------------------------------
  // NAV — scrolled state, hide on scroll down, burger
  // ------------------------------------------------
  (function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('nav--scrolled', y > 60);
      if (y > 400 && y > lastY && !document.body.classList.contains('menu-open')) {
        nav.classList.add('nav--hidden');
      } else {
        nav.classList.remove('nav--hidden');
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Inject burger for the mobile overlay menu
    const links = document.getElementById('navLinks') || nav.querySelector('.nav-links');
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
  // LOADER → HERO REVEAL
  // ------------------------------------------------
  (function initLoader() {
    const loader = document.getElementById('loader');
    const heroWords = document.querySelectorAll('.hero-title .word');
    const heroBits = document.querySelectorAll('.hero-meta-row, .hero-sub-row, .hero-foot');

    const finish = () => {
      if (loader) loader.style.display = 'none';
      document.body.style.overflow = '';
    };

    if (!loader) return;
    if (reducedMotion || !hasGsap) { finish(); return; }

    document.body.style.overflow = 'hidden';
    const letters = loader.querySelectorAll('.loader-name span');
    const count = document.getElementById('loaderCount');
    const counter = { v: 0 };

    gsap.set(heroWords, { yPercent: 110 });
    gsap.set(heroBits, { opacity: 0, y: 24 });

    const tl = gsap.timeline({
      onComplete: () => { finish(); ScrollTrigger.refresh(); }
    });

    tl.fromTo(letters,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.035, ease: 'power4.out' }, 0.1)
      .to(counter, {
        v: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (count) count.textContent = String(Math.round(counter.v)).padStart(3, '0');
        }
      }, 0)
      .to(letters, { yPercent: -110, duration: 0.6, stagger: 0.02, ease: 'power4.in' }, '+=0.15')
      .to(loader, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.25')
      .to(heroWords, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, '-=0.45')
      .to(heroBits, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '-=0.7');
  })();

  // ------------------------------------------------
  // HERO CANVAS — dot grid that ripples toward the pointer
  // ------------------------------------------------
  (function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, dots = [];
    const GAP = 34;
    const pointer = { x: -9999, y: -9999 };
    const ink = [22, 19, 13];
    const orange = [232, 75, 15];

    function build() {
      w = hero.offsetWidth;
      h = hero.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          dots.push({ ox: x, oy: y });
        }
      }
    }

    let t = 0;
    let running = true;

    function frame() {
      requestAnimationFrame(frame);
      if (!running) return;
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const wave = Math.sin(t + d.ox * 0.012 + d.oy * 0.008) * 1.6;
        let dx = d.ox, dy = d.oy + wave;

        const px = dx - pointer.x, py = dy - pointer.y;
        const dist = Math.hypot(px, py);
        const R = 160;
        let glow = 0;
        if (dist < R) {
          const force = (1 - dist / R) ** 2;
          dx += (px / (dist || 1)) * force * 18;
          dy += (py / (dist || 1)) * force * 18;
          glow = force;
        }

        const r = 1 + glow * 1.4;
        const c = glow > 0.04 ? orange : ink;
        const a = 0.16 + glow * 0.65;
        ctx.beginPath();
        ctx.arc(dx, dy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`;
        ctx.fill();
      }
    }

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => { pointer.x = pointer.y = -9999; });

    new IntersectionObserver(([entry]) => { running = entry.isIntersecting; })
      .observe(hero);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    });

    build();
    requestAnimationFrame(frame);
  })();

  // ------------------------------------------------
  // WORK — clip reveals + inner parallax
  // ------------------------------------------------
  (function initWork() {
    const medias = document.querySelectorAll('.work-media');
    if (!medias.length) return;

    // Observe the parent: a clip-path that hides the media also hides it
    // from IntersectionObserver, so the media itself never "intersects".
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Skip zero-height entries: items inside a collapsed category report
        // as intersecting before the group has actually been opened
        if (entry.isIntersecting && entry.boundingClientRect.height > 0) {
          entry.target.querySelector('.work-media')?.classList.add('is-revealed');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    document.querySelectorAll('.work-item').forEach((item) => {
      if (item.querySelector('.work-media')) reveal.observe(item);
    });

    // Items observed while their category was collapsed report zero-height
    // geometry; re-observe them once the group has fully opened so the
    // initial notification runs against the real layout
    document.addEventListener('work:groupopened', (e) => {
      e.detail.group.querySelectorAll('.work-item').forEach((item) => {
        if (item.querySelector('.work-media:not(.is-revealed)')) {
          reveal.unobserve(item);
          reveal.observe(item);
        }
      });
    });

    if (hasGsap && !reducedMotion) {
      medias.forEach((m) => {
        const img = m.querySelector('img');
        if (!img) return;
        gsap.fromTo(img, { yPercent: -9 }, {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });
    }
  })();

  // ------------------------------------------------
  // WORK — category accordion
  // ------------------------------------------------
  (function initWorkAccordion() {
    const groups = document.querySelectorAll('.work-group');
    if (!groups.length) return;

    const settle = (group) => {
      if (hasGsap && typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      if (group.classList.contains('is-open')) {
        document.dispatchEvent(new CustomEvent('work:groupopened', { detail: { group } }));
      }
    };

    groups.forEach((group) => {
      const toggle = group.querySelector('.work-group-toggle');
      const body = group.querySelector('.work-group-body');
      if (!toggle || !body) return;

      toggle.addEventListener('click', () => {
        const open = group.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.dataset.cursor = open ? 'Close' : 'Open';
        if (reducedMotion) settle(group);
      });

      // Parallax start/end positions shift once the group's height settles
      body.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'grid-template-rows') settle(group);
      });
    });
  })();

  // ------------------------------------------------
  // FADE-UPS
  // ------------------------------------------------
  (function initFadeUps() {
    const els = document.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 70);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => obs.observe(el));
  })();

  // ------------------------------------------------
  // CLOCKS (Dublin time) + BACK TO TOP
  // ------------------------------------------------
  (function initClock() {
    const heroClock = document.getElementById('heroClock');
    const footClock = document.getElementById('footClock');
    if (!heroClock && !footClock) return;
    const tick = () => {
      const time = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Dublin'
      }).format(new Date());
      if (heroClock) heroClock.textContent = `Dublin, Ireland — ${time}`;
      if (footClock) footClock.textContent = time;
    };
    tick();
    setInterval(tick, 30000);
  })();

  document.getElementById('backToTop')
    ?.addEventListener('click', () => scrollToTarget(document.body));

})();
