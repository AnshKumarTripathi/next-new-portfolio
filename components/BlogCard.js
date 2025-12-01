"use client";

import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogCard({ blog }) {
  const { title, excerpt, date, link } = blog;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="
        flex flex-col
        rounded-lg
        bg-background/20 backdrop-blur-lg
        border border-border/50
        shadow-lg shadow-black/5
        hover:shadow-xl hover:shadow-black/10
        transition-all duration-300
        h-full
      "
      style={{
        padding: "1.5rem",
        gap: "1rem",
      }}
    >
      <div
        className="flex flex-col flex-1"
        style={{
          gap: "0.75rem",
        }}
      >
        <h3
          className="text-xl font-semibold text-foreground"
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          {title}
        </h3>
        <p
          className="text-sm text-muted-foreground leading-relaxed flex-1"
          style={{
            margin: 0,
            padding: 0,
            lineHeight: "1.6",
          }}
        >
          {excerpt}
        </p>
        {date && (
          <div
            className="flex items-center text-xs text-muted-foreground"
            style={{
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        )}
      </div>

      {link && (
        <Link
          href={link}
          className="
            flex items-center
            text-sm font-medium text-accent
            hover:text-accent/80
            transition-colors
          "
          style={{
            gap: "0.5rem",
            paddingTop: "1rem",
            marginTop: "0.5rem",
            borderTop: "1px solid var(--border)",
            borderTopColor: "rgba(var(--border-rgb), 0.3)",
          }}
        >
          <span>Read More</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </motion.div>
  );
}
