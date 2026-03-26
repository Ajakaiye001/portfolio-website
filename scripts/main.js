// =============================================
// PROJECT DATA
// =============================================
const projects = [
  {
    title: "WasteBazaar",
    category: "Mobile · Sustainability",
    tagline: "Recycling, made effortless.",
    bgColor: "#060E09",
    accent: "#22C55E",
    year: "2024",
    role: "Product Designer",
    duration: "5 months",
    platform: "iOS & Android",
    url: "wastebazaar.html",
    overview: "WasteBazaar is an on-demand recycling platform that connects households with verified collection drivers. A GreenCredits reward system incentivises sustainable habits and keeps users engaged long-term.",
    problem: "Recycling infrastructure is fragmented and unincentivised. Users don't know where to recycle, pickup services are unreliable, and there is no reward system for sustainable behaviour.",
    goal: "Create a seamless, trusted platform where scheduling a recycling pickup is as easy as ordering food — and where doing the right thing is visibly rewarded.",
    process: [
      "Interviewed 30 users across eco-conscious households and logistics operators",
      "Identified convenience and trust as the two primary adoption blockers",
      "Designed and tested 3 scheduling flow variants — reduced to 3 steps",
      "Built a QR verification system to solve the driver trust problem",
      "Ran 2 rounds of usability testing; iterated rewards flow based on findings"
    ],
    solution: "A mobile app with on-demand and scheduled pickups, verified driver profiles, QR-based handoff confirmation, and a GreenCredits earn-and-redeem reward loop.",
    metrics: [
      { num: "3×", label: "Recycling frequency increase" },
      { num: "91%", label: "Task completion rate" },
      { num: "4.8★", label: "Usability score" }
    ]
  },
  {
    title: "Kora",
    category: "Web · Fintech Dashboard",
    tagline: "Financial clarity, finally.",
    bgColor: "#0A0A0A",
    accent: "#22C55E",
    url: "kora.html",
    year: "2022",
    role: "Senior Designer",
    duration: "6 months",
    platform: "Web Application",
    overview: "Kora is a financial analytics platform for African SMEs. Business owners needed a single place to understand revenue, track transactions, and forecast growth — without needing a CFO.",
    problem: "Existing finance tools were built for Western markets, with complex terminology and dense data tables that overwhelmed non-finance users. Onboarding took over 20 minutes on average.",
    goal: "Make financial data feel accessible, even empowering. A business owner should understand their performance in under 30 seconds.",
    process: [
      "Shadowed 12 SME owners across Nigeria and Kenya for a week each",
      "Identified 5 key 'aha moments' that determined user retention",
      "Created a data hierarchy framework prioritizing what matters most",
      "Tested dashboard layouts with eye-tracking software",
      "Ran extensive A/B tests on the onboarding flow"
    ],
    solution: "A progressive disclosure model: the most important metrics appear first, with drill-down available on demand. Smart defaults mean the dashboard is immediately useful from day one.",
    metrics: [
      { num: "60%", label: "Faster onboarding" },
      { num: "87%", label: "Task completion rate" },
      { num: "2.4×", label: "Daily active usage" }
    ]
  },
  {
    title: "Bloom",
    category: "Mobile · Health & Wellness",
    tagline: "Wellness that actually works.",
    bgColor: "#1A0F0A",
    accent: "#F97316",
    url: "bloom.html",
    year: "2023",
    role: "Lead Designer",
    duration: "5 months",
    platform: "iOS",
    overview: "Bloom is a holistic wellness app combining sleep, movement, hydration, and mindfulness tracking into a single cohesive experience. The visual language was designed to feel warm, never clinical.",
    problem: "Most health apps feel like medical devices — cold, data-heavy, anxiety-inducing. Users often abandon them after 2 weeks because tracking feels like another obligation, not self-care.",
    goal: "Design an app where checking in feels like a reward, not a chore. Health data should motivate, not overwhelm.",
    process: [
      "Research with 30 users who had abandoned health apps in past 6 months",
      "Workshop with behavioral psychologists on habit formation",
      "Explored 5 completely different visual directions before committing",
      "Built high-fidelity prototypes in Protopie for motion testing",
      "4 weeks of beta testing with 200 users"
    ],
    solution: "A single daily score with celebratory micro-interactions that reward consistency. The UI uses warm amber tones and organic shapes to feel approachable. Streaks are visible but never punishing.",
    metrics: [
      { num: "94%", label: "30-day retention" },
      { num: "12min", label: "Average daily session" },
      { num: "4.9★", label: "App Store rating" }
    ]
  },
  {
    title: "Atlas",
    category: "Mobile · Navigation & Travel",
    tagline: "Explore the world, effortlessly.",
    bgColor: "#0F1923",
    accent: "#06B6D4",
    url: "atlas.html",
    year: "2022",
    role: "Product Designer",
    duration: "8 months",
    platform: "iOS & Android",
    overview: "Atlas is a next-generation travel app that blends navigation with cultural discovery. Instead of just getting you from A to B, it tells you what's worth stopping for along the way.",
    problem: "Navigation apps are efficient but soul-less. Travel apps are inspiring but impractical. Travelers constantly switch between 3–4 apps to plan and execute any trip.",
    goal: "Merge navigation with discovery into a single, beautiful, context-aware experience.",
    process: [
      "Traveled to 6 cities conducting contextual research with tourists and locals",
      "Mapped the full travel journey from inspiration to return",
      "Prototyped 4 different map interaction models",
      "Tested wayfinding with users who had different navigation mental models",
      "Won Awwwards Site of the Day for the design concept presentation"
    ],
    solution: "A layered map that surfaces curated recommendations based on your speed, time, and interests. Navigation and discovery exist in the same view, switching contextually.",
    metrics: [
      { num: "Awwwards", label: "Site of the Day winner" },
      { num: "2.8×", label: "Discovery engagement" },
      { num: "4.7★", label: "App Store rating" }
    ]
  },
  {
    title: "Nexus",
    category: "Systems · Design Language",
    tagline: "One system. Six teams. Zero chaos.",
    bgColor: "#0A0A0A",
    accent: "#FAFAFA",
    year: "2021",
    role: "Design Systems Lead",
    duration: "Ongoing",
    platform: "Multi-platform",
    overview: "Nexus is a comprehensive design system I built and maintain at Paystack. It covers 120+ components, design tokens, motion guidelines, and contribution workflows across 6 product teams.",
    problem: "As the product grew, design and engineering were diverging. Components were being rebuilt from scratch by different teams. Brand inconsistency was increasing. Design reviews were blocking development.",
    goal: "Create a single source of truth that accelerates teams without constraining creativity.",
    process: [
      "Audited 8 product areas and catalogued 400+ unique UI patterns",
      "Reduced to 120 reusable components without losing expressiveness",
      "Built Figma token system synced to code via Style Dictionary",
      "Created contribution guidelines and decision trees for when to use vs. create",
      "Ran 12 workshops training 40+ designers and engineers"
    ],
    solution: "A living design system with documentation, Figma libraries, React components, and a changelog — all in sync. Teams can ship 40% faster with consistent quality.",
    metrics: [
      { num: "70%", label: "Reduction in design debt" },
      { num: "40%", label: "Faster feature shipping" },
      { num: "120+", label: "Components shipped" }
    ]
  }
];

