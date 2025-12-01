"use client";

import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Function to format date from ISO string to "DD Month YYYY" format
function formatDate(dateString) {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch (error) {
    return dateString; // Return original if parsing fails
  }
}

export default function BlogCard({ blog }) {
  const { title, excerpt, date, link } = blog;
  const formattedDate = formatDate(date);

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
        padding: "1.5rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 10px 15px -3px rgba(0, 0, 0, 0.05)";
        e.currentTarget.style.transform = "translateY(0)";
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
          {title}
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
          {excerpt}
        </p>
        {formattedDate && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              color: "var(--muted-foreground)",
            }}
          >
            <Calendar style={{ width: "0.75rem", height: "0.75rem" }} />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>

      {link && (
        <Link
          href={link}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--accent)",
            transition: "color 0.2s",
            paddingTop: "0.5rem",
            borderTop: "1px solid var(--border-rgba-30)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(91, 155, 213, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--accent)";
          }}
        >
          <span>Read More</span>
          <ArrowRight style={{ width: "1rem", height: "1rem" }} />
        </Link>
      )}
    </motion.div>
  );
}
