"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRipple } from "@/lib/rippleContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { rippleState, setRippleState } = useRipple();
  const { isRippling, rippleOrigin, rippleRadius, waveProgress, maxRadius } =
    rippleState;
  const transitioningToDark = rippleState.transitioningToDark ?? false;
  const buttonRef = useRef(null);
  const circleRef = useRef(null);
  const bodyRef = useRef(null);
  const htmlRef = useRef(null);

  useEffect(() => {
    // Prevent hydration mismatch with next-themes
    // Use setTimeout to defer state update and avoid cascading renders
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    if (isRippling) return;

    // Get exact center position of the sun/moon circle using getBoundingClientRect
    let circleCenterX, circleCenterY;
    if (circleRef.current) {
      const rect = circleRef.current.getBoundingClientRect();
      circleCenterX = rect.left + rect.width / 2;
      circleCenterY = rect.top + rect.height / 2;
    } else {
      // Fallback to calculated position if ref not available
      const circleSize = isDark ? 80 : 120;
      const buttonRight = 230;
      const buttonTop = isDark ? -40 : -60;
      const circleRight = 70;
      const circleTop = -30;
      circleCenterX =
        window.innerWidth - buttonRight - circleRight + circleSize / 2;
      circleCenterY = buttonTop + circleTop + circleSize / 2;
    }

    // Calculate maximum radius needed to cover entire viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const distanceX = Math.max(circleCenterX, viewportWidth - circleCenterX);
    const distanceY = Math.max(circleCenterY, viewportHeight - circleCenterY);
    // Ensure maxRadius is large enough to cover entire screen
    const maxRadius =
      Math.sqrt(distanceX * distanceX + distanceY * distanceY) + 200;

    // Calculate minimum starting radius (start from center, inside the circle)
    const minStartRadius = 0; // Start from center of circle

    const newTheme = isDark ? "light" : "dark";
    const transitioningToDark = newTheme === "dark";

    // Disable transitions on html and body before theme change
    if (htmlRef.current === null) {
      htmlRef.current = document.documentElement;
    }
    if (bodyRef.current === null) {
      bodyRef.current = document.body;
    }

    // Store original transition values to restore later
    const originalHtmlTransition = htmlRef.current.style.transition;
    const originalBodyTransition = bodyRef.current.style.transition;

    // Disable all transitions during animation
    htmlRef.current.style.transition = "none";
    bodyRef.current.style.transition = "none";

    // Also disable transitions on all elements using a global class
    htmlRef.current.classList.add("no-transitions");

    // Apply theme change immediately (for DOM structure) but visual transition happens via overlay
    setTheme(newTheme);

    setRippleState({
      isRippling: true,
      rippleOrigin: { x: circleCenterX, y: circleCenterY },
      rippleRadius: 0,
      waveProgress: 0,
      maxRadius: maxRadius,
      minStartRadius: minStartRadius,
      transitioningToDark: transitioningToDark,
    });

    // Start theme transition animation
    const startTime = Date.now();
    const duration = 1200; // 1.2 seconds - slower for better visibility

    const animateThemeTransition = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: ease-out cubic for smooth ripple effect
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentRadius = eased * maxRadius;

      setRippleState({
        isRippling: true,
        rippleOrigin: { x: circleCenterX, y: circleCenterY },
        rippleRadius: currentRadius,
        waveProgress: progress,
        maxRadius: maxRadius,
        minStartRadius: minStartRadius,
        transitioningToDark: transitioningToDark,
      });

      if (progress < 1) {
        requestAnimationFrame(animateThemeTransition);
      } else {
        // Animation complete - overlay fully covers screen
        // Keep overlay fully opaque for a brief moment to ensure smooth transition
        // Then fade out overlay smoothly
        setTimeout(() => {
          // Start fade-out (overlay opacity will transition to 0)
          // Wait for fade-out to complete (200ms) before restoring transitions
          setTimeout(() => {
            // Restore transitions after overlay is completely gone
            if (htmlRef.current) {
              htmlRef.current.style.transition = originalHtmlTransition;
              htmlRef.current.classList.remove("no-transitions");
            }
            if (bodyRef.current) {
              bodyRef.current.style.transition = originalBodyTransition;
            }

            // Clean up ripple state after transitions are restored
            setTimeout(() => {
              setRippleState({
                isRippling: false,
                rippleOrigin: { x: 0, y: 0 },
                rippleRadius: 0,
                waveProgress: 0,
                maxRadius: 0,
                minStartRadius: 0,
                transitioningToDark: false,
              });
            }, 50); // Small delay to ensure transitions are restored
          }, 250); // Wait for fade-out animation (200ms) + small buffer
        }, 50); // Brief delay to ensure overlay is fully visible
      }
    };

    requestAnimationFrame(animateThemeTransition);
  };

  // Sun is larger (120px), Moon is smaller (80px)
  const circleSize = isDark ? 80 : 120;

  // Store circleSize in a way that's accessible in the ripple effect
  const currentCircleSize = circleSize;

  return (
    <>
      <motion.button
        ref={buttonRef}
        onClick={toggleTheme}
        className="fixed z-50 overflow-visible hidden md:block"
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: 1,
          y: isDark ? -40 : -60, // Keep previous y-axis position
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
        aria-label="Toggle theme"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          top: 0,
          right: 230, // Closer on x-axis (was 80)
          width: 0,
          height: 0,
          border: "none",
          outline: "none",
          background: "transparent",
          padding: 0,
          margin: 0,
          overflow: "visible",
        }}
      >
        {/* Sun/Moon Circle */}
        <motion.div
          ref={circleRef}
          className="rounded-full cursor-pointer shadow-xl relative overflow-visible"
          animate={{
            width: circleSize,
            height: circleSize,
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            position: "absolute",
            right: 70,
            top: -30,
            transform: "translate(50%, 50%)",
            border: "none",
            outline: "none",
            zIndex: 10, // Above ripples (which are at -1)
          }}
        >
          {/* Sun (Light Mode) */}
          {!isDark && (
            <>
              {/* Sun base with gradient */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
                  boxShadow:
                    "inset -20px -20px 40px rgba(255, 215, 0, 0.3), 0 0 120px rgba(255, 165, 0, 0.8), 0 0 240px rgba(255, 200, 0, 0.6), 0 0 360px rgba(255, 180, 0, 0.4)",
                  border: "none",
                  outline: "none",
                  zIndex: 1,
                }}
              />
              {/* Enhanced glow layer */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 240, 150, 0.4) 30%, transparent 70%)",
                  border: "none",
                  outline: "none",
                  zIndex: 2,
                }}
              />
              {/* Subtle glow animation */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 70%)",
                  border: "none",
                  outline: "none",
                  zIndex: 3,
                }}
              />
            </>
          )}

          {/* Moon (Dark Mode) */}
          {isDark && (
            <>
              {/* Moonlight - Soft glow extending outward */}
              <div
                className="absolute inset-0"
                style={{
                  width: circleSize + 80,
                  height: circleSize + 80,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, rgba(200, 200, 255, 0.3) 0%, rgba(150, 150, 220, 0.2) 25%, rgba(120, 120, 200, 0.15) 45%, rgba(100, 100, 180, 0.1) 60%, transparent 75%)",
                  filter: "blur(18px)",
                  zIndex: -1,
                  animation: "pulseMoonlight 4s ease-in-out infinite",
                }}
              />

              {/* Moon base with gradient */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 70% 30%, #E8E8E8 0%, #D3D3D3 40%, #C0C0C0 100%)",
                  boxShadow:
                    "inset 20px 20px 40px rgba(0, 0, 0, 0.2), 0 0 60px rgba(200, 200, 255, 0.4), 0 0 120px rgba(150, 150, 220, 0.3)",
                  zIndex: 1,
                }}
              />
              {/* Realistic Moon Craters with shadows and highlights */}
              {/* Large crater */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "18px",
                  height: "18px",
                  left: "55%",
                  top: "38%",
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(200, 200, 200, 0.3) 0%, rgba(140, 140, 140, 0.5) 40%, rgba(100, 100, 100, 0.6) 70%, transparent 100%)",
                  boxShadow:
                    "inset 2px 2px 4px rgba(0, 0, 0, 0.4), inset -1px -1px 2px rgba(255, 255, 255, 0.2)",
                  zIndex: 2,
                }}
              />
              {/* Medium crater 1 */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "12px",
                  height: "12px",
                  left: "72%",
                  top: "48%",
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(190, 190, 190, 0.25) 0%, rgba(130, 130, 130, 0.45) 50%, rgba(90, 90, 90, 0.55) 80%, transparent 100%)",
                  boxShadow:
                    "inset 1.5px 1.5px 3px rgba(0, 0, 0, 0.35), inset -1px -1px 1.5px rgba(255, 255, 255, 0.15)",
                  zIndex: 2,
                }}
              />
              {/* Medium crater 2 */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "14px",
                  height: "14px",
                  left: "78%",
                  top: "32%",
                  background:
                    "radial-gradient(circle at 25% 25%, rgba(195, 195, 195, 0.28) 0%, rgba(135, 135, 135, 0.48) 45%, rgba(95, 95, 95, 0.58) 75%, transparent 100%)",
                  boxShadow:
                    "inset 1.8px 1.8px 3.5px rgba(0, 0, 0, 0.38), inset -1px -1px 2px rgba(255, 255, 255, 0.18)",
                  zIndex: 2,
                }}
              />
              {/* Small crater 1 */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "8px",
                  height: "8px",
                  left: "65%",
                  top: "52%",
                  background:
                    "radial-gradient(circle at 40% 40%, rgba(185, 185, 185, 0.2) 0%, rgba(125, 125, 125, 0.4) 55%, rgba(85, 85, 85, 0.5) 85%, transparent 100%)",
                  boxShadow:
                    "inset 1px 1px 2px rgba(0, 0, 0, 0.3), inset -0.5px -0.5px 1px rgba(255, 255, 255, 0.12)",
                  zIndex: 2,
                }}
              />
              {/* Small crater 2 */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "6px",
                  height: "6px",
                  left: "68%",
                  top: "28%",
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(180, 180, 180, 0.18) 0%, rgba(120, 120, 120, 0.38) 60%, rgba(80, 80, 80, 0.48) 90%, transparent 100%)",
                  boxShadow:
                    "inset 0.8px 0.8px 1.5px rgba(0, 0, 0, 0.28), inset -0.4px -0.4px 0.8px rgba(255, 255, 255, 0.1)",
                  zIndex: 2,
                }}
              />
              {/* Small crater 3 */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "7px",
                  height: "7px",
                  left: "82%",
                  top: "58%",
                  background:
                    "radial-gradient(circle at 38% 38%, rgba(182, 182, 182, 0.19) 0%, rgba(122, 122, 122, 0.39) 58%, rgba(82, 82, 82, 0.49) 88%, transparent 100%)",
                  boxShadow:
                    "inset 0.9px 0.9px 1.8px rgba(0, 0, 0, 0.29), inset -0.45px -0.45px 0.9px rgba(255, 255, 255, 0.11)",
                  zIndex: 2,
                }}
              />
              {/* Tiny craters */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "4px",
                  height: "4px",
                  left: "62%",
                  top: "45%",
                  background:
                    "radial-gradient(circle, rgba(175, 175, 175, 0.15) 0%, rgba(115, 115, 115, 0.35) 65%, transparent 100%)",
                  boxShadow: "inset 0.5px 0.5px 1px rgba(0, 0, 0, 0.25)",
                  zIndex: 2,
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: "3px",
                  height: "3px",
                  left: "70%",
                  top: "42%",
                  background:
                    "radial-gradient(circle, rgba(173, 173, 173, 0.14) 0%, rgba(113, 113, 113, 0.34) 70%, transparent 100%)",
                  boxShadow: "inset 0.4px 0.4px 0.8px rgba(0, 0, 0, 0.23)",
                  zIndex: 2,
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: "5px",
                  height: "5px",
                  left: "75%",
                  top: "40%",
                  background:
                    "radial-gradient(circle, rgba(177, 177, 177, 0.16) 0%, rgba(117, 117, 117, 0.36) 62%, transparent 100%)",
                  boxShadow: "inset 0.6px 0.6px 1.2px rgba(0, 0, 0, 0.26)",
                  zIndex: 2,
                }}
              />
              {/* Moon shadow side */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, transparent 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.3) 100%)",
                  zIndex: 2,
                }}
              />
              {/* Subtle glow animation */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.25) 0%, transparent 70%)",
                  zIndex: 3,
                }}
              />
            </>
          )}
        </motion.div>
      </motion.button>

      {/* Theme Transition Effect - Smooth ripple reveal */}
      {isRippling && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 9999, // Above everything
            clipPath:
              waveProgress >= 1
                ? `circle(${maxRadius * 1.1}px at ${rippleOrigin.x}px ${
                    rippleOrigin.y
                  }px)`
                : `circle(${rippleRadius}px at ${rippleOrigin.x}px ${rippleOrigin.y}px)`,
            backgroundColor: transitioningToDark ? "#0a0a0a" : "#ffffff",
            transition:
              waveProgress >= 1
                ? "opacity 0.2s ease-out"
                : "clip-path 0.016s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: waveProgress >= 1 ? "opacity" : "clip-path",
            mixBlendMode: "difference", // Inverts colors - keeps content visible while changing theme
            // Keep fully opaque until animation completes, then fade out
            opacity: waveProgress >= 1 ? 0 : 1,
          }}
        />
      )}
    </>
  );
}
