/* ============================================================================
   PORTFOLIO UI KIT — app.jsx
   Interactive demo wiring every component into a working portfolio.
   - Side nav anchors scroll to sections (IntersectionObserver highlights active)
   - Switcher swaps the global view (Work / About / Lab)
   - Theme toggle persists to localStorage
   ============================================================================ */
const { useState, useEffect, useCallback } = React;

const VIEWS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "lab", label: "Lab" },
];

const CASE_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The problem" },
  { id: "process", label: "Process" },
  { id: "impact", label: "Impact" },
  { id: "next", label: "Reflection" },
];

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("pf-theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pf-theme", theme);
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 32;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ---- WORK VIEW ---------------------------------------------------------- */
function WorkView({ onOpenCase }) {
  return (
    <>
      <div id="intro">
        <Intro
          eyebrow="Portfolio · 2026"
          title="I design calm interfaces for"
          muted="complex products."
          sub="Product designer focused on developer tools, data systems, and the quiet craft of making hard things feel obvious."
          meta={[
            { label: "Focus", value: "Product · Systems · 0→1" },
            { label: "Now", value: "Design Lead, Ferrous" },
            { label: "Based", value: "San Francisco" },
          ]}
        />
        <div style={{ marginTop: "var(--space-5)" }}>
          <Tags items={["UX Strategy", "Design Systems", "Prototyping", "Research", "Front-end"]} />
        </div>
      </div>

      <section className="pf-section" id="summary">
        <Tldr
          summary="A decade turning ambiguous, technical problems into interfaces people trust — from observability dashboards to a design system used by 40+ engineers."
          points={[
            "Lead designer on three 0→1 products, two acquired.",
            "Build and maintain the systems that keep teams fast.",
            "Write and prototype in code — design that survives contact with engineering.",
          ]}
        />
      </section>

      <section className="pf-section" id="work">
        <SectionHeader
          eyebrow="01 — Selected Work"
          title="Things I've shipped"
          aside={<ActionButton variant="text" icon="arrowRight">View archive</ActionButton>}
        />
        <FullVisual id="work-hero" placeholder="Drop a case-study hero (16:9)"
          captionLeft="Ferrous — Observability platform" captionRight="Lead Designer · 2024–26" />

        <InlineVisual id="work-a" eyebrow="Case 01" title="Making metrics legible"
          placeholder="Drop a product screenshot">
          <p>Ferrous ingests billions of events a day. The challenge was never the data — it was making a single number trustworthy at a glance. We rebuilt the query model around <strong>direct manipulation</strong>, cutting time-to-insight by more than half.</p>
          <ActionButton variant="text" icon="arrowRight" onClick={onOpenCase}>Read case study</ActionButton>
        </InlineVisual>

        <Metrics items={[
          { value: "54", sup: "%", label: "Faster time-to-insight" },
          { value: "40", sup: "+", label: "Engineers on the system" },
          { value: "2.1", sup: "M", label: "Daily active dashboards" },
          { value: "4.8", sup: "/5", label: "Internal NPS" },
        ]} />

        <InlineVisual id="work-b" reverse eyebrow="Case 02" title="A system, not a sticker sheet"
          placeholder="Drop a system artboard">
          <p>I treat design systems as products with users. The Ferrous system ships as tokens, React components, and Figma libraries in lockstep — one source of truth, three surfaces. Adoption went from optional to default in two quarters.</p>
        </InlineVisual>
      </section>

      <section className="pf-section" id="impact">
        <SectionHeader eyebrow="02 — Impact" title="Why it mattered" />
        <Prose style={{ maxWidth: "var(--measure)" }}>
          <p className="pf-lead">Good design here isn't decoration — it's the difference between an on-call engineer finding the problem in thirty seconds or thirty minutes.</p>
          <p>The work compounds. A clearer query model made dashboards faster, which made the system more adopted, which made every new feature cheaper to design. That flywheel — not any single screen — is what I'm proud of.</p>
        </Prose>
        <div style={{ marginTop: "var(--space-6)" }}>
          <ActionButtons>
            <ActionButton variant="primary" icon="arrowUpRight" onClick={onOpenCase}>Read the full case study</ActionButton>
            <ActionButton variant="ghost">Download PDF</ActionButton>
          </ActionButtons>
        </div>
      </section>

      <section className="pf-section" id="path">
        <SectionHeader eyebrow="03 — Path" title="A short history" />
        <Timeline items={[
          { year: "2024", title: "Design Lead — Ferrous", role: "Observability", desc: "Own product design and the design system end to end." },
          { year: "2021", title: "Senior Designer — Halden", role: "Data infra · Acquired", desc: "Led the 0→1 design of a streaming query builder." },
          { year: "2018", title: "Product Designer — Quill", role: "Dev tools", desc: "Shipped the editor and onboarding for a 2M-developer platform." },
          { year: "2015", title: "Designer — Independent", role: "Studio", desc: "Brand and product work for early-stage teams." },
        ]} />
      </section>
    </>
  );
}

