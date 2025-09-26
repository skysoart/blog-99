"use client"

import { useMemo, useState } from "react"
import { ArticleCard } from "./article-card"
import { Input } from "@/components/ui/input"
import type { Article } from "@/lib/articles"
import { Search } from "lucide-react"

export function ArticleGrid({ initialArticles }: { initialArticles: Article[] }) {
  const [query, setQuery] = useState("")
  const [articles] = useState(initialArticles)

  const filtered = useMemo(() => {
    if (!query) return articles
    const q = query.toLowerCase()
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q),
    )
  }, [query, articles])

  return (
    <div id="articles" className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="pl-9"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <ArticleCard
            key={a.slug}
            slug={a.slug}
            title={a.title}
            excerpt={a.excerpt}
            image={a.image}
            category={a.category}
            date={a.date}
          />
        ))}
      </div>
    </div>
  )
}
