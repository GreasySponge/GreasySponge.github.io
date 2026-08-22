import { useState, useEffect, useCallback } from "react";

// Project 3 assets
import uciShot1 from "@/imports/Screenshot_2026-08-21_210146.png";
import uciPhoto1 from "@/imports/photo-61_singular_display_fullPicture.jpg";
import uciPhoto2 from "@/imports/photo-340_singular_display_fullPicture.jpg";
import uciPhoto3 from "@/imports/photo-598_singular_display_fullPicture.jpg";

// Project 2 assets
import psycheGif1 from "@/imports/Recording_2026-08-21_205616.gif";
import psycheGif2 from "@/imports/Recording_2026-08-21_205748.gif";
import psycheShot1 from "@/imports/Screenshot_2026-08-21_205819.png";
import psycheShot2 from "@/imports/Screenshot_2026-08-21_205845.png";

// Project 1 assets
import vrGif from "@/imports/Recording_2026-08-21_204354.gif";
import vrShot1 from "@/imports/Screenshot_2026-08-21_203827.png";
import vrShot2 from "@/imports/Screenshot_2026-08-21_204127.png";
import vrShot3 from "@/imports/Screenshot_2026-08-21_204250.png";
import vrShot4 from "@/imports/Screenshot_2026-08-21_204600.png";

// ── Types ──────────────────────────────────────────────────────────────────

interface MediaItem {
  src: string | { toString(): string };
  alt: string;
  isGif?: boolean;
}

interface PortfolioItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  tech: string[];
  description: string;
  media: MediaItem[];
  liveUrl?: string;
  githubUrl?: string;
  hasCarousel: boolean;
}

// ── Placeholder data – replace src values with your own assets ─────────────

const PROJECTS: PortfolioItem[] = [
  {
    id: "project-1",
    index: "01",
    title: "SCCCA VR Experience",
    subtitle: "South Coast Chinese Cultural Association",
    tech: ["Unity", "Meta Quest", "C#", "HLSL Shaders"],
    description:
      "Developed a VR experience using complex shaders, guided cameras and consistent scripts. This experience celebrated Chinese culture for the Association's anniversary.",
    media: [
      { src: vrGif, alt: "VR experience walkthrough recording", isGif: true },
      { src: vrShot1, alt: "Nebula skybox shader – deep space environment" },
      { src: vrShot2, alt: "Red blossom tree on mountain island" },
      { src: vrShot3, alt: "Wide landscape view of mountain range in VR" },
      { src: vrShot4, alt: "Courtyard scene with particle effects and night sky" },
    ],
    hasCarousel: true,
  },
  {
    id: "project-2",
    index: "02",
    title: "NASA Psyche Mission Web Game",
    subtitle: "Educational Board Game",
    tech: ["Unity", "Web Build", "Front-End"],
    description:
      "Built a board game based off specifications from NASA's Psyche Mission to educate teens on the mission as well as spread interest in space.",
    media: [
      { src: psycheGif1, alt: "Psyche board game gameplay recording", isGif: true },
      { src: psycheGif2, alt: "Psyche board game interaction recording", isGif: true },
      { src: psycheShot1, alt: "Psyche board game – full board view with asteroid belt" },
      { src: psycheShot2, alt: "Psyche board game – player inventory panel" },
    ],
    liveUrl: "https://arcenyr.itch.io/psyche-user-testing",
    hasCarousel: true,
  },
  {
    id: "project-3",
    index: "03",
    title: "UCI Dorms VR Tour",
    subtitle: "UCI Celebrate Event",
    tech: ["Unity", "VR", "Live Guidance"],
    description:
      "Built a 1:1 virtual replica of certain UCI dorms to solve the problem that in-person tours were no longer allowed due to COVID. Guided prospective students and their families through the experience during the UCI Celebrate event.",
    media: [
      { src: uciShot1, alt: "VR replica of UCI dorm room interior with bunk beds and storage" },
      { src: uciPhoto1, alt: "Team setting up Meta Quest headsets before the UCI Celebrate event" },
      { src: uciPhoto2, alt: "Prospective students and families experiencing the VR dorm tour" },
      { src: uciPhoto3, alt: "Attendees using VR headsets guided by staff at UCI Celebrate" },
    ],
    hasCarousel: true,
  },
];

