// ---------------------------------------------------------------------------
// Central content source for the portfolio. Swap these values (or replace
// with a Firestore-backed fetch in lib/firebase.ts) to personalize the site.
// ---------------------------------------------------------------------------

export const SITE = {
  name: "Golam Kibria",
  role: "Software Engineer · AI Developer · Entrepreneur",
  tagline: "I build fast, intelligent, and beautifully engineered products.",
  url: "https://golamkibria.vercel.app/",
  email: "golam.kibria.forge@gmail.com",
  location: "Dhaka, Bangladesh",
  availability: "Available for select freelance & full-time roles",
  description:
    "Portfolio of Golam Kibria — a software engineer and AI developer specializing in full-stack web applications, machine learning products, and automation systems.",
};

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/golamkibria", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/golamkibria", icon: "linkedin" },
  { label: "X / Twitter", href: "https://x.com/golamkibria", icon: "twitter" },
  { label: "Email", href: "mailto:golam.kibria.forge@gmail.com", icon: "mail" },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const TYPING_ROLES = [
  "Senior Software Engineer",
  "AI Solutions Developer",
  "Full-Stack Architect",
  "Automation Specialist",
  "Startup Founder",
];

export const ABOUT = {
  story: [
    "I discovered my passion for software development by turning ideas into real, working products. What started as a curiosity quickly became a deep interest in building thoughtful, reliable, and meaningful digital experiences.",
    "Today, I design and build production-ready web applications that combine clean engineering with modern technologies, from scalable full-stack platforms to intelligent solutions powered by AI.",
    "I care deeply about craft — the kind of detail that most users never consciously notice, but always feel. For me, great software isn't just about making something work; it's about making it intuitive, reliable, and genuinely valuable.",
  ],
  mission:
    "To build technology that is fast, humane, and quietly powerful — software that gets out of the way and lets people do their best work.",
  vision:
    "A future where AI-augmented tools are the default, not the exception — accessible, trustworthy, and genuinely useful for everyone, not just engineers.",
};

export const EDUCATION = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "IUBAT - International University of Business Agriculture and Technology",
    period: "2019 — 2023",
    detail: "Focus on distributed systems, algorithms, and applied machine learning.",
  },
];

export const ACHIEVEMENTS = [
  { title: "50+ Products Shipped", detail: "Across web, AI, and automation domains for startups and enterprises." },
  { title: "1M+ Users Reached", detail: "Cumulative reach of production systems architected and led." },
  { title: "Open Source Maintainer", detail: "Maintain widely-used developer tooling with 5k+ combined GitHub stars." },
  { title: "Community Speaker", detail: "Talks on system design and applied AI at regional tech conferences." },
];

export const TIMELINE = [
  {
    year: "2024 — Present",
    title: "Founder & Principal Engineer",
    org: "Novusio",
    description:
      "Advising startups on AI product strategy and architecture; building production-grade MVPs end-to-end.",
  },
  /**
  {
    /**year: "2022 — 2024",
    title: "Senior Software Engineer",
    org: "Tech Company",
    description:
      "Led a team of 6 building a real-time analytics platform. Reduced infra costs 38% through architecture redesign.",

  },
  */
  {
    year: "2023 — 2026",
    title: "Software Engineer",
    org: "Tech Company",
    description:
      "Owned core backend services powering the company's flagship product; shipped 40+ features to production.",
  },
  {
    year: "2019 — 2023",
    title: "B.Sc. Computer Science",
    org: "IUBAT - International University of Business Agriculture and Technology",
    description: "Graduated with a strong foundation in software development, problem-solving, and building practical digital solutions.",
  },
] as const;

export type SkillCategory = {
  category: string;
  description: string;
  skills: { name: string; level: number }[];
};