// =============================================
// LOADER
// =============================================
(function initLoader() {
  const loaderFill = document.getElementById('loaderFill');
  const loaderCount = document.getElementById('loaderCount');
  const nameSpans = document.querySelectorAll('.loader-name span');
  let count = 0;

  // Animate name letters in
  nameSpans.forEach((span, i) => {
    setTimeout(() => {
      span.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      span.style.transform = 'translateY(0)';
    }, i * 30 + 100);
  });

  // Increment progress counter
  const interval = setInterval(() => {
    count += Math.random() * 8 + 2;
    if (count >= 100) {
      count = 100;
      clearInterval(interval);
      setTimeout(hideLoader, 300);
    }
    loaderFill.style.width = count + '%';
    loaderCount.textContent = Math.floor(count);
  }, 50);

  function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    loader.style.opacity = '0';
    loader.style.transform = 'scale(1.04)';
    setTimeout(() => {
      loader.style.display = 'none';
      initHeroAnimations();
      scrollToHash();
    }, 800);
  }
})();

// =============================================
// HERO ANIMATIONS
// =============================================
function initHeroAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.hero-label span', { y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });
  gsap.to('.hero-title .word', { y: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.2 });
  gsap.to('.hero-tagline span', { y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.5 });
  gsap.to('.hero-cta-inner', { y: 0, duration: 0.8, ease: 'power3.out', delay: 0.65 });
  gsap.to('#scrollHint', { opacity: 1, duration: 1, delay: 1.2 });

  initScrollPreview();
  initFadeUps();
}

