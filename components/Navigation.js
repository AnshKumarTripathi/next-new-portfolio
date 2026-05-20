"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRipple } from "@/lib/rippleContext";
import { useLanguage } from "@/lib/languageContext";

export default function Navigation() {
  const { t } = useLanguage();
  const navItems = [
    { id: "about", name: t("about"), href: "/" },
    { id: "experience", name: t("experience"), href: "#experience" },
    { id: "projects", name: t("projects"), href: "#projects" },
    { id: "blog", name: t("blog"), href: "#blog" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navDisplacement, setNavDisplacement] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { rippleState } = useRipple();
  const {
    isRippling,
    rippleOrigin,
    rippleRadius,
    waveProgress,
    maxRadius = 1000,
    minStartRadius = 70,
  } = rippleState;
  const navRef = useRef(null);
  const lastIsScrolledRef = useRef(false);

  // Intersection Observer to update active section on scroll
  useEffect(() => {
    if (pathname !== "/") return; // Only run on home page

    const sections = [
      { id: "hero", navId: "about" },
      { id: "experience", navId: "experience" },
      { id: "projects", navId: "projects" },
      { id: "blog", navId: "blog" },
    ];

    // Track intersection ratios for all sections
    const sectionRatios = new Map();

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section is in upper-middle portion of viewport
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    };

    const observerCallback = (entries) => {
      // Update ratios for all entries
      entries.forEach((entry) => {
        sectionRatios.set(entry.target.id, entry.intersectionRatio);
      });

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let activeNavId = "about"; // Default to about

      sections.forEach(({ id, navId }) => {
        const ratio = sectionRatios.get(id) || 0;
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeNavId = navId;
        }
      });

      // Update active section
      setActiveSection(activeNavId);
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Check initial scroll position after DOM is ready
    const checkInitialSection = () => {
      const scrollPosition = window.scrollY + 150; // Account for navbar and offset

      // Check sections in reverse order (bottom to top) to find the first one we've scrolled past
      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, navId } = sections[i];
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(navId);
            break;
          }
        }
      }

      // If we're at the very top, set to about
      if (window.scrollY < 50) {
        setActiveSection("about");
      }
    };

    // Check after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkInitialSection, 200);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };

    // Check on mount
    checkScreenSize();

    // Listen for resize events
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (e) => {
      setIsDesktop(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Initialize scroll state on mount
  useEffect(() => {
    // Initialize scroll state (deferred to avoid cascading renders)
    const initialScroll = window.scrollY;
    const initialIsScrolled = initialScroll > 50;
    lastIsScrolledRef.current = initialIsScrolled;

    requestAnimationFrame(() => {
      setIsScrolled(initialIsScrolled);
    });
  }, []);

  // Throttled scroll handler for navbar background opacity ONLY
  useMotionValueEvent(scrollY, "change", (latest) => {
    const newIsScrolled = latest > 50;

    // Always update isScrolled immediately when crossing the threshold
    if (newIsScrolled !== lastIsScrolledRef.current) {
      setIsScrolled(newIsScrolled);
      lastIsScrolledRef.current = newIsScrolled;
    }
  });

  // Memoized wave displacement calculation function
  const calculateWaveDisplacement = useCallback(
    (distance, waveProgress, maxRadius, minStartRadius) => {
      const ringWidth = 25; // Width of each ring's effect zone
      let totalDisplacement = 0;
      let activeRings = 0;

      // Check each ripple ring (matching the visible rings in ThemeToggle)
      for (let waveIndex = 0; waveIndex < 6; waveIndex++) {
        const waveDelay = waveIndex * 0.1; // Match ThemeToggle stagger
        const adjustedProgress = Math.max(0, waveProgress - waveDelay);

        if (adjustedProgress <= 0) continue;

        // Calculate this ring's radius (same formula as visible rings)
        const ringRadius =
          minStartRadius + adjustedProgress * (maxRadius - minStartRadius);

        // Check if this ring is passing through this point
        const distanceFromRing = Math.abs(distance - ringRadius);

        // Only create distortion when a ring is actually passing through
        if (distanceFromRing <= ringWidth) {
          // Calculate relative position within the ring effect zone (0 to 1)
          const relativePosition = distanceFromRing / ringWidth;

          // Create wave effect - strongest when ring is centered on this point
          const ringIntensity = 1 - relativePosition; // 1 at center, 0 at edges

          // Calculate wave phase for this ring (matching visible ring animation)
          const wavePhase = adjustedProgress * Math.PI * 6;

          // Amplitude decreases as wave progresses
          const progressFactor = 1 - adjustedProgress;
          const waveAmplitude = 12 * progressFactor * ringIntensity;

          // Calculate displacement for this ring (matching visible ring vertical displacement)
          const ringDisplacement = Math.sin(wavePhase) * waveAmplitude;

          // Accumulate displacement from all active rings
          totalDisplacement += ringDisplacement;
          activeRings++;
        }
      }

      // Average the displacement if multiple rings are active
      return activeRings > 0 ? totalDisplacement / activeRings : 0;
    },
    []
  );

  // Cache nav rect to avoid repeated getBoundingClientRect calls
  const navRectRef = useRef(null);
  const lastNavRectUpdate = useRef(0);
  const navRectCacheDuration = 50; // Cache nav rect for 50ms

  useEffect(() => {
    if (!isRippling || !navRef.current) {
      // Use requestAnimationFrame to avoid synchronous setState
      requestAnimationFrame(() => {
        setNavDisplacement(0);
      });
      return;
    }

    let animationFrameId;
    let lastUpdateTime = 0;
    const updateInterval = 16; // ~60fps

    const updateDisplacement = (currentTime) => {
      if (!navRef.current || !isRippling) {
        setNavDisplacement(0);
        return;
      }

      // Throttle updates to ~60fps
      if (currentTime - lastUpdateTime < updateInterval) {
        animationFrameId = requestAnimationFrame(updateDisplacement);
        return;
      }
      lastUpdateTime = currentTime;

      // Cache nav rect to avoid repeated getBoundingClientRect calls
      const now = Date.now();
      if (
        !navRectRef.current ||
        now - lastNavRectUpdate.current > navRectCacheDuration
      ) {
        navRectRef.current = navRef.current.getBoundingClientRect();
        lastNavRectUpdate.current = now;
      }

      const navRect = navRectRef.current;
      const navCenterY = navRect.top + navRect.height / 2;
      const navRightX = navRect.right;
      const navLeftX = navRect.left;
      const navCenterX = navRect.left + navRect.width / 2;

      // Calculate distance from ripple origin to different parts of navbar
      const distanceToRight = Math.sqrt(
        Math.pow(rippleOrigin.x - navRightX, 2) +
          Math.pow(rippleOrigin.y - navCenterY, 2)
      );
      const distanceToLeft = Math.sqrt(
        Math.pow(rippleOrigin.x - navLeftX, 2) +
          Math.pow(rippleOrigin.y - navCenterY, 2)
      );
      const distanceToCenter = Math.sqrt(
        Math.pow(rippleOrigin.x - navCenterX, 2) +
          Math.pow(rippleOrigin.y - navCenterY, 2)
      );

      // Calculate displacements for different parts using memoized function
      const rightDisplacement = calculateWaveDisplacement(
        distanceToRight,
        waveProgress,
        maxRadius,
        minStartRadius
      );
      const centerDisplacement = calculateWaveDisplacement(
        distanceToCenter,
        waveProgress,
        maxRadius,
        minStartRadius
      );
      const leftDisplacement = calculateWaveDisplacement(
        distanceToLeft,
        waveProgress,
        maxRadius,
        minStartRadius
      );

      // Weight the displacement - right side moves more (closer to origin)
      // This creates the right-to-left wave propagation effect
      const weightedDisplacement =
        rightDisplacement * 0.5 +
        centerDisplacement * 0.3 +
        leftDisplacement * 0.2;

      setNavDisplacement(weightedDisplacement);

      // Continue animation if still rippling
      if (isRippling) {
        animationFrameId = requestAnimationFrame(updateDisplacement);
      }
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(updateDisplacement);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [
    isRippling,
    rippleOrigin,
    rippleRadius,
    waveProgress,
    maxRadius,
    minStartRadius,
    calculateWaveDisplacement,
  ]);

  return (
    <>
      {/* Desktop Navigation - Terminal Style */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: navDisplacement,
          opacity: 1,
        }}
        transition={{
          y: { duration: 0.016, ease: "linear" },
          duration: 0.5,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: isDesktop ? "block" : "none",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--background)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "3.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Centered Content Container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "60rem",
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
            }}
          >
            {/* Profile picture and name */}
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  setActiveSection("about");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                } else {
                  setActiveSection("about");
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              {/* Profile Picture */}
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  backgroundColor: "var(--muted)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  flexShrink: 0,
                }}
              >
                AK
              </div>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                }}
              >
                ~/.ansh
              </span>
            </Link>

            {/* Navigation Items */}
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {navItems.map((item) => {
                const isExternal = item.href.startsWith("http");
                const isAnchor = item.href.startsWith("#");

                // Determine if this item is active
                let isActive = false;
                if (isExternal) {
                  isActive = false; // External links are never active
                } else if (isAnchor) {
                  isActive = pathname === "/" && activeSection === item.id;
                } else {
                  // For regular routes, check pathname match
                  isActive =
                    pathname === item.href && activeSection === "about";
                }

                const handleClick = (e) => {
                  if (isAnchor) {
                    e.preventDefault();
                    const sectionName = item.href.replace("#", "");
                    setActiveSection(sectionName);
                    // Use cached section if available
                    const element = document.querySelector(item.href);
                    if (element) {
                      const offsetTop = element.offsetTop - 100; // Account for navbar height
                      window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                      });
                    }
                  } else if (item.href === "/" && pathname === "/") {
                    e.preventDefault();
                    setActiveSection("about");
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                };

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={handleClick}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: isActive
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                      textDecoration: "none",
                      textTransform: "uppercase",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: navDisplacement }}
        transition={{
          y: { duration: 0.016, ease: "linear" },
          duration: 0.5,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: isDesktop ? "none" : "block",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--background)",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "3.5rem",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
            }}
          >
            {/* Profile Picture */}
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                backgroundColor: "var(--muted)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--foreground)",
                flexShrink: 0,
              }}
            >
              AK
            </div>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--foreground)",
              }}
            >
              ~/.ansh
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: isDesktop ? "none" : "block",
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: "3.5rem",
          left: 0,
          right: 0,
          zIndex: 40,
          overflow: "hidden",
          backgroundColor: "var(--background)",
          borderBottom: "1px solid var(--border)",
          display: isDesktop ? "none" : "block",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          {navItems.map((item) => {
            const isExternal = item.href.startsWith("http");
            const isAnchor = item.href.startsWith("#");

            // Determine if this item is active
            let isActive = false;
            if (isExternal) {
              isActive = false; // External links are never active
            } else if (isAnchor) {
              isActive = pathname === "/" && activeSection === item.id;
            } else {
              // For regular routes, check pathname match
              isActive = pathname === item.href && activeSection === "about";
            }

            const handleClick = (e) => {
              setIsMobileMenuOpen(false);
              if (isAnchor) {
                e.preventDefault();
                const sectionName = item.href.replace("#", "");
                setActiveSection(sectionName);
                const element = document.querySelector(item.href);
                if (element) {
                  const offsetTop = element.offsetTop - 100; // Account for navbar height
                  window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                  });
                }
              } else if (item.href === "/" && pathname === "/") {
                e.preventDefault();
                setActiveSection("about");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
            };

            return (
              <Link
                key={item.id}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                onClick={handleClick}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: isActive
                    ? "var(--foreground)"
                    : "var(--muted-foreground)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                className="hover:text-foreground"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
