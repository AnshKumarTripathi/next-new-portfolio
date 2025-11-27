"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com",
      ariaLabel: "Visit GitHub profile",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
      ariaLabel: "Visit LinkedIn profile",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:your.email@example.com",
      ariaLabel: "Send email",
    },
  ];

  return (
    <footer className="w-full flex justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl rounded-lg bg-background/20 p-6 backdrop-blur-lg shadow-lg shadow-black/5 border border-border/50 md:p-8"
      >
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Your Name. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={link.ariaLabel}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:text-accent hover:bg-accent/10"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

