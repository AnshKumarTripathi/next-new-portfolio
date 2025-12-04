"use client";

import Link from "next/link";
import TerminalWindow from "./TerminalWindow";
import { useLanguage } from "@/lib/languageContext";

const socials = [
  { label: "EMAIL", href: "mailto:anshtrips07@gmail.com" },
  { label: "GITHUB", href: "https://github.com/AnshKumarTripathi" },
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/ansh-kumar-tripathi-64841a2b5/",
  },
];

export default function Hero() {
  const { t } = useLanguage();

  // Combine all links including resume
  const allLinks = [
    ...socials,
    {
      label: "RESUME",
      href: "/Ansh%20Kumar%20Tripathi%20-%20Resume.pdf",
      isDownload: true,
    },
  ];

  return (
    <section
      id="hero"
      style={{
        minHeight: "calc(100vh - 3.5rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "54rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TerminalWindow title="Profile ~/.ansh" version="v.1.0.4">
          {/* Welcome Message */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.875rem",
              lineHeight: "1.75",
              color: "var(--terminal-green)",
              marginBottom: "2rem",
            }}
          >
            {t("welcome_message")}
          </div>

          {/* User Info */}
          <div
            style={{
              paddingTop: "1rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 600,
                color: "var(--foreground)",
                marginBottom: "0.5rem",
              }}
            >
              {t("hero_title")}
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted-foreground)",
                marginBottom: "1.5rem",
              }}
            >
              {t("hero_subtitle")}
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--foreground)",
                lineHeight: "1.75",
                marginBottom: "1.5rem",
              }}
            >
              {t("hero_desc")}
            </p>

            {/* Social Links */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1.5rem",
              }}
            >
              {allLinks.map(({ label, href, isDownload }, index) => (
                <span
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {index > 0 && (
                    <span
                      style={{
                        color: "var(--muted-foreground)",
                        fontSize: "0.875rem",
                      }}
                    >
                      /
                    </span>
                  )}
                  {isDownload ? (
                    <a
                      href={href}
                      download="Ansh Kumar Tripathi - Resume.pdf"
                      className="terminal-link"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                    >
                      {t("resume")}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={
                        href.startsWith("mailto:") ? undefined : "noreferrer"
                      }
                      className="terminal-link"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                    >
                      {t(`social_${label.toLowerCase()}`)}
                    </Link>
                  )}
                </span>
              ))}
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
