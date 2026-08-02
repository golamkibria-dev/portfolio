import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <div className="section-container max-w-3xl py-28 sm:py-32">
      <Skeleton className="mb-8 h-4 w-28" />
      <Skeleton className="mb-4 h-6 w-24 rounded-full" />
      <Skeleton className="mb-3 h-10 w-full" />
      <Skeleton className="mb-10 h-4 w-40" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
