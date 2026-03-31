"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Weight 1 = largest/most important, 6 = smallest
// Order is hand-crafted to distribute sizes evenly across rows when flex-wrapped
const CLOUD = [
  { label: "tidyverse",        weight: 6 },
  { label: "SQL",              weight: 3 },
  { label: "Docker",           weight: 4 },
  { label: "Python",           weight: 2 },
  { label: "ETL",              weight: 5 },
  { label: "FastAPI",          weight: 3 },
  { label: "matplotlib",       weight: 5 },
  { label: "Machine Learning", weight: 1 },
  { label: "Git",              weight: 5 },
  { label: "TypeScript",       weight: 2 },
  { label: "XGBoost",          weight: 5 },
  { label: "PyTorch",          weight: 3 },
  { label: "pandas",           weight: 4 },
  { label: "scikit-learn",     weight: 3 },
  { label: "R",                weight: 5 },
  { label: "React",            weight: 3 },
  { label: "Data Science",     weight: 2 },
  { label: "TensorFlow",       weight: 4 },
  { label: "Node.js",          weight: 4 },
  { label: "AWS",              weight: 5 },
  { label: "PostgreSQL",       weight: 4 },
  { label: "NumPy",            weight: 4 },
  { label: "Next.js",          weight: 4 },
  { label: "GitHub Actions",   weight: 6 },
  { label: "C++",              weight: 5 },
  { label: "Flask",            weight: 5 },
  { label: "Tableau",          weight: 6 },
  { label: "Jupyter",          weight: 6 },
] as const;

type W = (typeof CLOUD)[number]["weight"];

const STYLE: Record<W, { fontSize: string; fontWeight: number; color: string }> = {
  1: { fontSize: "3.25rem", fontWeight: 800, color: "rgba(241,245,249,0.98)" },
  2: { fontSize: "1.85rem", fontWeight: 700, color: "rgba(147,197,253,0.90)" },
  3: { fontSize: "1.2rem",  fontWeight: 600, color: "rgba(96,165,250,0.80)" },
  4: { fontSize: "0.95rem", fontWeight: 500, color: "rgba(59,130,246,0.68)" },
  5: { fontSize: "0.8rem",  fontWeight: 400, color: "rgba(71,107,160,0.56)" },
  6: { fontSize: "0.7rem",  fontWeight: 400, color: "rgba(51,80,130,0.42)" },
};

export default function Skills() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="skills" className="px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs font-mono tracking-widest uppercase mb-3"
          style={{ color: "rgba(59,130,246,0.7)" }}
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Stack
        </motion.p>

        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-14"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          What I work with.
        </motion.h2>

        {/* Word cloud */}
        <div
          className="flex flex-wrap justify-center items-center gap-x-7 gap-y-4 max-w-3xl mx-auto"
          style={{
            maskImage:
              "radial-gradient(ellipse 90% 85% at 50% 50%, black 40%, transparent 100%)",
          }}
        >
          {CLOUD.map((word, i) => (
            <motion.span
              key={word.label}
              style={{
                ...STYLE[word.weight],
                lineHeight: 1.1,
                cursor: "default",
                transition: "color 0.2s ease, transform 0.2s ease",
              }}
              initial={shouldReduce ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.025 }}
              whileHover={
                !shouldReduce
                  ? {
                      color: "rgba(147,197,253,1)",
                      scale: 1.08,
                      transition: { duration: 0.15 },
                    }
                  : {}
              }
            >
              {word.label}
            </motion.span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
