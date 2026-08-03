"use client";
import { TypingText } from "@/components/common/typing-text";
import { ParticleField } from "@/components/three/particle-field";
import { Button } from "@/components/ui/button";
import { SITE, TYPING_ROLES } from "@/lib/data";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <ParticleField />

      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-accent/25 blur-[100px] animate-float" />
        <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-accent-2/20 blur-[120px] animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[linear-gradient(to_right,hsl(var(--border-subtle))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border-subtle))_1px,transparent_1px)] bg-[size:56px_56px] opacity-30 grid-fade-mask" />
      </div>

      <div className="section-container">
        <motion.div variants={container} initial="hidden" animate="show" className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div variants={item} className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {SITE.availability}
          </motion.div>

          <motion.h1 variants={item} className="text-balance text-4xl font-semibold leading-[1.08] sm:text-6xl md:text-7xl">
            Building products that feel
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient">as good as they perform.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 min-h-8 font-mono text-base text-muted-foreground sm:text-lg">
            I&apos;m a <TypingText words={TYPING_ROLES} className="font-semibold text-foreground" />
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-2xl text-balance text-muted-foreground sm:text-lg">
            Hi, I&apos;m {SITE.name} — I design and ship full-stack web applications, applied AI systems, and automation
            that move fast, scale well, and hold up under real usage.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link href="#contact">
                Hire Me
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          <motion.div variants={item} className="relative mt-16 sm:mt-20">
  <div className="absolute inset-0 -z-10 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
  <div className="glass-strong relative h-32 w-32 overflow-hidden rounded-full p-1.5 shadow-2xl sm:h-40 sm:w-40">
    <Image
      src="/profile.jpg"
      alt="Golam Kibria"
      fill
      priority
      sizes="120px"
      className="rounded-full object-cover"
    />
  </div>
</motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="h-9 w-5 rounded-full border border-border p-1">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
