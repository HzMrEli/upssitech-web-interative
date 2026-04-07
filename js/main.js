/**
 * UPSSITECH Interactive Website – main.js
 *
 * All visible content is driven by data/content.json.
 * To update the site content, simply edit that JSON file –
 * no knowledge of HTML or JavaScript required.
 */

/* ── Helpers ──────────────────────────────────────────────────────── */

/** Safely get a DOM element, returns null if not found. */
function el(id) { return document.getElementById(id); }

/** Create an HTML element with optional classes and innerHTML. */
function make(tag, { cls = '', html = '', attrs = {} } = {}) {
  const elem = document.createElement(tag);
  if (cls) elem.className = cls;
  if (html) elem.innerHTML = html;
  Object.entries(attrs).forEach(([k, v]) => elem.setAttribute(k, v));
  return elem;
}

/** Append multiple children to a parent element. */
function appendAll(parent, children) {
  children.forEach(c => parent.appendChild(c));
}

/** Format a date string (YYYY-MM-DD) to a French locale string. */
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ── Render functions ─────────────────────────────────────────────── */

function renderNav(navData) {
  const menu = el('navMenu');
  if (!menu) return;
  navData.links.forEach(link => {
    const li = make('li');
    const a = make('a', { html: link.label, attrs: { href: link.href } });
    li.appendChild(a);
    menu.appendChild(li);
  });
}

function renderHero(heroData) {
  const titleEl = el('heroTitle');
  if (titleEl) titleEl.innerHTML = heroData.title;

  const subtitleEl = el('heroSubtitle');
  if (subtitleEl) subtitleEl.innerHTML = heroData.subtitle.replace(/\n/g, '<br>');

  const descEl = el('heroDescription');
  if (descEl) descEl.textContent = heroData.description;

  const ctaEl = el('heroCta');
  if (ctaEl && heroData.cta) {
    heroData.cta.forEach(btn => {
      const a = make('a', {
        cls: 'btn ' + (btn.primary ? 'btn-primary' : 'btn-outline'),
        html: btn.label,
        attrs: { href: btn.href }
      });
      ctaEl.appendChild(a);
    });
  }

  const statsEl = el('heroStats');
  if (statsEl && heroData.stats) {
    heroData.stats.forEach(stat => {
      const div = make('div', {
        cls: 'stat-item reveal',
        html: `<span class="stat-value">${stat.value}</span><span class="stat-label">${stat.label}</span>`
      });
      statsEl.appendChild(div);
    });
  }
}

function renderAbout(aboutData) {
  const titleEl = el('aboutTitle');
  if (titleEl) titleEl.textContent = aboutData.title;

  const subEl = el('aboutSubtitle');
  if (subEl) subEl.textContent = aboutData.subtitle;

  const descEl = el('aboutDescription');
  if (descEl) descEl.textContent = aboutData.description;

  const grid = el('highlightGrid');
  if (!grid) return;
  aboutData.highlights.forEach((h, i) => {
    const card = make('div', {
      cls: `highlight-card reveal reveal-delay-${i + 1}`,
      html: `
        <span class="highlight-icon" aria-hidden="true">${h.icon}</span>
        <h3 class="highlight-title">${h.title}</h3>
        <p class="highlight-text">${h.text}</p>
      `
    });
    grid.appendChild(card);
  });
}

function renderFormations(formData) {
  const titleEl = el('formationsTitle');
  if (titleEl) titleEl.textContent = formData.title;

  const subEl = el('formationsSubtitle');
  if (subEl) subEl.textContent = formData.subtitle;

  const descEl = el('formationsDescription');
  if (descEl) descEl.textContent = formData.description;

  const grid = el('formationsGrid');
  if (!grid) return;
  formData.items.forEach((f, i) => {
    const skillsHtml = f.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
    const card = make('div', {
      cls: `formation-card reveal reveal-delay-${i + 1}`,
      html: `
        <div class="formation-header" style="color:${f.color}; background:${f.color}10">
          <div class="formation-code">${f.code}</div>
          <span class="formation-icon" aria-hidden="true">${f.icon}</span>
          <h3 class="formation-title" style="color:${f.color}">${f.title}</h3>
        </div>
        <div class="formation-body">
          <p class="formation-description">${f.description}</p>
          <div class="formation-skills">${skillsHtml}</div>
          <div class="formation-meta">
            <span class="meta-item">🕐 ${f.duration}</span>
            <span class="meta-item">🎓 ${f.level}</span>
            <span class="meta-item">✅ ${f.accreditation}</span>
          </div>
        </div>
      `
    });
    grid.appendChild(card);
  });
}

