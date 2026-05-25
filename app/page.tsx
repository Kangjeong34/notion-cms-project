import { getPosts, getCategories } from "@/lib/notion"
import { PostList } from "@/components/blog/post-list"

export const revalidate = 3600

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12 space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">책 리뷰</h1>
        <p className="text-lg text-muted-foreground">
          읽은 책을 기록하고 생각을 나눕니다.
        </p>
      </div>
      <PostList initialPosts={posts} categories={categories} />
    </div>
  )
}