// ── Carousel ───────────────────────────────────────────────────────────────

function Carousel({ media }: { media: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const go = useCallback(
    (next: number, dir: "left" | "right") => {
      if (animating || media.length <= 1) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setIndex(((next % media.length) + media.length) % media.length);
        setAnimating(false);
      }, 260);
    },
    [animating, media.length]
  );

  const prev = () => go(index - 1, "left");
  const next = () => go(index + 1, "right");

  useEffect(() => {
    if (media.length <= 1) return;
    const id = setInterval(() => go(index + 1, "right"), 5000);
    return () => clearInterval(id);
  }, [index, go, media.length]);

  const current = media[index];

  return (
    <div className="relative w-full overflow-hidden rounded-[16px] bg-[#252530] aspect-video select-none elevation-2">
      {/* Image */}
      <div
        className="w-full h-full transition-all"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === "right" ? "-24px" : "24px"})`
            : "translateX(0)",
          transition: "opacity 0.26s ease, transform 0.26s ease",
        }}
      >
        <img
          src={current.src as string}
          alt={current.alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {current.isGif && (
          <span
            className="absolute top-3 left-3 px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wider uppercase"
            style={{
              background: "rgba(176,168,255,0.18)",
              color: "var(--color-md-primary)",
              border: "1px solid rgba(176,168,255,0.3)",
            }}
          >
            GIF
          </span>
        )}
      </div>

      {/* Controls */}
      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{
              background: "rgba(15,15,19,0.72)",
              border: "1px solid rgba(176,168,255,0.2)",
              backdropFilter: "blur(8px)",
              color: "var(--color-md-on-surface)",
            }}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{
              background: "rgba(15,15,19,0.72)",
              border: "1px solid rgba(176,168,255,0.2)",
              backdropFilter: "blur(8px)",
              color: "var(--color-md-on-surface)",
            }}
          >
            <ChevronRight />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > index ? "right" : "left")}
                aria-label={`Slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? "20px" : "6px",
                  height: "6px",
                  background:
                    i === index
                      ? "var(--color-md-primary)"
                      : "rgba(195,193,210,0.4)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Tech chip ──────────────────────────────────────────────────────────────

function TechChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide"
      style={{
        background: "rgba(176,168,255,0.1)",
        color: "var(--color-md-primary)",
        border: "1px solid rgba(176,168,255,0.22)",
      }}
    >
      {label}
    </span>
  );
}

// ── Icon buttons ───────────────────────────────────────────────────────────

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
      style={{
        background: "var(--color-md-primary)",
        color: "var(--color-md-on-primary)",
      }}
    >
      {children}
    </a>
  );
}

function OutlineButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
      style={{
        background: "transparent",
        color: "var(--color-md-primary)",
        border: "1px solid rgba(176,168,255,0.4)",
      }}
    >
      {children}
    </a>
  );
}