function renderRecherche(rechercheData) {
  const titleEl = el('rechercheTitle');
  if (titleEl) titleEl.textContent = rechercheData.title;

  const subEl = el('rechercheSubtitle');
  if (subEl) subEl.textContent = rechercheData.subtitle;

  const descEl = el('rechercheDescription');
  if (descEl) descEl.textContent = rechercheData.description;

  const labsGrid = el('labsGrid');
  if (labsGrid) {
    rechercheData.labs.forEach((lab, i) => {
      const card = make('div', {
        cls: `lab-card reveal reveal-delay-${i + 1}`,
        html: `
          <span class="lab-icon" aria-hidden="true">${lab.icon}</span>
          <div class="lab-name">${lab.name}</div>
          <div class="lab-fullname">${lab.fullName}</div>
          <p class="lab-description">${lab.description}</p>
        `
      });
      labsGrid.appendChild(card);
    });
  }

  const themesGrid = el('themesGrid');
  if (themesGrid) {
    rechercheData.themes.forEach(t => {
      const tag = make('span', {
        cls: 'theme-tag reveal',
        html: `<span aria-hidden="true">${t.icon}</span> ${t.label}`
      });
      themesGrid.appendChild(tag);
    });
  }
}

function renderInternational(intlData) {
  const titleEl = el('internationalTitle');
  if (titleEl) titleEl.textContent = intlData.title;

  const subEl = el('internationalSubtitle');
  if (subEl) subEl.textContent = intlData.subtitle;

  const descEl = el('internationalDescription');
  if (descEl) descEl.textContent = intlData.description;

  const programsGrid = el('programsGrid');
  if (programsGrid) {
    intlData.programs.forEach((p, i) => {
      const card = make('div', {
        cls: `program-card reveal reveal-delay-${i + 1}`,
        html: `
          <span class="program-icon" aria-hidden="true">${p.icon}</span>
          <h3 class="program-title">${p.title}</h3>
          <p class="program-description">${p.description}</p>
        `
      });
      programsGrid.appendChild(card);
    });
  }

  const partnersGrid = el('partnersGrid');
  if (partnersGrid) {
    intlData.partners.forEach(p => {
      const tag = make('span', {
        cls: 'partner-tag reveal',
        html: `<span aria-hidden="true">${p.country}</span> ${p.name} <span class="partner-count">${p.count}</span>`
      });
      partnersGrid.appendChild(tag);
    });
  }
}

function renderStudentLife(studentData) {
  const titleEl = el('studentLifeTitle');
  if (titleEl) titleEl.textContent = studentData.title;

  const subEl = el('studentLifeSubtitle');
  if (subEl) subEl.textContent = studentData.subtitle;

  const descEl = el('studentLifeDescription');
  if (descEl) descEl.textContent = studentData.description;

  const clubsGrid = el('clubsGrid');
  if (clubsGrid) {
    studentData.clubs.forEach((club, i) => {
      const card = make('div', {
        cls: `club-card reveal reveal-delay-${i % 3 + 1}`,
        html: `
          <div class="club-top">
            <span class="club-icon" aria-hidden="true">${club.icon}</span>
            <div>
              <div class="club-name">${club.name}</div>
              <span class="club-category">${club.category}</span>
            </div>
          </div>
          <p class="club-description">${club.description}</p>
        `
      });
      clubsGrid.appendChild(card);
    });
  }

  const eventsGrid = el('eventsGrid');
  if (eventsGrid) {
    studentData.events.forEach((evt, i) => {
      const card = make('div', {
        cls: `event-card reveal reveal-delay-${i + 1}`,
        html: `
          <span class="event-icon" aria-hidden="true">${evt.icon}</span>
          <div class="event-name">${evt.name}</div>
          <p class="event-description">${evt.description}</p>
        `
      });
      eventsGrid.appendChild(card);
    });
  }
}

function renderNews(newsData) {
  const titleEl = el('newsTitle');
  if (titleEl) titleEl.textContent = newsData.title;

  const subEl = el('newsSubtitle');
  if (subEl) subEl.textContent = newsData.subtitle;

  const grid = el('newsGrid');
  if (!grid) return;
  newsData.items.forEach((item, i) => {
    const card = make('article', {
      cls: `news-card reveal reveal-delay-${i % 3 + 1}`,
      html: `
        <div class="news-image-placeholder" aria-hidden="true">📰</div>
        <div class="news-body">
          <div class="news-meta">
            <span class="news-category">${item.category}</span>
            <time class="news-date" datetime="${item.date}">${formatDate(item.date)}</time>
          </div>
          <h3 class="news-title">${item.title}</h3>
          <p class="news-excerpt">${item.excerpt}</p>
        </div>
      `
    });
    grid.appendChild(card);
  });
}

