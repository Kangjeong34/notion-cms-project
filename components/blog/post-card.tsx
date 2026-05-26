import Link from "next/link"
import { Calendar } from "lucide-react"
import type { Post } from "@/types/notion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// 카테고리별 accent 색상 맵
const CATEGORY_COLORS: Record<string, string> = {
  소설: "bg-indigo-500",
  자기계발: "bg-amber-500",
  기술: "bg-emerald-500",
  에세이: "bg-rose-500",
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  // ko-KR 로케일로 "2024년 1월 1일" 형식 변환
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const accentColor = CATEGORY_COLORS[post.category] ?? "bg-slate-400"

  return (
    <article>
      <Link
        href={`/posts/${post.slug}`}
        className="group block"
        aria-label={`${post.title} — ${post.category}`}
      >
        <Card className="h-full overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          {/* 카테고리별 상단 accent 바 */}
          <div className={cn("h-1 w-full", accentColor)} aria-hidden="true" />

          <CardHeader className="pb-3 pt-4">
            {/* 카테고리 뱃지 및 발행일 */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <Badge variant="secondary">{post.category}</Badge>
              <time
                dateTime={post.publishedAt}
                className="flex items-center gap-1 text-xs text-muted-foreground"
              >
                <Calendar className="h-3 w-3" aria-hidden="true" />
                {formattedDate}
              </time>
            </div>
            {/* 글 제목 */}
            <h2 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h2>
          </CardHeader>

          {/* 태그 목록 — Badge outline 스타일 */}
          {post.tags.length > 0 && (
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1" aria-label="태그">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs px-2 py-0 font-normal">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </Link>
    </article>
  )
}
