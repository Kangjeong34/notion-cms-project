# Development Guidelines

## Project Overview

- **목적**: Notion 데이터베이스를 CMS로 활용하는 책 리뷰 블로그
- **스택**: Next.js 16 App Router · TypeScript strict · Tailwind CSS v4 · shadcn/ui (radix-ui 단일 패키지)
- **데이터**: `lib/notion.ts` → Notion API 또는 샘플 데이터(`lib/sample-data.ts`) 분기

---

## Directory Structure

```
app/                        # Next.js App Router 페이지
  layout.tsx                # 루트 레이아웃 (Navbar/Footer/Providers)
  page.tsx                  # 홈 (글 목록)
  posts/[slug]/page.tsx     # 글 상세
  categories/page.tsx       # 카테고리 목록
  categories/[name]/page.tsx# 카테고리별 글 목록
  error.tsx / not-found.tsx / loading.tsx

components/
  ui/                       # shadcn/ui 컴포넌트 (수정 금지)
  blog/                     # 블로그 도메인 컴포넌트
  layout/                   # Navbar, Footer, PageHeader
  theme/                    # ThemeProvider, ThemeToggle

lib/
  notion.ts                 # Notion API 호출 레이어 (유일한 데이터 접근 지점)
  sample-data.ts            # 개발용 샘플 데이터
  config.ts                 # 사이트 전역 설정 (siteConfig)
  utils.ts                  # cn() 유틸리티

types/
  notion.ts                 # 모든 Notion 관련 타입 정의
```

---

## Architecture Rules

### Server / Client Component

- **모든 page.tsx는 Server Component** (async 함수, `"use client"` 없음)
- **`"use client"`는 인터랙션이 필요한 컴포넌트에만** (예: `PostList` — useState/useMemo 사용)
- 서버 컴포넌트에서 `useState`, `useEffect`, `useCallback` 사용 **금지**
- 클라이언트 컴포넌트에서 Notion API 직접 호출 **금지**

### ISR (Incremental Static Regeneration)

- 모든 page.tsx에 `export const revalidate = 3600` 추가 필수
- `generateStaticParams`는 동적 라우트 page.tsx에 반드시 구현 (`/posts/[slug]`, `/categories/[name]`)

### params 접근 (Next.js 16)

- `params`는 **반드시 `await`** 후 구조분해:
  ```tsx
  // ✅ 올바름
  type Props = { params: Promise<{ slug: string }> }
  const { slug } = await params

  // ❌ 금지
  const { slug } = params
  ```

---

## Notion API Layer Rules

### 데이터 접근

- **`lib/notion.ts`의 함수만 사용** — 페이지/컴포넌트에서 `@notionhq/client` 직접 import 금지
- 공개 함수: `getPosts()`, `getPostBySlug(slug)`, `getPostBlocks(pageId)`, `getCategories()`

### USE_SAMPLE_DATA 분기 패턴

- `NOTION_API_KEY` 미설정 → `USE_SAMPLE_DATA = true` → 샘플 데이터 반환
- **새 함수 추가 시 반드시 동일 패턴 유지**:
  ```ts
  // ✅ 올바름
  export async function getXxx(): Promise<Xxx[]> {
    if (USE_SAMPLE_DATA) return sampleXxx
    return fetchXxxFromNotion()
  }
  ```

### @notionhq/client import

- 반드시 **동적 import** 사용 (서버 전용 보장):
  ```ts
  // ✅ 올바름
  const { Client, isFullPage } = await import("@notionhq/client")

  // ❌ 금지
  import { Client } from "@notionhq/client"  // 최상단 정적 import
  ```

---

## Type Rules

- **모든 Notion 관련 타입은 `types/notion.ts`에서만 정의**
- `NotionBlock`은 유니온 타입 — 새 블록 타입 지원 시 이 파일에 유니온 멤버 추가 필수
- `Post` 또는 `Category` 타입 필드 변경 시 **3개 파일 동시 수정**:
  1. `types/notion.ts` — 타입 정의
  2. `lib/notion.ts` — `fetchPostsFromNotion` 매핑 로직
  3. `lib/sample-data.ts` — 샘플 데이터 형태

---

## Component Rules

### components/ui/ (shadcn/ui)

- **직접 수정 금지** — shadcn/ui CLI로만 관리
- 새 UI 컴포넌트 필요 시 `npx shadcn@latest add <component>` 실행

### radix-ui import

