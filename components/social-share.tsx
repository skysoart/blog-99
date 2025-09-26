"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

export function SocialShare({ url, title }: { url: string; title: string }) {
  async function share() {
    if (navigator.share) {
      await navigator.share({ url, title })
      return
    }
    const text = encodeURIComponent(`${title} — ${url}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  }
  return (
    <Button onClick={share} className="bg-teal-500 text-white hover:bg-teal-600">
      <Share2 className="mr-2 size-4" /> Share
    </Button>
  )
}
