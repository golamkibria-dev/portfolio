import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";

import { BackToTop } from "@/components/common/back-to-top";
import { CommandPalette } from "@/components/common/command-palette";
import { CustomCursor } from "@/components/common/custom-cursor";
import { LoadingScreen } from "@/components/common/loading-screen";
import { ScrollProgressBar } from "@/components/common/scroll-progress-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ServiceWorkerRegister } from "@/components/providers/service-worker-register";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/hooks/use-toast";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Golam Kibria", "Software Engineer", "AI Developer", "Full-Stack Developer",
    "Next.js Developer", "Portfolio", "Web Development", "Machine Learning",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    siteName: SITE.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE.name }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    images: ["/og-image.png"],
    creator: "@golamkibria",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a12" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbff" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.role,
  description: SITE.description,
  address: { "@type": "PostalAddress", addressLocality: SITE.location },
  sameAs: [
    "https://github.com/golamkibria",
    "https://linkedin.com/in/golamkibria",
    "https://x.com/golamkibria",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-300 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ToastProvider>
            <LoadingScreen />
            <ScrollProgressBar />
            <CustomCursor />
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <BackToTop />
            <CommandPalette />
            <Toaster />
            <ServiceWorkerRegister />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
