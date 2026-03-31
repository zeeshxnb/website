"use client";

import { useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { GraduationCap, Briefcase, FolderOpen, Star, ChevronDown } from "lucide-react";
import { timelineEvents } from "@/lib/data";
import type { TimelineEvent } from "@/lib/types";
import SectionWrapper from "@/components/ui/SectionWrapper";

const TYPE_CONFIG = {
  education:   { icon: GraduationCap, color: "#3b82f6", label: "education" },
  work:        { icon: Briefcase,      color: "#10b981", label: "work" },
  project:     { icon: FolderOpen,     color: "#a78bfa", label: "project" },
  achievement: { icon: Star,           color: "#f59e0b", label: "leadership" },
};

function TimelineEntry({
  event,
  index,
  isLeft,
}: {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [hovering, setHovering] = useState(false);
  const shouldReduce = useReducedMotion();
  const { icon: Icon, color, label: typeLabel } = TYPE_CONFIG[event.type];

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      className={`relative flex items-start gap-4 md:gap-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial={shouldReduce ? {} : { opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Card — desktop: half-width each side */}
      <div
        className={`w-full md:w-[calc(50%-2rem)] ${
          isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
        }`}
      >
        <button
          className="relative w-full text-left rounded-xl p-5 glass transition-all duration-300 cursor-pointer group"
          onClick={() => setExpanded((v) => !v)}
          onMouseMove={!shouldReduce ? handleMouseMove : undefined}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          aria-expanded={expanded}
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              opacity: hovering ? 1 : 0,
              transition: "opacity 0.4s ease",
              background: `radial-gradient(ellipse 90% 60% at 50% 20%, ${color}18 0%, transparent 70%)`,
            }}
          />

          {/* Cursor-tracking spotlight border */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              opacity: hovering ? 1 : 0,
              transition: "opacity 0.3s ease",
              padding: "1px",
              background: `radial-gradient(200px circle at ${mouse.x}px ${mouse.y}px, ${color} 0%, ${color}88 40%, transparent 68%)`,
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          <div
            className={`flex items-start gap-3 ${
              isLeft ? "md:flex-row-reverse md:text-right" : ""
            }`}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${color}18`, border: `1px solid ${color}40` }}
            >
              <Icon size={15} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-2 mb-1 ${
                  isLeft ? "md:justify-end" : ""
                }`}
              >
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--muted)" }}
                >
                  {event.year}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${color}15`,
                    color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  {typeLabel}
                </span>
              </div>
              <h3 className="font-semibold text-sm mb-0.5" style={{ color: "var(--text)" }}>
                {event.title}
              </h3>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {event.organization}
              </p>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                {event.summary}
              </p>
            </div>

            {/* Expand chevron */}
            <motion.div
              className="flex-shrink-0 self-center"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} style={{ color: "var(--muted)" }} />
            </motion.div>
          </div>

          {/* Expanded details */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div
                  className="mt-4 pt-4 text-xs leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  {event.details}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Center dot — hidden on mobile (dot shown on left side) */}
      <div className="hidden md:flex absolute left-1/2 top-5 -translate-x-1/2 items-center justify-center z-10">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}`,
            border: "2px solid var(--bg)",
          }}
        />
      </div>

      {/* Mobile: left dot */}
      <div
        className="md:hidden flex-shrink-0 w-3 h-3 rounded-full mt-5"
        style={{
          background: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
    </motion.div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  return (
    <SectionWrapper id="timeline" className="px-6" lifted>
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs font-mono tracking-widest uppercase mb-3"
          style={{ color: "rgba(59,130,246,0.7)" }}
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.p>

        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How I got here.
        </motion.h2>

        <motion.p
          className="text-sm mb-16 max-w-md"
          style={{ color: "var(--muted)" }}
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Click any card to read more.
        </motion.p>

        {/* Timeline entries */}
        <div ref={containerRef} className="relative">
          {/* Animated center line — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px overflow-hidden"
            style={{ background: "var(--border)" }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top"
              style={{
                scaleY: shouldReduce ? 1 : scaleY,
                height: "100%",
                background: "linear-gradient(to bottom, var(--blue-accent), var(--blue-mid))",
              }}
            />
          </div>

          {/* Mobile left line */}
          <div
            className="md:hidden absolute left-1.5 top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
          />

          <div className="space-y-10 md:space-y-12">
            {timelineEvents.map((event, i) => (
              <TimelineEntry
                key={event.id}
                event={event}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
