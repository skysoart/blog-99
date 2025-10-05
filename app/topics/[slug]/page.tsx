import { notFound } from "next/navigation"
import { TOPICS } from "@/lib/topics"
import { getAllArticles, type Article } from "@/lib/articles"
import { ArticleGrid } from "@/components/article-grid"

function normalize(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-")
}

function matchesTopic(a: Article, slug: string) {
  // Be defensive: support topics, tags, or category fields if present
  const cand: string[] = [
    ...(Array.isArray((a as any).topics) ? (a as any).topics : []),
    ...(Array.isArray((a as any).tags) ? (a as any).tags : []),
    typeof (a as any).category === "string" ? [(a as any).category] : [],
  ].filter(Boolean)
  return cand.map((s) => normalize(String(s))).includes(slug)
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const topic = TOPICS.find((t) => t.slug === params.slug)
  if (!topic) return notFound()

  const all = await getAllArticles()
  const articles = all.filter((a) => matchesTopic(a, topic.slug))

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-pretty">Topic: {topic.label}</h1>
      <p className="mt-2 text-muted-foreground">
        {articles.length} article{articles.length === 1 ? "" : "s"}
      </p>
      <section className="mt-8">
        <ArticleGrid articles={articles} />
      </section>
    </main>
  )
}
