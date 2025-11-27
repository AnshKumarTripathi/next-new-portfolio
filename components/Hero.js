"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
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
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
          Your Name
        </h1>
        <p className="mb-8 text-xl text-muted-foreground md:text-2xl lg:text-3xl">
          Software Engineer
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
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
                className="rounded-full p-3 text-muted-foreground transition-colors hover:text-accent hover:bg-accent/10"
              >
                <Icon className="h-6 w-6 md:h-7 md:w-7" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

