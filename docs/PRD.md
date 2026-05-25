# PRD: 책 리뷰 블로그

> Notion을 CMS로 활용한 북 리뷰 블로그  
> 최종 수정일: 2026-05-25

---

## 1. 프로젝트 개요

### 1.1 배경 및 목적

Notion은 이미 많은 사용자가 글쓰기 도구로 활용하고 있다. 이 프로젝트는 Notion을 CMS(Content Management System)로 연결해, 별도의 관리자 페이지 없이 Notion에서 책 리뷰를 작성하면 블로그에 자동으로 반영되는 워크플로를 구현한다.

### 1.2 프로젝트명

**책 리뷰 블로그** (Book Review Blog)

### 1.3 핵심 가치 제안

| 관점 | 내용 |
|------|------|
| 콘텐츠 작성자 | Notion에서 편하게 글을 쓰면 블로그가 자동 업데이트된다 |
| 독자 | 깔끔한 UI에서 카테고리·태그·검색으로 원하는 리뷰를 찾을 수 있다 |
| 개발자 | 별도 DB·백엔드 없이 Notion API만으로 콘텐츠를 제공한다 |

---

## 2. 기술 스택

| 분류 | 기술 | 버전 / 비고 |
|------|------|-------------|
| Framework | Next.js | App Router |
| Language | TypeScript | strict 모드 |
| CMS | Notion API | `@notionhq/client` |
| Styling | Tailwind CSS | v4 |
| UI Components | shadcn/ui | radix-ui 단일 패키지 |
| Icons | Lucide React | v1.x |
| Deployment | Vercel | Edge Network |

---

## 3. Notion 데이터베이스 스키마

데이터베이스명: **Book Reviews**

| 필드명 | Notion 타입 | 설명 | 필수 여부 |
|--------|-------------|------|-----------|
| `Title` | title | 책 제목 + 리뷰 제목 | 필수 |
| `Category` | select | 책 카테고리 (예: 소설, 자기계발, 기술) | 필수 |
| `Tags` | multi_select | 세부 태그 (예: 추천, 고전, 번역) | 선택 |
| `Published` | date | 발행일 | 필수 |
| `Status` | select | `초안` / `발행됨` | 필수 |
| `Content` | page content | 본문 (Notion 블록) | 필수 |

> **Status 필터링 규칙**: `Status === "발행됨"` 인 항목만 블로그에 노출한다.

---

## 4. 주요 기능

### 4.1 Notion 데이터 연동

- `@notionhq/client`로 데이터베이스 쿼리
- `Status === "발행됨"` 필터 적용
- 발행일 기준 내림차순 정렬
- Next.js ISR(Incremental Static Regeneration)로 캐시 관리

### 4.2 글 목록 (홈)

- 최근 발행된 리뷰 카드 그리드 표시
- 카드 구성: 제목, 카테고리 뱃지, 발행일, 태그 미리보기
- 페이지네이션 또는 무한 스크롤 (MVP: 페이지네이션)

### 4.3 글 상세 페이지

- Notion 블록을 React 컴포넌트로 렌더링
- 지원 블록: paragraph, heading 1–3, bulleted list, numbered list, quote, code, image, divider
- 이전/다음 글 내비게이션

### 4.4 카테고리 필터링

- 카테고리 탭/버튼으로 글 목록 필터링
- URL 쿼리 파라미터(`?category=소설`)로 상태 유지
- 카테고리별 글 수 표시

### 4.5 검색

- 제목 및 태그 기준 클라이언트 사이드 검색
- 검색어 입력 시 실시간 결과 반영
- MVP에서는 정적 데이터 기반 검색 (Notion API 재요청 없음)

### 4.6 반응형 디자인

- 모바일(< 768px): 1열 카드 레이아웃
- 태블릿(768px–1024px): 2열 카드 레이아웃
- 데스크톱(> 1024px): 3열 카드 레이아웃

---

## 5. 화면 구성

### 5.1 라우트 구조

```
/                     → 홈 (최근 글 목록)
/posts/[slug]         → 글 상세 페이지
/categories/[name]    → 카테고리별 글 목록
```

### 5.2 홈 (`/`)

