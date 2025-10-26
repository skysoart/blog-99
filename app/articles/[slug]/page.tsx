import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/articles"
import { Badge } from "@/components/ui/badge"

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
            if (block.type === "h2")
              return (
                <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-teal-400">
                  {block.text}
                </h2>
              )
            if (block.type === "p")
              return (
                <p key={i} className="mb-4 text-gray-300 leading-relaxed">
                  {block.text}
                </p>
              )
            if (block.type === "list")
              return (
                <ul key={i} className="mb-6 ml-6 list-disc space-y-2 text-gray-300">
                  {block.items.map((item, j) => (
                    <li key={j} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )
            if (block.type === "code")
              return (
                <pre key={i} className="my-4 rounded-lg bg-gray-900 p-4 overflow-x-auto">
                  <code className="text-sm text-gray-300">{block.text}</code>
                </pre>
              )
            if (block.type === "img")
              return (
                <div key={i} className="flex justify-center my-8">
                  <img
                    src={block.src || "/placeholder.svg"}
                    alt={block.alt}
                    className="max-w-2xl w-full rounded-lg border border-border shadow-lg"
                  />
                </div>
              )
          })}
        </div>
      </article>
    </main>
  )
}
