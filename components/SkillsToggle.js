"use client";

import { useState } from "react";

const skills = {
  "AI/ML": [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Computer Vision",
    "Deep Learning",
    "NLP",
  ],
  "WEB/SYS": [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Linux",
    "Docker",
  ],
};

export default function SkillsToggle() {
  const [activeCategory, setActiveCategory] = useState("AI/ML");

  return (
    <div
      style={{
        position: "fixed",
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        display: "none", // Hidden by default, can be enabled if needed
      }}
      className="hidden lg:block"
    >
      <div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          padding: "1rem",
          minWidth: "200px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          {Object.keys(skills).map((category) => (
            <label
              key={category}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                fontSize: "0.875rem",
                color: "var(--foreground)",
              }}
            >
              <span>{category}</span>
              <input
                type="radio"
                name="skill-category"
                checked={activeCategory === category}
                onChange={() => setActiveCategory(category)}
                style={{
                  appearance: "none",
                  width: "2rem",
                  height: "1rem",
                  backgroundColor:
                    activeCategory === category
                      ? "var(--accent)"
                      : "var(--muted)",
                  borderRadius: "0.5rem",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
              />
            </label>
          ))}
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--muted-foreground)",
            lineHeight: "1.75",
          }}
        >
          {skills[activeCategory].map((skill, index) => (
            <div key={index}>{skill}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

