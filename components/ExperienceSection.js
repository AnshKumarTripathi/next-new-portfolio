"use client";

import ExperienceCard from "@/components/ExperienceCard";
import { useLanguage } from "@/lib/languageContext";

export default function ExperienceSection() {
  const { t } = useLanguage();

  const experiences = [
    {
      role: t("exp_sac_role"),
      company: t("exp_sac_company"),
      period: t("exp_sac_period"),
      highlights: [
        t("exp_sac_highlight_1"),
        t("exp_sac_highlight_2"),
        t("exp_sac_highlight_3"),
      ],
    },
    {
      role: t("exp_intel_role"),
      company: t("exp_intel_company"),
      period: t("exp_intel_period"),
      highlights: [t("exp_intel_highlight_1")],
    },
  ];

  return (
    <section
      id="experience"
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
              {t("experience_title")}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted-foreground)",
                margin: 0,
              }}
            >
              {t("experience_subtitle")}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}
