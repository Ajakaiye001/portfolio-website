document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================
       1. HEADING — Split words and stagger reveal
       ============================================== */
    const heading = document.querySelector('.footer-heading');
    const peaceIcon = heading.querySelector('.peace-icon-inline');

    // Temporarily detach the icon so we only split text nodes
    const iconClone = peaceIcon.cloneNode(true);
    peaceIcon.remove();

    // Grab raw HTML, split on whitespace while preserving <br> tags WITH their attributes
    const rawHTML = heading.innerHTML;
    // Capture each <br> with its full tag and store indexed
    const brTags = [];
    const htmlNoBr = rawHTML.replace(/<br\s*[^>]*\/?>/gi, (match) => {
        brTags.push(match);
        return ` {{BR_${brTags.length - 1}}} `;
    });
    const tokens = htmlNoBr.split(/\s+/).filter(Boolean);

    let wordIndex = 0;
    const wrappedHTML = tokens.map(token => {
        const brMatch = token.match(/^\{\{BR_(\d+)\}\}$/);
        if (brMatch) {
            return brTags[parseInt(brMatch[1])]; // restore original <br class="...">
        }
        const delay = wordIndex * 80; // ms stagger per word
        wordIndex++;
        return `<span class="heading-word" style="transition-delay:${delay}ms">${token}</span>`;
    }).join(' ');

    heading.innerHTML = wrappedHTML + ' ';
    heading.appendChild(iconClone);

    /* ==============================================
       2. INTERSECTION OBSERVER — Scroll reveals
       ============================================== */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // Heading words
                if (el.classList.contains('footer-top')) {
                    const words = el.querySelectorAll('.heading-word');
                    words.forEach(w => w.classList.add('revealed'));
                    // Reveal peace icon after last word
                    const icon = el.querySelector('.peace-icon-inline');
                    if (icon) {
                        setTimeout(() => icon.classList.add('revealed'), wordIndex * 80 + 200);
                    }
                }

                // Dashed dividers
                if (el.classList.contains('dashed-divider')) {
                    el.classList.add('revealed');
                }

                // Company info
                if (el.classList.contains('company-info')) {
                    el.classList.add('revealed');
                }

                // Link columns – staggered
                if (el.classList.contains('link-column')) {
                    el.classList.add('revealed');
                    // Stagger each <li> inside
                    const items = el.querySelectorAll('li');
                    items.forEach((li, i) => {
                        li.style.transitionDelay = `${i * 80 + 150}ms`;
                    });
                }

                revealObserver.unobserve(el);
            }
        });
    }, { threshold: 0.15 });

    // Register elements to observe
    document.querySelectorAll('.footer-top, .dashed-divider, .company-info, .link-column')
        .forEach(el => revealObserver.observe(el));


    /* ==============================================
       3. BLOB TAGS — Infinite marquee with duplicated set
       ============================================== */
    const blobsContainer = document.querySelector('.footer-bottom-blobs');

    const blobsData = [
        { text: "MARKETING",     bumps: 4, color: "#31c469",  rot: -12, yOff: 10  },
        { text: "STRATEGY",      bumps: 3, color: "#f2fa5a",  rot:  8,  yOff: -25 },
        { text: "BRANDING",      bumps: 4, color: "#f0663a",  rot: -6,  yOff: 5   },
        { text: "SALES",         bumps: 3, color: "#65a0fb",  rot:  18, yOff: -35  },
        { text: "WEBSITE DEV",   bumps: 4, color: "#fbc4f1",  rot: -15, yOff: 15  },
        { text: "FRAMER DEV",    bumps: 3, color: "#fbf3cd",  rot:  5,  yOff: -10 },
        { text: "WEBFLOW",       bumps: 3, color: "#56ef98",  rot: -10, yOff: -30 },
        { text: "NEWSLETTER",    bumps: 4, color: "#f0663a",  rot:  12, yOff: 10  },
        { text: "UI/UX DESIGN",  bumps: 4, color: "#65a0fb",  rot: -8,  yOff: -40 },
        { text: "PORTFOLIO",     bumps: 3, color: "#d0f842",  rot:  20, yOff: 5   },
        { text: "AI DESIGNS",    bumps: 4, color: "#fbf3cd",  rot: -5,  yOff: -15 },
        { text: "ILLUSTRATION",  bumps: 4, color: "#ffaacb",  rot: -20, yOff: -35 },
        { text: "ADVERTISEMENT", bumps: 4, color: "#65a0fb",  rot:  10, yOff: 10  }
    ];

    function createBlobPill(data) {
        const pill = document.createElement('div');
        pill.className = 'blob-pill';
        pill.style.setProperty('--rot', `${data.rot}deg`);
        pill.style.marginBottom = `${Math.max(0, data.yOff + 40)}px`;

        for (let i = 0; i < data.bumps; i++) {
            const capsule = document.createElement('div');
            capsule.className = 'blob-capsule';
            capsule.style.backgroundColor = data.color;
            pill.appendChild(capsule);
        }

        const textSpan = document.createElement('span');
        textSpan.className = 'blob-text';
        textSpan.textContent = data.text;
        pill.appendChild(textSpan);

        return pill;
    }

    // Create a track that holds two copies of all blobs for seamless looping
    const track = document.createElement('div');
    track.className = 'blob-track';

    // First set
    blobsData.forEach(data => track.appendChild(createBlobPill(data)));
    // Duplicate set for seamless infinite scroll
    blobsData.forEach(data => track.appendChild(createBlobPill(data)));

    blobsContainer.appendChild(track);
});
