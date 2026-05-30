import { siteConfig } from "@/lib/config"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url

export function getBlogUrl(slug: string): string {
  return `${baseUrl}/posts/${encodeURIComponent(slug)}`
}

export function getTwitterShareUrl(slug: string, title: string): string {
  const url = getBlogUrl(slug)
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
}

export function getFacebookShareUrl(slug: string): string {
  const url = getBlogUrl(slug)
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
}
