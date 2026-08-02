"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon as Github } from "@/components/common/brand-icons";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { PROJECT_CATEGORIES, PROJECTS, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
        <button onClick={() => onOpen(project)} className="block w-full text-left" aria-label={`View case study for ${project.title}`}>
          <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <CardContent className="p-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
              <Badge variant="secondary">{project.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((t) => (
                <span key={t} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </CardContent>
        </button>
        <div className="flex items-center gap-2 border-t border-border p-3">
          {project.github && (
            <Button asChild size="sm" variant="ghost" className="flex-1">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5" /> Code
              </a>
            </Button>
          )}
          {project.demo && (
            <Button asChild size="sm" variant="ghost" className="flex-1">
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" /> Live Demo
              </a>
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof PROJECT_CATEGORIES)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Work"
          title="Featured projects"
          description="Selected case studies across web platforms, applied AI, and automation."
        />

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filter === cat
                  ? "border-transparent bg-gradient-brand text-white"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} onOpen={setActive} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Case study dialog */}
      <Dialog.Root open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[151] max-h-[85vh] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto glass-strong rounded-2xl p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-8">
            {active && (
              <>
                <VisuallyHidden.Root>
                  <Dialog.Description>Case study details for {active.title}</Dialog.Description>
                </VisuallyHidden.Root>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <Dialog.Title className="font-heading text-2xl font-semibold">{active.title}</Dialog.Title>
                    <Badge variant="secondary" className="mt-2">{active.category}</Badge>
                  </div>
                  <Dialog.Close className="rounded-full p-1.5 hover:bg-surface-2" aria-label="Close">
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                </div>

                <p className="text-muted-foreground">{active.description}</p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {active.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl bg-surface-2 p-4 text-center">
                      <p className="font-heading text-xl font-semibold text-gradient">{m.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  {active.github && (
                    <Button asChild variant="secondary">
                      <a href={active.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" /> View Code
                      </a>
                    </Button>
                  )}
                  {active.demo && (
                    <Button asChild>
                      <a href={active.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
