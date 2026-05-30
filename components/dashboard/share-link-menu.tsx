"use client"

import { Share2, Link, AtSign, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import type { Post } from "@/types/notion"
import { getBlogUrl, getTwitterShareUrl, getFacebookShareUrl } from "@/lib/share"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

async function copyToClipboard(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // HTTPS가 아닌 환경 등 clipboard API 미지원 시 fallback
    const el = document.createElement("textarea")
    el.value = text
    el.style.position = "fixed"
    el.style.opacity = "0"
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)
  }
  toast.success(`${label} 복사됨`)
}

interface ShareLinkMenuProps {
  slug: string
  title: string
  status: Post["status"]
}

export function ShareLinkMenu({ slug, title, status }: ShareLinkMenuProps) {
  if (status === "초안") {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        aria-label="공유 링크 복사 (초안 글은 공유할 수 없습니다)"
        title="발행 후 공유 가능합니다"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="공유 링크 복사">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => copyToClipboard(getBlogUrl(slug), "블로그 링크")}
        >
          <Link className="h-4 w-4 mr-2" />
          블로그 링크 복사
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => copyToClipboard(getTwitterShareUrl(slug, title), "Twitter(X) 공유 링크")}
        >
          <AtSign className="h-4 w-4 mr-2" />
          Twitter(X) 공유 링크 복사
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => copyToClipboard(getFacebookShareUrl(slug), "Facebook 공유 링크")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Facebook 공유 링크 복사
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
