(function () {
  const SELECTORS = [
    // Homepage hero
    '.intro-greeting',
    '.intro-heading',
    '.intro-body-text',
    // Work section
    '.home-section-title',
    '.work-entry',
    '.work-card-sm',
    // Career section
    '.career-heading',
    '.career-header-row',
    '.career-entry',
    // Personal section
    '.personal-heading',
    '.personal-grid',
    // Case study
    '.cs-hero-thumb-wrap',
    '.cs-content-section',
    '.kpi-card',
    '.impact-card-new',
    '.impact-group-inner',
    '.feature-list-item',
    '.accordion',
    '.cs-feature-break',
  ];

  function init() {
    const elements = document.querySelectorAll(SELECTORS.join(','));

    // Group siblings to apply stagger delays
    const parentGroups = new Map();
    elements.forEach(el => {
      el.classList.add('anim-ready');
      const parent = el.parentElement;
      if (!parentGroups.has(parent)) parentGroups.set(parent, []);
      parentGroups.get(parent).push(el);
    });

    // Apply stagger delay to sibling groups
    parentGroups.forEach(siblings => {
      if (siblings.length > 1) {
        siblings.forEach((el, i) => {
          el.style.transitionDelay = (i * 80) + 'ms';
        });
      }
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
