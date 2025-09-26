import { ArticleComposer } from "@/components/article-composer"

export default function NewArticlePage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-pretty">Create a new article</h1>
          <p className="mt-2 text-muted-foreground">
            Fill out the form to generate a ready-to-paste article object for{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">lib/articles.ts</code>.
          </p>
        </header>
        <ArticleComposer />
      </div>
    </main>
  )
}
