import React, { useEffect, useMemo, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";

const filters = ["All", "Competition", "Funding", "Partnership", "Community"];

const portfolioItems = [
  {
    title: "Active Instagram Community @elevated.indonesia",
    detail: "More than 6,000 followers and 1.1M total views.",
    tags: ["Community", "Brand Awareness", "Content Strategy"],
    stat: "6,000+ followers",
    image: "/juara/jndnla.jpeg",
  },
  {
    title: "1st Place – Startup SheHacks by Indosat",
    detail:
      "Winner of SheHacks program with a startup solution for women empowerment and digital inclusion.",
    tags: ["Competition", "Startup", "Indosat"],
    stat: "1st place",
    image: "/juara/WSU_019.jpg",
  },
  {
    title: "3rd Place – Digital Innovation Baligivation by Bank Indonesia",
    detail: "Top 3 for digital innovation in Baligivation by Bank Indonesia.",
    tags: ["Fintech", "Digital Innovation", "Bank Indonesia", "Competition"],
    stat: "Top 3",
    image: "/juara/kmcm.jpg",
  },
  {
    title: "3rd Place – AI Innovation Challenges by Western Sydney University",
    detail:
      "AI based solution selected as Top 3 in an international innovation challenge.",
    tags: ["AI", "International", "Innovation", "Competition"],
    stat: "Top 3",
    image: "/juara/WSU_477.jpg",
  },
  {
    title: "Top 10 – SANDINATION Startup by Sandiaga Uno",
    detail: "Selected as Top 10 startup in SANDINATION curated by Sandiaga Uno.",
    tags: ["Top 10", "Startup Ecosystem", "National", "Competition"],
    stat: "Top 10",
    image: "/juara/mkw.jpeg",
  },
  {
    title: "Top 10 – Startup World Cup by Vegasus VC",
    detail: "Reached Top 10 in Startup World Cup selection by Vegasus VC.",
    tags: ["Global Stage", "Venture Capital", "Pitching", "Competition"],
    stat: "Top 10",
    image: "/juara/Famposo.webp",
  },
  {
    title: "Top 10 – Spark50 by Famposo VC",
    detail: "Recognized as Top 10 startup in Spark50 program by Famposo VC.",
    tags: ["Venture Program", "Top 10", "Growth", "Competition"],
    stat: "Top 10",
    image: "/juara/kmlkmlcd.jpeg",
  },
  {
    title: "Grant Funding up to 4 Million – Unpadpreneur",
    detail: "Received grant funding up to 4 million from Unpadpreneur.",
    tags: ["Funding", "Unpadpreneur", "Early Stage"],
    stat: "IDR 4M grant",
    image: "/juara/lml.jpeg",
  },
  {
    title: "Startup Partner – Universitas Padjadjaran",
    detail: "Official startup partner collaborating with Universitas Padjadjaran.",
    tags: ["Partnership", "Universitas Padjadjaran", "Collaboration"],
    stat: "Partnered",
    image: "/juara/llclmdml.jpeg",
  },
];

const statsData = [
  { label: "Achievements", value: 9, suffix: "" },
  { label: "Views", value: 1.1, suffix: "M", decimal: 1 },
  { label: "Grant", value: 4, suffix: "M IDR", decimal: 0 },
];

const founders = [
  [
    "/assets/fahmi.JPG",
    "Fahmi",
    "CEO",
    "Unpad Kimia • Ex COO Bersinar Kampus • Mapres nasional",
  ],
  [
    "/assets/sam.png",
    "Hisyam",
    "CPO",
    "Unpad TI • Ex Cloud Consultant Elitary • Mapres FMIPA Unpad",
  ],
  [
    "/assets/nana.jpeg",
    "Nana",
    "CMO",
    "UGM Geografi Lingkungan • Ex Project Officer Lestari • Mapres 2 nasional",
  ],
  [
    "/assets/ginan.jpeg",
    "Ginan",
    "COO",
    "UGM Pertanian • Ex CPO Pottani.com • Medali AICO Japan 2019",
  ],
  [
    "/assets/karin.jpeg",
    "Karin",
    "CFO",
    "Binus Akuntansi • Ex HelloCation • Runner-up International BCC PETROLIDA 2025",
  ],
  [
    "/assets/Justin.jpeg",
    "Justin",
    "CTO",
    "NUS Business AI Systems • Ex Cybersecurity Eng Intern Halodoc • Komite PPI Singapura & AIESEC",
  ],
];

const partners = [
  "/mitra/Bem Unpad.jpg",
  "/mitra/block71.png",
  "/mitra/cakrawala.jpg",
  "/mitra/hasan.png",
  "/mitra/hasnur.png",
  "/mitra/sandination.png",
  "/mitra/telenesia.png",
  "/mitra/ugm.png",
  "/mitra/unpad.webp",
];

const heroTiles = [
  { title: "SheHacks Winner", caption: "Indosat", image: "/juara/WSU_019.jpg" },
  { title: "AI Innovation", caption: "Western Sydney University", image: "/juara/WSU_477.jpg" },
  { title: "Digital Innovation", caption: "Bank Indonesia", image: "/juara/kmcm.jpg" },
  { title: "Spark50", caption: "Famposo VC", image: "/juara/kmlkmlcd.jpeg" },
  { title: "SANDINATION", caption: "Sandiaga Uno", image: "/juara/mkw.jpeg" },
  { title: "World Cup", caption: "Vegasus VC", image: "/juara/Famposo.webp" },
];

const Tag = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-100 ring-1 ring-sky-500/30">
    <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-300" />
    {children}
  </span>
);

