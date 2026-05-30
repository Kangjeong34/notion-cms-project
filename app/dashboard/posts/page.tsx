import type { Metadata } from "next"
import { getAllPosts } from "@/lib/notion"
import { PostsTable } from "@/components/dashboard/posts-table"

export const metadata: Metadata = {
  title: "글 목록",
}

export const revalidate = 60

export default async function DashboardPostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">글 목록</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          모든 글(초안 포함)을 관리합니다.
        </p>
      </div>
      <PostsTable posts={posts} />
    </div>
  )
}
