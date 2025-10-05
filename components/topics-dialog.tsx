"use client"

import * as React from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { TOPICS } from "@/lib/topics"
import { getAllArticles } from "@/lib/articles"

type TopicsDialogProps = {
  children: React.ReactNode
}

export function TopicsDialog({ children }: TopicsDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [sortedTopics, setSortedTopics] = React.useState(TOPICS)

  React.useEffect(() => {
    async function sortTopicsByLatest() {
      const articles = await getAllArticles()
      const topicDates = new Map<string, Date>()

      articles.forEach((article) => {
        const category = article.category.toLowerCase().replace(/\s+/g, "-")
        const articleDate = new Date(article.date)
        if (!topicDates.has(category) || articleDate > topicDates.get(category)!) {
          topicDates.set(category, articleDate)
        }
      })

      const sorted = [...TOPICS].sort((a, b) => {
        const dateA = topicDates.get(a.slug) || new Date(0)
        const dateB = topicDates.get(b.slug) || new Date(0)
        return dateB.getTime() - dateA.getTime()
      })

      setSortedTopics(sorted)
    }

    sortTopicsByLatest()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Browse latest topics</DialogTitle>
          <DialogDescription>Explore our newest and most recently updated topics.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
          {sortedTopics.map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              onClick={() => setOpen(false)}
              className="group"
              aria-label={`View articles about ${t.label}`}
            >
              <Badge className="w-full justify-center bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition">
                {t.label}
              </Badge>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
