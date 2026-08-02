"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FAQS } from "@/lib/data";

export function FaqNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({ title: "Enter a valid email", variant: "error" });
      return;
    }
    setStatus("loading");
    // Placeholder: wire this up to Firestore ("newsletter_subscribers" collection)
    // or a Resend audience once credentials are configured.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
    toast({ title: "Subscribed!", description: "You'll get an email when there's something worth sharing.", variant: "success" });
    setEmail("");
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="section-container grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="FAQ" title="Common questions" align="left" className="mb-8" />
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-strong flex h-fit flex-col justify-center rounded-2xl p-8 lg:mt-16"
        >
          <h3 className="font-heading text-2xl font-semibold">Stay in the loop</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Occasional notes on engineering, AI products, and things I&apos;m building. No spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleSubscribe} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <Button type="submit" disabled={status === "loading"} className="shrink-0">
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