function renderContact(contactData) {
  const titleEl = el('contactTitle');
  if (titleEl) titleEl.textContent = contactData.title;

  const subEl = el('contactSubtitle');
  if (subEl) subEl.textContent = contactData.subtitle;

  const infoEl = el('contactInfo');
  if (infoEl) {
    contactData.info.forEach(item => {
      const card = make('div', {
        cls: 'info-card reveal',
        html: `
          <span class="info-icon" aria-hidden="true">${item.icon}</span>
          <div>
            <div class="info-label">${item.label}</div>
            <div class="info-value">${item.value}</div>
          </div>
        `
      });
      infoEl.appendChild(card);
    });
  }

  const subjectSelect = el('contactSubject');
  if (subjectSelect && contactData.form.subjects) {
    contactData.form.subjects.forEach(s => {
      const opt = make('option', { html: s, attrs: { value: s } });
      subjectSelect.appendChild(opt);
    });
  }
}

function renderFooter(siteData) {
  const tagEl = el('footerTagline');
  if (tagEl) tagEl.textContent = siteData.description;

  const socialEl = el('footerSocial');
  if (socialEl && siteData.socialLinks) {
    const icons = {
      linkedin: '💼',
      twitter: '🐦',
      youtube: '▶️',
      instagram: '📷'
    };
    Object.entries(siteData.socialLinks).forEach(([platform, url]) => {
      const a = make('a', {
        cls: 'social-link',
        html: icons[platform] || '🔗',
        attrs: {
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer',
          'aria-label': platform.charAt(0).toUpperCase() + platform.slice(1)
        }
      });
      socialEl.appendChild(a);
    });
  }

  const yearEl = el('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ── Navigation behaviour ─────────────────────────────────────────── */

function initNavigation() {
  const header = el('site-header');
  const toggle = el('navToggle');
  const menu = el('navMenu');

  // Scroll: add .scrolled class after a small offset
  function handleScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
    if (el('backToTop')) {
      el('backToTop').classList.toggle('visible', window.scrollY > 400);
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile hamburger toggle
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click (mobile)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function updateActiveLink() {
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) currentId = section.id;
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === `#${currentId}`);
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

/* ── Scroll-reveal observer ───────────────────────────────────────── */

function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Contact form ─────────────────────────────────────────────────── */

function initContactForm() {
  const form = el('contactForm');
  if (!form) return;

  const fields = [
    { id: 'contactName',    errId: 'nameError',    validate: v => v.trim().length >= 2, msg: 'Veuillez entrer votre nom (min. 2 caractères).' },
    { id: 'contactEmail',   errId: 'emailError',   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Veuillez entrer un email valide.' },
    { id: 'contactSubject', errId: 'subjectError', validate: v => v !== '', msg: 'Veuillez choisir un sujet.' },
    { id: 'contactMessage', errId: 'messageError', validate: v => v.trim().length >= 10, msg: 'Veuillez entrer un message (min. 10 caractères).' }
  ];

  function validateField(field) {
    const input = el(field.id);
    const errEl = el(field.errId);
    const valid = input && field.validate(input.value);
    if (input) input.classList.toggle('error', !valid);
    if (errEl) errEl.textContent = valid ? '' : field.msg;
    return valid;
  }

  // Live validation on blur
  fields.forEach(field => {
    const input = el(field.id);
    if (input) input.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const allValid = fields.map(f => validateField(f)).every(Boolean);
    if (!allValid) return;

    const btn = el('submitBtn');
    const successEl = el('formSuccess');
    if (btn) {
      btn.disabled = true;
      btn.querySelector('.btn-text').textContent = 'Envoi en cours…';
    }

    // Simulate async send (replace with actual fetch/API call)
    setTimeout(() => {
      form.reset();
      if (btn) {
        btn.disabled = false;
        btn.querySelector('.btn-text').textContent = 'Envoyer le message';
      }
      if (successEl) {
        successEl.textContent = '✓ Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.';
        successEl.classList.add('show');
        successEl.focus();
        setTimeout(() => successEl.classList.remove('show'), 6000);
      }
    }, 1200);
  });
}

/* ── Back to top ──────────────────────────────────────────────────── */

function initBackToTop() {
  const btn = el('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Bootstrap: load JSON and render everything ───────────────────── */

async function bootstrap() {
  let data;
  try {
    const res = await fetch('data/content.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.error('[UPSSITECH] Failed to load content.json:', err);
    return;
  }

  renderNav(data.nav);
  renderHero(data.hero);
  renderAbout(data.about);
  renderFormations(data.formations);
  renderRecherche(data.recherche);
  renderInternational(data.international);
  renderStudentLife(data.studentLife);
  renderNews(data.news);
  renderContact(data.contact);
  renderFooter(data.site);

  // Init interactive behaviours after DOM is populated
  initNavigation();
  initScrollReveal();
  initContactForm();
  initBackToTop();
}

// Start once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
