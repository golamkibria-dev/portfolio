"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="section-container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <div className="glass mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <AlertTriangle className="h-7 w-7 text-warning" />
      </div>
      <h1 className="font-heading text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        An unexpected error occurred while rendering this page.
      </p>
      <Button className="mt-6" onClick={() => reset()}>Try again</Button>
    </div>
  );
}
