"use client"

import { useState } from "react"
import Link from "next/link"
import type { Post } from "@/types/notion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShareLinkMenu } from "@/components/dashboard/share-link-menu"

type FilterType = "all" | "발행됨" | "초안"

function formatDate(dateStr: string): string {
  if (!dateStr) return "—"
  return dateStr.slice(0, 10).replace(/-/g, ".")
}

function StatusBadge({ status }: { status: Post["status"] }) {
  if (status === "발행됨") {
    return <Badge variant="default">발행됨</Badge>
  }
  return <Badge variant="secondary">초안</Badge>
}

interface PostsTableProps {
  posts: Post[]
}

export function PostsTable({ posts }: PostsTableProps) {
  const [filter, setFilter] = useState<FilterType>("all")

  const filtered = filter === "all" ? posts : posts.filter((p) => p.status === filter)

  return (
    <div className="space-y-4">
      <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
        <TabsList>
          <TabsTrigger value="all">전체 ({posts.length})</TabsTrigger>
          <TabsTrigger value="발행됨">
            발행됨 ({posts.filter((p) => p.status === "발행됨").length})
          </TabsTrigger>
          <TabsTrigger value="초안">
            초안 ({posts.filter((p) => p.status === "초안").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 데스크톱 테이블 */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">제목</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>발행일</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="w-[80px]">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  글이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium max-w-xs">
                    {post.status === "발행됨" ? (
                      <Link
                        href={`/posts/${post.slug}`}
                        target="_blank"
                        className="hover:underline text-foreground line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground line-clamp-1">{post.title}</span>
                    )}
                  </TableCell>
                  <TableCell>{post.category || "—"}</TableCell>
                  <TableCell>{formatDate(post.publishedAt)}</TableCell>
                  <TableCell>
                    <StatusBadge status={post.status} />
                  </TableCell>
                  <TableCell>
                    <ShareLinkMenu slug={post.slug} title={post.title} status={post.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 모바일 카드 목록 */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">글이 없습니다.</p>
        ) : (
          filtered.map((post) => (
            <div key={post.id} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {post.status === "발행됨" ? (
                    <Link
                      href={`/posts/${post.slug}`}
                      target="_blank"
                      className="font-medium hover:underline line-clamp-2"
                    >
                      {post.title}
                    </Link>
                  ) : (
                    <p className="font-medium text-muted-foreground line-clamp-2">{post.title}</p>
                  )}
                </div>
                <StatusBadge status={post.status} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  {post.category && <span>{post.category}</span>}
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <ShareLinkMenu slug={post.slug} title={post.title} status={post.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
