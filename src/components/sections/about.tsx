"use client";

import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { ABOUT, ACHIEVEMENTS, EDUCATION, TIMELINE } from "@/lib/data";
import { motion } from "framer-motion";
import { Compass, GraduationCap, Target, Trophy } from "lucide-react";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="About" title="The engineer behind the interface" />

        <div className="grid gap-16 lg:grid-cols-5">
          {/* Story + mission/vision */}
          <div className="lg:col-span-2">
            <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mb-8 aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border border-border shadow-xl"
          >
            <Image
              src="/profile.jpg"
              alt="Golam Kibria at work"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover object-[center_15%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>
            <div className="space-y-5 text-muted-foreground">
              {ABOUT.story.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Card className="bg-surface-2/60">
                <CardContent className="p-5">
                  <Target className="mb-3 h-5 w-5 text-accent" />
                  <h3 className="font-heading text-sm font-semibold">Mission</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{ABOUT.mission}</p>
                </CardContent>
              </Card>
              <Card className="bg-surface-2/60">
                <CardContent className="p-5">
                  <Compass className="mb-3 h-5 w-5 text-accent" />
                  <h3 className="font-heading text-sm font-semibold">Vision</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{ABOUT.vision}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 flex items-center gap-2 font-heading text-sm font-semibold">
                <GraduationCap className="h-4 w-4 text-accent" /> Education
              </h3>
              {EDUCATION.map((e) => (
                <div key={e.degree} className="glass rounded-xl p-4">
                  <p className="font-medium">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">{e.institution} · {e.period}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((a) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-xl p-4"
                >
                  <Trophy className="mb-2 h-4 w-4 text-accent" />
                  <p className="font-heading text-sm font-semibold">{a.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interactive timeline */}
          <div className="lg:col-span-3">
            <ol className="relative ml-3 border-l border-border">
              {TIMELINE.map((t, i) => (
                <motion.li
                  key={t.title + t.year}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group mb-10 ml-8 last:mb-0"
                >
                  <span className="absolute -left-[7px] mt-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-brand ring-4 ring-background transition-transform group-hover:scale-125" />
                  <Card className="transition-colors group-hover:border-primary/40">
                    <CardContent className="p-5">
                      <span className="font-mono text-xs text-accent">{t.year}</span>
                      <h3 className="mt-1 font-heading text-lg font-semibold">{t.title}</h3>
                      <p className="text-sm text-muted-foreground">{t.org}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
                    </CardContent>
                  </Card>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
