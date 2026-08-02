"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/common/brand-icons";
import { SectionHeading } from "@/components/common/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SITE, SOCIAL_LINKS } from "@/lib/data";

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Please add a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  company: z.string().max(0).optional(), // honeypot
});
type ContactValues = z.infer<typeof ContactSchema>;

const ICONS = { github: GithubIcon, linkedin: LinkedinIcon, twitter: XIcon, mail: Mail };

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({ resolver: zodResolver(ContactSchema) });

  const onSubmit = async (values: ContactValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      toast({ title: "Message sent", description: "Thanks for reaching out — I'll reply within 1-2 business days.", variant: "success" });
      reset();
    } catch (err) {
      toast({
        title: "Couldn't send message",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-container grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Contact" title="Let's build something great" align="left" className="mb-8" />
          <p className="text-muted-foreground">
            Have a project in mind, or just want to talk shop? My inbox is open — I read and respond to every message.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <span className="glass flex h-10 w-10 items-center justify-center rounded-full"><Mail className="h-4 w-4 text-accent" /></span>
              <a href={`mailto:${SITE.email}`} className="hover:text-primary">{SITE.email}</a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="glass flex h-10 w-10 items-center justify-center rounded-full"><MapPin className="h-4 w-4 text-accent" /></span>
              <span className="text-muted-foreground">{SITE.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-muted-foreground">{SITE.availability}</span>
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            {SOCIAL_LINKS.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          {/* Embedded map */}
          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            <iframe
              title="Location map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=90.30%2C23.65%2C90.50%2C23.85&layer=mapnik"
              className="h-48 w-full grayscale invert-[0.92] contrast-[0.9]"
              loading="lazy"
            />
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass-strong lg:col-span-3 rounded-2xl p-6 sm:p-8"
          noValidate
        >
          {/* Honeypot field, hidden from real users */}
          <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company")} />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" className="mt-1.5" placeholder="Jane Doe" {...register("name")} aria-invalid={!!errors.name} />
              {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" className="mt-1.5" placeholder="jane@company.com" {...register("email")} aria-invalid={!!errors.email} />
              {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
            </div>
          </div>

          <div className="mt-5">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" className="mt-1.5" placeholder="Project inquiry" {...register("subject")} aria-invalid={!!errors.subject} />
            {errors.subject && <p className="mt-1 text-xs text-danger">{errors.subject.message}</p>}
          </div>

          <div className="mt-5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" className="mt-1.5" placeholder="Tell me a bit about what you're working on..." {...register("message")} aria-invalid={!!errors.message} />
            {errors.message && <p className="mt-1 text-xs text-danger">{errors.message.message}</p>}
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send Message
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