/* ---- ABOUT VIEW --------------------------------------------------------- */
function AboutView() {
  return (
    <>
      <div id="intro">
        <Intro eyebrow="About" title="Hello — I'm Mara." muted=""
          sub="I've spent ten years at the seam between design and engineering, mostly on tools other builders rely on."
          meta={[
            { label: "Disciplines", value: "Product · Systems · Code" },
            { label: "Tools", value: "Figma · React · Linear" },
          ]} />
      </div>
      <section className="pf-section" id="summary">
        <Prose>
          <p className="pf-lead">I believe the best interface is the one you don't notice — it just gets out of the way and lets you think.</p>
          <p>My work tends to live where things are technical and a little intimidating: query languages, observability, infrastructure. I like translating that complexity into something a person can hold in their head. In practice that means I research deeply, prototype in real code, and sweat the typographic details until the hierarchy does the explaining.</p>
          <p>Outside of work I keep a <a href="#">notebook of small interface ideas</a>, run analog film, and over-engineer my coffee.</p>
        </Prose>
      </section>
      <section className="pf-section" id="work">
        <SectionHeader eyebrow="Approach" title="How I work" />
        <div className="pf-stack">
          <InlineVisual id="about-a" eyebrow="Principle 01" title="Start from the verb" placeholder="Drop an image">
            <p>Products are made of actions, not screens. I map what people are <strong>trying to do</strong> before I draw a single box.</p>
          </InlineVisual>
          <InlineVisual id="about-b" reverse eyebrow="Principle 02" title="Prototype to decide" placeholder="Drop an image">
            <p>Opinions get cheap fast. A working prototype settles an argument in an afternoon that a deck would drag out for a week.</p>
          </InlineVisual>
        </div>
      </section>
      <section className="pf-section" id="impact">
        <Metrics items={[
          { value: "10", sup: "yr", label: "Designing products" },
          { value: "3", label: "0→1 products shipped" },
          { value: "2", label: "Companies acquired" },
        ]} />
      </section>
      <section className="pf-section" id="path">
        <SectionHeader eyebrow="Elsewhere" title="Find me" />
        <ActionButtons>
          <ActionButton variant="ghost" icon="arrowUpRight" href="#">Read · Notes</ActionButton>
          <ActionButton variant="ghost" icon="arrowUpRight" href="#">LinkedIn</ActionButton>
          <ActionButton variant="primary" icon="arrowUpRight" href="#">Get in touch</ActionButton>
        </ActionButtons>
      </section>
    </>
  );
}

