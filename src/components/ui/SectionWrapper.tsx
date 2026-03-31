"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  lifted?: boolean;
}

export default function SectionWrapper({
  children,
  className = "",
  id,
  delay = 0,
  lifted = false,
}: SectionWrapperProps) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section ${lifted ? "section-lifted" : ""} ${className}`}
      initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.section>
  );
}
