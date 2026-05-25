import { Eye, Activity, TrendingDown, Target } from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const stats = [
  { title: "총 페이지뷰", value: "128,430", delta: "전월 대비 +12.5%", trend: "up" as const, icon: Eye },
  { title: "총 세션", value: "54,210", delta: "전월 대비 +8.2%", trend: "up" as const, icon: Activity },
  { title: "이탈률", value: "42.3%", delta: "전월 대비 -3.1%p", trend: "up" as const, icon: TrendingDown },
  { title: "전환율", value: "3.8%", delta: "전월 대비 +0.4%p", trend: "up" as const, icon: Target },
]

const trafficSources = [
  { name: "직접 방문", value: 38 },
  { name: "검색 엔진", value: 29 },
  { name: "소셜 미디어", value: 18 },
  { name: "레퍼럴", value: 11 },
  { name: "기타", value: 4 },
]

const topPages = [
  { path: "/", views: "32,410", unique: "18,920" },
  { path: "/dashboard", views: "21,830", unique: "12,440" },
  { path: "/sign-up", views: "15,290", unique: "14,110" },
  { path: "/examples", views: "9,840", unique: "7,320" },
  { path: "/settings", views: "6,120", unique: "4,980" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="분석"
        description="트래픽과 사용자 행동 데이터를 확인하세요"
        actions={
          <Button variant="outline" size="sm">
            내보내기
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        {/* 트래픽 소스 */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>트래픽 소스</CardTitle>
            <CardDescription>유입 경로별 비율입니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{source.name}</span>
                  <span className="font-medium">{source.value}%</span>
                </div>
                <Progress value={source.value} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 인기 페이지 */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>인기 페이지</CardTitle>
            <CardDescription>조회수 기준 상위 5개 페이지입니다</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>경로</TableHead>
                  <TableHead className="text-right">조회수</TableHead>
                  <TableHead className="text-right">순방문자</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPages.map((page) => (
                  <TableRow key={page.path}>
                    <TableCell className="font-mono text-sm">{page.path}</TableCell>
                    <TableCell className="text-right">{page.views}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{page.unique}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
