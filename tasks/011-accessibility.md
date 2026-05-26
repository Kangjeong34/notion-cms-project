# Task 011: 접근성 (WCAG 2.1 AA) 준수

## 개요

NotionRenderer의 heading 계층 버그 수정(h1→h2, h2→h3, h3→h4), skip to content 링크 추가, 키보드 내비게이션 및 색상 대비 점검, aria 속성 완성도 검증.
이미 대부분의 aria 속성이 구현되어 있으므로 heading 수정과 skip link가 핵심 코드 변경이다.

## 관련 파일

- `components/blog/notion-renderer.tsx`: heading_1→h2, heading_2→h3, heading_3→h4로 수정
- `app/layout.tsx`: skip to content 링크 추가, `<main>`에 `id="main-content"` 추가
- `app/posts/[slug]/page.tsx`: h1 글 제목 위치 확인 (참조)
- `components/layout/navbar.tsx`: 기존 aria 속성 확인 (참조)
- `components/blog/post-list.tsx`: 기존 aria 속성 확인 (참조)
- `components/blog/post-card.tsx`: 기존 aria 속성 확인 (참조)

## 수락 기준

- [x] 글 상세 페이지에서 `h1`이 하나만 존재한다 (글 제목만 h1)
- [x] Notion 본문의 `heading_1`이 `h2`로, `heading_2`가 `h3`로, `heading_3`이 `h4`로 렌더링된다
- [x] Tab 키로 skip link가 포커스되면 `#main-content`로 이동한다
- [x] 모든 인터랙티브 요소에 키보드로 접근 가능하다
- [x] 색상 대비가 WCAG AA 기준(4.5:1) 이상을 충족한다

## 구현 단계

### 단계 1: NotionRenderer heading 계층 수정

- [x] `components/blog/notion-renderer.tsx` 수정
  - `heading_1` → `<h2>` (기존 `<h1>` → `<h2>`)
  - `heading_2` → `<h3>` (기존 `<h2>` → `<h3>`)
  - `heading_3` → `<h4>` (기존 `<h3>` → `<h4>`)
- [x] Tailwind 클래스도 함께 조정: h2는 `text-2xl font-bold`, h3는 `text-xl font-semibold`, h4는 `text-lg font-semibold`

### 단계 2: Skip to content 링크 추가

- [x] `app/layout.tsx`의 `<body>` 최상단에 skip link 추가 (`sr-only focus:not-sr-only`)
- [x] `<main>` 태그에 `id="main-content"` 추가

### 단계 3: 기존 aria 속성 점검

- [x] Navbar: `<header>`, `<nav aria-label="주 내비게이션">`, `aria-current`, `aria-label` 확인
- [x] PostList: `role="search"`, `role="group" aria-label="카테고리 필터"`, `aria-live`, `aria-pressed` 확인
- [x] PostCard: `<article>`, `<time dateTime>`, `aria-label` 확인
- [x] PostDetail: `<header>`, `<article>`, `<nav aria-label="이전/다음 글">` 확인

### 단계 4: 색상 대비 점검

- [x] Playwright로 주요 텍스트 색상 대비 확인
- [x] `--muted-foreground: oklch(0.556)` → 필터 버튼에서 4.34:1 (기준 미달) 발견
- [x] `--muted-foreground: oklch(0.540)`으로 조정 → 필터 버튼 4.64:1, 흰 배경 5.06:1 ✅

### 단계 5: 키보드 내비게이션 테스트

- [x] Tab 키 첫 포커스: skip link "본문으로 이동" → Enter 시 `#main-content` 이동 확인
- [x] 13개 인터랙티브 요소(링크/버튼/입력) 모두 자연 탭 순서로 접근 가능 확인
- [x] 카테고리 필터 버튼, 검색 입력, 포스트 카드 링크 탭 접근 확인

## 테스트 체크리스트

- [x] 글 상세 페이지 DOM에서 h1이 1개만 존재한다 (Playwright 확인: h1=["초한지"])
- [x] Notion heading_1 블록이 h2 태그로 렌더링된다 (코드 수정 완료)
- [x] Tab 키로 skip to content 링크에 포커스 가능하고 Enter 시 URL이 `#main-content`로 변경된다
- [x] 전체 페이지에서 13개 인터랙티브 요소 키보드 접근 가능 (tabindex=null 자연 순서)
- [x] 카테고리 필터 버튼, 검색 입력 필드 탭 접근 확인
- [x] 색상 대비: muted-foreground 4.64:1(muted bg), 5.06:1(white bg) — WCAG AA 통과
