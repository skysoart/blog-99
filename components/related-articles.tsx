import Link from "next/link"
import { getRelatedArticles, type Article } from "@/lib/articles"

export async function RelatedArticles({ slug, tags }: { slug: string; tags: string[] }) {
  const related = await getRelatedArticles(slug, tags)
  if (!related.length) return null
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold">Related articles</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {related.map((a: Article) => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className="group rounded-md border border-border p-4 hover:border-blue-500/40"
          >
            <p className="text-sm text-muted-foreground">
              {a.category} • {a.date}
            </p>
            <p className="mt-1 font-medium group-hover:text-blue-400">{a.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
