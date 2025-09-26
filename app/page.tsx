import { Hero } from "@/components/hero"
import { ArticleGrid } from "@/components/article-grid"
import { SiteFooter } from "@/components/site-footer"
import { BackToTop } from "@/components/back-to-top"
import { getAllArticles } from "@/lib/articles"

export default async function HomePage() {
  const articles = await getAllArticles()
  return (
    <main id="main" className="min-h-dvh">
      <Hero />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <ArticleGrid initialArticles={articles.slice(0, 8)} />
      </section>
      {/* <section className="container mx-auto px-4 py-12 md:py-16">
        <NewsletterForm />
      </section> */}
      <SiteFooter />
      <BackToTop />
    </main>
  )
}
