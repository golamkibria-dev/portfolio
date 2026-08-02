import { cn } from "@/lib/utils";

/** Shimmering skeleton block for loading states. */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-surface-2", className)}
      {...props}
    />
  );
}
