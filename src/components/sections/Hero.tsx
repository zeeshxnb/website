"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  const spotX = useSpring(rawX, { stiffness: 80, damping: 25 });
  const spotY = useSpring(rawY, { stiffness: 80, damping: 25 });
  const spotBg = useMotionTemplate`radial-gradient(480px circle at ${spotX}px ${spotY}px, rgba(59,130,246,0.13) 0%, rgba(99,102,241,0.05) 50%, transparent 80%)`;

  useEffect(() => {
    if (shouldReduce) return;
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, [shouldReduce, rawX, rawY]);

  const fadeUp = (delay: number) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col justify-end overflow-hidden px-6 md:px-12"
      style={{ minHeight: "100svh", paddingBottom: "5rem" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Cursor spotlight ── */}
      {!shouldReduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ background: spotBg }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* ── Corner gradient glow — radiates from top-right corner ── */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "100vw",
          height: "130vh",
          background:
            "radial-gradient(ellipse 85% 80% at 100% 0%, rgba(59,130,246,0.55) 0%, rgba(29,78,216,0.28) 45%, transparent 75%)",
          filter: "blur(50px)",
        }}
      />
      {/* Outer halo for depth */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "100vw",
          height: "145vh",
          background:
            "radial-gradient(ellipse 90% 85% at 100% 0%, rgba(147,197,253,0.14) 0%, transparent 68%)",
          filter: "blur(75px)",
        }}
      />

      {/* ── Content block (pushed to bottom) ── */}
      <div className="relative z-10 max-w-6xl w-full">
        {/* Meta row — status only on right */}
        <motion.div
          className="flex items-center justify-end mb-10 md:mb-14"
          {...fadeUp(0.1)}
        >
          <span
            className="text-xs font-mono text-right"
            style={{ color: "var(--muted)" }}
          >
            {personalInfo.status}
          </span>
        </motion.div>

        {/* Location — above name */}
        <motion.div
          className="mb-4"
          {...fadeUp(0.2)}
        >
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "rgba(59,130,246,0.7)" }}
          >
            {personalInfo.location}
          </span>
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-bold leading-[0.88] tracking-tight"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              color: "var(--text)",
            }}
            initial={shouldReduce ? {} : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {personalInfo.name}
          </motion.h1>
        </div>

        {/* Rule */}
        <motion.div
          className="w-full h-px mb-8"
          style={{ background: "rgba(255,255,255,0.08)" }}
          initial={shouldReduce ? {} : { scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Tagline + links */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          {...fadeUp(0.8)}
        >
          <p
            className="text-base sm:text-lg max-w-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {personalInfo.tagline}
          </p>

          <div className="flex items-center gap-6 flex-shrink-0">
            <a
              href="#projects"
              className="group flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--text)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--blue-accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text)")
              }
            >
              View work
              <ArrowDownRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
              }
            >
              Contact
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <div
          className="w-px h-12 mx-auto origin-top"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))",
            animation: "scroll-bounce 2.5s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
