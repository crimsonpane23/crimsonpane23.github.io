/* =========================================================================
   assets/app.js — the site engine.
   Builds the top menu, footer and the content of every page from
   site-data.js.  You normally do NOT need to edit this file.
   ========================================================================= */
(function () {
  'use strict';

  if (typeof SITE === 'undefined') {
    document.body.innerHTML = '<p style="padding:2rem;font:16px/1.6 system-ui">Could not load <b>site-data.js</b>. Make sure it sits next to index.html and has no typos (a missing quote or comma is the usual cause).</p>';
    return;
  }

  const S = SITE;
  const page = document.body.dataset.page || 'home';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const url = u => { u = String(u == null ? '' : u).trim(); return /^javascript:/i.test(u) ? '#' : esc(u); };
  const ext = u => /^https?:\/\//i.test(String(u)) ? ' target="_blank" rel="noopener"' : '';
  const tags = a => a && a.length ? '<div class="tags">' + a.map(t => '<span class="tag">' + esc(t) + '</span>').join('') + '</div>' : '';
  const navItem = p => (S.nav || []).find(n => n.page === p);
  const href = p => (navItem(p) || {}).href || p + '.html';
  const navLabel = p => (navItem(p) || {}).label || p;
  const hasPage = p => !!navItem(p);

  /* ───────────── shared building blocks ───────────── */
  const arcs = () => '<svg class="ph-art" viewBox="0 0 240 240" aria-hidden="true" fill="none" stroke="currentColor">' +
    '<circle cx="120" cy="120" r="30"/><circle cx="120" cy="120" r="60"/><circle cx="120" cy="120" r="90"/>' +
    '<circle cx="120" cy="120" r="115" stroke-dasharray="2 6"/>' +
    '<path class="a" d="M120 120 C150 100 180 100 205 70"/><path class="a" d="M120 120 C90 140 60 140 36 172"/>' +
    '<path class="a" d="M120 120 C140 150 135 185 160 210"/><path class="a" d="M120 120 C100 90 105 60 80 32"/>' +
    '<circle class="dot" cx="120" cy="120" r="4" stroke="none"/></svg>';

  const head = (d, extra) => '<section class="page-head"><div class="wrap">' + arcs() +
    '<div class="ph-text"><span class="kicker">' + esc(d.eyebrow || navLabel(page)) + '</span><h1>' + esc(d.title || navLabel(page)) + '</h1>' +
    (d.intro ? '<p class="ph-intro">' + esc(d.intro) + '</p>' : '') + (extra || '') + '</div></div></section>';

  const sec = (num, title, inner) => '<section class="block"><div class="wrap"><div class="sec-head reveal"><span class="num">' + num + '</span><h2>' + esc(title) + '</h2></div>' + inner + '</div></section>';
  // numbered([{t:'Title', h:'<html>'}, null, …]) — skips empty ones and numbers the rest 01, 02, 03…
  const numbered = list => list.filter(Boolean).map((s, i) => sec(String(i + 1).padStart(2, '0'), s.t, s.h)).join('');

  const socials = () => (S.socials && S.socials.length) ? '<div class="socials">' + S.socials.map(s => '<a href="' + url(s.url) + '"' + ext(s.url) + '>' + esc(s.label) + '</a>').join('') + '</div>' : '';

  const photo = () => S.photo ? '<img src="' + url(S.photo) + '" alt="' + esc(S.name) + '">' : '<div class="photo-ph"><div>Add your photo<small>set <b>photo</b> in site-data.js</small></div></div>';

  function tabsHtml(id, cats) {
    if (cats.length < 3) return '';              // "All" + only one category → no point
    return '<div class="tabs reveal" id="' + id + '" role="tablist">' + cats.map((c, i) =>
      '<button class="tab' + (i ? '' : ' on') + '" role="tab" aria-selected="' + (!i) + '" data-c="' + esc(c) + '">' + esc(c) + '</button>').join('') + '</div>';
  }
  function bindTabs(id, fn) {
    const el = document.getElementById(id);
    fn('All');
    if (!el) return;
    el.addEventListener('click', e => {
      const b = e.target.closest('.tab'); if (!b) return;
      $$('.tab', el).forEach(t => { const on = t === b; t.classList.toggle('on', on); t.setAttribute('aria-selected', on); });
      fn(b.dataset.c);
    });
  }
  const catsOf = items => ['All'].concat(Array.from(new Set(items.map(i => i.category).filter(Boolean))));

  /* ───────────── PAGES ───────────── */
  const PAGES = {}, POST = {};

  /* HOME */
  PAGES.home = () => {
    const H = S.home || {};
    const explore = (S.nav || []).filter(n => n.page !== 'home');
    const about = [].concat(H.about || []);
    return '' +
    '<section class="hero"><canvas id="ripples" class="hero-bg" aria-hidden="true"></canvas><div class="wrap hero-grid">' +
      '<div class="hero-copy">' +
        '<span class="status"><i></i>' + esc(S.status) + '</span>' +
        '<h1>' + S.headline + '</h1>' +
        '<p class="lead">' + esc(S.intro) + '</p>' +
        '<div class="cta">' +
          (hasPage('projects') ? '<a class="btn primary" href="' + esc(href('projects')) + '">View projects</a>' : '') +
          (S.cv ? '<a class="btn ghost" href="' + url(S.cv) + '" target="_blank" rel="noopener">Download CV</a>' : '') +
          (hasPage('contact') ? '<a class="btn link" href="' + esc(href('contact')) + '">Get in touch →</a>' : '') +
        '</div>' + socials() +
      '</div>' +
      '<div class="hero-photo"><div class="photo">' + photo() + '</div></div>' +
    '</div></section>' +

    numbered([
      about.length ? { t: H.aboutTitle || 'About me', h: '<div class="about-one reveal">' + about.map(p => '<p>' + esc(p) + '</p>').join('') + '</div>' } : null,
      explore.length ? { t: 'Explore', h: '<div class="cards">' + explore.map(n =>
        '<a class="card reveal" href="' + esc(n.href) + '"><h3>' + esc(n.label) + '<span>→</span></h3><p>' + esc(n.blurb || '') + '</p></a>').join('') + '</div>' } : null,
      (H.news && H.news.length) ? { t: H.newsTitle || 'Latest updates', h: '<ul class="news reveal">' + H.news.map(n =>
        '<li><span class="d">' + esc(n.date) + '</span><span>' + (n.url ? '<a href="' + url(n.url) + '"' + ext(n.url) + '>' + esc(n.text) + '</a>' : esc(n.text)) + '</span></li>').join('') + '</ul>' } : null
    ]) +

    (hasPage('contact') ? '<section class="block"><div class="wrap"><div class="band reveal"><h2>Let\'s work together.</h2><p>Interested in collaborating or just want to talk physics? My inbox is open.</p><a class="btn" href="' + esc(href('contact')) + '">Contact me</a></div></div></section>' : '');
  };

  /* INTERESTS */
  PAGES.interests = () => {
    const I = S.interests || {};
    return head(I) + numbered([
      { t: 'Focus areas', h: '<div class="feature-list">' + (I.items || []).map((it, i) =>
        '<article class="feature reveal"><div class="f-ico">' + esc(it.icon) + '</div><div><h3>' + esc(it.title) + '</h3><p>' + esc(it.text) + '</p>' + tags(it.keywords) +
        (it.link ? '<a class="more" href="' + url(it.link) + '"' + ext(it.link) + '>' + esc(it.linkLabel || 'Read more') + ' ↗</a>' : '') +
        '</div><span class="f-num">' + String(i + 1).padStart(2, '0') + '</span></article>').join('') + '</div>' },
      (I.questions && I.questions.length) ? { t: I.questionsTitle || 'Open questions', h: '<ol class="qlist reveal">' + I.questions.map(q => '<li>' + esc(q) + '</li>').join('') + '</ol>' } : null
    ]);
  };

  /* PROJECTS */
  PAGES.projects = () => {
    const P = S.projects || {}, cats = catsOf(P.items || []);
    return head(P) + numbered([{ t: 'Projects', h: tabsHtml('projTabs', cats) + '<div class="projects" id="projGrid"></div>' }]);
  };
  POST.projects = () => {
    const items = (S.projects || {}).items || [];
    bindTabs('projTabs', c => {
      $('#projGrid').innerHTML = items.filter(p => c === 'All' || p.category === c).map(p =>
        '<article class="proj reveal in"><div class="thumb">' + (p.image ? '<img loading="lazy" src="' + url(p.image) + '" alt="' + esc(p.title) + '">' : '[ project image ]') + '</div>' +
        '<div class="body">' + (p.category ? '<div class="cat">' + esc(p.category) + '</div>' : '') + '<h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p>' + tags(p.tags) +
        ((p.links && p.links.length) ? '<div class="foot-links">' + p.links.map(l => '<a href="' + url(l.url) + '"' + ext(l.url) + '>' + esc(l.label) + ' ↗</a>').join('') + '</div>' : '') +
        '</div></article>').join('');
    });
  };

  /* EXPERIENCE — order: timeline → awards → courses → labs → software & tools */
  PAGES.experience = () => {
    const E = S.experience || {}, cats = catsOf(E.items || []);
    const cvBtn = S.cv ? '<div class="ph-cta"><a class="btn primary" href="' + url(S.cv) + '" target="_blank" rel="noopener">↓ ' + esc(E.cvLabel || 'Download CV') + '</a></div>' : '';
    return head(E, cvBtn) + numbered([
      { t: 'Timeline', h: tabsHtml('expTabs', cats) + '<div class="timeline" id="timeline"></div>' },
      (E.awards && E.awards.length) ? { t: E.awardsTitle || 'Awards & scholarships', h: '<ul class="rows reveal">' + E.awards.map(a =>
        '<li><span class="yr">' + esc(a.year) + '</span><div><h3>' + esc(a.title) + '</h3><p>' + esc(a.detail) + '</p></div></li>').join('') + '</ul>' } : null,
      (E.courses && E.courses.length) ? { t: E.coursesTitle || 'Online courses & workshops', h: '<ul class="courses reveal">' + E.courses.map(c =>
        '<li><span class="yr">' + esc(c.year) + '</span><div><h3>' + esc(c.title) + '</h3><div class="sub">' + esc(c.provider) + (c.type ? ' <span class="pill">' + esc(c.type) + '</span>' : '') + '</div></div>' +
        (c.certificate ? '<a class="cert" href="' + url(c.certificate) + '" target="_blank" rel="noopener">View certificate ↗</a>' : '') + '</li>').join('') + '</ul>' } : null,
      (E.labs && E.labs.length) ? { t: E.labsTitle || 'Lab coursework', h: '<ul class="courses reveal">' + E.labs.map(lab =>
        '<li><span class="yr">' + esc(lab.year) + '</span><div><h3>' + esc(lab.title) + '</h3></div>' +
        (lab.url ? '<a class="cert" href="' + url(lab.url) + '" target="_blank" rel="noopener">GitHub repository ↗</a>' : '') + '</li>').join('') + '</ul>' } : null,
      (E.skills && E.skills.length) ? { t: E.skillsTitle || 'Software & tools', h: '<div class="skills">' + E.skills.map(s =>
        '<div class="card reveal"><h3>' + esc(s.group) + '</h3>' + tags(s.items) + '</div>').join('') + '</div>' } : null
    ]);
  };

  POST.experience = () => {
    const items = (S.experience || {}).items || [];
    bindTabs('expTabs', c => {
      $('#timeline').innerHTML = items.filter(e => c === 'All' || e.category === c).map(e =>
        '<div class="t-item reveal in"><div class="t-top"><h3>' + esc(e.role) + '</h3><span class="t-date">' + esc(e.date) + '</span></div>' +
        '<div class="t-org">' + esc(e.org) + '</div>' +
        ((e.points && e.points.length) ? '<ul>' + e.points.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul>' : '') + tags(e.tags) + '</div>').join('');
    });
  };

  /* GALLERY — a few large photos, long captions underneath */
  PAGES.gallery = () => {
    const G = S.gallery || {}, items = G.items || [];
    return head(G) + '<section class="block"><div class="wrap"><div class="gallery">' + items.map((it, i) =>
      '<figure class="shot reveal" style="--h:' + ((i * 47) % 360) + ';--r:' + esc(it.ratio || G.ratio || '4/3') + '">' +
        '<button class="shot-btn" data-i="' + i + '" aria-label="Enlarge photo: ' + esc(it.title || it.caption) + '">' +
          (it.src ? '<img loading="lazy" src="' + url(it.src) + '" alt="' + esc(it.title || it.caption) + '">' : '<span class="ph">[ photo ]</span>') +
        '</button>' +
        '<figcaption>' + (it.title ? '<h3>' + esc(it.title) + '</h3>' : '') + (it.caption ? '<p>' + esc(it.caption) + '</p>' : '') + '</figcaption>' +
      '</figure>').join('') + '</div></div></section>' +
      '<div class="lightbox" id="lb" hidden role="dialog" aria-modal="true" aria-label="Photo viewer">' +
      '<button class="lb-btn lb-close" aria-label="Close">×</button><button class="lb-btn lb-prev" aria-label="Previous photo">‹</button>' +
      '<figure id="lbFig"></figure><button class="lb-btn lb-next" aria-label="Next photo">›</button></div>';
  };
  POST.gallery = () => {
    const items = ((S.gallery || {}).items || []).map((it, i) => Object.assign({ hue: (i * 47) % 360 }, it));
    let cur = 0, lastFocus = null;
    const lb = $('#lb'), fig = $('#lbFig');
    const draw = () => {
      const it = items[cur]; if (!it) return;
      fig.innerHTML = (it.src ? '<img src="' + url(it.src) + '" alt="' + esc(it.title || it.caption) + '">' : '<div class="lb-ph" style="--h:' + it.hue + '">[ photo ]</div>') +
        '<figcaption>' + (it.title ? '<b>' + esc(it.title) + '</b>' : '') + (it.caption ? '<span>' + esc(it.caption) + '</span>' : '') + '</figcaption>';
    };
    const open = i => { cur = i; lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = 'hidden'; draw(); $('.lb-close', lb).focus(); };
    const close = () => { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
    const step = d => { cur = (cur + d + items.length) % items.length; draw(); };
    $$('.shot-btn').forEach(b => b.addEventListener('click', () => open(+b.dataset.i)));
    $('.lb-close', lb).onclick = close;
    $('.lb-prev', lb).onclick = () => step(-1);
    $('.lb-next', lb).onclick = () => step(1);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') step(-1); else if (e.key === 'ArrowRight') step(1);
    });
    let x0 = null;
    lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); x0 = null; });
  };

  /* CONTACT */
  PAGES.contact = () => {
    const C = S.contact || {};
    const rows = [
      ['Email', C.email ? '<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a>' : ''],
      ['Affiliation', esc(C.affiliation)], ['Location', esc(C.location)], ['Availability', esc(C.hours)]
    ].filter(r => r[1]);
    return head(C) + '<section class="block"><div class="wrap contact-grid">' +
      '<div class="info reveal">' + rows.map(r => '<div class="info-item"><small>' + r[0] + '</small>' + r[1] + '</div>').join('') + socials() + '</div>' +
      '<form class="form reveal" id="cForm" ' + (C.formEndpoint ? 'action="' + url(C.formEndpoint) + '" method="POST"' : '') + '>' +
        '<h3>' + esc(C.formTitle || 'Send a message') + '</h3>' +
        '<div class="row2"><div class="field"><label for="cn">Your name</label><input id="cn" name="name" required autocomplete="name"></div>' +
        '<div class="field"><label for="ce">Your email</label><input id="ce" name="email" type="email" required autocomplete="email"></div></div>' +
        '<div class="field"><label for="cs">Subject</label><input id="cs" name="subject"></div>' +
        '<div class="field"><label for="cm">Message</label><textarea id="cm" name="message" required></textarea></div>' +
        '<button class="btn primary" type="submit">Send message</button>' +
        '<p class="form-note" id="cNote">' + (C.formEndpoint ? '' : 'This opens your email app with the message ready to send.') + '</p>' +
      '</form></div></section>';
  };
  POST.contact = () => {
    const C = S.contact || {}, f = $('#cForm');
    if (C.formEndpoint) return;                   // normal form POST to the service
    f.addEventListener('submit', e => {
      e.preventDefault();
      const v = n => f.elements[n].value.trim();
      const body = v('message') + '\n\n— ' + v('name') + ' (' + v('email') + ')';
      location.href = 'mailto:' + encodeURIComponent(C.email || '') + '?subject=' + encodeURIComponent(v('subject') || 'Message from your website') + '&body=' + encodeURIComponent(body);
      $('#cNote').textContent = 'If nothing opened, email me directly at ' + (C.email || '') + '.';
    });
  };

  /* ───────────── CHROME: header, footer, theme, menu ───────────── */
  function buildHeader() {
    const ini = String(S.logoInitials || (S.name || 'YN').slice(0, 2));
    $('#siteHeader').innerHTML = '<div class="wrap bar">' +
      '<a class="brand" href="' + esc(href('home')) + '" aria-label="' + esc(S.name) + ', home"><span class="mark">' + esc(ini.slice(0, -1)) + '<b>' + esc(ini.slice(-1)) + '</b></span><span class="brand-name">' + esc(S.name) + '</span></a>' +
      '<nav class="nav" id="nav" aria-label="Main">' + (S.nav || []).map(n => '<a href="' + esc(n.href) + '"' + (n.page === page ? ' class="active" aria-current="page"' : '') + '>' + esc(n.label) + '</a>').join('') + '</nav>' +
      '<div class="tools"><button class="icon-btn" id="themeBtn" aria-label="Switch light/dark theme" title="Switch theme"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg></button>' +
      '<button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="nav">☰</button></div></div>';

    const hdr = $('#siteHeader'), mb = $('#menuBtn');
    const setMenu = o => { hdr.classList.toggle('open', o); mb.setAttribute('aria-expanded', o); mb.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); mb.textContent = o ? '✕' : '☰'; };
    mb.onclick = e => { e.stopPropagation(); setMenu(!hdr.classList.contains('open')); };
    document.addEventListener('click', e => { if (!hdr.contains(e.target)) setMenu(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 960) setMenu(false); });

    $('#themeBtn').onclick = () => {
      const root = document.documentElement;
      const cur = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const nx = cur === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nx;
      try { localStorage.setItem('theme', nx); } catch (e) {}
    };
  }
  function buildFooter() {
    $('#siteFooter').innerHTML = '<div class="wrap foot"><div><b>' + esc(S.name) + '</b>' + esc(S.footer) + '</div>' +
      '<nav class="foot-nav" aria-label="Footer">' + (S.nav || []).map(n => '<a href="' + esc(n.href) + '">' + esc(n.label) + '</a>').join('') + '</nav>' +
      '<button class="to-top" id="toTop">↑ Top</button></div>';
    $('#toTop').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ───────────── go ───────────── */
  buildHeader();
  $('#main').innerHTML = (PAGES[page] || PAGES.home)();
  if (POST[page]) POST[page]();
  buildFooter();
  document.title = (page === 'home' ? S.name : navLabel(page) + ' | ' + S.name);

  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .1 }) : null;
  $$('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));
})();
