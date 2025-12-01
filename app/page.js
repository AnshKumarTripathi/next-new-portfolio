"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";

// Featured Projects Data (Top 3) with Unsplash images
const featuredProjects = [
  {
    name: "ResumeSpace",
    description:
      "Privacy-focused resume building tool with complete client-side processing",
    technologies: "TypeScript, HTML, CSS, JavaScript, React",
    github: "https://github.com/AnshKumarTripathi/ResumeSpace",
    demo: "https://www.resume-builder.space/",
    youtube: "https://youtu.be/2SzDcSlD3Cg",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
  },
  {
    name: "DocuSplit",
    description:
      "Automated PDF document splitting and personalization tool",
    technologies: "Python, Streamlit, PDF Processing, File Automation",
    github: "https://github.com/AnshKumarTripathi/DocuSplit",
    demo: "https://doc2pdfsplitter.streamlit.app/",
    youtube: "https://youtu.be/lKcZ3MCwqUc",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80",
  },
  {
    name: "Intel Global Impact Fest Project",
    description:
      "AI-powered camera vision system for real-time hazard detection in manufacturing",
    technologies: "3D Modelling, AI/ML, Pathfinding, Training ML Models, PPE Detection, Computer Vision, Unity, Python",
    github: "https://github.com/AnshKumarTripathi/Intel-Internship-Final-Project-python",
    demo: "https://github.com/AnshKumarTripathi/Unity-internship-intel-project",
    youtube: "https://youtu.be/1Ib96i8-1AY",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80",
  },
];

// Fallback blog posts (if API fails)
const fallbackBlogs = [
  {
    title: "Building Privacy-First Web Applications",
    excerpt:
      "Exploring the importance of client-side processing and privacy in modern web development. Learn how to build applications that respect user data.",
    date: "Coming Soon",
    link: "https://blog.anshkumartripathi.space/",
  },
  {
    title: "Understanding Pathfinding Algorithms",
    excerpt:
      "A deep dive into various pathfinding algorithms including A*, Dijkstra's, and Jump Point Search. Visual explanations and practical implementations.",
    date: "Coming Soon",
    link: "https://blog.anshkumartripathi.space/",
  },
  {
    title: "AI/ML in Web Development",
    excerpt:
      "How machine learning and artificial intelligence are transforming web development. Real-world examples and practical applications.",
    date: "Coming Soon",
    link: "https://blog.anshkumartripathi.space/",
  },
];

// Function to fetch popular blog posts via our API proxy
async function fetchPopularBlogs() {
  try {
    const response = await fetch("/api/blog/popular", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
}

export default function Home() {
  const [featuredBlogs, setFeaturedBlogs] = useState(fallbackBlogs);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      setIsLoadingBlogs(true);
      const blogs = await fetchPopularBlogs();
      if (blogs && blogs.length > 0) {
        setFeaturedBlogs(blogs);
      }
      setIsLoadingBlogs(false);
    }

    loadBlogs();
  }, []);
  return (
    <>
      {/* Hero Section - Full Viewport Height */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Hero />
      </section>

      {/* Featured Projects Section - Full Viewport Height */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
        className="w-full"
      >
        <div
          style={{
            width: "100%",
            maxWidth: "72rem",
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
                Featured Projects
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
                  A selection of my best work
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
                  style={{
                    fontSize: "1rem",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(91, 155, 213, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                >
                  View All
                </Link>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "1.5rem",
            }}
            className="grid-cols-1 md:grid-cols-3"
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} imageUrl={project.imageUrl} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Section - Full Viewport Height */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
        className="w-full"
      >
        <div
          style={{
            width: "100%",
            maxWidth: "72rem",
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
                Featured Blog Posts
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
                  Latest thoughts and insights
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
                  style={{
                    fontSize: "1rem",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(91, 155, 213, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                >
                  View All
                </Link>
              </div>
            </div>
          </div>

          {isLoadingBlogs ? (
            <div
              style={{
                display: "grid",
                gap: "1.5rem",
              }}
              className="grid-cols-1 md:grid-cols-3"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "var(--background-rgba-20)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid var(--border-rgba-50)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.875rem",
                    }}
                  >
                    Loading...
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "2rem",
              }}
              className="grid-cols-1 md:grid-cols-3"
            >
              {featuredBlogs.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "2rem",
        }}
      >
        <Footer />
      </section>
    </>
  );
}
