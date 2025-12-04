"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/languageContext";

function ProjectCard({ project, imageUrl }) {
  const { name, description, technologies, github, demo, youtube } = project;
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 0,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
        height: "200px",
        display: "flex",
        flexDirection: "row",
        transition: "all 0.3s",
        fontFamily: "monospace",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
      }}
    >
      {/* Image Section */}
      <div
        style={{
          position: "relative",
          width: "300px",
          minWidth: "300px",
          height: "200px",
          overflow: "hidden",
        }}
      >
        <Image
          src={imageUrl}
          alt={`${name} project screenshot`}
          fill
          loading="lazy"
          style={{
            objectFit: "cover",
          }}
          sizes="300px"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
          }}
        />
      </div>

      {/* Content Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          flex: 1,
          padding: "1.5rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--foreground)",
            margin: 0,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--muted-foreground)",
            lineHeight: "1.625",
            flex: 1,
            margin: 0,
          }}
        >
          {description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {technologies.split(", ").map((tech, index) => (
            <span
              key={index}
              style={{
                paddingLeft: "0.625rem",
                paddingRight: "0.625rem",
                paddingTop: "0.375rem",
                paddingBottom: "0.375rem",
                fontSize: "0.75rem",
                fontWeight: 500,
                borderRadius: 0,
                backgroundColor: "var(--muted)",
                color: "var(--muted-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links Column */}
      {(github || demo || youtube) && (
        <div
          style={{
            width: "80px",
            minWidth: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--terminal-blue)",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--terminal-blue)";
              }}
              title={t("social_github")}
            >
              <Github style={{ width: "1.25rem", height: "1.25rem" }} />
            </Link>
          )}
          {demo && (
            <Link
              href={demo}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--terminal-blue)",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--terminal-blue)";
              }}
              title={t("demo")}
            >
              <ExternalLink style={{ width: "1.25rem", height: "1.25rem" }} />
            </Link>
          )}
          {youtube && (
            <Link
              href={youtube}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--terminal-blue)",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--terminal-blue)";
              }}
              title={t("video")}
            >
              <Youtube style={{ width: "1.25rem", height: "1.25rem" }} />
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default memo(ProjectCard);
