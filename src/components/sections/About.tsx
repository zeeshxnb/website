"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MapPin, GraduationCap, Trophy, Activity, UtensilsCrossed, Dumbbell, Camera, ChefHat, X } from "lucide-react";
import { personalInfo, books } from "@/lib/data";
import type { Book } from "@/lib/types";
import SectionWrapper from "@/components/ui/SectionWrapper";

const FACTS = [
  { icon: GraduationCap, label: "B.S. Data Science, UC Irvine" },
  { icon: GraduationCap, label: "GPA 3.7 · Dean's Honor List 5×" },
  { icon: MapPin,         label: personalInfo.location },
  { icon: Trophy,         label: "Open to research, internships & interesting problems" },
];

const INTERESTS = [
  {
    label: "Running",
    icon: Activity,
    color: "#3b82f6",
    image: "/interests/running.jpg",
    blurb: "My most recently picked up hobby. I started in summer of 2025 and ran my first half marathon in November on Catalina Island. I want to work my way up to competing in an Ironman in 2030.",
  },
  {
    label: "Photography",
    icon: Camera,
    color: "#a78bfa",
    image: "/interests/photography.jpg",
    blurb: "I try to take photos whenever I can and I'm still finding a niche that I like. Here is the best photo I have taken so far (and probably will for a while).",
  },
  {
    label: "Basketball",
    icon: Dumbbell,
    color: "#f97316",
    image: "/interests/basketball.jpg",
    objectPosition: "50% 25%",
    blurb: "I've been playing basketball ever since my dad got me a mini hoop at the age of 4. I don't have any cool photos of me playing, so here's one of when I met Charles Barkley in a Target.",
  },
  {
    label: "Food",
    icon: UtensilsCrossed,
    color: "#f59e0b",
    image: "/interests/food.jpg",
    objectPosition: "50% 65%",
    blurb: "I just really like food.",
  },
  {
    label: "Cooking",
    icon: ChefHat,
    color: "#10b981",
    image: "/interests/cooking.jpg",
    blurb: "I can cook too!",
  },
];

const BOOK_COLORS = [
  "rgba(59,130,246,0.9)",
  "rgba(139,92,246,0.9)",
  "rgba(16,185,129,0.9)",
  "rgba(245,158,11,0.9)",
  "rgba(236,72,153,0.9)",
  "rgba(99,102,241,0.9)",
  "rgba(20,184,166,0.9)",
  "rgba(249,115,22,0.9)",
];

const COVER_CACHE_KEY = "book-covers-v1";

