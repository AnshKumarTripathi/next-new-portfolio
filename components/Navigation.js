"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRipple } from "@/lib/rippleContext";

const navItems = [
  { name: "About", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navDisplacement, setNavDisplacement] = useState(0);
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

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

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

      // Calculate navbar position and dimensions
      const navRect = navRef.current.getBoundingClientRect();
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

      // Calculate wave displacement for different parts
      // Right side gets affected first (smaller distance), then center, then left
      // Use the same calculation as visible ripple rings for synchronization
      const calculateWaveDisplacement = (distance) => {
        // Use minStartRadius from ripple state (matches ThemeToggle exactly, starts from 0)

        // Check if any ripple ring has reached this point
        // Account for multiple staggered rings (0-5 rings with 0.1 delay each)
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
      };

      // Calculate displacements for different parts
      const rightDisplacement = calculateWaveDisplacement(distanceToRight);
      const centerDisplacement = calculateWaveDisplacement(distanceToCenter);
      const leftDisplacement = calculateWaveDisplacement(distanceToLeft);

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
  ]);

  return (
    <>
      {/* Desktop Navigation - Glass Morphism Container */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: navDisplacement,
          opacity: 1,
          width: isScrolled ? "40%" : "90%",
          top: isScrolled ? 16 : 16,
        }}
        transition={{
          y: { duration: 0.016, ease: "linear" },
          duration: 0.5,
          width: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
          top: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        }}
        className="fixed left-1/2 -translate-x-1/2 z-50 hidden md:block max-w-6xl"
      >
        <motion.div
          animate={{
            paddingLeft: isScrolled ? "1.25rem" : "1.5rem",
            paddingRight: isScrolled ? "1.25rem" : "1.5rem",
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className={`
            flex h-14 items-center justify-between
            rounded-lg
            bg-background/20 backdrop-blur-lg
            border border-border/50
            shadow-lg shadow-black/5
            w-full
          `}
        >
          <Link
            href="/"
            className="text-lg font-semibold text-foreground hover:opacity-80 transition-opacity"
          >
            Portfolio
          </Link>

          {/* Desktop Navigation Items */}
          <div className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className={isActive ? "text-foreground" : ""}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: navDisplacement }}
        transition={{
          y: { duration: 0.016, ease: "linear" },
          duration: 0.5,
        }}
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
      >
        <div
          className={`
            flex h-16 items-center justify-between px-6
            transition-all duration-300
            ${
              isScrolled
                ? "bg-background/80 backdrop-blur-md border-b border-border"
                : "bg-transparent"
            }
          `}
        >
          <Link href="/" className="text-xl font-semibold text-foreground">
            Portfolio
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
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
        className="fixed top-16 left-0 right-0 z-40 overflow-hidden bg-background/95 backdrop-blur-md border-b border-border md:hidden"
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
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
