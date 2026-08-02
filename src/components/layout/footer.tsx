import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/common/brand-icons";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/data";

const ICONS = { github: GithubIcon, linkedin: LinkedinIcon, twitter: XIcon, mail: Mail };

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="section-container grid gap-12 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Link href="/" className="font-heading text-xl font-semibold">
            GK<span className="text-gradient">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{SITE.description}</p>
          <div className="mt-5 flex gap-2">
            {SOCIAL_LINKS.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold">Navigate</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold">Resources</h3>
          <ul className="mt-4 space-y-2.5">
            <li><a href="/resume.pdf" className="text-sm text-muted-foreground hover:text-foreground">Résumé</a></li>
            <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
            <li><a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a></li>
            <li><a href="#certificates" className="text-sm text-muted-foreground hover:text-foreground">Certificates</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold">Get in touch</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>{SITE.email}</li>
            <li>{SITE.location}</li>
            <li className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {SITE.availability}
            </li>
          </ul>
        </div>
      </div>

      <div className="section-container flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <p>Built with Next.js, TypeScript & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
