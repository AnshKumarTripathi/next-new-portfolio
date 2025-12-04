"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Format date from ISO string to "30 Nov 2025" format
function formatBlogDate(dateString) {
  if (!dateString || dateString === "Coming Soon") {
    return dateString;
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid date
    }

    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch (error) {
    return dateString; // Return original on error
  }
}

function BlogCard({ blog }) {
  const { title, excerpt, date, link } = blog;
  const formattedDate = useMemo(() => formatBlogDate(date), [date]);

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
        minHeight: "150px",
        fontFamily: "monospace",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
      }}
    >
      {/* Accent Bar */}
      <div
        style={{
          width: "4px",
          minWidth: "4px",
          backgroundColor: "var(--accent)",
        }}
      />

      {/* Content Section */}
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
            gap: "0.75rem",
            flex: 1,
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--foreground)",
              margin: 0,
              padding: 0,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              lineHeight: "1.6",
              flex: 1,
              margin: 0,
              padding: 0,
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
                marginTop: "0.5rem",
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--terminal-blue)",
              textDecoration: "none",
              paddingTop: "1rem",
              marginTop: "0.5rem",
              borderTop: "1px solid var(--border)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--terminal-blue)";
            }}
          >
            <span>Read More</span>
            <ArrowRight style={{ width: "1rem", height: "1rem" }} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default memo(BlogCard);
