import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/articles"
import { Badge } from "@/components/ui/badge"
import { SocialShare } from "@/components/social-share"
import { RelatedArticles } from "@/components/related-articles"

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) return notFound()

  return (
    <main className="container mx-auto px-4 py-10">
      <article className="mx-auto max-w-3xl">
        <header>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Badge className="bg-teal-500/20 text-teal-300">{article.category}</Badge>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readingTime} min read</span>
          </div>
          <h1 className="mt-3 text-pretty text-3xl md:text-5xl font-bold">{article.title}</h1>
          <p className="mt-3 text-muted-foreground">{article.excerpt}</p>
        </header>

        <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border bg-muted">
          {/* Using a regular img to allow placeholder endpoint easily */}
          <img
            src={article.image || "/placeholder.svg"}
            alt={`${article.title} hero image`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="prose prose-invert mt-8 max-w-none leading-relaxed">
          {article.content.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>
            if (block.type === "p") return <p key={i}>{block.text}</p>
            if (block.type === "code")
              return (
                <pre key={i}>
                  <code>{block.text}</code>
                </pre>
              )
            if (block.type === "img") return <img key={i} src={block.src || "/placeholder.svg"} alt={block.alt} />
            return null
          })}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <SocialShare url={`https://example.com/articles/${article.slug}`} title={article.title} />
          <Link href="/" className="text-sm text-blue-400 hover:underline">
            ← Back to home
          </Link>
        </div>

        <RelatedArticles slug={article.slug} tags={article.tags} />
      </article>
    </main>
  )
}
