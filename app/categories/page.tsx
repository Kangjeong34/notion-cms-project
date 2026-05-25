import Link from "next/link"
import type { Metadata } from "next"
import { getCategories } from "@/lib/notion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "카테고리",
  description: "책 리뷰 카테고리 목록",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">카테고리</h1>
        <p className="text-muted-foreground">총 {categories.length}개의 카테고리</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link key={cat.name} href={`/categories/${encodeURIComponent(cat.name)}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <h2 className="text-xl font-semibold">{cat.name}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{cat.count}개의 글</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
