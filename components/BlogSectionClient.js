"use client";

import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { useLanguage } from "@/lib/languageContext";

export default function BlogSectionClient({ featuredBlogs }) {
  const { t } = useLanguage();

  return (
    <section
      id="blog"
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
              {t("blog_title")}
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
                {t("blog_subtitle")}
              </p>
              <span
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                •
              </span>
              <Link
                href="https://blog.anshkumartripathi.space/"
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
            gap: "2rem",
          }}
        >
          {featuredBlogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

