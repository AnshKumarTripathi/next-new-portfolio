"use client";

import { memo } from "react";
import { Calendar, Building2 } from "lucide-react";
import { motion } from "framer-motion";

function ExperienceCard({ experience }) {
  const { role, company, period, highlights } = experience;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "row",
        borderRadius: 0,
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
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
      <div
        style={{
          width: "4px",
          minWidth: "4px",
          backgroundColor: "var(--accent)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "1.5rem",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            {role}
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              <Building2 size={14} aria-hidden />
              {company}
            </span>
            <span style={{ color: "var(--border)" }}>•</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              <Calendar size={14} aria-hidden />
              {period}
            </span>
          </div>
        </div>

        <ul
          style={{
            margin: 0,
            paddingLeft: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--foreground)",
            lineHeight: 1.6,
          }}
        >
          {highlights.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default memo(ExperienceCard);
