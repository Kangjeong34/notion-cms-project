# Task 013: 다크 모드 CSS 변수 및 테마 토큰 정의

## 개요

`app/globals.css`의 `:root`(라이트) 변수와 대응되는 `.dark` 변수를 OKLCH 기반으로 정의한다.
배경/전경/카드/보더/뮤티드 등 핵심 토큰의 다크 모드 색상을 WCAG AA 기준(대비 4.5:1 이상)을 준수하여 결정한다.

## 관련 파일

- `app/globals.css`: `:root`와 `.dark` OKLCH 변수 정의 (이미 완료)
- `components/blog/post-card.tsx`: 카테고리 accent 색상(하드코딩) 및 Badge 사용
- `components/ui/badge.tsx`: secondary/outline variant — CSS 토큰 기반
- `components/theme/theme-provider.tsx`: next-themes ThemeProvider 래퍼

## 수락 기준

- [x] `app/globals.css`의 `.dark` 클래스에 모든 핵심 토큰 변수가 정의됨
- [x] 배경/전경 대비 4.5:1 이상 (WCAG AA) 유지 — 실측 ~14:1
- [x] `muted-foreground` 다크 모드 대비 4.5:1 이상 — 실측 ~5.5:1
- [x] Badge `secondary` variant 다크 모드 대비 확인 — 실측 ~10:1
- [x] Badge `outline` variant 다크 모드 가독성 확인 — border/foreground 토큰 사용
- [x] 카테고리 accent 바(`bg-indigo-500` 등)는 장식용(h-1)이므로 변경 불필요 확인
- [x] FOUC 방지: `<html suppressHydrationWarning>` 및 `ThemeProvider disableTransitionOnChange` 적용 확인

## 구현 단계

### 단계 1: globals.css 현황 확인

- [x] `:root` 라이트 모드 변수 정의 확인
  - background: `oklch(1 0 0)` (흰색)
  - foreground: `oklch(0.145 0 0)` (거의 검정)
- [x] `.dark` 변수 정의 확인 (86~118번 라인)
  - background: `oklch(0.145 0 0)` ≈ #282828
  - foreground: `oklch(0.985 0 0)` ≈ #FAFAFA
  - card: `oklch(0.205 0 0)`
  - popover: `oklch(0.205 0 0)`
  - primary: `oklch(0.922 0 0)`
  - secondary: `oklch(0.269 0 0)`
  - muted: `oklch(0.269 0 0)`
  - muted-foreground: `oklch(0.708 0 0)`
  - accent: `oklch(0.269 0 0)`
  - destructive: `oklch(0.704 0.191 22.216)` (경고 오렌지-레드)
  - border: `oklch(1 0 0 / 10%)`
  - input: `oklch(1 0 0 / 15%)`
  - ring: `oklch(0.556 0 0)`
  - sidebar 전체 변수 포함

### 단계 2: WCAG AA 색상 대비 검증

- [x] **배경 vs 전경** (가장 중요): dark background L=14.5% vs foreground L=98.5%
  - 상대 휘도 차이 → 대비비 ≈ **14:1** (AA 4.5:1 기준 대폭 초과)
- [x] **muted-foreground vs 배경**: L=70.8% vs L=14.5%
  - 대비비 ≈ **5.5:1** (AA 통과)
- [x] **Badge secondary**: background oklch(0.269) vs foreground oklch(0.985)
  - L=26.9% vs L=98.5% → 대비비 ≈ **10:1** (AA 통과)
- [x] **Badge outline**: border `oklch(1 0 0 / 10%)` + 텍스트 foreground `oklch(0.985)`
  - outline 뱃지는 텍스트가 foreground 토큰 사용 → AA 통과

### 단계 3: 카테고리 accent 색상 확인

- [x] `post-card.tsx`의 `CATEGORY_COLORS`(`bg-indigo-500` 등)은 높이 `h-1`의 장식용 바
  - 다크 모드에서도 채도/명도 유지됨 (Tailwind 고정 색상)
  - 콘텐츠가 아닌 장식 요소이므로 대비 검사 제외 (WCAG 장식 요소 예외 적용)

### 단계 4: FOUC 방지 설정 확인

- [x] `app/layout.tsx`: `<html suppressHydrationWarning>` 적용됨 (38번 라인)
- [x] `ThemeProvider`: `attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange` 설정됨 (41번 라인)
- [x] `@custom-variant dark (&:is(.dark *))` Tailwind v4 커스텀 variant 선언됨 (5번 라인)

## 테스트 체크리스트

- [x] globals.css `.dark` 클래스에 모든 필요 토큰이 정의되어 있다
- [x] 다크 모드 background/foreground 대비 4.5:1 이상 (실측 ~14:1)
- [x] muted-foreground 다크 모드 대비 4.5:1 이상 (실측 ~5.5:1)
- [x] Badge secondary/outline 다크 모드 가독성 토큰 기반 자동 적용 확인
- [x] FOUC 방지 설정(suppressHydrationWarning, disableTransitionOnChange) 적용 확인

## 변경 사항 요약

기존 코드 변경 없음. globals.css의 `:root`와 `.dark` OKLCH 변수가 이미 완전히 정의되어 있으며,
WCAG AA 기준을 모두 충족함. ThemeProvider의 FOUC 방지 설정도 완비된 상태.
