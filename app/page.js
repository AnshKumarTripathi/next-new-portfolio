import { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import { fetchPopularBlogs } from "@/lib/blog";

// Featured Projects Data (Top 3) with local images
const featuredProjects = [
  {
    name: "ResumeSpace",
    description:
      "Privacy-focused resume building tool with complete client-side processing",
    technologies: "TypeScript, HTML, CSS, JavaScript, React",
    demo: "https://www.resume-builder.space/",
    youtube: "https://youtu.be/2SzDcSlD3Cg",
    imageUrl: "/Images/resume-space.png",
  },
  {
    name: "DocuSplit",
    description: "Automated PDF document splitting and personalization tool",
    technologies: "Python, Streamlit, PDF Processing, File Automation",
    demo: "https://doc2pdfsplitter.streamlit.app/",
    youtube: "https://youtu.be/lKcZ3MCwqUc",
    imageUrl: "/Images/docu-split.png",
  },
  {
    name: "Intel Global Impact Fest Project",
    description:
      "AI-powered camera vision system for real-time hazard detection in manufacturing",
    technologies:
      "3D Modelling, AI/ML, Pathfinding, Training ML Models, PPE Detection, Computer Vision, Unity, Python",
    github:
      "https://github.com/AnshKumarTripathi/Intel-Internship-Final-Project-python",
    github:
      "https://github.com/AnshKumarTripathi/Unity-internship-intel-project",
    youtube: "https://youtu.be/1Ib96i8-1AY",
    imageUrl: "/Images/intel-global-impact.png",
  },
];

// Dynamic imports for below-the-fold components
const ProjectCard = dynamic(() => import("@/components/ProjectCard"), {
  loading: () => (
    <div
      style={{
        backgroundColor: "var(--background-rgba-20)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--border-rgba-50)",
        borderRadius: "0.75rem",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
        Loading...
      </div>
    </div>
  ),
});

const BlogCard = dynamic(() => import("@/components/BlogCard"), {
  loading: () => (
    <div
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
      <div style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
        Loading...
      </div>
    </div>
  ),
});

const Footer = dynamic(() => import("@/components/Footer"));

// Blog section component
async function BlogSection() {
  const featuredBlogs = await fetchPopularBlogs();

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
                className="text-base font-medium text-accent no-underline transition-colors hover:text-accent/80"
                style={{
                  fontSize: "1rem",
                  color: "var(--accent)",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s",
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
            gap: "2rem",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {featuredBlogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
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
        id="projects"
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
                  className="text-base font-medium text-accent no-underline transition-colors hover:text-accent/80"
                  style={{
                    fontSize: "1rem",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
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
              <ProjectCard
                key={index}
                project={project}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Section - Full Viewport Height */}
      <Suspense
        fallback={
          <section
            id="blog"
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
            </div>
          </section>
        }
      >
        <BlogSection />
      </Suspense>

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