function getCoverCache(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(COVER_CACHE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function setCoverCache(key: string, url: string) {
  try {
    const cache = getCoverCache();
    cache[key] = url;
    localStorage.setItem(COVER_CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

function BookCard({ book, index }: { book: Book; index: number }) {
  const cacheKey = `${book.title}__${book.author}`;
  const [src, setSrc] = useState<string | null>(() => {
    if (book.coverUrl) return book.coverUrl;
    if (book.isbn) return `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;
    if (typeof window !== "undefined") {
      const cached = getCoverCache()[cacheKey];
      if (cached) return cached;
    }
    return null;
  });
  const [imgVisible, setImgVisible] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const color = BOOK_COLORS[index % BOOK_COLORS.length];

  useEffect(() => {
    if (book.coverUrl) return;
    if (book.isbn) return;
    if (src) return; // already have a cached URL
    const author = book.author.split(" & ")[0];
    fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(author)}&limit=1&fields=cover_i`
    )
      .then(r => r.json())
      .then(d => {
        const id = d.docs?.[0]?.cover_i;
        if (id) {
          const url = `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
          setSrc(url);
          setCoverCache(cacheKey, url);
        }
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="group relative flex-shrink-0 rounded-lg overflow-hidden select-none"
      style={{ width: "120px", height: "180px" }}
    >
      {/* Fallback card — fades out once cover loads */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-500"
        style={{
          opacity: imgVisible ? 0 : 1,
          background: `linear-gradient(160deg, ${color.replace("0.9", "0.18")} 0%, rgba(255,255,255,0.03) 100%)`,
          borderLeft: `3px solid ${color}`,
        }}
      >
        <p className="text-xs font-semibold leading-snug mb-1" style={{ color: "rgba(241,245,249,0.9)" }}>
          {book.title}
        </p>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          {book.author}
        </p>
      </div>

      {/* Cover image — fades in on load */}
      {src && !imgFailed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={book.title}
          onLoad={() => setImgVisible(true)}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: imgVisible ? 1 : 0 }}
        />
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)" }}
      >
        <p className="text-xs font-semibold leading-snug mb-0.5 text-white">{book.title}</p>
        <p className="text-xs" style={{ color: "var(--muted)" }}>{book.author}</p>
      </div>
    </div>
  );
}

type InterestItem = typeof INTERESTS[number];

function InterestModal({ interest, onClose }: { interest: InterestItem; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);
  const Icon = interest.icon;

  useEffect(() => {
    setImgError(false);
  }, [interest]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md overflow-hidden rounded-2xl"
        style={{
          background: "rgba(8,11,22,0.98)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: `0 30px 60px rgba(0,0,0,0.85), 0 0 0 1px ${interest.color}20`,
        }}
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 12 }}
        transition={{ type: "spring", damping: 28, stiffness: 340 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="relative w-full" style={{ height: "260px" }}>
          {!imgError ? (
            <>
              <Image
                src={interest.image}
                alt={interest.label}
                fill
                style={{ objectFit: "cover", objectPosition: interest.objectPosition ?? "center" }}
                onError={() => setImgError(true)}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(8,11,22,0.98) 100%)" }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.08) 100%)" }}
            >
              <Icon size={52} style={{ color: `${interest.color}4d` }} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 pb-7 pt-4">
          <div className="flex items-center gap-2.5 mb-3">
            <Icon size={16} style={{ color: interest.color }} />
            <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>{interest.label}</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{interest.blurb}</p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:bg-white/10"
          style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.65)" }}
        >
          <X size={14} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const shouldReduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const doubled = [...books, ...books];
  const [activeInterest, setActiveInterest] = useState<InterestItem | null>(null);

  useEffect(() => {
    if (shouldReduce) return;
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    const step = () => {
      if (!pausedRef.current && el) {
        el.scrollLeft += 0.6;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [shouldReduce]);

  return (
    <>
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

          {/* Top grid: bio + avatar */}
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

              <ul className="space-y-3">
                {FACTS.map(({ icon: Icon, label }, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--muted)" }}
                    initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  >
                    <Icon size={15} style={{ color: "var(--blue-accent)", flexShrink: 0, marginTop: "2px" }} />
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
                <div
                  className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden"
                  style={{
                    border: "2px solid rgba(59,130,246,0.4)",
                    boxShadow: "0 0 0 4px rgba(59,130,246,0.08), 0 0 40px rgba(59,130,246,0.25)",
                  }}
                >
                  <Image
                    src="/headshot.jpg"
                    alt={personalInfo.name}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="(max-width: 640px) 224px, 256px"
                    priority
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.25) 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                    zIndex: -1,
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="mt-20 pt-16 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>

            {/* Outside the code */}
            <div className="flex items-baseline justify-between mb-5">
              <motion.h3
                className="text-xl font-semibold"
                style={{ color: "var(--text)" }}
                initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Outside the code
              </motion.h3>
              <motion.span
                className="text-xs font-mono"
                style={{ color: "var(--muted)" }}
                initial={shouldReduce ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                click to explore ↗
              </motion.span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-16">
              {INTERESTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={i}
                    onClick={() => setActiveInterest(item)}
                    className="relative flex flex-col items-center justify-center gap-3 py-6 px-3 rounded-2xl cursor-pointer group overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{
                      y: -4,
                      borderColor: `${item.color}55`,
                      background: `${item.color}0d`,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Radial glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                      style={{
                        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${item.color}1a 0%, transparent 70%)`,
                      }}
                    />

                    {/* Icon circle */}
                    <div
                      className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: `${item.color}18`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Icon size={19} style={{ color: item.color }} />
                    </div>

                    {/* Label */}
                    <span className="text-xs font-medium text-center leading-tight" style={{ color: "var(--text)" }}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Books */}
            <motion.h3
              className="text-xl font-semibold mb-6"
              style={{ color: "var(--text)" }}
              initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Books I&apos;ve read
            </motion.h3>

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-scroll"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
              onMouseEnter={() => { pausedRef.current = true; }}
              onMouseLeave={() => { pausedRef.current = false; }}
              onTouchStart={() => { pausedRef.current = true; }}
              onTouchEnd={() => { pausedRef.current = false; }}
            >
              {doubled.map((book, i) => (
                <BookCard key={i} book={book} index={i % books.length} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <AnimatePresence>
        {activeInterest && (
          <InterestModal interest={activeInterest} onClose={() => setActiveInterest(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
