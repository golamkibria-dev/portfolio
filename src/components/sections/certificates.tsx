"use client";

import { motion } from "framer-motion";
import { Award, Download } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CERTIFICATES } from "@/lib/data";

export function Certificates() {
  return (
    <section id="certificates" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="Credentials" title="Certificates & training" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className="group h-full overflow-hidden transition-colors hover:border-primary/40">
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-accent/15 via-primary/10 to-accent-2/15">
                  <Award className="h-10 w-10 text-primary/60 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-heading text-sm font-semibold leading-snug">{cert.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{cert.issuer} · {cert.year}</p>
                  <Button asChild size="sm" variant="secondary" className="mt-3 w-full">
                    <a href={cert.file} download aria-label={`Download ${cert.title} certificate`}>
                      <Download className="h-3.5 w-3.5" /> Download
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