// =============================================
// SCROLL-BASED PROJECT PREVIEW
// =============================================
function initScrollPreview() {
  const panels = gsap.utils.toArray('.preview-panel');
  const numPanels = panels.length;
  const previewFill = document.getElementById('previewFill');
  const previewCounter = document.getElementById('previewCounter');
  const previewBg = document.getElementById('previewBg');

  const bgColors = ['#0D0B12', '#1A1A1A', '#1A0F0A', '#0F1923', '#0A0A0A'];

  // Hide all panels except first
  gsap.set(panels.slice(1), { opacity: 0, scale: 0.94, y: 60 });

  ScrollTrigger.create({
    trigger: '#scroll-preview',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1.2,
    onUpdate: (self) => {
      const progress = self.progress;
      const panelProgress = progress * numPanels;
      const currentPanel = Math.min(Math.floor(panelProgress), numPanels - 1);

      // Update UI
      previewFill.style.width = (progress * 100) + '%';
      previewCounter.textContent = String(currentPanel + 1).padStart(2, '0') + ' / 0' + numPanels;
      previewBg.style.background = bgColors[currentPanel] || bgColors[numPanels - 1];

      // Animate each panel based on scroll distance
      panels.forEach((panel, i) => {
        const distFromCurrent = i - panelProgress;

        if (distFromCurrent < -0.5) {
          // Past — push out above
          gsap.set(panel, { opacity: 0, scale: 0.9, y: -40 });
        } else if (distFromCurrent < 0.5) {
          // Active — centred
          gsap.set(panel, {
            opacity: 1 - Math.abs(distFromCurrent) * 2,
            scale: 1 - Math.abs(distFromCurrent) * 0.08,
            y: distFromCurrent * 60
          });
        } else if (distFromCurrent < 1.5) {
          // Next — waiting below
          gsap.set(panel, {
            opacity: Math.max(0, 1 - (distFromCurrent - 0.5) * 3),
            scale: 0.94 + (1 - distFromCurrent + 0.5) * 0.02,
            y: 60
          });
        } else {
          // Far future — hidden below
          gsap.set(panel, { opacity: 0, scale: 0.94, y: 60 });
        }
      });
    }
  });
}

// =============================================
// FADE-UP ON SCROLL (Intersection Observer)
// =============================================
function initFadeUps() {
  const elements = document.querySelectorAll('.fade-up');
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
  elements.forEach(el => observer.observe(el));
}

// =============================================
// CUSTOM CURSOR
// =============================================
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  (function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  })();

  document.querySelectorAll('a, button, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });
})();

// =============================================
// HASH-BASED SCROLL (cross-page navigation)
// =============================================
function scrollToHash() {
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target) return;
  const navHeight = document.getElementById('nav')?.offsetHeight || 80;
  window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
}

// =============================================
// NAVIGATION — Scroll-aware shrink + dark section detection
// =============================================
(function initNav() {
  const nav = document.getElementById('nav');
  let isOverDark = false;

  // Detect when nav is over dark sections
  const darkSections = document.querySelectorAll('#scroll-preview');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isOverDark = entry.isIntersecting;
      nav.classList.toggle('nav--dark', isOverDark);
      applyScrollStyle();
    });
  }, { rootMargin: '0px 0px -88% 0px', threshold: 0 });
  darkSections.forEach(s => sectionObserver.observe(s));

  function applyScrollStyle() {
    if (window.scrollY > 80) {
      nav.style.padding = '16px 48px';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      if (isOverDark) {
        nav.style.background = 'rgba(10,10,10,0.80)';
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
      } else {
        nav.style.background = 'rgba(244,241,236,0.85)';
        nav.style.borderBottom = '1px solid rgba(10,10,10,0.06)';
      }
    } else {
      nav.style.padding = '28px 48px';
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.borderBottom = 'none';
    }
  }

  window.addEventListener('scroll', applyScrollStyle, { passive: true });
})();

// =============================================
// BUILD CHART BARS & WAVEFORM (DOM helpers)
// =============================================
(function buildMockupElements() {
  // Kora bar charts
  const chartHeights = [30, 50, 45, 65, 70, 55, 80, 90, 75, 95, 85, 100];
  ['koraChart', 'koraChart2'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    chartHeights.forEach(h => {
      const col = document.createElement('div');
      col.className = 'kora-chart-col' + (h > 70 ? ' hi' : '');
      col.style.height = h + '%';
      el.appendChild(col);
    });
  });

  // Aria waveform bars
  const wave = document.getElementById('ariaWave');
  if (wave) {
    const waveHeights = [12,20,28,36,42,36,20,28,40,32,24,36,44,36,28,24,16,24,32,36,28,20,16];
    waveHeights.forEach((h, i) => {
      const bar = document.createElement('div');
      bar.className = 'aria-bar';
      bar.style.height = h + 'px';
      bar.style.opacity = i === 8 ? '1' : '0.4';
      wave.appendChild(bar);
    });
  }
})();

