"use client";

import { motion } from "framer-motion";
import { Code2, Sparkles, Workflow, Palette, Compass, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/data";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "code-2": Code2,
  sparkles: Sparkles,
  workflow: Workflow,
  palette: Palette,
  compass: Compass,
};

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="Services" title="How I can help" description="From a single feature to a full product build." />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Code2;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Card className="group relative h-full overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/40">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="flex items-center gap-1.5 font-heading text-lg font-semibold">
                      {s.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
