import type { Metadata } from "next";
import { BlogList } from "@/components/sections/blog-list";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing on engineering, applied AI, and product from ${SITE.name}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="section-container py-28 sm:py-32">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <span className="glass inline-flex items-center rounded-full px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-accent">
          Blog
        </span>
        <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">Writing & notes</h1>
        <p className="mt-4 text-muted-foreground">
          Long-form thoughts on engineering, applied AI, and building products that last.
        </p>
      </div>
      <BlogList />
    </div>
  );
}
