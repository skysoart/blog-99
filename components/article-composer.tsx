"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ArticleCard } from "./article-card"

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\\s-]/g, "")
    .trim()
    .replace(/\\s+/g, "-")
    .slice(0, 80)
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

type Block = { type: "h2" | "p" | "code"; text: string }

export function ArticleComposer() {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [author, setAuthor] = useState("TechOz Editors")
  const [readingTime, setReadingTime] = useState(6)
  const [tags, setTags] = useState("ai, productivity")
  const [image, setImage] = useState("/placeholder.jpg")
  const [date, setDate] = useState(formatDate(new Date()))
  const [blocks, setBlocks] = useState<Block[]>([
    { type: "p", text: "Intro paragraph about the topic." },
    { type: "h2", text: "Key Section" },
    { type: "p", text: "Supporting details and insights." },
  ])

  const slug = useMemo(() => slugify(title || "new-article"), [title])

  const snippet = useMemo(() => {
    const obj = {
      slug,
      title,
      excerpt,
      image,
      category,
      date,
      author,
      readingTime,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      content: blocks.map((b) => ({ type: b.type, text: b.text })),
    }
    // Pretty-print with 2 spaces and ensure keys order is stable
    return JSON.stringify(obj, null, 2)
  }, [slug, title, excerpt, image, category, date, author, readingTime, tags, blocks])

  function addBlock(type: Block["type"]) {
    setBlocks((prev) => [...prev, { type, text: type === "h2" ? "Section title" : "Text" }])
  }
  function updateBlock(i: number, text: string) {
    setBlocks((prev) => prev.map((b, idx) => (i === idx ? { ...b, text } : b)))
  }
  function removeBlock(i: number) {
    setBlocks((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function copySnippet() {
    await navigator.clipboard.writeText(snippet)
    toast({ title: "Copied!", description: "Article JSON has been copied to your clipboard." })
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-5">
        <div className="grid gap-2">
          <label className="text-sm">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title" />
          <p className="text-xs text-muted-foreground">Slug: {slug}</p>
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Excerpt</label>
          <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary" />
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm">Category</label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Artificial Intelligence"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Date</label>
            <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Sep 1, 2025" />
          </div>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm">Author</label>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Reading time (min)</label>
            <Input
              type="number"
              min={1}
              value={readingTime}
              onChange={(e) => setReadingTime(Number.parseInt(e.target.value || "1", 10))}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Tags (comma-separated)</label>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="ai, chatgpt, research" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Image URL</label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="/placeholder.jpg" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Content blocks</h3>
            <div className="flex gap-2">
              <Button variant="secondary" className="border" onClick={() => addBlock("p")}>
                + Paragraph
              </Button>
              <Button variant="secondary" className="border" onClick={() => addBlock("h2")}>
                + Heading
              </Button>
              <Button variant="secondary" className="border" onClick={() => addBlock("code")}>
                + Code
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            {blocks.map((b, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-teal-500/20 text-teal-300">{b.type.toUpperCase()}</Badge>
                    <Button variant="ghost" className="text-muted-foreground" onClick={() => removeBlock(i)}>
                      Remove
                    </Button>
                  </div>
                  <Textarea
                    value={b.text}
                    onChange={(e) => updateBlock(i, e.target.value)}
                    placeholder={b.type === "h2" ? "Section title" : "Text"}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid gap-2">
          <label className="text-sm">Paste this into lib/articles.ts (inside the data array)</label>
          <Textarea value={snippet} readOnly className="font-mono text-xs min-h-[280px]" />
          <div className="flex gap-3">
            <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={copySnippet}>
              Copy JSON
            </Button>
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground self-center"
              aria-label="Back to home"
            >
              ← Back
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            Tip: After pasting, ensure the object has a unique slug and image path. Keep date format like "Sep 1, 2025".
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">Card preview</h3>
          <ArticleCard
            slug={slug}
            title={title || "Article title"}
            excerpt={excerpt || "Short summary for the article will appear here."}
            image={image}
            category={category || "Category"}
            date={date}
          />
        </div>
      </div>
    </div>
  )
}
