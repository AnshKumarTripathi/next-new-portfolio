import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import MakerVideo from "@/components/MakerVideo";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSectionClient from "@/components/BlogSectionClient";
import { fetchPopularBlogs } from "@/lib/blog";

const Footer = dynamic(() => import("@/components/Footer"));

// Blog section component
async function BlogSection() {
  const featuredBlogs = await fetchPopularBlogs();
  return <BlogSectionClient featuredBlogs={featuredBlogs} />;
}

export default async function Home() {
  return (
    <>
      {/* Hero Section - Full Viewport Height */}
      <section
        style={{
          minHeight: "calc(100vh - 3.5rem)",
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
      <ProjectsSection />

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

      {/* Maker Video Section - Full Viewport Height */}
      <section
        id="maker-video"
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
        <MakerVideo />
      </section>

      {/* Footer */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "2rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Footer />
      </section>
    </>
  );
}
