"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, Youtube } from "lucide-react";
import { motion } from "framer-motion";

function ProjectCard({ project, imageUrl }) {
  const { name, description, technologies, github, demo, youtube } = project;

  const handleMouseEnter = useCallback((e) => {
    e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
    e.currentTarget.style.transform = "translateY(-4px)";
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.05)";
    e.currentTarget.style.transform = "translateY(0)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: "var(--background-rgba-20)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--border-rgba-50)",
        borderRadius: "0.75rem",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
          }}
        />
      </div>

      {/* Content Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          flex: 1,
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            flex: 1,
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
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
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--muted-rgba-50)",
                  color: "var(--muted-foreground)",
                  border: "1px solid var(--border-rgba-30)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border-rgba-30)",
            flexWrap: "wrap",
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
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--muted-foreground)",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--foreground)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted-foreground)";
              }}
            >
              <Github style={{ width: "1rem", height: "1rem" }} />
              <span>GitHub</span>
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
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--muted-foreground)",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--foreground)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted-foreground)";
              }}
            >
              <ExternalLink style={{ width: "1rem", height: "1rem" }} />
              <span>Demo</span>
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
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--muted-foreground)",
                marginLeft: "auto",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--foreground)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted-foreground)";
              }}
            >
              <Youtube style={{ width: "1rem", height: "1rem" }} />
              <span>Video</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ProjectCard);