// =============================================
// CASE STUDY — Open / Close
// =============================================
function openCaseStudy(index) {
  const p = projects[index];

  // Projects with a dedicated page navigate directly instead of using the overlay
  if (p.url) {
    window.location.href = p.url;
    return;
  }

  const overlay = document.getElementById('cs-overlay');
  const content = document.getElementById('cs-content');

  const bgDarken = `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%), ${p.bgColor}`;

  content.innerHTML = `
    <div class="cs-hero" style="background:${bgDarken}">
      <div class="cs-meta">
        <div class="cs-meta-item"><div class="cs-meta-label">Year</div><div class="cs-meta-value">${p.year}</div></div>
        <div class="cs-meta-item"><div class="cs-meta-label">Role</div><div class="cs-meta-value">${p.role}</div></div>
        <div class="cs-meta-item"><div class="cs-meta-label">Duration</div><div class="cs-meta-value">${p.duration}</div></div>
        <div class="cs-meta-item"><div class="cs-meta-label">Platform</div><div class="cs-meta-value">${p.platform}</div></div>
      </div>
      <div class="cs-hero-content">
        <div class="cs-cat">${p.category}</div>
        <h2 class="cs-title">${p.title}</h2>
        <p class="cs-tagline">${p.tagline}</p>
      </div>
    </div>
    <div class="cs-body">
      <div class="cs-section">
        <div class="cs-section-label">01 — Overview</div>
        <h3>The Project</h3>
        <p>${p.overview}</p>
      </div>
      <div class="cs-divider"></div>
      <div class="cs-two-col">
        <div class="cs-section">
          <div class="cs-section-label">02 — Problem</div>
          <h3>The Challenge</h3>
          <p>${p.problem}</p>
        </div>
        <div class="cs-section">
          <div class="cs-section-label">03 — Goal</div>
          <h3>The North Star</h3>
          <p>${p.goal}</p>
        </div>
      </div>
      <div class="cs-divider"></div>
      <div class="cs-section">
        <div class="cs-section-label">04 — Process</div>
        <h3>How I Got There</h3>
        ${p.process.map(step => `<p style="padding-left:20px;border-left:2px solid var(--border);margin-bottom:12px">→ ${step}</p>`).join('')}
      </div>
      <div class="cs-divider"></div>
      <div class="cs-section">
        <div class="cs-section-label">05 — Solution</div>
        <h3>The Outcome</h3>
        <p>${p.solution}</p>
      </div>
      <div class="cs-mockup-full">
        <div class="cs-mockup-full-inner" style="background:${p.bgColor};display:flex;align-items:center;justify-content:center;padding:40px">
          <p style="font-family:var(--serif);font-size:24px;font-weight:300;color:rgba(255,255,255,0.3);font-style:italic">[ ${p.title} — Full Mockup ]</p>
        </div>
      </div>
      <div class="cs-divider"></div>
      <div class="cs-section">
        <div class="cs-section-label">06 — Impact</div>
        <h3>Results</h3>
        <div class="cs-metrics">
          ${p.metrics.map(m => `
            <div class="cs-metric">
              <div class="cs-metric-num" style="color:${p.accent}">${m.num}</div>
              <div class="cs-metric-label">${m.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="cs-divider"></div>
      <div style="display:flex;gap:16px;justify-content:center;padding-top:16px">
        ${index > 0 ? `<button class="nav-cta" style="padding:14px 28px;font-size:12px" onclick="openCaseStudy(${index - 1})">← Previous</button>` : ''}
        ${index < projects.length - 1 ? `<button class="nav-cta" style="padding:14px 28px;font-size:12px" onclick="openCaseStudy(${index + 1})">Next →</button>` : ''}
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

function closeCaseStudy() {
  document.getElementById('cs-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// =============================================
// GLOBAL EVENT LISTENERS
// =============================================

// Escape key closes case study
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCaseStudy();
});

// Nav links: close case study overlay then scroll to section
document.querySelectorAll('#nav a[href*="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const overlay = document.getElementById('cs-overlay');
    if (!overlay.classList.contains('active')) return;

    const hash = '#' + link.getAttribute('href').split('#')[1];
    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    closeCaseStudy();

    // Wait for the overlay slide-out transition (0.7s) then scroll
    setTimeout(() => {
      const navHeight = document.getElementById('nav')?.offsetHeight || 80;
      window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
    }, 700);
  });
});

// Keyboard accessibility for work cards
document.querySelectorAll('[role="button"]').forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') el.click();
  });
});

// Hero CTA scrolls to work section
document.querySelector('.hero-cta')?.addEventListener('click', () => {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
});
