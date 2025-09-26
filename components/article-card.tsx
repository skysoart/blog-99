"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type ArticleCardProps = {
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
}

export function ArticleCard({ slug, title, excerpt, image, category, date }: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="group block h-full">
      <Card
        className={cn(
          "h-full overflow-hidden border-border bg-card transition-transform",
          "hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.35)]",
        )}
      >
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={`${title} thumbnail`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">{category}</Badge>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-snug">{title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
