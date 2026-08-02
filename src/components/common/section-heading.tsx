"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-14 flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="glass inline-flex items-center rounded-full px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-2xl text-balance text-3xl font-semibold sm:text-4xl md:text-5xl">{title}</h2>
      {description && (
        <p className={cn("max-w-xl text-balance text-muted-foreground", align === "center" ? "mx-auto" : "")}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
