"use client";

import { motion } from "framer-motion";
import { GitCommitHorizontal, GitPullRequest, Star, Users } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const STATS = [
  { label: "Contributions this year", value: "1,842", icon: GitCommitHorizontal },
  { label: "Pull requests merged", value: "312", icon: GitPullRequest },
  { label: "Stars earned", value: "5.1k", icon: Star },
  { label: "Followers", value: "980", icon: Users },
];

// 52-week contribution grid, intensity-weighted placeholder data.
const WEEKS = 52;
const DAYS = 7;
const contributionSeed = Array.from({ length: WEEKS * DAYS }, (_, i) => {
  const rand = Math.sin(i * 12.9898) * 43758.5453;
  return Math.floor(Math.abs(rand % 1) * 5); // 0-4 intensity
});

export function GithubStats() {
  return (
    <section id="github" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="Open Source" title="GitHub activity" description="A snapshot of ongoing contributions and coding activity." />

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="text-center">
                <CardContent className="p-5">
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-accent" />
                  <p className="font-heading text-2xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardContent className="overflow-x-auto p-6">
            <div className="grid min-w-[640px] grid-flow-col grid-rows-7 gap-1" role="img" aria-label="GitHub contribution graph, illustrative placeholder">
              {contributionSeed.map((intensity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: (i % WEEKS) * 0.006 }}
                  className="h-3 w-3 rounded-[2px]"
                  style={{
                    backgroundColor:
                      intensity === 0
                        ? "hsl(var(--surface-2))"
                        : `hsl(var(--primary) / ${0.2 + intensity * 0.2})`,
                  }}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              Less
              {[0, 1, 2, 3, 4].map((v) => (
                <span
                  key={v}
                  className="h-3 w-3 rounded-[2px]"
                  style={{ backgroundColor: v === 0 ? "hsl(var(--surface-2))" : `hsl(var(--primary) / ${0.2 + v * 0.2})` }}
                />
              ))}
              More
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
