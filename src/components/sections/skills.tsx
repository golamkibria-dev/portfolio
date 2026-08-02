"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DEV_TOOLS, SKILLS } from "@/lib/data";

function ProficiencyBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="font-mono text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full bg-gradient-brand"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="Skills" title="Tools I use to ship" description="A snapshot of core technical proficiency across the stack." />

        <Tabs defaultValue={SKILLS[0]!.category} className="flex flex-col items-center">
          <TabsList className="flex-wrap h-auto gap-1">
            {SKILLS.map((s) => (
              <TabsTrigger key={s.category} value={s.category}>{s.category}</TabsTrigger>
            ))}
          </TabsList>

          {SKILLS.map((s) => (
            <TabsContent key={s.category} value={s.category} className="w-full max-w-3xl">
              <Card>
                <CardContent className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                  {s.skills.map((skill, i) => (
                    <ProficiencyBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
                  ))}
                </CardContent>
              </Card>
              <p className="mt-4 text-center text-sm text-muted-foreground">{s.description}</p>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <h3 className="mb-5 font-heading text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Daily tools
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {DEV_TOOLS.map((tool) => (
              <span key={tool} className="glass rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
