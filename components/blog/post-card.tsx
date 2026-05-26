import Link from "next/link"
import { Calendar, Tag } from "lucide-react"
import type { Post } from "@/types/notion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

  return (
    <article>
      <Link
        href={`/posts/${post.slug}`}
        className="group block"
        aria-label={`${post.title} — ${post.category}`}
      >
        <Card className="h-full transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
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
            <h2 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h2>
          </CardHeader>
          {/* 태그 목록 */}
          {post.tags.length > 0 && (
            <CardContent className="pt-0">
              <div className="flex items-center gap-1 flex-wrap" aria-label="태그">
                <Tag className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden="true" />
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </Link>
    </article>
  )
}
