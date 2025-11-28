// components/Hero.js
import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/your-handle" },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
  { label: "X / Twitter", href: "https://twitter.com/your-handle" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
      className="w-full max-w-5xl mx-auto mt-32 flex flex-col items-center gap-10 rounded-lg border border-border/50 bg-card px-6 md:px-12 shadow-lg"
    >
      <div className="text-sm uppercase tracking-[0.35em] text-muted-foreground text-center">
        Software Engineer
      </div>

      <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-snug max-w-4xl">
        Hi, I’m <span className="text-accent">Your Name</span>.
        <br />I build delightful web experiences.
      </h1>

      <p
        style={{ maxWidth: "42rem", margin: "0 auto" }}
        className="w-full text-center text-base md:text-lg text-muted-foreground leading-relaxed px-4"
      >
        “Replace this line with your motto.” Explain briefly what you do, what
        you care about, or the kind of problems you solve. Keep it to 2–3
        sentences so it feels like a concise elevator pitch.
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
      </div>
    </section>
  );
}
