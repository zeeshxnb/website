"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  as: Tag = "span",
}: AnimatedTextProps) {
  const shouldReduce = useReducedMotion();
  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariant: Variants = {
    hidden: shouldReduce ? {} : { opacity: 0, y: 20 },
    visible: shouldReduce
      ? {}
      : { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.span
      className={`inline ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em] last:mr-0"
          variants={wordVariant}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
