"use client";

import { GithubIcon, LinkedinIcon } from "@/components/common/brand-icons";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/data";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Command } from "cmdk";
import {
    Briefcase,
    FolderGit2,
    Mail,
    MessageSquare,
    Search,
    Sun,
    User, Wrench
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  About: User,
  Skills: Wrench,
  Projects: FolderGit2,
  Experience: Briefcase,
  Contact: MessageSquare,
};

/**
 * Global command palette, toggled with Cmd/Ctrl+K. Lets visitors jump to any
 * section, toggle theme, open socials, or grab the résumé — all keyboard
 * accessible.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      if (href.endsWith(".pdf")) window.open(href, "_blank");
      else if (href.startsWith("/")) router.push(href);
      else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [router]
  );

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-24 z-[151] w-[92vw] max-w-xl -translate-x-1/2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>Command palette</DialogPrimitive.Title>
            <DialogPrimitive.Description>Search and jump to any part of the site</DialogPrimitive.Description>
          </VisuallyHidden.Root>
          <Command className="glass-strong overflow-hidden rounded-xl shadow-2xl" label="Command palette">
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <Command.Input
                autoFocus
                placeholder="Search sections, actions..."
                className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden shrink-0 rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
                ESC
              </kbd>
            </div>
            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigate" className="px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:mb-1">
                {NAV_LINKS.map((link) => {
                  const Icon = ICONS[link.label] ?? FolderGit2;
                  return (
                    <Command.Item
                      key={link.href}
                      onSelect={() => go(link.href)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-surface-2"
                    >
                      <Icon className="h-4 w-4 text-accent" />
                      {link.label}
                    </Command.Item>
                  );
                })}
              </Command.Group>

              <Command.Group heading="Actions" className="px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:mb-1">
                <Command.Item
                  onSelect={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-surface-2"
                >
                  <Sun className="h-4 w-4 text-accent" />
                  Toggle theme
                </Command.Item>

              </Command.Group>

              <Command.Group heading="Social" className="px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:mb-1">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = s.icon === "github" ? GithubIcon : s.icon === "linkedin" ? LinkedinIcon : Mail;
                  return (
                    <Command.Item
                      key={s.label}
                      onSelect={() => go(s.href)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-surface-2"
                    >
                      <Icon className="h-4 w-4 text-accent" />
                      {s.label}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            </Command.List>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