const Icon = ({ type }) => {
  const paths = {
    trophy:
      "M4 3h16v4a5 5 0 01-5 5h-1v3.5h2a1 1 0 010 2h-8a1 1 0 010-2h2V12h-1a5 5 0 01-5-5V3z",
    spark:
      "M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z",
    target:
      "M12 4a8 8 0 100 16 8 8 0 000-16zm0 4a4 4 0 110 8 4 4 0 010-8zm0 3a1 1 0 100 2 1 1 0 000-2z",
    chat:
      "M5 5h14a2 2 0 012 2v9a2 2 0 01-2 2H8l-5 3V7a2 2 0 012-2z",
  };
  return (
    <svg
      aria-hidden
      className="h-4 w-4 text-sky-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d={paths[type]} />
    </svg>
  );
};

const SectionHeader = ({ kicker, title, subtitle }) => (
  <div className="mb-8 space-y-3">
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-sky-200/80">
      <span className="h-px w-10 bg-gradient-to-r from-sky-500/40 via-sky-300 to-sky-500/30" />
      {kicker}
    </div>
    <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">{title}</h2>
    <p className="max-w-2xl text-sm text-slate-300/80 sm:text-base">{subtitle}</p>
  </div>
);

const PortfolioCard = ({ item }) => {
  const cardRef = useRef(null);

  const handleEnter = () => {
    if (!cardRef.current) return;
    anime.remove(cardRef.current);
    anime({
      targets: cardRef.current,
      scale: 1.02,
      translateY: -6,
      rotateX: -2,
      rotateY: 2,
      boxShadow:
        "0 25px 60px rgba(56,189,248,0.12), 0 10px 30px rgba(15,23,42,0.45)",
      duration: 320,
      easing: "easeOutQuad",
    });
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    anime.remove(cardRef.current);
    anime({
      targets: cardRef.current,
      scale: 1,
      translateY: 0,
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0 10px 30px rgba(15,23,42,0.65)",
      duration: 260,
      easing: "easeOutQuad",
    });
  };

  return (
    <article
      ref={cardRef}
      className="portfolio-card group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/40 backdrop-blur-sm transition-colors duration-300 hover:border-sky-400/60"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-800">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-0 translate-y-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex h-full flex-col justify-end p-4 space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-3 py-1 text-xs uppercase tracking-wide text-sky-200">
              <Icon type="trophy" />
              {item.stat}
            </div>
            <p className="text-sm text-slate-200">{item.detail}</p>
          </div>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-50">{item.title}</h3>
        </div>
        <p className="text-sm text-slate-400">{item.detail}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </article>
  );
};

const useSectionReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(".reveal-child");
            anime({
              targets: children,
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(90),
              easing: "easeOutQuad",
              duration: 700,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return ref;
};

const ElevatEdPortfolio = () => {
  const [navSolid, setNavSolid] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [statCounts, setStatCounts] = useState(statsData.map(() => 0));
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);
  const heroGridRef = useRef(null);
  const shapesRef = useRef([]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return portfolioItems;
    return portfolioItems.filter((item) => item.tags.includes(activeFilter));
  }, [activeFilter]);

  const portfolioRef = useSectionReveal();
  const aboutRef = useSectionReveal();
  const contactRef = useSectionReveal();

  useEffect(() => {
    document.title = "ElevatEd Studio | Portfolio Highlights";
    const existing = document.querySelector("link[rel='icon']");
    if (existing) {
      existing.href = "/favicon.ico";
    } else {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = "/favicon.ico";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setNavSolid(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    anime.set(".nav-item", { opacity: 0, translateY: 12 });
    anime
      .timeline({ easing: "easeOutQuad" })
      .add({
        targets: ".nav-item",
        opacity: [0, 1],
        translateY: [12, 0],
        delay: anime.stagger(100),
        duration: 500,
      })
      .add(
        {
          targets: ".hero-title",
          opacity: [0, 1],
          translateY: [18, 0],
          duration: 650,
        },
        "-=200"
      )
      .add(
        {
          targets: ".hero-cta",
          opacity: [0, 1],
          translateY: [20, 0],
          delay: anime.stagger(120),
          duration: 650,
        },
        "-=400"
      );
  }, []);

  useEffect(() => {
    if (!heroGridRef.current) return;
    anime.set(heroGridRef.current.querySelectorAll(".tile"), {
      opacity: 0,
      translateY: 24,
      scale: 0.96,
    });
    anime({
      targets: heroGridRef.current.querySelectorAll(".tile"),
      opacity: [0, 1],
      translateY: [24, 0],
      scale: [0.96, 1],
      delay: anime.stagger(100),
      easing: "easeOutCubic",
      duration: 700,
    });
  }, []);

  useEffect(() => {
    shapesRef.current.forEach((el, index) => {
      if (!el) return;
      anime({
        targets: el,
        translateX: ["-6%", "6%"],
        translateY: ["-4%", "4%"],
        scale: [0.96, 1.04],
        duration: 6000 + index * 500,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
        delay: index * 240,
      });
    });
  }, []);

  useEffect(() => {
    anime({
      targets: ".portfolio-card",
      opacity: [0, 1],
      translateY: [16, 0],
      scale: [0.97, 1],
      delay: anime.stagger(80),
      duration: 520,
      easing: "easeOutQuad",
    });
  }, [activeFilter, filteredItems.length]);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsStarted) {
            setStatsStarted(true);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsStarted]);

  useEffect(() => {
    if (!statsStarted) return;
    statsData.forEach((stat, idx) => {
      anime({
        targets: { value: 0 },
        value: stat.value,
        duration: 1400,
        easing: "easeOutQuad",
        update: (anim) => {
          const next = anim.animations[0].currentValue;
          setStatCounts((prev) => {
            const copy = [...prev];
            copy[idx] = next;
            return copy;
          });
        },
      });
    });
  }, [statsStarted]);

  const formatStat = (value, { decimal = 0, suffix }) => {
    const formatted = value.toFixed(decimal);
    return `${formatted}${suffix ? ` ${suffix}` : ""}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1d4ed8] text-slate-100">
      <style>
        {`
        @keyframes marqueeRight {
          0% { transform: translateX(-30%); }
          100% { transform: translateX(30%); }
        }
        @keyframes slideDown {
          0% { transform: translateY(-8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}
      </style>

      <header
        className={`fixed inset-x-0 top-0 z-30 transition duration-500 ${
          navSolid ? "bg-slate-900/70 shadow-2xl shadow-slate-900/50 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-sky-400/30">
              <img src="/logoputih.png" alt="ElevatEd Studio" className="h-8 w-8 object-contain" />
            </div>
            <div className="text-lg font-semibold text-slate-50">ElevatEd Studio</div>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            {["Home", "Portfolio", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-item text-sm font-medium text-slate-200 transition hover:text-sky-200"
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            className="nav-item inline-flex items-center justify-center rounded-full bg-white/5 px-3 py-2 text-slate-100 ring-1 ring-sky-300/40 transition hover:bg-white/10 md:hidden"
            onClick={() => setNavOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="block h-0.5 w-5 bg-slate-100" />
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden">
            <div className="mx-4 mb-4 animate-[slideDown_0.25s_ease-out] rounded-xl border border-slate-800/70 bg-slate-900/70 p-4 backdrop-blur">
              {["Home", "Portfolio", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-item block py-2 text-sm text-slate-100"
                  onClick={() => setNavOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="relative overflow-hidden pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              ref={(el) => (shapesRef.current[idx] = el)}
              className="absolute h-40 w-40 rounded-full bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-sky-200/5 blur-3xl"
              style={{
                top: `${10 + idx * 15}%`,
                left: idx % 2 === 0 ? `${8 + idx * 12}%` : `${50 + idx * 6}%`,
              }}
            />
          ))}
        </div>

        <section
          id="home"
          className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-12 md:flex-row md:items-center md:px-8 md:pb-24 lg:pt-16"
        >
          <div className="relative z-10 space-y-8 md:w-1/2">
            <div className="hero-title space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-200 ring-1 ring-sky-500/40">
                Impact Driven
                <span className="h-1 w-6 rounded-full bg-gradient-to-r from-sky-400 to-blue-500" />
                Indonesia
              </div>
              <h1 className="text-3xl font-bold leading-tight text-slate-50 sm:text-4xl lg:text-5xl">
                ElevatEd Indonesia – Impact Driven Startup Portfolio
              </h1>
              <p className="text-base text-slate-300 sm:text-lg">
                A gallery of competition victories, startup milestones, and community growth. Explore how ElevatEd Indonesia builds education, innovation, and impact-first experiences.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 hero-cta">
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-50 shadow-lg shadow-sky-900/40 transition hover:shadow-sky-800/60"
              >
                View Portfolio Gallery
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-sky-400/40 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 hover:border-sky-300/70"
              >
                Contact / Collaborate
              </a>
            </div>
          </div>

          <div className="relative z-10 md:w-1/2">
            <div
              ref={heroGridRef}
              className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/60 p-4 backdrop-blur-lg shadow-2xl shadow-blue-950/60"
            >
              {heroTiles.map((tile, idx) => (
                <div
                  key={tile.title}
                  className="tile relative overflow-hidden rounded-2xl bg-slate-800/60 ring-1 ring-slate-700/70"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="h-28 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-3 space-y-1">
                    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide text-sky-200">
                      <Icon type="spark" />
                      {tile.caption}
                    </div>
                    <div className="text-sm font-semibold text-slate-50">{tile.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 md:px-8">
          <div
            ref={statsRef}
            className="reveal-child mb-12 grid grid-cols-1 gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur sm:grid-cols-3"
          >
            {statsData.map((stat, idx) => (
              <div key={stat.label} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-sky-500/20">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-200 ring-1 ring-sky-400/30">
                  {idx === 0 && <Icon type="trophy" />}
                  {idx === 1 && <Icon type="target" />}
                  {idx === 2 && <Icon type="spark" />}
                </div>
                <div>
                  <div className="text-xl font-semibold text-slate-50">
                    {formatStat(statCounts[idx] || 0, stat)}
                  </div>
                  <div className="text-xs uppercase tracking-wide text-slate-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="portfolio" className="mx-auto max-w-6xl px-4 pb-20 md:px-8">
          <div ref={portfolioRef}>
            <SectionHeader
              kicker="Portfolio"
              title="Portfolio Highlights"
              subtitle="Real startup achievements, competition wins, and partnerships that move education and innovation forward."
            />

            <div className="mb-6 flex flex-wrap items-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`reveal-child inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-sky-500 text-slate-900 shadow-lg shadow-sky-900/40"
                      : "bg-white/5 text-slate-100 ring-1 ring-slate-700 hover:ring-sky-500/50"
                  }`}
                >
                  <Icon type="spark" />
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <PortfolioCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
          <SectionHeader
            kicker="Mitra"
            title="Mitra dan Partner"
            subtitle="Kepercayaan dari berbagai institusi, kampus, dan program yang tumbuh bersama ElevatEd."
          />
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Gerak ke kanan dan looping</span>
            </div>
            <div className="mt-6">
              <div className="overflow-hidden">
                <div className="flex animate-[marqueeRight_18s_linear_infinite] gap-8">
                  {[...partners, ...partners].map((src, idx) => (
                    <div
                      key={`${src}-${idx}`}
                      className="flex h-20 w-40 items-center justify-center rounded-xl bg-white/5 p-3 ring-1 ring-slate-700/60"
                    >
                      <img
                        src={src}
                        alt="Mitra"
                        className="max-h-full max-w-full object-contain opacity-90"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 md:px-8">
          <SectionHeader
            kicker="Founders"
            title="Meet the Founder Team"
            subtitle="Tim lintas kampus dan industri yang memimpin produk, pertumbuhan, dan teknologi ElevatEd."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {founders.map(([img, name, role, bio]) => (
              <div
                key={name}
                className="reveal-child rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/40 backdrop-blur"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-sky-400/40">
                    <img src={img} alt={name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-50">{name}</div>
                    <div className="text-sm text-sky-200">{role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-300">{bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-4 pb-20 md:px-8">
          <div ref={aboutRef}>
            <SectionHeader
              kicker="About"
              title="About ElevatEd Indonesia"
              subtitle="ElevatEd Indonesia focuses on education, innovation, and impact-first ventures. We build communities, winning products, and partnerships that unlock access."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="reveal-child space-y-3 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
                <h3 className="text-xl font-semibold text-slate-50">What we do</h3>
                <p className="text-sm text-slate-300">
                  We combine startup rigor with community momentum. From competitions to venture programs, ElevatEd Indonesia brings together product strategy, content, and operations to accelerate learning and opportunity.
                </p>
              </div>
              <div className="reveal-child space-y-3 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
                <h3 className="text-xl font-semibold text-slate-50">How we move</h3>
                <p className="text-sm text-slate-300">
                  We design, test, and ship through rapid experimentation, mentorship, and partnerships with universities, corporates, and VCs. Every milestone is built around impact metrics and access to education.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
          <div ref={contactRef}>
            <SectionHeader
              kicker="Contact"
              title="Let’s Collaborate"
              subtitle="Reach out for partnerships, product builds, or community initiatives. We reply fast."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="reveal-child space-y-4 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40 md:col-span-2">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Message"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-900/50 transition hover:shadow-sky-800/60"
                  >
                    <Icon type="chat" />
                    Send Message
                  </button>
                </form>
                <p className="text-sm text-slate-400">
                  Prefer social? Connect via Instagram <span className="text-sky-200">@elevated.indonesia</span>
                </p>
              </div>
              <div className="reveal-child space-y-3 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
                <h3 className="text-lg font-semibold text-slate-50">Let’s talk impact</h3>
                <p className="text-sm text-slate-300">
                  We welcome collaborations with universities, accelerators, venture programs, and brands that care about education and innovation.
                </p>
                <div className="space-y-2 text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <Icon type="target" />
                    <span>Impact-first partnerships</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon type="spark" />
                    <span>Startup builds & pilots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon type="trophy" />
                    <span>Competition-ready sprint teams</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ElevatEdPortfolio;