```
┌─────────────────────────────────────────┐
│  Navbar  (사이트명 + 검색 아이콘)         │
├─────────────────────────────────────────┤
│  Hero: "책 리뷰 블로그" 타이틀 + 설명    │
├─────────────────────────────────────────┤
│  카테고리 필터 탭                         │
│  [전체] [소설] [자기계발] [기술] ...      │
├─────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐           │
│  │ 카드 │  │ 카드 │  │ 카드 │           │
│  └──────┘  └──────┘  └──────┘           │
│  ┌──────┐  ┌──────┐  ┌──────┐           │
│  │ 카드 │  │ 카드 │  │ 카드 │           │
│  └──────┘  └──────┘  └──────┘           │
├─────────────────────────────────────────┤
│  페이지네이션                             │
├─────────────────────────────────────────┤
│  Footer                                  │
└─────────────────────────────────────────┘
```

### 5.3 글 상세 (`/posts/[slug]`)

```
┌─────────────────────────────────────────┐
│  Navbar                                  │
├─────────────────────────────────────────┤
│  카테고리 뱃지 / 발행일                   │
│  제목 (h1)                               │
│  태그 목록                               │
├─────────────────────────────────────────┤
│  본문 콘텐츠 (Notion 블록 렌더링)         │
├─────────────────────────────────────────┤
│  이전 글 ←          → 다음 글            │
├─────────────────────────────────────────┤
│  Footer                                  │
└─────────────────────────────────────────┘
```

### 5.4 카테고리 (`/categories/[name]`)

- 홈과 동일한 카드 그리드, 해당 카테고리 글만 표시
- 카테고리명 + 글 수 헤더

---

## 6. API 설계

### 6.1 Notion API 호출 레이어 (`lib/notion.ts`)

| 함수 | 설명 | 반환 타입 |
|------|------|-----------|
| `getPosts(options?)` | 발행된 글 목록 조회 | `Post[]` |
| `getPostBySlug(slug)` | slug로 단일 글 조회 | `Post \| null` |
| `getPostBlocks(pageId)` | 글 본문 블록 조회 | `BlockObject[]` |
| `getCategories()` | 카테고리 목록 및 글 수 조회 | `Category[]` |

### 6.2 데이터 타입 (`types/notion.ts`)

```ts
type Post = {
  id: string
  slug: string
  title: string
  category: string
  tags: string[]
  publishedAt: string
  status: "초안" | "발행됨"
}

type Category = {
  name: string
  count: number
}
```

---

## 7. 구현 단계 (로드맵)

### Phase 1 — 환경 설정 및 Notion 연동

- [ ] `@notionhq/client` 설치
- [ ] `.env.local` 환경 변수 설정 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
- [ ] Notion 데이터베이스 생성 및 통합 연결
- [ ] `lib/notion.ts` 기본 함수 구현 및 타입 정의

### Phase 2 — 글 목록 페이지

- [ ] 홈 페이지(`/`) 레이아웃 구성
- [ ] `PostCard` 컴포넌트 구현
- [ ] 카테고리 필터 탭 구현
- [ ] ISR 설정 (`revalidate`)

### Phase 3 — 글 상세 페이지

- [ ] `/posts/[slug]` 동적 라우트 구현
- [ ] Notion 블록 렌더러 구현
- [ ] 이전/다음 글 내비게이션

### Phase 4 — 검색 및 카테고리 페이지

- [ ] 검색 기능 구현 (클라이언트 사이드)
- [ ] `/categories/[name]` 페이지 구현
- [ ] URL 쿼리 파라미터 상태 관리

### Phase 5 — 스타일링 및 최적화

- [ ] 반응형 디자인 검증 (모바일/태블릿/데스크톱)
- [ ] Next.js Image 최적화
- [ ] 메타데이터(OG 태그, SEO) 설정
- [ ] Vercel 배포

---

## 8. 환경 변수

```env
# .env.local
NOTION_API_KEY=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 9. MVP 범위 및 제외 항목

### MVP 포함

- Notion API 연동 (목록 + 상세)
- 글 목록 및 상세 페이지
- 카테고리 필터링
- 기본 검색 (클라이언트 사이드)
- 반응형 디자인
- Vercel 배포

### MVP 제외 (이후 고려)

- 댓글 기능
- 좋아요 / 북마크
- RSS 피드
- 다크 모드
- 관리자 대시보드
- 이메일 구독

---

## 10. 비기능 요구사항

| 항목 | 목표 |
|------|------|
| 초기 로딩 성능 | LCP ≤ 2.5초 (ISR + Vercel CDN) |
| 접근성 | WCAG 2.1 AA 수준 |
| SEO | 각 글 페이지에 OG 태그 및 메타 description 포함 |
| 코드 품질 | TypeScript strict, ESLint 오류 0건 빌드 통과 |
