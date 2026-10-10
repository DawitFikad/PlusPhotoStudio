"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface CinematicScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function CinematicScrollReveal({
  children,
  delay = 0,
  duration = 0.85,
  direction = "up",
  distance = 35,
  className = "",
  threshold = 0.15,
  once = true,
}: CinematicScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "none":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "none":
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Luxury cubic-bezier deceleration
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial Card with luxury hover interactions
 */
export function CinematicCard({
  children,
  className = "",
  hoverBorder = true,
}: {
  children: ReactNode;
  className?: string;
  hoverBorder?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
      className={`group relative overflow-hidden rounded-sm border border-[#D9C7B2]/15 bg-[#191817] transition-all duration-500 ${
        hoverBorder ? "hover:border-[#B96F52]/60 hover:shadow-xl hover:shadow-black/50" : ""
      } ${className}`}
    >
      {/* Subtle border illumination gradient on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-[#B96F52]/10 via-transparent to-[#D9C7B2]/5" />
      {children}
    </motion.div>
  );
}

/**
 * Subtle 35mm film grain texture for cinematic depth
 */
export function FilmGrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99] opacity-[0.025] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

