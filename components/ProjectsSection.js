"use client";

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/lib/languageContext";

export default function ProjectsSection() {
  const { t } = useLanguage();

  // Project data with translation keys
  const featuredProjects = [
    {
      name: t("project_docsuite_name"),
      description: t("project_docsuite_desc"),
      technologies:
        "Next.js, React, Tailwind CSS, DaisyUI, NextAuth, MongoDB, Google Gemini, PDF Processing",
      demo: "https://productivty-tool.vercel.app/",
      imageUrl: "/Images/docusuite.png",
    },
    {
      name: t("project_docusplit_name"),
      description: t("project_docusplit_desc"),
      technologies: "Python, Streamlit, PDF Processing, File Automation",
      demo: "https://doc2pdfsplitter.streamlit.app/",
      youtube: "https://youtu.be/lKcZ3MCwqUc",
      imageUrl: "/Images/docu-split.png",
    },
    {
      name: t("project_intel_name"),
      description: t("project_intel_desc"),
      technologies:
        "3D Modelling, AI/ML, Pathfinding, Training ML Models, PPE Detection, Computer Vision, Unity, Python",
      github:
        "https://github.com/AnshKumarTripathi/Unity-internship-intel-project",
      youtube: "https://youtu.be/1Ib96i8-1AY",
      imageUrl: "/Images/intel-global-impact.png",
    },
  ];

  return (
    <section
      id="projects"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
      className="w-full"
    >
      <div
        style={{
          width: "100%",
          maxWidth: "54rem",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div style={{ textAlign: "center", width: "100%" }}>
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: 600,
                color: "var(--foreground)",
                marginBottom: "0.5rem",
              }}
              className="md:text-4xl"
            >
              {t("projects_title")}
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--muted-foreground)",
                  margin: 0,
                }}
              >
                {t("projects_subtitle")}
              </p>
              <span
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                •
              </span>
              <Link
                href="https://project.anshkumartripathi.space"
                target="_blank"
                rel="noreferrer"
                className="text-base font-medium text-accent no-underline transition-colors hover:text-accent/80"
                style={{
                  fontSize: "1rem",
                  color: "var(--accent)",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
              >
                {t("view_all")}
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

