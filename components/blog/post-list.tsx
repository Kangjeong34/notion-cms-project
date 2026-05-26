"use client"

import { useMemo } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { Post, Category } from "@/types/notion"
import { PostCard } from "@/components/blog/post-card"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const POSTS_PER_PAGE = 9

interface PostListProps {
  initialPosts: Post[]
  categories: Category[]
  showCategoryFilter?: boolean
}

export function PostList({ initialPosts, categories, showCategoryFilter = true }: PostListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const query = searchParams.get("q") ?? ""
  const selectedCategory = searchParams.get("category") ?? ""
  const currentPage = Number(searchParams.get("page") ?? "1")

  // URL 파라미터 일괄 업데이트 — 빈 값은 파라미터에서 삭제
  function updateURL(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v)
      else params.delete(k)
    })
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

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

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  function getPageNumbers(): (number | "ellipsis")[] {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages]
    }
    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }
    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages]
  }

  return (
    <div className="space-y-6">
      {/* 검색창 — max-w-md, 모바일 full width */}
      <div role="search" className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          placeholder="제목 또는 태그로 검색..."
          value={query}
          onChange={(e) => updateURL({ q: e.target.value, page: "" })}
          className="pl-9"
          aria-label="글 검색"
        />
      </div>

      {/* 카테고리 필터 버튼 목록 — 모바일 가로 스크롤 */}
      {showCategoryFilter && (
        <div role="group" aria-label="카테고리 필터" className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => updateURL({ category: "", page: "" })}
            aria-pressed={selectedCategory === ""}
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
              type="button"
              onClick={() => updateURL({ category: cat.name === selectedCategory ? "" : cat.name, page: "" })}
              aria-pressed={selectedCategory === cat.name}
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
      )}

      {/* 글 목록 그리드 — 필터 결과를 aria-live로 스크린 리더에 알림 */}
      <div aria-live="polite" aria-atomic="true">
        {paginatedPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-muted-foreground">
            <p className="text-lg">검색 결과가 없습니다.</p>
            <p className="text-sm mt-1">다른 검색어나 카테고리를 시도해보세요.</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 — 총 페이지 수가 1 초과일 때만 표시 */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text="이전"
                aria-disabled={currentPage === 1}
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) updateURL({ page: String(currentPage - 1) })
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {getPageNumbers().map((page, idx) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault()
                      updateURL({ page: String(page) })
                    }}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                text="다음"
                aria-disabled={currentPage === totalPages}
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) updateURL({ page: String(currentPage + 1) })
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* 검색/필터 결과 수 안내 */}
      {(query || selectedCategory) && filteredPosts.length > 0 && (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {filteredPosts.length}개의 글을 찾았습니다.
        </p>
      )}
    </div>
  )
}
