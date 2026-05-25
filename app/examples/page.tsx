import Link from "next/link"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"

const badgeExamples = [
  { label: "기본", variant: "default" as const },
  { label: "보조", variant: "secondary" as const },
  { label: "아웃라인", variant: "outline" as const },
  { label: "위험", variant: "destructive" as const },
]

const buttonExamples = [
  { label: "기본", variant: "default" as const },
  { label: "보조", variant: "secondary" as const },
  { label: "아웃라인", variant: "outline" as const },
  { label: "고스트", variant: "ghost" as const },
]

const layoutCards = [
  {
    title: "대시보드 레이아웃",
    description: "사이드바, 헤더, 브레드크럼으로 구성된 관리자 레이아웃입니다.",
    badge: "dashboard",
    href: "/dashboard",
  },
  {
    title: "인증 레이아웃",
    description: "로그인/회원가입 전용 심플한 중앙 정렬 레이아웃입니다.",
    badge: "auth",
    href: "/sign-in",
  },
]

const formCards = [
  {
    title: "설정 폼",
    description: "React Hook Form + Zod 조합으로 구현한 탭 기반 설정 페이지 예제입니다.",
    badge: "react-hook-form",
    href: "/settings",
  },
  {
    title: "회원가입 폼",
    description: "유효성 검사와 에러 메시지 표시를 포함한 회원가입 폼 예제입니다.",
    badge: "zod",
    href: "/sign-up",
  },
]

export default function ExamplesPage() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageHeader
        title="예제"
        description="스타터킷에 포함된 컴포넌트와 패턴을 확인하세요"
      />

      <Tabs defaultValue="components">
        <TabsList>
          <TabsTrigger value="components">컴포넌트</TabsTrigger>
          <TabsTrigger value="layouts">레이아웃</TabsTrigger>
          <TabsTrigger value="forms">폼</TabsTrigger>
        </TabsList>

        {/* 컴포넌트 탭 */}
        <TabsContent value="components" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Badge */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Badge</CardTitle>
                <CardDescription>상태나 카테고리를 나타내는 배지 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {badgeExamples.map((b) => (
                  <Badge key={b.variant} variant={b.variant}>{b.label}</Badge>
                ))}
              </CardContent>
            </Card>

            {/* Button */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Button</CardTitle>
                <CardDescription>다양한 스타일 변형을 제공하는 버튼 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {buttonExamples.map((b) => (
                  <Button key={b.variant} variant={b.variant} size="sm">{b.label}</Button>
                ))}
              </CardContent>
            </Card>

            {/* Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Alert</CardTitle>
                <CardDescription>안내 메시지를 표시하는 알림 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>안내</AlertTitle>
                  <AlertDescription>일반 안내 메시지입니다.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>오류 메시지입니다.</AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Progress</CardTitle>
                <CardDescription>진행 상태를 시각적으로 표시하는 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[25, 50, 75, 100].map((v) => (
                  <div key={v} className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>진행률</span>
                      <span>{v}%</span>
                    </div>
                    <Progress value={v} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Avatar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Avatar</CardTitle>
                <CardDescription>사용자 프로필 이미지 또는 이니셜 표시 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                {["김", "이", "박", "최", "정"].map((name) => (
                  <div key={name} className="flex flex-col items-center gap-1">
                    <Avatar>
                      <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{name}씨</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skeleton</CardTitle>
                <CardDescription>콘텐츠 로딩 중 표시하는 플레이스홀더 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/5" />
              </CardContent>
            </Card>
          </div>

          {/* 성공 알림 */}
          <Alert className="mt-6">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>shadcn/ui 기반</AlertTitle>
            <AlertDescription>
              모든 컴포넌트는 shadcn/ui를 기반으로 하며 Tailwind CSS로 스타일링됩니다.
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* 레이아웃 탭 */}
        <TabsContent value="layouts" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {layoutCards.map((card) => (
              <Card key={card.href} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{card.title}</CardTitle>
                    <Badge variant="secondary">{card.badge}</Badge>
                  </div>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={card.href}>레이아웃 보기</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 폼 탭 */}
        <TabsContent value="forms" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {formCards.map((card) => (
              <Card key={card.href} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{card.title}</CardTitle>
                    <Badge variant="secondary">{card.badge}</Badge>
                  </div>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={card.href}>폼 보기</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
