// components/Hero.js
import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/AnshKumarTripathi" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ansh-kumar-tripathi-64841a2b5/",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
      className="w-full max-w-6xl mx-auto mt-32 flex flex-col items-center gap-10 rounded-lg border border-border/50 bg-card px-6 md:px-12 shadow-lg"
    >
      <div className="text-sm uppercase tracking-[0.35em] text-muted-foreground text-center">
        Software Engineering Student
      </div>

      <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-snug max-w-4xl">
        Hi, I&apos;m <span className="text-accent">Ansh Kumar Tripathi</span>.
      </h1>

      {/* Video Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "32rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          className="rounded-lg border border-border/50 bg-muted shadow-md"
          style={{
            padding: "1rem",
          }}
        >
          <div
            className="flex flex-col md:flex-row md:items-center md:justify-between"
            style={{
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <h3 className="text-lg font-semibold text-foreground">
              Maker video
            </h3>
            <p className="text-sm text-muted-foreground">
              Last updated 30 Nov 2025
            </p>
          </div>
          <div
            style={{
              padding: "0.75rem",
            }}
          >
            <div
              className="relative w-full flex items-center justify-center"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-lg transition-all duration-300 ease-in-out"
                src="https://www.youtube.com/embed/1n_kSMQ8z-Q"
                title="Maker video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      <p
        style={{ maxWidth: "42rem", margin: "0 auto" }}
        className="w-full text-center text-base md:text-lg text-muted-foreground leading-relaxed px-4"
      >
        I build secure systems, intelligent models, and engaging games
        (according to my mom) — combining deep curiosity with hands-on
        engineering to solve real-world problems in Cybersecurity, AI/ML, and
        Game Dev.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 w-full">
        {socials.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
            className="inline-flex items-center justify-center h-8 rounded-lg border border-border/70 text-sm font-medium text-foreground hover:bg-foreground/5 transition-colors whitespace-nowrap"
          >
            {label}
          </Link>
        ))}
        <Link
          href="/Ansh Kumar Tripathi - Resume.pdf"
          download="Ansh Kumar Tripathi - Resume.pdf"
          style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
          className="inline-flex items-center justify-center h-8 rounded-lg border border-border/70 text-sm font-medium text-foreground hover:bg-foreground/5 transition-colors whitespace-nowrap"
        >
          Download Resume
        </Link>
      </div>
    </section>
  );
}
