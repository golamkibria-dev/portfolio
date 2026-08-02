"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { TIMELINE } from "@/lib/data";

export function Experience() {
  const roles = TIMELINE.filter((t) => t.title !== "B.Sc. Computer Science");

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="Experience" title="Where I've made an impact" />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border sm:left-1/2" />
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative mb-10 flex flex-col gap-4 pl-14 sm:pl-0 ${
                i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              <div className="absolute left-5 top-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-brand ring-4 ring-background sm:left-1/2">
                <Briefcase className="h-3 w-3 text-white" />
              </div>

              <div className="sm:w-1/2" />
              <div className={`glass rounded-xl p-5 sm:w-1/2 ${i % 2 === 0 ? "sm:pl-8" : "sm:pr-8"}`}>
                <span className="font-mono text-xs text-accent">{role.year}</span>
                <h3 className="mt-1 font-heading text-lg font-semibold">{role.title}</h3>
                <p className="text-sm font-medium text-muted-foreground">{role.org}</p>
                <p className="mt-2 text-sm text-muted-foreground">{role.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
