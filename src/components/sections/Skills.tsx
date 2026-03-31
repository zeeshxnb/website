"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Flatten all skills into one array for the marquee, with category prefix
const allSkills = skillCategories.flatMap((cat) =>
  cat.skills.map((s) => ({ label: s, category: cat.name }))
);

// Duplicate for seamless loop
const marqueeItems = [...allSkills, ...allSkills];

function MarqueeTrack({
  items,
  reverse = false,
  speed = 40,
}: {
  items: typeof marqueeItems;
  reverse?: boolean;
  speed?: number;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
      <motion.div
        className="flex gap-6 w-max"
        animate={
          shouldReduce
            ? {}
            : { x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }
        }
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <span
              className="text-xs font-mono"
              style={{ color: "rgba(59,130,246,0.45)" }}
            >
              {item.category.toUpperCase()}
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              {item.label}
            </span>
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: "rgba(59,130,246,0.65)" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const shouldReduce = useReducedMotion();

  // Split into two rows for visual interest
  const half = Math.ceil(marqueeItems.length / 2);
  const row1 = marqueeItems.slice(0, half);
  const row2 = marqueeItems.slice(half);

  return (
    <SectionWrapper id="skills" className="px-0">
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-10">
        <motion.h2
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "rgba(59,130,246,0.7)" }}
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Stack
        </motion.h2>
      </div>

      <div className="space-y-5">
        <MarqueeTrack items={[...allSkills, ...allSkills]} speed={45} />
        <MarqueeTrack
          items={[...allSkills.slice().reverse(), ...allSkills.slice().reverse()]}
          reverse={true}
          speed={55}
        />
      </div>
    </SectionWrapper>
  );
}