export const SKILLS: SkillCategory[] = [
  {
    category: "Frontend",
    description: "Crafting fast, accessible, delightful interfaces.",
    skills: [
      { name: "React / Next.js", level: 96 },
      { name: "TypeScript", level: 94 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion / GSAP", level: 88 },
    ],
  },
  {
    category: "Backend",
    description: "Reliable, scalable systems and APIs.",
    skills: [
      { name: "Node.js / Express", level: 93 },
      { name: "PostgreSQL", level: 88 },
      { name: "Firebase / Firestore", level: 90 },
      { name: "GraphQL / REST", level: 89 },
    ],
  },
  {
    category: "AI & ML",
    description: "Applied machine learning and LLM engineering.",
    skills: [
      { name: "LLM Orchestration", level: 92 },
      { name: "Python / PyTorch", level: 85 },
      { name: "Vector Databases", level: 87 },
      { name: "RAG Pipelines", level: 90 },
    ],
  },
  {
    category: "DevOps & Tools",
    description: "Shipping and scaling with confidence.",
    skills: [
      { name: "Docker / CI-CD", level: 88 },
      { name: "AWS / GCP", level: 84 },
      { name: "Git / GitHub Actions", level: 95 },
      { name: "Vercel / Edge", level: 91 },
    ],
  },
];

export const DEV_TOOLS = [
  "VS Code", "Cursor", "Figma", "Postman", "Linear", "Notion", "Vercel", "Docker",
];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  category: "Web App" | "AI / ML" | "Automation" | "Mobile";
  github?: string;
  demo?: string;
  metrics: { label: string; value: string }[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "aether-analytics",
    title: "Aether Analytics",
    summary: "Real-time analytics platform processing 2M+ events/day.",
    description:
      "A real-time analytics dashboard built for a fintech client, streaming and aggregating millions of events daily with sub-second latency using a custom ingestion pipeline.",
    image: "/projects/placeholder-1.svg",
    tags: ["Next.js", "TypeScript", "Kafka", "PostgreSQL", "Redis"],
    category: "Web App",
    github: "https://github.com/golamkibria/aether-analytics",
    demo: "https://aether-analytics.example.com",
    metrics: [
      { label: "Events / day", value: "2M+" },
      { label: "P95 latency", value: "180ms" },
      { label: "Cost reduction", value: "38%" },
    ],
    featured: true,
  },
  {
    slug: "nova-ai-copilot",
    title: "Nova AI Copilot",
    summary: "An LLM-powered copilot for customer support teams.",
    description:
      "A RAG-based support copilot that reduced average response time by 64% for a 40-person support team, with a custom vector search pipeline over internal docs.",
    image: "/projects/placeholder-2.svg",
    tags: ["Python", "LangChain", "OpenAI", "Pinecone", "FastAPI"],
    category: "AI / ML",
    github: "https://github.com/golamkibria/nova-ai-copilot",
    demo: "https://nova-copilot.example.com",
    metrics: [
      { label: "Response time", value: "-64%" },
      { label: "Tickets / day", value: "1.2k" },
      { label: "CSAT", value: "4.8/5" },
    ],
    featured: true,
  },
  {
    slug: "flowsync-automation",
    title: "FlowSync",
    summary: "No-code workflow automation connecting 30+ SaaS tools.",
    description:
      "A Zapier-style automation engine with a visual builder, webhook triggers, and a plugin architecture supporting 30+ integrations, built for internal ops teams.",
    image: "/projects/placeholder-3.svg",
    tags: ["Next.js", "Firebase", "Node.js", "BullMQ"],
    category: "Automation",
    github: "https://github.com/golamkibria/flowsync",
    demo: "https://flowsync.example.com",
    metrics: [
      { label: "Hours saved / mo", value: "300+" },
      { label: "Integrations", value: "30+" },
      { label: "Active workflows", value: "1.4k" },
    ],
    featured: true,
  },
  {
    slug: "pulse-mobile",
    title: "Pulse",
    summary: "Cross-platform habit tracking app with offline-first sync.",
    description:
      "A mobile habit-tracking app with offline-first architecture, local-first data sync, and a lightweight insights engine surfacing behavioral trends.",
    image: "/projects/placeholder-4.svg",
    tags: ["React Native", "SQLite", "Firebase"],
    category: "Mobile",
    github: "https://github.com/golamkibria/pulse",
    metrics: [
      { label: "Downloads", value: "25k+" },
      { label: "Rating", value: "4.7★" },
    ],
  },
  {
    slug: "ledger-vision",
    title: "LedgerVision",
    summary: "AI-powered invoice extraction & bookkeeping automation.",
    description:
      "Computer-vision + LLM pipeline that extracts structured line items from invoices and receipts and reconciles them automatically against ledgers.",
    image: "/projects/placeholder-5.svg",
    tags: ["Python", "OCR", "OpenAI", "PostgreSQL"],
    category: "AI / ML",
    github: "https://github.com/golamkibria/ledgervision",
    metrics: [
      { label: "Accuracy", value: "97.4%" },
      { label: "Docs processed", value: "80k+" },
    ],
  },
  {
    slug: "gridwork",
    title: "Gridwork",
    summary: "Project management SaaS with real-time collaboration.",
    description:
      "A Linear-inspired project management tool with real-time multiplayer editing, keyboard-first navigation, and a command palette at its core.",
    image: "/projects/placeholder-6.svg",
    tags: ["Next.js", "Firestore", "WebSockets"],
    category: "Web App",
    demo: "https://gridwork.example.com",
    metrics: [
      { label: "Teams", value: "120+" },
      { label: "Uptime", value: "99.98%" },
    ],
  },
];

