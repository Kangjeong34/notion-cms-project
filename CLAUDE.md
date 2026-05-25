# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm run dev      # 개발 서버 (기본 포트 3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

## 아키텍처

### 레이아웃 계층

```
app/layout.tsx (루트)
  ThemeProvider → QueryProvider → TooltipProvider
  Navbar / Footer / Toaster (모든 페이지 공통)

app/dashboard/layout.tsx (대시보드 전용)
  SidebarProvider → DashboardSidebar + SidebarInset
  대시보드 하위 라우트(/dashboard/**)에만 적용
```

공개 페이지(`/`, `/sign-in`, `/sign-up`, `/examples`, `/settings`)는 루트 레이아웃만 사용한다.
대시보드 페이지는 루트 레이아웃 + 대시보드 레이아웃이 중첩 적용된다.

### 주요 패턴

**폼**: React Hook Form + Zod를 항상 함께 사용한다. 스키마를 먼저 정의하고 `z.infer<>`로 타입을 파생한다.

```tsx
const schema = z.object({ ... })
type Values = z.infer<typeof schema>
const form = useForm<Values>({ resolver: zodResolver(schema) })
```

**UI 컴포넌트**: `components/ui/`의 shadcn/ui 기반 컴포넌트를 사용한다. 이 컴포넌트들은 `radix-ui`의 `Slot.Root`를 직접 사용한다(`@radix-ui/*` 개별 패키지가 아닌 `radix-ui` 단일 패키지).

**스타일링**: `cn()` (`lib/utils.ts`) 으로 클래스를 병합한다. Tailwind CSS v4 + OKLCH 색상 변수 기반이며 `globals.css`에 CSS 변수가 정의되어 있다.

**사이트 설정**: 네비게이션 링크, 사이트명, 소셜 URL은 `lib/config.ts`의 `siteConfig`에서 중앙 관리한다.

**모바일 감지**: `hooks/use-mobile.ts`의 `useIsMobile()` 또는 `usehooks-ts`의 `useMediaQuery()`를 사용한다.

### 라우트 구조

| 경로 | 레이아웃 | 설명 |
|------|----------|------|
| `/` | 루트 | 홈페이지 |
| `/sign-in`, `/sign-up` | 루트 (`(auth)` 그룹) | 인증 — 별도 레이아웃 없음 |
| `/dashboard/**` | 루트 + 대시보드 | 사이드바 포함 |
| `/settings`, `/examples` | 루트 | 단독 페이지 |

### 기술 스택 주의사항

- **Next.js 16** — 훈련 데이터의 Next.js와 API가 다를 수 있다. 코드 작성 전 `node_modules/next/dist/docs/`를 확인한다.
- **React 19** — 새로운 훅과 동작 변경 포함.
- **Tailwind CSS v4** — `@apply` 동작 및 설정 방식이 v3과 다르다.
- **shadcn/ui**: `radix-ui` 단일 패키지 사용 (개별 `@radix-ui/*` 패키지 아님). `Slot`은 `radix-ui`에서 `{ Slot }` 으로 import 후 `Slot.Root`를 사용한다.
- **lucide-react v1.x** — 아이콘 이름이 이전 버전과 다를 수 있다.