// ── Project Card ───────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: PortfolioItem }) {
  const isEven = parseInt(project.index) % 2 === 0;

  return (
    <section
      id={project.id}
      className="w-full"
    >
      {/* Index label */}
      <div className="flex items-center gap-4 mb-6">
        <span
          className="font-mono text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--color-md-primary)" }}
        >
          {project.index}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "var(--color-md-outline-variant)" }}
        />
      </div>

      {/* Main card */}
      <div
        className="rounded-[24px] overflow-hidden elevation-1"
        style={{
          background: "var(--color-md-surface-container)",
          border: "1px solid var(--color-md-outline-variant)",
        }}
      >
        {/* Layout: alternates media / info sides */}
        <div
          className={`flex flex-col ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} gap-0`}
        >
          {/* Media */}
          <div className="lg:w-[56%] p-4 lg:p-6">
            <Carousel media={project.media} />
          </div>

          {/* Info panel */}
          <div className="lg:w-[44%] flex flex-col justify-between p-6 lg:p-8">
            <div>
              <p
                className="text-xs font-mono tracking-widest uppercase mb-2"
                style={{ color: "var(--color-md-on-surface-variant)" }}
              >
                {project.subtitle}
              </p>
              <h2
                className="text-2xl lg:text-3xl font-display font-700 leading-tight mb-4"
                style={{ color: "var(--color-md-on-surface)" }}
              >
                {project.title}
              </h2>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <TechChip key={t} label={t} />
                ))}
              </div>

              {/* Description card */}
              <div
                className="rounded-[16px] p-4"
                style={{
                  background: "var(--color-md-surface-container-highest)",
                  border: "1px solid var(--color-md-outline-variant)",
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-md-on-surface-variant)" }}
                >
                  {project.description}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              {project.liveUrl && (
                <IconButton href={project.liveUrl} label={project.id === "project-2" ? "Play the game on itch.io" : "Launch web app"}>
                  <ExternalLinkIcon />
                  {project.id === "project-2" ? "Play Now" : "Launch App"}
                </IconButton>
              )}
              {project.githubUrl && (
                <OutlineButton href={project.githubUrl} label="View source on GitHub">
                  <GitHubIcon />
                  Source
                </OutlineButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(15,15,19,0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--color-md-outline-variant)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span
          className="font-mono text-sm font-medium tracking-wider"
          style={{ color: "var(--color-md-primary)" }}
        >
          Drake Smith — portfolio.
        </span>
        <nav className="hidden sm:flex items-center gap-6">
          {PROJECTS.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: "var(--color-md-on-surface-variant)" }}
            >
              {p.index} {p.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <div className="min-h-[50vh] flex flex-col justify-end pb-16 pt-28 max-w-6xl mx-auto px-6">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(176,168,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(176,168,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-[-80px] left-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle, rgba(176,168,255,0.09) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[-40px] right-[15%] w-[400px] h-[400px] rounded-full pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle, rgba(122,192,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        <p
          className="font-mono text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: "var(--color-md-primary)" }}
        >
          Selected Work
        </p>
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-display font-700 leading-[1.05] tracking-tight mb-6"
          style={{ color: "var(--color-md-on-background)" }}
        >
          Unity Development
          <br />
          <span style={{ color: "var(--color-md-primary)" }}>Projects.</span>
        </h1>
        <p
          className="text-base sm:text-lg max-w-xl leading-relaxed"
          style={{ color: "var(--color-md-on-surface-variant)" }}
        >
          Projects I have built to solve real world problems. Each shows different skills that I have cultivated in my progress as a Unity Developer.
        </p>
      </div>
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="mt-24 py-10 border-t"
      style={{ borderColor: "var(--color-md-outline-variant)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="font-mono text-xs tracking-wider"
          style={{ color: "var(--color-md-on-surface-variant)" }}
        >
          Built with React + Vite
        </span>
        <a
          href="https://www.linkedin.com/in/drake-smith-swe/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-wider flex items-center gap-2 transition-colors hover:text-white"
          style={{ color: "var(--color-md-on-surface-variant)" }}
        >
          <LinkedInIcon />
          Drake Smith
        </a>
      </div>
    </footer>
  );
}

// ── SVG icons ──────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 12L6 8l4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5.5 2.5H2.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3M8.5 1.5h4m0 0v4m0-4-6 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ── App ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--color-md-background)" }}
    >
      <Header />

      <main className="relative">
        <Hero />

        <div className="max-w-6xl mx-auto px-6 pb-8 flex flex-col gap-16">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
