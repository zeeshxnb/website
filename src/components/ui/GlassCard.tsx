"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
}: GlassCardProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={`glass rounded-xl p-6 gradient-border ${className}`}
      initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay }}
      whileHover={
        hover && !shouldReduce
          ? {
              y: -4,
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,0.18)",
                "0 24px 80px rgba(59,130,246,0.35)",
                "0 8px 32px rgba(0,0,0,0.6)",
                "0 1px 2px rgba(0,0,0,0.3)",
              ].join(", "),
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
}
