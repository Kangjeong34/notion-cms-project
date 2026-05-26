import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import { getPosts, getCategories } from "@/lib/notion"
import { PostList } from "@/components/blog/post-list"

export const revalidate = 86400

type Props = {
  params: Promise<{ name: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ name: encodeURIComponent(cat.name) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params
  const categoryName = decodeURIComponent(name)
  return { title: `${categoryName} 카테고리` }
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params
  const categoryName = decodeURIComponent(name)

  const posts = await getPosts()
  const filtered = posts.filter((p) => p.category === categoryName)

  if (filtered.length === 0) notFound()

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 space-y-8">
      {/* 전체 글 목록으로 돌아가기 */}
      <Link
        href="/"
        aria-label="전체 글 목록으로 돌아가기"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        전체 글 보기
      </Link>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">카테고리</p>
        <h1 className="text-3xl font-bold tracking-tight">{categoryName}</h1>
        <p className="text-muted-foreground">총 {filtered.length}개의 글</p>
      </div>

      {/* useSearchParams 사용으로 Suspense 필수 */}
      <Suspense fallback={<div className="py-16 text-center text-muted-foreground">로딩 중...</div>}>
        <PostList initialPosts={filtered} categories={[]} showCategoryFilter={false} />
      </Suspense>
    </div>
  )
}
