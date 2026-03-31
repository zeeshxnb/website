"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, personalInfo } from "@/lib/data";
import type { Project } from "@/lib/types";
import SectionWrapper from "@/components/ui/SectionWrapper";

const GitHubIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

function BentoCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="group relative flex flex-col rounded-2xl overflow-hidden glass gradient-border"
      initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={!shouldReduce ? { y: -5 } : {}}
      style={{
        height: "100%",
        background: featured
          ? "linear-gradient(135deg, rgba(14,18,40,0.8) 0%, rgba(10,14,30,0.75) 100%)"
          : undefined,
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-px w-full flex-shrink-0"
        style={{
          background: featured
            ? "linear-gradient(90deg, var(--blue-accent), var(--blue-hi) 60%, transparent)"
            : "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)",
        }}
      />

      {/* Featured glow tint */}
      {featured && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 10% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Hover background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.13) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col flex-1 p-6">
        {/* Title + links row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="font-semibold leading-tight"
            style={{
              color: "var(--text)",
              fontSize: featured ? "1.15rem" : "1rem",
            }}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
                }
              >
                <GitHubIcon size={15} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live site"
                className="transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--blue-accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
                }
              >
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1 mb-4"
          style={{ color: "var(--muted)" }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded-md"
              style={{
                color: "rgba(147,197,253,0.75)",
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.15)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="projects" className="px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <motion.p
              className="text-xs font-mono tracking-widest uppercase mb-3"
              style={{ color: "rgba(59,130,246,0.7)" }}
              initial={shouldReduce ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Selected work
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl font-bold"
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              Things I&apos;ve built.
            </motion.h2>
          </div>
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono flex items-center gap-1 transition-colors duration-200 flex-shrink-0"
            style={{ color: "var(--muted)" }}
            initial={shouldReduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
            }
          >
            All projects <ArrowUpRight size={11} />
          </motion.a>
        </div>

        {/* Equal grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project, i) => (
            <div key={project.id} style={{ minHeight: "16rem" }}>
              <BentoCard project={project} index={i} featured={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
