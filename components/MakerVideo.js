"use client";

import { useState, useEffect, useRef } from "react";
import TerminalWindow from "./TerminalWindow";
import { useLanguage } from "@/lib/languageContext";

export default function MakerVideo() {
  const { t } = useLanguage();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    // Use Intersection Observer to load video when it's about to be visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before it's visible
      }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
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
          >
            {t("maker_video_title")}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--muted-foreground)",
              margin: 0,
            }}
          >
            {t("maker_video_subtitle")}
          </p>
        </div>
      </div>

      <div
        ref={videoContainerRef}
        style={{
          width: "100%",
          maxWidth: "36rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TerminalWindow title={t("maker_video_title")}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "var(--foreground)",
                margin: 0,
              }}
            >
              {t("maker_video_latest_update")}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
                margin: 0,
              }}
            >
              {t("maker_video_last_updated")}
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
                margin: 0,
                marginTop: "0.5rem",
                lineHeight: "1.5",
              }}
            >
              {t("maker_video_description")}
            </p>
          </div>
          <div
            style={{
              padding: "0.75rem",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "56.25%",
              }}
            >
              {shouldLoadVideo ? (
                <iframe
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    borderRadius: 0,
                    transition: "all 0.3s ease-in-out",
                  }}
                  src="https://www.youtube.com/embed/1n_kSMQ8z-Q?loading=lazy"
                  title="Maker video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: "var(--muted)",
                  }}
                  onClick={() => setShouldLoadVideo(true)}
                >
                  <div style={{ textAlign: "center" }}>
                    <svg
                      style={{
                        width: "4rem",
                        height: "4rem",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "0.5rem",
                        color: "var(--foreground)",
                        opacity: 0.7,
                      }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {t("maker_video_click_to_load")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}

