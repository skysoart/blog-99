import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-8 md:py-14">
        <nav className="flex items-center justify-between">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            TechOz
          </Link>
          <div className="flex items-center gap-3">
            <Link href="#articles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Articles
            </Link>
          </div>
        </nav>

        <div className="mt-10 md:mt-16">
          <h1 className="text-pretty text-4xl md:text-6xl font-bold">Latest in Technology & Innovation</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Deep dives, product reviews, and industry analysis across AI, cybersecurity, mobile, gaming, web dev, and
            more.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link href="#articles">
              <Button className="bg-blue-500 text-white hover:bg-blue-600">Start reading</Button>
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6 opacity-70">
            <div className="text-xs text-muted-foreground">AI</div>
            <div className="text-xs text-muted-foreground">Cybersecurity</div>
            <div className="text-xs text-muted-foreground">Mobile</div>
            <div className="text-xs text-muted-foreground">Gaming</div>
            <div className="text-xs text-muted-foreground">Web Dev</div>
          </div>
        </div>
      </div>
    </header>
  )
}
