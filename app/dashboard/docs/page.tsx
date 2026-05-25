import { BookOpen, Code2, ExternalLink } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const guides = [
  {
    title: "시작하기",
    description: "프로젝트 설치, 환경 설정, 첫 번째 실행 방법을 안내합니다.",
    badge: "필수",
    badgeVariant: "default" as const,
    icon: BookOpen,
  },
  {
    title: "인증 설정",
    description: "NextAuth.js를 사용한 로그인/회원가입 구현 방법을 설명합니다.",
    badge: "인증",
    badgeVariant: "secondary" as const,
    icon: BookOpen,
  },
  {
    title: "데이터베이스 연결",
    description: "Prisma ORM을 사용해 PostgreSQL 또는 SQLite에 연결하는 방법입니다.",
    badge: "데이터",
    badgeVariant: "secondary" as const,
    icon: Code2,
  },
  {
    title: "컴포넌트 커스터마이징",
    description: "shadcn/ui 컴포넌트를 프로젝트에 맞게 수정하는 방법입니다.",
    badge: "UI",
    badgeVariant: "outline" as const,
    icon: Code2,
  },
  {
    title: "환경 변수 설정",
    description: ".env.local 파일 구성과 Vercel 배포 시 환경 변수 관리 방법입니다.",
    badge: "설정",
    badgeVariant: "outline" as const,
    icon: Code2,
  },
  {
    title: "배포 가이드",
    description: "Vercel을 사용한 프로덕션 배포와 도메인 연결 방법을 안내합니다.",
    badge: "배포",
    badgeVariant: "secondary" as const,
    icon: ExternalLink,
  },
]

const apiEndpoints = [
  { method: "GET", endpoint: "/api/users", description: "사용자 목록 조회" },
  { method: "POST", endpoint: "/api/users", description: "신규 사용자 생성" },
  { method: "GET", endpoint: "/api/users/:id", description: "특정 사용자 정보 조회" },
  { method: "PUT", endpoint: "/api/users/:id", description: "사용자 정보 수정" },
  { method: "DELETE", endpoint: "/api/users/:id", description: "사용자 삭제" },
]

const methodVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  GET: "secondary",
  POST: "default",
  PUT: "outline",
  DELETE: "destructive",
}

const faqs = [
  {
    question: "이 스타터킷은 어떤 프레임워크를 사용하나요?",
    answer: "Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui를 기반으로 합니다. 최신 React 서버 컴포넌트와 스트리밍을 지원합니다.",
  },
  {
    question: "상용 프로젝트에 사용할 수 있나요?",
    answer: "네, MIT 라이선스로 제공되어 개인 및 상용 프로젝트 모두 자유롭게 사용 가능합니다.",
  },
  {
    question: "데이터베이스는 어떤 것을 지원하나요?",
    answer: "기본적으로 PostgreSQL을 권장하지만 Prisma ORM을 통해 MySQL, SQLite, MongoDB 등 다양한 데이터베이스를 지원합니다.",
  },
  {
    question: "다크 모드는 어떻게 활성화하나요?",
    answer: "우측 상단 테마 토글 버튼을 클릭하면 라이트/다크/시스템 모드를 선택할 수 있습니다. next-themes 라이브러리를 사용합니다.",
  },
  {
    question: "컴포넌트를 추가하거나 수정하려면 어떻게 하나요?",
    answer: "npx shadcn@latest add [컴포넌트명] 명령으로 새 컴포넌트를 추가할 수 있으며, components/ui/ 디렉토리에서 직접 수정할 수 있습니다.",
  },
]

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="문서"
        description="스타터킷 사용 가이드와 API 레퍼런스를 확인하세요"
        actions={
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              GitHub에서 보기
            </a>
          </Button>
        }
      />

      <Tabs defaultValue="guides">
        <TabsList>
          <TabsTrigger value="guides">가이드</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        {/* 가이드 탭 */}
        <TabsContent value="guides" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Card key={guide.title} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <guide.icon className="mt-0.5 h-5 w-5 text-muted-foreground shrink-0" />
                    <Badge variant={guide.badgeVariant} className="text-xs">{guide.badge}</Badge>
                  </div>
                  <CardTitle className="text-base">{guide.title}</CardTitle>
                  <CardDescription className="text-sm">{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                    자세히 보기 →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* API 레퍼런스 탭 */}
        <TabsContent value="api" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API 엔드포인트</CardTitle>
              <CardDescription>RESTful API 엔드포인트 목록입니다</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">메서드</TableHead>
                    <TableHead>엔드포인트</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiEndpoints.map((api) => (
                    <TableRow key={`${api.method}-${api.endpoint}`}>
                      <TableCell>
                        <Badge variant={methodVariant[api.method]}>{api.method}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{api.endpoint}</TableCell>
                      <TableCell className="text-muted-foreground">{api.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ 탭 */}
        <TabsContent value="faq" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>자주 묻는 질문</CardTitle>
              <CardDescription>스타터킷에 대해 자주 묻는 질문들을 정리했습니다</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={faq.question} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
