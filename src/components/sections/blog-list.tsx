"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function BlogList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof BLOG_CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const featured = BLOG_POSTS.filter((p) => p.featured);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="pl-10"
            aria-label="Search articles"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                category === cat
                  ? "border-transparent bg-gradient-brand text-white"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {category === "All" && !query && featured.length > 0 && (
        <div className="mb-12 grid gap-5 sm:grid-cols-2">
          {featured.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/40">
                <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
                  <Image
                    src={post.cover}
                    alt={`${post.title} cover`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                  <h2 className="font-heading text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.readTime}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <Card className="group h-full transition-all hover:-translate-y-1 hover:border-primary/40">
                <CardContent className="p-5">
                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                  <h2 className="font-heading text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {post.readTime}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
            No articles match your search.
          </p>
        )}
      </div>
    </div>
  );
}
