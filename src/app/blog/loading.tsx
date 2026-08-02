import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="section-container py-28 sm:py-32">
      <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="mb-10 flex items-center justify-between gap-4">
        <Skeleton className="h-11 w-full max-w-xs rounded-lg" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-16 rounded-full" />
          ))}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-5">
            <Skeleton className="mb-3 h-5 w-20 rounded-full" />
            <Skeleton className="mb-2 h-5 w-full" />
            <Skeleton className="mb-4 h-4 w-3/4" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
