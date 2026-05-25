"use client"

import { useState, useMemo } from "react"
import type { Post, Category } from "@/types/notion"
import { PostCard } from "@/components/blog/post-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  initialPosts: Post[]
  categories: Category[]
}

export function PostList({ initialPosts, categories }: Props) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesQuery =
        query === "" ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

      const matchesCategory = selectedCategory === "" || post.category === selectedCategory

      return matchesQuery && matchesCategory
    })
  }, [initialPosts, query, selectedCategory])

  return (
    <div className="space-y-6">
      {/* 검색창 */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="제목 또는 태그로 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            selectedCategory === ""
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
          )}
        >
          전체 ({initialPosts.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name === selectedCategory ? "" : cat.name)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              selectedCategory === cat.name
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            )}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* 글 목록 그리드 */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-lg">검색 결과가 없습니다.</p>
          <p className="text-sm mt-1">다른 검색어나 카테고리를 시도해보세요.</p>
        </div>
      )}

      {/* 검색/필터 결과 수 */}
      {(query || selectedCategory) && filteredPosts.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {filteredPosts.length}개의 글을 찾았습니다.
        </p>
      )}
    </div>
  )
}
