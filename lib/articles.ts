export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "code"; text: string }
  | { type: "img"; src: string; alt: string }

export type Article = {
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
  readingTime: number
  tags: string[]
  content: ContentBlock[]
}

const data: Article[] = [
  {
    slug: "chatgpt-tools-2025",
    title: "Top ChatGPT & AI Tools to Try in 2025",
    excerpt: "A curated list of AI assistants, coding copilots, and creative tools that accelerate your workflow.",
    image: "/ai-tools-interface.jpg",
    category: "Artificial Intelligence",
    date: "Sep 1, 2025",
    author: "TechPulse Editors",
    readingTime: 7,
    tags: ["ai", "chatgpt", "productivity"],
    content: [
      { type: "p", text: "AI tools have rapidly evolved with larger contexts and better reasoning." },
      { type: "h2", text: "Choosing the right tool" },
      { type: "p", text: "Pick based on your domain: coding, writing, research, or design." },
      { type: "code", text: "const result = await generateText({ model: 'openai/gpt-5-mini', prompt: 'Hello' })" },
    ],
  },
  {
    slug: "security-basics",
    title: "Cybersecurity Basics: 10 Steps to Stay Safe Online",
    excerpt: "Reduce risk with simple, high-impact practices that protect your accounts and data.",
    image: "/cybersecurity-shield-abstract.jpg",
    category: "Cybersecurity",
    date: "Aug 28, 2025",
    author: "Alex Novak",
    readingTime: 6,
    tags: ["security", "privacy"],
    content: [
      { type: "p", text: "Security hygiene matters more than ever with increasing phishing attacks." },
      { type: "h2", text: "Use a password manager" },
      { type: "p", text: "Unique passwords with MFA drastically lower compromise risks." },
    ],
  },
  {
    slug: "iphone-17-review",
    title: "iPhone 17 Review: Battery, Cameras, and AI On-Device",
    excerpt: "Apple refines the formula with more power efficiency and smarter experiences.",
    image: "/smartphone-on-dark-background.jpg",
    category: "Mobile Technology",
    date: "Aug 22, 2025",
    author: "Jamie Park",
    readingTime: 8,
    tags: ["mobile", "apple"],
    content: [
      { type: "p", text: "The iPhone 17 focuses on battery gains and on-device intelligence." },
      { type: "h2", text: "Design & Display" },
      { type: "p", text: "Subtle changes but a brighter, more efficient panel." },
    ],
  },
  {
    slug: "gpu-showdown-2025",
    title: "GPU Showdown 2025: Flagship Cards Compared",
    excerpt: "We benchmark the latest GPUs across frames, thermals, and compute workloads.",
    image: "/gpu-graphics-card.jpg",
    category: "Gadgets & Hardware",
    date: "Aug 18, 2025",
    author: "Sam Rivera",
    readingTime: 9,
    tags: ["hardware", "gpu"],
    content: [
      { type: "p", text: "Competition remains fierce with better perf-per-watt." },
      { type: "h2", text: "Benchmarks" },
      { type: "p", text: "Ultra preset at 1440p shows surprising wins across vendors." },
    ],
  },
  {
    slug: "web-frameworks-2025",
    title: "Web Frameworks in 2025: Trends and Tradeoffs",
    excerpt: "From React Server Components to resumability—what matters this year.",
    image: "/web-framework-diagram.jpg",
    category: "Web Development",
    date: "Aug 10, 2025",
    author: "Priya Gupta",
    readingTime: 10,
    tags: ["web", "frameworks"],
    content: [
      { type: "p", text: "Shipping less JS and better DX are not mutually exclusive." },
      { type: "h2", text: "Patterns to watch" },
      { type: "p", text: "Server components, islands, and partial hydration converge." },
    ],
  },
  {
    slug: "gaming-fall-releases",
    title: "Fall Gaming Releases: What to Play Next",
    excerpt: "From indie gems to AAA blockbusters—our picks for the season.",
    image: "/gaming-controller-neon.jpg",
    category: "Gaming",
    date: "Aug 5, 2025",
    author: "Taylor Reed",
    readingTime: 5,
    tags: ["gaming"],
    content: [{ type: "p", text: "A packed calendar ensures something for every taste." }],
  },
  {
    slug: "startup-funding-2025",
    title: "Startup Funding Trends in 2025",
    excerpt: "Capital is flowing into AI infrastructure, robotics, and climate tech.",
    image: "/startup-pitch-deck.jpg",
    category: "Startup News",
    date: "Aug 1, 2025",
    author: "Lena Moritz",
    readingTime: 6,
    tags: ["startups", "funding"],
    content: [{ type: "p", text: "Dry powder targets durable moats and real-world impact." }],
  },
  {
    slug: "future-tech-visions",
    title: "Future Tech: 2030 Predictions",
    excerpt: "From personal AI to ubiquitous robotics—what the next decade could bring.",
    image: "/futuristic-city-night.png",
    category: "Future Tech",
    date: "Jul 25, 2025",
    author: "TechPulse Editors",
    readingTime: 7,
    tags: ["future", "ai", "robots"],
    content: [{ type: "p", text: "Convergence of sensing, compute, and models reshapes experiences." }],
  },
]

export async function getAllArticles(): Promise<Article[]> {
  return data
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return data.find((a) => a.slug === slug)
}

export async function getRelatedArticles(slug: string, tags: string[]): Promise<Article[]> {
  const tagSet = new Set(tags)
  return data.filter((a) => a.slug !== slug && a.tags.some((t) => tagSet.has(t))).slice(0, 4)
}
