import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Tag, ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import { getPosts, getPostBySlug, getPostBlocks } from "@/lib/notion"
import { NotionRenderer } from "@/components/blog/notion-renderer"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(decodeURIComponent(slug))
  if (!post) return { title: "글을 찾을 수 없습니다" }

  const description = `${post.category} · ${post.tags.join(", ")}`
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const post = await getPostBySlug(decodedSlug)
  if (!post) notFound()

  const [blocks, allPosts] = await Promise.all([getPostBlocks(post.id), getPosts()])
  const currentIndex = allPosts.findIndex((p) => p.slug === decodedSlug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {/* JSON-LD 구조화 데이터 — Review + Book 스키마 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            name: post.title,
            datePublished: post.publishedAt,
            reviewBody: post.title,
            itemReviewed: { "@type": "Book", name: post.title },
            keywords: post.tags.join(", "),
          }),
        }}
      />

      {/* 뒤로가기 */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        목록으로
      </Link>

      {/* 글 헤더 */}
      <header className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
        </div>

        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        {post.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <Tag className="h-3.5 w-3.5 text-muted-foreground" />
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <Separator className="mb-8" />

      {/* 본문 */}
      <article>
        <NotionRenderer blocks={blocks} />
      </article>

      <Separator className="mt-12 mb-8" />

      {/* 이전/다음 글 내비게이션 */}
      <nav aria-label="이전/다음 글" className="grid grid-cols-2 gap-4 text-sm">
        {prevPost ? (
          <Link
            href={`/posts/${prevPost.slug}`}
            className="group flex flex-col gap-1 p-4 rounded-lg border hover:bg-muted transition-colors"
          >
            <span className="text-xs text-muted-foreground">← 이전 글</span>
            <span className="font-medium group-hover:text-primary transition-colors line-clamp-2">
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link
            href={`/posts/${nextPost.slug}`}
            className="group flex flex-col gap-1 p-4 rounded-lg border hover:bg-muted transition-colors text-right"
          >
            <span className="text-xs text-muted-foreground">다음 글 →</span>
            <span className="font-medium group-hover:text-primary transition-colors line-clamp-2">
              {nextPost.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  )
}
