import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TechOz. All rights reserved.
          </p>
          <nav aria-label="Footer" className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
