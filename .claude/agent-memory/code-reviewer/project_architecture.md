---
name: project-architecture
description: 스타터킷 레이아웃 구조, 라우트 구성, 주요 컴포넌트 설계 패턴
metadata:
  type: project
---

## 레이아웃 계층

- `app/layout.tsx` (루트): ThemeProvider → QueryProvider → TooltipProvider → Navbar/Footer/Toaster
- `app/dashboard/layout.tsx` (대시보드): SidebarProvider → DashboardSidebar + SidebarInset (고정 브레드크럼)

## 라우트 구조

- `/` : 서버 컴포넌트 홈페이지 (features, techStack 정적 데이터)
- `/(auth)/sign-in`, `/(auth)/sign-up` : `"use client"` 클라이언트 폼 페이지
- `/dashboard/**` : 서버 컴포넌트 (더미 정적 데이터 사용)
- `/settings` : `"use client"` (ProfileForm + NotificationForm 두 폼 컴포넌트 포함)
- `/examples` : 서버 컴포넌트 컴포넌트 쇼케이스
- `error.tsx`, `loading.tsx`, `not-found.tsx` : 루트 레벨 특수 파일

## 상태 관리 패턴

- TanStack Query (`QueryProvider`) 설정되어 있으나 현재 실제 사용 코드 없음 (스타터킷 준비 상태)
- 폼: React Hook Form + Zod (schema-first, z.infer<> 타입 파생) — 모든 폼에서 일관 적용

## UI 컴포넌트 패턴

- `components/ui/` : shadcn/ui 기반, `radix-ui` 단일 패키지 import (`Slot.Root` 패턴)
- `components/layout/` : Navbar, Footer, DashboardSidebar, PageHeader
- `components/shared/` : StatCard (재사용 카드)
- `components/theme/` : ThemeProvider (next-themes 래퍼), ThemeToggle (dropdown)
- `components/providers/` : QueryProvider (useState로 QueryClient 생성)

## 스타일링 패턴

- Tailwind CSS v4 + OKLCH 색상 변수 (`globals.css`)
- `cn()` 유틸리티로 클래스 병합 (`lib/utils.ts`)
- `siteConfig` (`lib/config.ts`) : 네비게이션 링크, 사이트명, 소셜 URL 중앙 관리

**Why:** 스타터킷 프로젝트로 실제 인증/DB 연결 없이 UI 패턴만 구현됨
**How to apply:** 코드 리뷰 시 인증 누락을 Critical로 보지 말고 스타터킷 특성으로 맥락 파악 후 보안 제안