```tsx
// ✅ 올바름 — radix-ui 단일 패키지
import { Slot } from "radix-ui"
const element = <Slot.Root />

// ❌ 금지 — 개별 패키지
import { Slot } from "@radix-ui/react-slot"
```

### blog/ 컴포넌트 배치 규칙

| 컴포넌트 | 위치 | Server/Client |
|---------|------|---------------|
| `PostCard` | `components/blog/post-card.tsx` | Server |
| `PostList` | `components/blog/post-list.tsx` | **Client** |
| `NotionRenderer` | `components/blog/notion-renderer.tsx` | Server |
| `RichTextRenderer` | `components/blog/rich-text-renderer.tsx` | Server |

---

## Styling Rules

- 클래스 병합: **반드시 `cn()`** 사용 (`import { cn } from "@/lib/utils"`)
  ```tsx
  // ✅ 올바름
  className={cn("base-class", condition && "conditional-class", className)}

  // ❌ 금지
  className={`base-class ${condition ? "conditional-class" : ""}`}
  ```
- 색상: **CSS 변수 기반** (`text-foreground`, `bg-primary`, `text-muted-foreground` 등) — 하드코딩 금지
- Tailwind v4: `@apply` 사용 **최소화** — 인라인 클래스 직접 사용 권장

---

## Route & Navigation Rules

### 라우트 구조

| 경로 | 파일 | 설명 |
|------|------|------|
| `/` | `app/page.tsx` | 홈, 글 목록 |
| `/posts/[slug]` | `app/posts/[slug]/page.tsx` | 글 상세 |
| `/categories` | `app/categories/page.tsx` | 카테고리 목록 |
| `/categories/[name]` | `app/categories/[name]/page.tsx` | 카테고리별 글 |

### 새 라우트 추가 시 동시 수정

1. `app/` 아래 디렉토리 및 `page.tsx` 생성
2. `lib/config.ts`의 `siteConfig.nav` 업데이트 (내비게이션 노출 시)

### 카테고리 URL

- `[name]` 파라미터는 한글 포함 가능 → `decodeURIComponent` 처리 필수:
  ```tsx
  const categoryName = decodeURIComponent(params.name)
  ```

---

## Multi-file Coordination

| 작업 | 수정해야 할 파일 |
|------|----------------|
| `Post` 타입 필드 추가/변경 | `types/notion.ts` → `lib/notion.ts` → `lib/sample-data.ts` |
| 새 Notion 블록 타입 지원 | `types/notion.ts` (유니온 추가) → `components/blog/notion-renderer.tsx` (case 추가) |
| 새 페이지 라우트 추가 | `app/[route]/page.tsx` → `lib/config.ts` (nav) |
| 사이트 전역 설정 변경 | `lib/config.ts`만 수정 |
| Notion API 함수 추가 | `lib/notion.ts` (USE_SAMPLE_DATA 분기 포함) → `lib/sample-data.ts` (샘플 추가) |

---

## Environment Variables

```env
NOTION_API_KEY=secret_xxxx      # 미설정 시 샘플 데이터 모드
NOTION_DATABASE_ID=xxxx         # Notion Book Reviews 데이터베이스 ID
```

- 환경 변수는 **서버 컴포넌트/`lib/` 파일에서만** 접근
- 클라이언트 컴포넌트에서 접근 시 반드시 `NEXT_PUBLIC_` 접두사 필요 (현재 해당 없음)

---

## Slug Rules

- slug 생성 함수 `toSlug()` — `lib/notion.ts` 내부 전용, 외부 export 없음
- slug 형식: 영문 소문자 + 숫자 + 한글 + 하이픈
- `getPostBySlug(slug)`로 조회 → 없으면 `notFound()` 호출

---

## Prohibited Actions

- `components/ui/` 파일 직접 편집
- `@radix-ui/*` 개별 패키지 설치 또는 import
- 클라이언트 컴포넌트에서 `lib/notion.ts` 함수 호출 (서버 전용)
- page.tsx에서 `revalidate` 생략
- 동적 라우트 page.tsx에서 `generateStaticParams` 생략
- `NOTION_API_KEY` 없이 Notion Client 인스턴스화 (USE_SAMPLE_DATA 분기 우회)
- `params`를 `await` 없이 동기적으로 구조분해 (Next.js 16 요구사항)
- CSS 색상 값 하드코딩 (`text-red-500` 대신 시맨틱 변수 사용)
