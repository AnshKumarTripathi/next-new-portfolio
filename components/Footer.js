"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/AnshKumarTripathi",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ansh-kumar-tripathi-64841a2b5/",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:anshtrips07@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        maxWidth: "72rem",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "4rem",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          borderRadius: "0.5rem",
          backgroundColor: "var(--background-rgba-20)",
          backdropFilter: "blur(16px)",
          border: "1px solid var(--border-rgba-50)",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
        }}
        className="md:flex-row md:px-8"
      >
        <div style={{ textAlign: "center" }} className="md:text-left">
          <p
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            Ansh Kumar Tripathi
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--muted-foreground)",
              marginTop: "0.25rem",
            }}
          >
            Software Engineering Student
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
          className="md:flex-row md:items-center md:gap-6"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            className="md:gap-6"
          >
            {contactLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--muted-foreground)",
                  transition: "color 0.2s",
                  textDecoration: "none",
                }}
                aria-label={label}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--foreground)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted-foreground)";
                }}
              >
                <Icon style={{ width: "1.25rem", height: "1.25rem" }} />
                <span style={{ display: "none" }} className="sm:inline">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
            }}
            className="md:gap-4"
          >
            <span>Check out</span>
            <Link
              href="https://ai.anshkumartripathi.space"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(91, 155, 213, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
            >
              AI
            </Link>
            <span>portfolio</span>
            <span>•</span>
            <Link
              href="https://game.anshkumartripathi.space"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(91, 155, 213, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
            >
              Game
            </Link>
            <span>portfolio</span>
            <span>•</span>
            <Link
              href="https://cyber.anshkumartripathi.space"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(91, 155, 213, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
            >
              Cyber
            </Link>
            <span>portfolio</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