export const PROJECT_CATEGORIES = ["All", "Web App", "AI / ML", "Automation", "Mobile"] as const;

export const CERTIFICATES = [
  { title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023", file: "#" },
  { title: "TensorFlow Developer Certificate", issuer: "Google", year: "2022", file: "#" },
  { title: "Professional Scrum Master I", issuer: "Scrum.org", year: "2021", file: "#" },
  { title: "Meta Front-End Developer", issuer: "Meta", year: "2021", file: "#" },
];

export const SERVICES = [
  {
    title: "Web Development",
    description: "Production-grade web apps built with modern frameworks, performance and accessibility first.",
    icon: "code-2",
  },
  {
    title: "AI Solutions",
    description: "LLM-powered products, RAG pipelines, and applied ML systems tailored to your data.",
    icon: "sparkles",
  },
  {
    title: "Automation",
    description: "Custom workflow automation that eliminates repetitive work and connects your tools.",
    icon: "workflow",
  },
  {
    title: "UI/UX Design",
    description: "Interface design systems that feel premium, coherent, and effortless to use.",
    icon: "palette",
  },
  {
    title: "Technical Consulting",
    description: "Architecture reviews, technical due diligence, and hands-on advisory for founders.",
    icon: "compass",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "VP Engineering, Fintech Startup",
    quote:
      "Golam Kibria rebuilt our data pipeline from the ground up and cut our infrastructure costs nearly in half — without a single hour of downtime.",
    avatar: "/avatars/placeholder-1.svg",
  },
  {
    name: "Marcus Lee",
    role: "Founder, SaaS Company",
    quote:
      "The AI copilot he shipped for our support team paid for itself in six weeks. Genuinely one of the best engineers we've worked with.",
    avatar: "/avatars/placeholder-2.svg",
  },
  {
    name: "Priya Nair",
    role: "Product Lead",
    quote:
      "Rare combination of deep technical skill and real product sense. Every deliverable felt polished beyond what we asked for.",
    avatar: "/avatars/placeholder-3.svg",
  },
];

export const FAQS = [
  {
    q: "What kind of projects do you take on?",
    a: "I focus on web applications, AI/LLM products, and automation systems — typically for startups and small-to-mid-size teams that need senior-level execution without a large in-house team.",
  },
  {
    q: "What's your typical engagement model?",
    a: "Project-based fixed scope, retained monthly advisory, or fractional/contract full-time — depending on what the work calls for. We'll figure out the right fit on a call.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — I particularly enjoy 0-to-1 work: turning a rough idea into a production-ready MVP quickly, without cutting corners on architecture.",
  },
  {
    q: "How do we get started?",
    a: "Reach out through the contact form with a short brief. I'll respond within 1-2 business days to schedule an intro call.",
  },
];

export const BLOG_CATEGORIES = ["All", "Engineering", "AI", "Career", "Product"] as const;

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: (typeof BLOG_CATEGORIES)[number];
  date: string;
  readTime: string;
  cover: string;
  featured?: boolean;
  content: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "scaling-realtime-systems",
    title: "Lessons from Scaling a Real-Time Analytics System",
    excerpt: "What broke, what we learned, and the architecture that finally held under 2M events a day.",
    category: "Engineering",
    date: "2026-05-12",
    readTime: "8 min read",
    cover: "/blog/placeholder-1.svg",
    featured: true,
    content: `## The problem

When our ingestion pipeline first hit real production traffic, it fell over within hours. Here's what we changed, in order of impact.

### 1. Backpressure, not buffering

Our first instinct was to buffer everything and hope consumers caught up. That just delayed the failure. Once we added real backpressure signals between producers and consumers, the system degraded gracefully instead of falling over.

### 2. Partitioning by tenant, not by time

Time-based partitioning looked elegant on a whiteboard and fell apart under uneven tenant load. Partitioning by tenant ID (with a consistent-hash fallback for noisy neighbors) fixed our hot-shard problem almost overnight.

### 3. Idempotency everywhere

At this scale, at-least-once delivery is the only realistic guarantee. Every consumer needed to be safely re-runnable, so we pushed idempotency keys all the way down to the database writes.

## The result

- P95 latency dropped from 1.4s to 180ms
- Infrastructure cost fell 38% after right-sizing consumers
- Zero pipeline-related incidents in the following two quarters

The biggest lesson: most scaling problems are architecture problems wearing a performance costume.`,
  },
  {
    slug: "rag-pipelines-production",
    title: "Taking RAG Pipelines from Demo to Production",
    excerpt: "The unglamorous but critical steps between a slick prototype and a system users trust.",
    category: "AI",
    date: "2026-03-02",
    readTime: "10 min read",
    cover: "/blog/placeholder-2.svg",
    featured: true,
    content: `## Demos lie

A RAG demo with ten hand-picked documents will always look magical. Production is a different animal — messy documents, ambiguous queries, and users who ask questions your eval set never covered.

### Chunking is the real bottleneck

We spent more engineering time tuning chunk boundaries and overlap than on the retrieval model itself. Semantic chunking (rather than fixed-size) gave the single biggest quality jump.

### Evaluate retrieval and generation separately

Bundling both into one end-to-end score hides where failures actually happen. We built two eval suites: one purely for retrieval precision/recall, one for answer faithfulness given a fixed context.

### Cite or don't answer

For a support copilot, an unsupported answer is worse than no answer. Forcing the model to cite a source chunk — and refusing to answer when it can't — cut hallucination-related tickets dramatically.

## What shipped

The system now handles 1,200+ tickets a day with a 4.8/5 CSAT and a 64% reduction in average response time.`,
  },
  {
    slug: "founder-engineer-mindset",
    title: "The Founder-Engineer Mindset",
    excerpt: "Why the best engineers I know think like founders — even when they aren't one.",
    category: "Career",
    date: "2026-01-18",
    readTime: "6 min read",
    cover: "/blog/placeholder-3.svg",
    content: `## It's not about titles

You don't need "founder" in your title to think like one. The trait that separates senior engineers from everyone else isn't raw skill — it's ownership of outcomes, not just tasks.

### Ask "should we" before "how do we"

Junior engineers optimize execution of a given spec. Senior engineers question the spec itself when it doesn't serve the actual goal.

### Ship the smallest thing that teaches you something

Founders don't build the whole product before talking to a user. The best engineers apply the same instinct to features: ship a thin slice, learn, iterate.

### Default to transparency

Founders live and die by how clearly they communicate constraints and tradeoffs to stakeholders. Do the same with your team — narrate your reasoning, not just your output.

This mindset compounds. It's the difference between being a pair of hands and being someone a team can hand ambiguity to.`,
  },
];