/* ---- LAB VIEW ----------------------------------------------------------- */
function LabView() {
  const notes = [
    { n: "07", title: "The case against modal everything", tag: "Patterns", date: "May 2026" },
    { n: "06", title: "Designing numbers people can trust", tag: "Data viz", date: "Apr 2026" },
    { n: "05", title: "Tokens are a contract, not a palette", tag: "Systems", date: "Feb 2026" },
    { n: "04", title: "Why I prototype in production CSS", tag: "Process", date: "Jan 2026" },
  ];
  return (
    <>
      <div id="intro">
        <Intro eyebrow="Lab" title="Notes &" muted="experiments."
          sub="Half-formed ideas, interface teardowns, and things I'm figuring out in public." />
      </div>
      <section className="pf-section" id="summary">
        <SectionHeader eyebrow="Writing" title="Recent notes"
          aside={<Switcher options={[{ id: "all", label: "All" }, { id: "sys", label: "Systems" }]} value="all" onChange={() => {}} />} />
        <div className="pf-timeline">
          {notes.map((p) => (
            <a className="pf-timeline-item" key={p.n} href="#" style={{ cursor: "pointer" }}>
              <div className="pf-timeline-year">{p.n}</div>
              <div className="pf-timeline-body pf-spread" style={{ alignItems: "center" }}>
                <div>
                  <h4 style={{ marginBottom: "var(--space-2)" }}>{p.title}</h4>
                  <span className="pf-timeline-role">{p.tag} · {p.date}</span>
                </div>
                <Icon name="arrowUpRight" size={18} style={{ color: "var(--fg-faint)" }} />
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="pf-section" id="work">
        <Tldr summary="This is where I think out loud. Subscribe if you like interface craft and the occasional strong opinion."
          points={["No newsletter cadence — I write when I have something.", "Mostly systems, data viz, and process."]} />
        <div style={{ marginTop: "var(--space-6)" }}>
          <ActionButtons>
            <ActionButton variant="primary" icon="arrowRight">Subscribe</ActionButton>
            <ActionButton variant="text" icon="arrowRight">RSS</ActionButton>
          </ActionButtons>
        </div>
      </section>
    </>
  );
}

/* ---- CASE STUDY VIEW (uses the side navigation) ------------------------- */
function CaseStudyView() {
  return (
    <>
      <section id="overview">
        <Eyebrow>Case Study · Ferrous</Eyebrow>
        <h1 className="ds-h1" style={{ marginTop: "var(--space-4)", marginBottom: "var(--space-4)" }}>
          Making a billion events legible at a glance
        </h1>
        <Prose style={{ maxWidth: "60ch" }}>
          <p className="pf-lead">How we rebuilt Ferrous's query model around direct manipulation and cut time-to-insight by more than half.</p>
        </Prose>
        <div style={{ marginTop: "var(--space-5)" }}>
          <Tags items={["Role: Design Lead", "2024–26", "Observability", "0→1 query model"]} />
        </div>
        <FullVisual id="cs-hero" placeholder="Drop the case-study hero (16:9)"
          captionLeft="Ferrous — query workspace" captionRight="Shipped Q3 2025" />
      </section>

      <section className="pf-section" id="problem">
        <SectionHeader eyebrow="01 — The problem" title="The data was never the problem" />
        <Prose>
          <p>Ferrous ingests billions of events a day. Engineers could already get to any number — but trusting it took a mental translation step every time, and on-call that translation cost minutes that mattered.</p>
          <p>The old query builder asked people to think like the database. We needed it to think like the engineer.</p>
        </Prose>
      </section>

      <section className="pf-section" id="process">
        <SectionHeader eyebrow="02 — Process" title="Prototype, then decide" />
        <InlineVisual id="cs-a" eyebrow="Exploration" title="Direct manipulation"
          placeholder="Drop a process shot">
          <p>We prototyped the query model in real code and tested it against on-call scenarios. Dragging to filter beat typing syntax in every session.</p>
        </InlineVisual>
        <InlineVisual id="cs-b" reverse eyebrow="System" title="One source, three surfaces"
          placeholder="Drop a system shot">
          <p>Tokens, React components, and the Figma library shipped in lockstep so the new patterns landed everywhere at once.</p>
        </InlineVisual>
      </section>

      <section className="pf-section" id="impact">
        <SectionHeader eyebrow="03 — Impact" title="What changed" />
        <Metrics items={[
          { value: "54", sup: "%", label: "Faster time-to-insight" },
          { value: "40", sup: "+", label: "Engineers on the system" },
          { value: "2.1", sup: "M", label: "Daily active dashboards" },
        ]} />
      </section>

      <section className="pf-section" id="next">
        <SectionHeader eyebrow="04 — Reflection" title="What I'd carry forward" />
        <Prose>
          <p>The win wasn't a screen — it was a flywheel. A clearer model made dashboards faster, which drove adoption, which made every later feature cheaper to design.</p>
        </Prose>
        <div style={{ marginTop: "var(--space-6)" }}>
          <ActionButtons>
            <ActionButton variant="primary" icon="arrowUpRight" href="#">Get in touch</ActionButton>
            <ActionButton variant="ghost">Download PDF</ActionButton>
          </ActionButtons>
        </div>
      </section>
    </>
  );
}

/* ---- APP ---------------------------------------------------------------- */
function App() {
  const [theme, toggleTheme] = useTheme();
  const [view, setView] = useState("work");
  const [page, setPage] = useState("home");      // 'home' | 'case'
  const [active, setActive] = useState("overview");

  // Highlight the section currently in view — only the case-study page has a side nav
  useEffect(() => {
    if (page !== "case") return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    document.querySelectorAll(".pf-main [id]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [page]);

  const onSwitch = (v) => { setView(v); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openCase = () => { setPage("case"); setActive("overview"); window.scrollTo({ top: 0 }); };
  const closeCase = () => { setPage("home"); window.scrollTo({ top: 0 }); };

  const Footer = (
    <footer style={{ marginTop: "var(--space-10)", paddingTop: "var(--space-5)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-3)" }}>
      <span className="pf-sidenav-meta" style={{ margin: 0 }}>© 2026 Mara Vance</span>
      <span className="pf-sidenav-meta" style={{ margin: 0 }}>Designed &amp; built in code</span>
    </footer>
  );

  /* ---- Case-study page: WITH the vertical side navigation ---- */
  if (page === "case") {
    return (
      <>
        <MobileNav items={CASE_SECTIONS} active={active} onSelect={scrollToId} theme={theme} onToggleTheme={toggleTheme} name="Ferrous" onBack={closeCase} />
        <div className="pf-shell">
          <SideNav items={CASE_SECTIONS} active={active} onSelect={scrollToId} theme={theme} onToggleTheme={toggleTheme}
            name="Ferrous" role="Observability · 2024–26" onBack={closeCase} backLabel="All work"
            meta={<>Case study<br />Ferrous · 2025</>} />
          <main className="pf-main">
            <div key="case" className="pf-fade-in"><CaseStudyView /></div>
            {Footer}
          </main>
        </div>
      </>
    );
  }

  /* ---- Landing page: NO side navigation — switcher is the global nav ---- */
  const ViewComp = view === "work"
    ? <WorkView onOpenCase={openCase} />
    : view === "about" ? <AboutView /> : <LabView />;

  return (
    <>
      <TopHeader name="Mara Vance" role="Product Designer" views={VIEWS} view={view} onSwitch={onSwitch} theme={theme} onToggleTheme={toggleTheme} />
      <MobileNav items={VIEWS} active={view} onSelect={onSwitch} theme={theme} onToggleTheme={toggleTheme} name="Mara Vance" />
      <div className="pf-page">
        <div key={view} className="pf-fade-in">{ViewComp}</div>
        {Footer}
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
