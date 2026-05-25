import Link from "next/link"
import { Zap, Shield, Palette, LayoutDashboard, Code2, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const features = [
  {
    icon: Zap,
    title: "Next.js 16 App Router",
    description: "최신 React Server Components와 Streaming을 활용한 빠른 페이지 렌더링",
  },
  {
    icon: Palette,
    title: "shadcn/ui + Tailwind CSS v4",
    description: "50개 이상의 접근성 높은 UI 컴포넌트와 OKLCH 색상 기반 다크모드 지원",
  },
  {
    icon: Shield,
    title: "TypeScript + Zod",
    description: "엄격한 타입 안전성과 런타임 유효성 검사로 버그를 사전에 방지",
  },
  {
    icon: LayoutDashboard,
    title: "대시보드 레이아웃",
    description: "반응형 사이드바, 통계 카드, 데이터 테이블이 포함된 대시보드 템플릿",
  },
  {
    icon: Code2,
    title: "React Hook Form",
    description: "성능 최적화된 폼 관리와 Zod 스키마 기반 유효성 검사 패턴 제공",
  },
  {
    icon: Rocket,
    title: "TanStack Query",
    description: "서버 상태 관리, 캐싱, 백그라운드 동기화를 위한 데이터 페칭 솔루션",
  },
]

const techStack = [
  "Next.js 16",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui",
  "TanStack Query",
  "React Hook Form",
  "Zod",
  "usehooks-ts",
  "next-themes",
  "sonner",
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="container mx-auto max-w-screen-2xl px-4 py-24 text-center">
        <Badge variant="secondary" className="mb-4">
          Next.js 16 · App Router
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          모던 웹 개발을
          <br />
          <span className="text-muted-foreground">더 빠르게 시작하세요</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          검증된 기술 스택으로 구성된 프로덕션 레디 스타터킷.
          복잡한 초기 설정 없이 바로 비즈니스 로직 개발에 집중하세요.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">대시보드 보기</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/sign-up">무료로 시작하기</Link>
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="container mx-auto max-w-screen-2xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">모든 것이 준비되어 있습니다</h2>
          <p className="mt-3 text-muted-foreground">
            프로덕션에 필요한 핵심 기능을 처음부터 포함합니다
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mt-3 text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="container mx-auto max-w-screen-2xl px-4 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight">지금 바로 시작하세요</h2>
        <p className="mt-3 text-muted-foreground">몇 분 안에 프로젝트를 시작할 수 있습니다</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/sign-up">무료로 시작하기</Link>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <Link href="/dashboard">데모 보기 →</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
