"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, GraduationCap, Trophy, Users } from "lucide-react";
import { personalInfo } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";

const FACTS = [
  { icon: GraduationCap, label: "B.S. Data Science, UC Irvine · GPA 3.7 · Dean's Honor List 5×" },
  { icon: MapPin,         label: personalInfo.location },
  { icon: Users,          label: "VP @ Data@UCI · organized a 250-person Datathon" },
  { icon: Trophy,         label: "Open to research, internships & interesting problems" },
];

export default function About() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="about" className="px-6" lifted>
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs font-mono tracking-widest uppercase mb-3"
          style={{ color: "rgba(59,130,246,0.7)" }}
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div>
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
              style={{ color: "var(--text)" }}
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Who I am.
            </motion.h2>

            <motion.p
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--muted)" }}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* Quick facts */}
            <ul className="space-y-3">
              {FACTS.map(({ icon: Icon, label }, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--muted)" }}
                  initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <Icon
                    size={15}
                    style={{ color: "var(--blue-accent)", flexShrink: 0 }}
                  />
                  {label}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Avatar column */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Avatar circle */}
              <div
                className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden"
                style={{
                  border: "2px solid rgba(59,130,246,0.4)",
                  boxShadow:
                    "0 0 0 4px rgba(59,130,246,0.08), 0 0 40px rgba(59,130,246,0.25)",
                }}
              >
                <Image
                  src="/headshot.jpg"
                  alt={personalInfo.name}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  sizes="(max-width: 640px) 224px, 256px"
                  priority
                />
              </div>

              {/* Decorative dot grid behind card */}
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(59,130,246,0.25) 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                  zIndex: -1,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
