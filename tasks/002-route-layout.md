# Task 002: 라우트 구조 및 레이아웃 설정

## 개요

블로그의 전체 라우트 구조를 생성하고 루트 레이아웃을 완성한다.
ThemeProvider, Navbar, Footer, Toaster를 레이아웃에 통합하고,
에러/404/로딩 페이지를 구현한다. 사이트 설정은 `lib/config.ts`에서 중앙 관리한다.

## 관련 파일

- `app/layout.tsx`: 루트 레이아웃
- `app/page.tsx`: 홈페이지 (플레이스홀더)
- `app/posts/[slug]/page.tsx`: 글 상세 페이지 (플레이스홀더)
- `app/categories/page.tsx`: 카테고리 목록 페이지 (플레이스홀더)
- `app/categories/[name]/page.tsx`: 카테고리별 글 목록 (플레이스홀더)
- `app/error.tsx`: 글로벌 에러 페이지
- `app/not-found.tsx`: 404 페이지
- `app/loading.tsx`: 로딩 페이지
- `lib/config.ts`: 사이트 설정 (siteConfig)
- `components/layout/navbar.tsx`: 네비게이션 바
- `components/layout/footer.tsx`: 푸터
- `components/theme/theme-provider.tsx`: 다크/라이트 모드 Provider

## 수락 기준

- [x] `/`, `/posts/[slug]`, `/categories`, `/categories/[name]` 라우트가 존재한다
- [x] 루트 레이아웃에 ThemeProvider, Navbar, Footer, Toaster가 통합되어 있다
- [x] `lib/config.ts`의 `siteConfig`에서 네비게이션, 사이트명, 소셜 URL을 관리한다
- [x] `error.tsx`, `not-found.tsx`, `loading.tsx`가 구현되어 있다

## 구현 단계

### 단계 1: 라우트 파일 생성

- [x] `app/page.tsx` — 홈 (플레이스홀더)
- [x] `app/posts/[slug]/page.tsx` — 글 상세 (플레이스홀더)
- [x] `app/categories/page.tsx` — 카테고리 목록 (플레이스홀더)
- [x] `app/categories/[name]/page.tsx` — 카테고리별 글 (플레이스홀더)

### 단계 2: 루트 레이아웃 구성

- [x] `app/layout.tsx`에 ThemeProvider, TooltipProvider 래핑
- [x] `<Navbar />`, `<Footer />`, `<Toaster />` 배치
- [x] `<main className="flex-1">` 으로 컨텐츠 영역 구성
- [x] Geist 폰트 적용, `lang="ko"` 설정

### 단계 3: 사이트 설정 중앙화

- [x] `lib/config.ts`에 `siteConfig` 객체 정의
  - `name`: 사이트명 ("책 리뷰 블로그")
  - `description`: 사이트 설명
  - `nav`: 네비게이션 링크 배열
  - `social.github`: GitHub URL

### 단계 4: 유틸리티 페이지 구현

- [x] `app/error.tsx`: "다시 시도" 버튼이 있는 에러 페이지 (Client Component)
- [x] `app/not-found.tsx`: 404 메시지 + 홈 링크
- [x] `app/loading.tsx`: 스켈레톤 또는 스피너 UI

## 변경 사항 요약

- `app/layout.tsx`: ThemeProvider > TooltipProvider > Navbar + main + Footer + Toaster 구조
- `lib/config.ts`: siteConfig 정의 (name, description, url, nav, social)
- `components/layout/navbar.tsx`: siteConfig.nav 기반 네비게이션 (데스크톱/모바일 분기)
- `components/layout/footer.tsx`: 사이트명 + 저작권 표시
- `components/theme/theme-provider.tsx`: next-themes ThemeProvider 래핑
- `app/error.tsx`, `app/not-found.tsx`, `app/loading.tsx`: 유틸리티 페이지 구현
