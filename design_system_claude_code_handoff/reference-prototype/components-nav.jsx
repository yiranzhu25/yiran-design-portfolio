/* ============================================================================
   PORTFOLIO UI KIT — components-nav.jsx
   Navigation + chrome: Icon set, SideNav, MobileNav (topbar + dropdown),
   Switcher (segmented global nav), ThemeToggle.
   Icons follow the Lucide style (1.75px stroke, round caps/joins).
   ============================================================================ */
const { useState, useEffect, useRef, useLayoutEffect, useCallback } = React;

/* ---- Icon — minimal line icons (Lucide-style paths) --------------------- */
function Icon({ name, size = 18, stroke = 1.75, style }) {
  const paths = {
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
    arrowLeft: <path d="M19 12H5M11 18l-6-6 6-6" />,
    arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
      strokeLinejoin="round" style={style} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/* ---- ThemeToggle -------------------------------------------------------- */
function ThemeToggle({ theme, onToggle, withLabel }) {
  return (
    <button className="pf-iconbtn" onClick={onToggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      style={withLabel ? { width: "auto", padding: "0 var(--space-4)", gap: "var(--space-2)" } : undefined}>
      <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
      {withLabel && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{theme === "dark" ? "Light" : "Dark"}</span>}
    </button>
  );
}

/* ---- SideNav — vertical, sticky ----------------------------------------- */
function SideNav({ items, active, onSelect, theme, onToggleTheme, name = "Mara Vance", role = "Product Designer", onBack, backLabel = "All work", meta }) {
  return (
    <nav className="pf-sidenav">
      {onBack && (
        <button className="pf-back" onClick={onBack} style={{ marginBottom: "calc(-1 * var(--space-4))" }}>
          <Icon name="arrowLeft" size={14} /> {backLabel}
        </button>
      )}
      <div className="pf-wordmark">{name}<span>{role}</span></div>
      <div className="pf-navlist">
        {items.map((it, i) => (
          <a key={it.id} href={`#${it.id}`} onClick={(e) => { e.preventDefault(); onSelect(it.id); }}
            className={"pf-navlink" + (active === it.id ? " is-active" : "")}>
            <span className="pf-navindex">{String(i + 1).padStart(2, "0")}</span>
            <span>{it.label}</span>
          </a>
        ))}
      </div>
      <div className="pf-sidenav-footer">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <div className="pf-sidenav-meta">{meta || <>Available for work<br />San Francisco · 2026</>}</div>
      </div>
    </nav>
  );
}

/* ---- TopHeader — landing-page global header (desktop) ------------------- */
function TopHeader({ name = "Mara Vance", role = "Product Designer", views, view, onSwitch, theme, onToggleTheme }) {
  return (
    <header className="pf-header">
      <div className="pf-wordmark">{name}<span>{role}</span></div>
      <Switcher options={views} value={view} onChange={onSwitch} />
      <div className="pf-header-controls">
        <span className="pf-sidenav-meta" style={{ margin: 0 }}>Available for work</span>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}

/* ---- MobileNav — sticky topbar + fullscreen dropdown -------------------- */
function MobileNav({ items, active, onSelect, theme, onToggleTheme, name = "Mara Vance", onBack }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <>
      <header className="pf-topbar">
        <div className="pf-row" style={{ gap: "var(--space-3)" }}>
          {onBack && (
            <button className="pf-iconbtn" onClick={onBack} aria-label="Back to work"><Icon name="arrowLeft" size={17} /></button>
          )}
          <div className="pf-wordmark" style={{ fontSize: "0.9375rem" }}>{name}</div>
        </div>
        <div className="pf-row" style={{ gap: "var(--space-2)" }}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button className="pf-menu-btn" onClick={() => setOpen(true)}>
            <Icon name="menu" size={15} /> Menu
          </button>
        </div>
      </header>
      <div className={"pf-dropdown" + (open ? " is-open" : "")}>
        <div className="pf-dropdown-head">
          <span className="pf-eyebrow">Navigation</span>
          <button className="pf-iconbtn" onClick={() => setOpen(false)} aria-label="Close menu">
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="pf-dropdown-list">
          {items.map((it, i) => (
            <a key={it.id} href={`#${it.id}`} className="pf-dropdown-link"
              onClick={(e) => { e.preventDefault(); onSelect(it.id); setOpen(false); }}>
              <span className="pf-navindex">{String(i + 1).padStart(2, "0")}</span>
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---- Switcher — segmented control with sliding thumb -------------------- */
function Switcher({ options, value, onChange }) {
  const ref = useRef(null);
  const [thumb, setThumb] = useState({ left: 3, width: 0 });
  const [animate, setAnimate] = useState(false);
  const measure = useCallback(() => {
    const root = ref.current;
    if (!root) return;
    const idx = options.findIndex((o) => o.id === value);
    const btn = root.querySelectorAll("button")[idx];
    if (btn) setThumb({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [value, options]);
  useLayoutEffect(() => { measure(); }, [measure]);
  useEffect(() => {
    measure();
    const raf = requestAnimationFrame(() => setAnimate(true)); // enable sliding only after first paint
    window.addEventListener("resize", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    const t = setTimeout(measure, 400);
    return () => { window.removeEventListener("resize", measure); clearTimeout(t); cancelAnimationFrame(raf); };
  }, [measure]);
  return (
    <div className="pf-switcher" ref={ref} role="tablist">
      <span className="pf-switcher-thumb" style={{ left: thumb.left, width: thumb.width, transition: animate ? undefined : "none" }} />
      {options.map((o) => (
        <button key={o.id} role="tab" aria-selected={value === o.id}
          className={value === o.id ? "is-active" : ""}
          onClick={() => onChange(o.id)}>{o.label}</button>
      ))}
    </div>
  );
}

Object.assign(window, { Icon, ThemeToggle, SideNav, TopHeader, MobileNav, Switcher });
