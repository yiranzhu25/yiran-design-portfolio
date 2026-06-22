(function () {

  // ── Theme toggle ────────────────────────────────────────────
  // Handles simple toggle and the homepage variant with sun/moon icon pairs.
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pf-theme', theme);
    var isDark = theme === 'dark';
    var sunD  = document.getElementById('theme-icon-sun');
    var moonD = document.getElementById('theme-icon-moon');
    var sunM  = document.getElementById('theme-icon-sun-m');
    var moonM = document.getElementById('theme-icon-moon-m');
    if (sunD)  sunD.style.display  = isDark ? '' : 'none';
    if (moonD) moonD.style.display = isDark ? 'none' : '';
    if (sunM)  sunM.style.display  = isDark ? '' : 'none';
    if (moonM) moonM.style.display = isDark ? 'none' : '';
  }

  function toggleTheme() {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }

  // Sync icon state immediately (needed on homepage which has sun/moon SVGs)
  applyTheme(document.documentElement.getAttribute('data-theme') || 'light');

  var themeBtn  = document.getElementById('theme-toggle');
  var themeBtnM = document.getElementById('theme-toggle-mobile');
  if (themeBtn)  themeBtn.addEventListener('click', toggleTheme);
  if (themeBtnM) themeBtnM.addEventListener('click', toggleTheme);


  // ── Mobile menu ─────────────────────────────────────────────
  // Two header patterns:
  //   Homepage (index.html): #menu-btn opens, #close-menu closes, class is-open
  //   Case studies: #pf-menu-btn toggles, class is-open
  var dropdown = document.getElementById('pf-dropdown');

  function openDropdown() {
    if (!dropdown) return;
    dropdown.classList.add('is-open');
    dropdown.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDropdown() {
    if (!dropdown) return;
    dropdown.classList.remove('is-open');
    dropdown.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  var menuOpen  = document.getElementById('menu-btn');      // homepage open button
  var menuClose = document.getElementById('close-menu');    // homepage close button
  var menuToggle = document.getElementById('pf-menu-btn'); // case-study toggle button

  if (menuOpen) {
    menuOpen.addEventListener('click', function () {
      openDropdown();
      menuOpen.setAttribute('aria-expanded', 'true');
    });
  }
  if (menuClose) {
    menuClose.addEventListener('click', function () {
      closeDropdown();
      if (menuOpen) menuOpen.setAttribute('aria-expanded', 'false');
    });
  }
  if (menuToggle && dropdown) {
    menuToggle.addEventListener('click', function () {
      if (dropdown.classList.contains('is-open')) {
        closeDropdown();
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        openDropdown();
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    });
    dropdown.querySelectorAll('.pf-dropdown-link').forEach(function (l) {
      l.addEventListener('click', function () {
        closeDropdown();
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ── Contact dropdown ─────────────────────────────────────────
  (function () {
    var btn = document.getElementById('contact-toggle');
    var dd  = document.getElementById('contact-dropdown');
    if (!btn || !dd) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      dd.setAttribute('aria-hidden', !open);
    });
    document.addEventListener('click', function () {
      dd.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      dd.setAttribute('aria-hidden', 'true');
    });
    dd.addEventListener('click', function (e) { e.stopPropagation(); });
  })();


  // ── Copy email ───────────────────────────────────────────────
  document.querySelectorAll('.copy-email').forEach(function (link) {
    var tooltip = document.createElement('span');
    tooltip.className = 'email-tooltip';
    tooltip.textContent = 'Email copied';
    link.appendChild(tooltip);
    link.addEventListener('click', function (e) {
      e.preventDefault();
      navigator.clipboard.writeText(link.dataset.email).then(function () {
        link.classList.add('copied');
        setTimeout(function () { link.classList.remove('copied'); }, 1500);
      });
    });
  });


  // ── Generic accordion ([data-accordion]) ────────────────────
  document.querySelectorAll('[data-accordion]').forEach(function (acc) {
    var btn   = acc.querySelector('.accordion-header');
    var body  = acc.querySelector('.accordion-body');
    var arrow = acc.querySelector('.accordion-arrow');
    if (!btn || !body) return;
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      body.hidden = expanded;
      if (arrow) arrow.style.transform = expanded ? '' : 'rotate(180deg)';
    });
  });


  // ── cs2-accordion (AI data review page) ─────────────────────
  (function () {
    var accBtn  = document.getElementById('acc-conf-btn');
    var accBody = document.getElementById('acc-conf-body');
    if (!accBtn || !accBody) return;
    var accIcon = accBtn.querySelector('.cs2-accordion-chevron');
    accBtn.addEventListener('click', function () {
      var expanded = accBtn.getAttribute('aria-expanded') === 'true';
      accBtn.setAttribute('aria-expanded', String(!expanded));
      accBody.hidden = expanded;
      if (accIcon) accIcon.classList.toggle('open', !expanded);
    });
  })();


  // ── Tab toggles (AI data review page) ───────────────────────
  document.querySelectorAll('[data-tab-group]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group    = btn.dataset.tabGroup;
      var targetId = btn.dataset.tabTarget;
      document.querySelectorAll('[data-tab-group="' + group + '"]').forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
        var panel = document.getElementById(b.dataset.tabTarget);
        if (panel) panel.hidden = true;
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      var target = document.getElementById(targetId);
      if (target) target.hidden = false;
    });
  });


  // ── Active section tracking (AI data review page) ───────────
  (function () {
    var navLinks = document.querySelectorAll('[data-nav-target]');
    if (!navLinks.length) return;
    var sections = Array.from(navLinks)
      .map(function (l) { return document.getElementById(l.dataset.navTarget); })
      .filter(Boolean);
    function setActive(id) {
      navLinks.forEach(function (l) { l.classList.toggle('is-active', l.dataset.navTarget === id); });
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    sections.forEach(function (s) { observer.observe(s); });
    if (sections[0]) setActive(sections[0].id);
  })();


  // ── Nav smooth scroll (homepage only) ───────────────────────
  (function () {
    var links = document.querySelectorAll('.nav-scroll-link');
    if (!links.length) return;
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var path = window.location.pathname;
        var isHome = path === '/' || /\/(index\.html)?$/.test(path);
        if (!isHome) return;
        e.preventDefault();
        var target = document.getElementById(link.dataset.section);
        if (target) {
          window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
        }
        closeDropdown();
        if (menuOpen) menuOpen.setAttribute('aria-expanded', 'false');
      });
    });
  })();


  // ── Site-wide password gate (password.html) ─────────────────
  (function () {
    var pwInput  = document.getElementById('site-pw-input');
    var pwSubmit = document.getElementById('site-pw-submit');
    var pwError  = document.getElementById('site-pw-error');
    if (!pwInput || !pwSubmit) return;

    function tryUnlock() {
      if (pwInput.value === '2026') {
        sessionStorage.setItem('pf-unlocked', '1');
        window.location.href = 'index.html';
      } else {
        pwInput.classList.add('error');
        if (pwError) pwError.classList.add('visible');
        pwInput.focus();
      }
    }

    pwSubmit.addEventListener('click', tryUnlock);
    pwInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') tryUnlock(); });
    pwInput.addEventListener('input', function () {
      pwInput.classList.remove('error');
      if (pwError) pwError.classList.remove('visible');
    });
  })();

  // ── AI case study password gate (password-ai-data-review.html) ──
  (function () {
    var pwInput  = document.getElementById('pw-input');
    var pwSubmit = document.getElementById('pw-submit');
    var pwError  = document.getElementById('pw-error');
    if (!pwInput || !pwSubmit) return;

    function tryUnlock() {
      if (pwInput.value === '2026') {
        window.location.href = 'case-study-ai-data-review.html';
      } else {
        pwInput.classList.add('error');
        if (pwError) pwError.classList.add('visible');
        pwInput.focus();
      }
    }

    pwSubmit.addEventListener('click', tryUnlock);
    pwInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') tryUnlock(); });
    pwInput.addEventListener('input', function () {
      pwInput.classList.remove('error');
      if (pwError) pwError.classList.remove('visible');
    });
  })();

})();
