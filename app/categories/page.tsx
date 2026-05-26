import Link from "next/link"
import { BookOpen } from "lucide-react"
import type { Metadata } from "next"
import { getCategories } from "@/lib/notion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "카테고리",
  description: "책 리뷰 카테고리 목록",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">카테고리</h1>
        <p className="text-muted-foreground">총 {categories.length}개의 카테고리</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/categories/${encodeURIComponent(cat.name)}`}
            aria-label={`${cat.name} 카테고리 — ${cat.count}개의 글`}
          >
            {/* 카테고리 카드 — BookOpen 아이콘 + 글 수 Badge */}
            <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl font-semibold">{cat.name}</h2>
                  <BookOpen className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" aria-hidden="true" />
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="text-xs">
                  {cat.count}개의 글
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
