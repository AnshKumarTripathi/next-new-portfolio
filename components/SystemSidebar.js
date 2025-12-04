"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/languageContext";

const Toggle = ({ label, isOn, onToggle, leftLabel, rightLabel }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground"
        style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
      >
        {label}
      </span>
      <div className="flex items-center gap-2">
        {leftLabel && (
          <span 
            className={`text-[10px] font-mono transition-colors duration-300 ${!isOn ? "text-[var(--accent)] font-bold" : "text-muted-foreground"}`}
            style={{ fontSize: "0.6rem" }}
          >
            {leftLabel}
          </span>
        )}
        <div
          className="w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out border border-[var(--border)]"
          style={{
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: isOn ? "flex-end" : "flex-start",
          }}
          onClick={onToggle}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-4 h-4 rounded-full shadow-sm"
            style={{
              backgroundColor: "var(--accent)",
            }}
          />
        </div>
        {rightLabel && (
          <span 
            className={`text-[10px] font-mono transition-colors duration-300 ${isOn ? "text-[var(--accent)] font-bold" : "text-muted-foreground"}`}
            style={{ fontSize: "0.6rem" }}
          >
            {rightLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default function SystemSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isSolarized = theme === 'solarized';

  const handleThemeToggle = () => {
    setTheme(isSolarized ? 'dark' : 'solarized');
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const isHindi = language === "hi";

  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="collapsed"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 z-50 hidden md:flex"
            onClick={() => setIsOpen(true)}
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(26, 26, 26, 0.8)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--border)",
              borderRight: "none",
              borderRadius: "8px 0 0 8px",
              padding: "1rem 0.5rem",
              cursor: "pointer",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Icon */}
            <div style={{ width: "16px", height: "16px" }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

              {/* Vertical Text */}
            <div
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--foreground)",
                letterSpacing: "0.15em",
                fontFamily: "monospace",
              }}
            >
              {t("sys")}
            </div>

            {/* Dots */}
            <div className="flex flex-col gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    backgroundColor: "var(--muted-foreground)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          /* Expanded Panel */
          <motion.div
            key="expanded"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 z-50 hidden md:flex"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 50,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(26, 26, 26, 0.8)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid var(--border)",
                borderRight: "none",
                borderRadius: "12px 0 0 12px",
                width: "200px",
                padding: "0",
                boxShadow: "-8px 0 24px rgba(0, 0, 0, 0.3)",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between"
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid var(--border)",
                  backgroundColor: "var(--muted)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "var(--muted-foreground)",
                    fontFamily: "monospace",
                  }}
                >
                  {t("modules")}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--muted-foreground)",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Toggles Content */}
              <div
                style={{
                  padding: "1.5rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  alignItems: "center",
                }}
              >
                {/* Theme Toggle */}
                <Toggle
                  label={t("theme")}
                  leftLabel="DARK"
                  rightLabel="SOLAR"
                  isOn={isSolarized}
                  onToggle={handleThemeToggle}
                />
                
                {/* Language Toggle */}
                <Toggle
                  label={t("lang")}
                  leftLabel="EN"
                  rightLabel="HI"
                  isOn={isHindi}
                  onToggle={handleLanguageToggle}
                />
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: "0.75rem",
                  textAlign: "center",
                  borderTop: "1px solid var(--border)",
                  backgroundColor: "var(--muted)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--muted-foreground)",
                    fontFamily: "monospace",
                    opacity: 0.7,
                  }}
                >
                  v.1.0.4
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay logic */}
      {isOpen && (
        <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
