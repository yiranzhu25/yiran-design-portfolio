/* ============================================================================
   PORTFOLIO UI KIT — components-content.jsx
   Content building blocks: Eyebrow, SectionHeader, Prose, Tags, Intro,
   FullVisual, InlineVisual, Metrics, Timeline, Tldr, ActionButtons.
   ============================================================================ */

/* ---- Eyebrow (mono label) ----------------------------------------------- */
function Eyebrow({ children, style }) {
  return <div className="pf-eyebrow" style={style}>{children}</div>;
}

/* ---- SectionHeader ------------------------------------------------------ */
function SectionHeader({ eyebrow, title, aside }) {
  return (
    <div className="pf-section-header">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="pf-section-title">{title}</h2>
      </div>
      {aside && <div>{aside}</div>}
    </div>
  );
}

/* ---- Prose -------------------------------------------------------------- */
function Prose({ children, style }) {
  return <div className="pf-prose" style={style}>{children}</div>;
}

/* ---- Tags --------------------------------------------------------------- */
function Tags({ items, solidFirst = false }) {
  return (
    <div className="pf-tags">
      {items.map((t, i) => (
        <span key={t} className={"pf-tag" + (solidFirst && i === 0 ? " pf-tag--solid" : "")}>{t}</span>
      ))}
    </div>
  );
}

/* ---- Intro / Hero ------------------------------------------------------- */
function Intro({ eyebrow, title, muted, sub, meta }) {
  return (
    <section className="pf-intro pf-fade-in">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="pf-intro-title">
        {title} {muted && <span className="pf-muted">{muted}</span>}
      </h1>
      {sub && <p className="pf-intro-sub">{sub}</p>}
      {meta && (
        <dl className="pf-intro-meta">
          {meta.map((m) => (
            <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
          ))}
        </dl>
      )}
    </section>
  );
}

/* ---- FullVisual — full-bleed image section ------------------------------ */
function FullVisual({ id, placeholder = "Drop a project hero image", captionLeft, captionRight, src }) {
  return (
    <figure className="pf-visual-full" style={{ margin: "var(--space-8) 0" }}>
      <image-slot id={id} shape="rect" placeholder={placeholder} src={src}></image-slot>
      {(captionLeft || captionRight) && (
        <figcaption className="pf-visual-caption" style={{ padding: "var(--space-3) var(--space-4)", marginTop: 0 }}>
          <span>{captionLeft}</span><span>{captionRight}</span>
        </figcaption>
      )}
    </figure>
  );
}

/* ---- InlineVisual — image beside text ----------------------------------- */
function InlineVisual({ id, placeholder = "Drop an image", reverse, eyebrow, title, children, src }) {
  return (
    <div className={"pf-visual-inline" + (reverse ? " is-reverse" : "")}>
      <image-slot id={id} shape="rounded" radius="8" placeholder={placeholder} src={src}></image-slot>
      <div>
        {eyebrow && <Eyebrow style={{ marginBottom: "var(--space-3)" }}>{eyebrow}</Eyebrow>}
        {title && <h3 className="ds-h3" style={{ marginTop: 0, marginBottom: "var(--space-3)" }}>{title}</h3>}
        <Prose>{children}</Prose>
      </div>
    </div>
  );
}

/* ---- Metrics ------------------------------------------------------------ */
function Metrics({ items }) {
  return (
    <div className="pf-metrics">
      {items.map((m) => (
        <div className="pf-metric" key={m.label}>
          <div className="pf-metric-value">{m.value}{m.sup && <sup>{m.sup}</sup>}</div>
          <div className="pf-metric-label">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ---- Timeline ----------------------------------------------------------- */
function Timeline({ items }) {
  return (
    <div className="pf-timeline">
      {items.map((it, i) => (
        <div className="pf-timeline-item" key={i}>
          <div className="pf-timeline-year">{it.year}</div>
          <div className="pf-timeline-body">
            <h4>{it.title}</h4>
            {it.role && <div className="pf-timeline-role">{it.role}</div>}
            {it.desc && <p style={{ marginTop: "var(--space-2)" }}>{it.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Tldr --------------------------------------------------------------- */
function Tldr({ summary, points }) {
  return (
    <div className="pf-tldr">
      <span className="pf-tldr-badge">TL;DR</span>
      <div className="pf-tldr-body">
        <p>{summary}</p>
        {points && (
          <div className="pf-tldr-points">
            {points.map((p, i) => <div className="pf-tldr-point" key={i}>{p}</div>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- ActionButtons ------------------------------------------------------ */
function ActionButton({ variant = "primary", icon, children, onClick, href }) {
  const cls = "pf-btn pf-btn--" + variant;
  const inner = (
    <>
      {children}
      {icon && <span className={variant === "text" ? "pf-btn-arrow" : ""} style={{ display: "inline-flex" }}><Icon name={icon} size={16} /></span>}
    </>
  );
  if (href) return <a className={cls} href={href} onClick={onClick}>{inner}</a>;
  return <button className={cls} onClick={onClick}>{inner}</button>;
}
function ActionButtons({ children }) {
  return <div className="pf-actions">{children}</div>;
}

Object.assign(window, {
  Eyebrow, SectionHeader, Prose, Tags, Intro, FullVisual, InlineVisual,
  Metrics, Timeline, Tldr, ActionButton, ActionButtons,
});
