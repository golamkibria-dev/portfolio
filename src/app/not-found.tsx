import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="section-container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <div className="glass mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <Compass className="h-7 w-7 text-accent" />
      </div>
      <h1 className="font-heading text-5xl font-semibold text-gradient">404</h1>
      <p className="mt-3 max-w-sm text-muted-foreground">
        This page doesn&apos;t exist — it might have been moved or the link is out of date.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
