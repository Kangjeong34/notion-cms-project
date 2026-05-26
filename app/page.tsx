import { Suspense } from "react"
import { BookOpen, Tag } from "lucide-react"
import { getPosts, getCategories } from "@/lib/notion"
import { PostList } from "@/components/blog/post-list"

export const revalidate = 3600

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 space-y-10">
      {/* 히어로 섹션 — gradient 배경 + 통계 뱃지 */}
      <section
        aria-label="히어로 섹션"
        className="rounded-2xl border bg-gradient-to-br from-muted/50 to-background px-8 py-16"
      >
        <h1 className="text-5xl font-bold tracking-tight">책 리뷰</h1>
        <p className="mt-3 text-xl text-muted-foreground">
          읽은 책을 기록하고 생각을 나눕니다.
        </p>

        {/* 통계 뱃지 */}
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-sm font-medium shadow-sm">
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            총 {posts.length}권의 리뷰
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-sm font-medium shadow-sm">
            <Tag className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            {categories.length}개의 카테고리
          </span>
        </div>
      </section>

      {/* 글 목록 섹션 — useSearchParams 사용으로 Suspense 필수 */}
      <section aria-label="글 목록">
        <Suspense fallback={<div className="py-16 text-center text-muted-foreground">로딩 중...</div>}>
          <PostList initialPosts={posts} categories={categories} />
        </Suspense>
      </section>
    </div>
  )
}
