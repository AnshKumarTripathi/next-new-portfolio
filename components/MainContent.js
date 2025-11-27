"use client";

import { motion } from "framer-motion";

export default function MainContent() {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Company Name",
      period: "2022 - Present",
      description: "Leading development of modern web applications using React and Next.js.",
    },
    {
      title: "Software Engineer",
      company: "Previous Company",
      period: "2020 - 2022",
      description: "Developed and maintained multiple client-facing applications.",
    },
    {
      title: "Junior Developer",
      company: "Startup Company",
      period: "2018 - 2020",
      description: "Built features for a SaaS platform using modern JavaScript frameworks.",
    },
  ];

  const projects = [
    {
      title: "Project One",
      description: "A modern web application built with Next.js and TypeScript.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Project Two",
      description: "A full-stack application with authentication and real-time features.",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Project Three",
      description: "An open-source library for building UI components.",
      tech: ["React", "TypeScript", "Storybook"],
    },
  ];

  return (
    <section className="w-full flex justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl rounded-lg bg-background/20 p-6 backdrop-blur-lg shadow-lg shadow-black/5 border border-border/50 md:p-8 lg:p-12"
      >
        {/* About Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            About
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm a passionate software engineer with expertise in building modern
            web applications. I love creating user-friendly interfaces and
            solving complex problems through clean, maintainable code. With
            experience in React, Next.js, and various backend technologies, I
            bring ideas to life through thoughtful design and implementation.
          </p>
        </div>

        {/* Experience Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
            Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-l-2 border-accent pl-6"
              >
                <h3 className="mb-1 text-xl font-semibold text-foreground">
                  {exp.title}
                </h3>
                <p className="mb-2 text-sm font-medium text-accent">
                  {exp.company} • {exp.period}
                </p>
                <p className="text-muted-foreground">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Projects Section */}
        <div>
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
            Featured Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg border border-border/50 bg-background/10 p-6 backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-background/20"
              >
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

